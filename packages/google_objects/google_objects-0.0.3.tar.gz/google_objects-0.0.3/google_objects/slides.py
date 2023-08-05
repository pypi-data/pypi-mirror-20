# -*- coding: utf-8 -*-

"""

Google Slides API
    Tue 13 Sep 22:16:41 2016

"""

import re
import logging
import httplib2

from apiclient.errors import HttpError

from . import GoogleAPI, GoogleObject
from .utils import keys_to_snake, set_private_attrs

log = logging.getLogger(__name__)


# TODO:
    # i/ ensure all cell data reflects table row insertion and deletion
    # ii/ page title and descriptor need to be found and initialized
    # iii/ change .from_existing to .from_raw
    # iv/ add Text nested class for Shape & Table
    # v/ generate elements from PageElement constructor using __subclasses__

    # vii/ **have API create method return blank new presentation, all features added via updating


class SlidesAPI(GoogleAPI):

    """Google Slides Wrapper Object

    This object wraps the Google API Slides resource
    to provide a cleaner, conciser interface when dealing
    with Google Slides objects.

    Raises exceptions, of which API object related exceptions
    are handled by its <Presentation> object.
    """

    def __init__(self, credentials=None, api_key=None):
        super(SlidesAPI, self).__init__(credentials, api_key)
        self._resource = self.build('slides', 'v1')

    def create_presentation(self):
        pass
    def get_presentation(self, presentation_id):
        """Returns a Presentation Object

        :id: Presentation ID
        :returns: <Presentation> Model

        """
        data = self._resource.presentations().get(
            presentationId=presentation_id
        ).execute()

        return Presentation.from_existing(data, self)

    def get_page(self, presentation_id, page_id):
        """Returns a Page Object

        :id: Page ID
        :returns: <Page> Model

        """
        data = self._resource.presentations().pages().get(
            presentationId = presentation_id,
            pageObjectId = page_id
        ).execute()

        return Page.from_existing(data)

    def push_updates(self, presentation_id, updates):
        """Push Update Requests to Presentation API,
        throw errors if necessary.
        """
        self._resource.presentations().batchUpdate(
            presentationId=presentation_id,
            body={'requests': updates}
        ).execute()



# objects


class Presentation(GoogleObject):

    """Google Presentation Object,
    holds batch update request lists and
    passes it to its <Client> for execution.
    """

    _properties = {
        'presentationId',
        'layouts',
        'slides',
        'masters',
    }

    def __init__(self, client=None, **kwargs):
        """Class for Presentation object

        :client: <Client> from .client

        """
        self.client = client
        self.__updates = []

        super(Presentation, self).__init__(**kwargs)

    @classmethod
    def from_existing(cls, data, client=None):
        """initiates using existing Spreadsheet resource"""

        new_data = keys_to_snake(data)
        return cls(client, **new_data)

    def __enter__(self):
        return self

    def __exit__(self, ex_type, ex_val, traceback):
        try:
            self.update()
            return True
        except HttpError as e:
            raise e

    def __iter__(self):
        for page in self.slides():
            yield page

    @property
    def id(self):
        return self._presentation_id

    def update(self):
        if self.__updates:
            self.client.push_updates(self.id, self.__updates)
            # TODO: add success handlers
            del self.__updates[:]

        return self

    def add_update(self, update):
        """Adds update of type <Dict>
        to updates list

        :update: <Dict> of update request
        :returns: <Bool> of if request was added

        """
        if type(update) is dict:
            self.__updates.append(update)
            return True
        else:
            return False

    def slides(self):
        return [Page(self, **slide) for slide in self._slides]

    def masters(self):
        return [Page(self, **slide) for slide in self._masters]

    def layouts(self):
        return [Page(self, **slide) for slide in self._layouts]

    def get_matches(self, regex):
        """Search all Presentation text-based
        elements for matches with regex, returning
        a set of (*text, *element_id) tuples

        :regex: a raw regex <String>
        :returns: <Set> of matches

        """
        # tags = []
        tags = []
        for page in self.slides():
            for element in page:
                # check shape
                if isinstance(element, Shape):
                    if element.text:
                        for text in element.text:
                            if text.match(regex):
                                log.debug('Match in SHAPE:', element.id)
                                tags.append((text.text, element.about()))
                                # tags.add(element.text)

                # check all table cells
                if isinstance(element, Table):
                    for cell in element.cells():
                        for text in cell.text:
                            if text.match(regex):
                                log.debug('Match in TABLE: %s, coords: %s',
                                    cell.table.id, cell.location
                                )
                                # tags.add(cell.text)
                                tags.append((text.text, cell.about()))
        return tags

    def replace_text(self, find, replace, case_sensitive=False):
        """Add update request for presentation-wide
        replacement with arg:find to arg:replace
        """
        self.add_update(
            SlidesUpdate.replace_all_text(str(find), str(replace), case_sensitive)
        )

    def get_element_by_id(self, element_id):
        """Retrieves an element within this presentation identified
        by the argument given. Returns None if no such element is found.

        :element_id: string representing element id
        :returns: <PageElement> object or None

        """
        for page in self.slides():
            log.debug('Page: {}'.format(type(page)))
            if element_id in page:
                return page[element_id]


class Page(GoogleObject):

    """Corresponds with a Page object in the Slides
    API, requires a <Presentation> object to push
    updates back up.

    args/
        :presentation // <Presentation> instance
        :kwargs // <Dict> representing API Page Resource
    """

    _properties = {
        'pageElements'
    }

    def __init__(self, presentation=None, **kwargs):
        self.presentation = presentation
        super(Page, self).__init__(**kwargs)

    @classmethod
    def from_existing(cls, data, presentation=None):
        """initiates using existing Spreadsheet resource"""

        new_data = keys_to_snake(data)
        return cls(presentation, **new_data)

    @property
    def id(self):
        return self._object_id
    @property
    def read_only(self):
        if not self.presentation:
            return True
        return False

    def __load_element(self, element):
        """Returns element object from
        slide element dict.

        :element: <Dict> repr. Page Resource Element
        :returns: <PageElement Super>

        """
        if 'shape' in element:
            log.debug('Shape %s loaded.', element['object_id'])
            return Shape(self.presentation, self, **element)
        elif 'table' in element:
            log.debug('Table %s loaded.', element['object_id'])
            return Table(self.presentation, self, **element)
        elif 'element_group' in element:
            log.debug('Element Group %s loaded.', element['object_id'])
            return [self.__load_element(each) for each in element['children']]

        # TODO: Implement the following constructors
        elif 'image' in element:
            log.debug('Image %s loaded.', element['object_id'])
            return PageElement(self.presentation, self, **element)
        elif 'video' in element:
            log.debug('Video %s loaded.', element['object_id'])
            return PageElement(self.presentation, self, **element)
        elif 'word_art' in element:
            log.debug('Word Art %s loaded.', element['object_id'])
            return PageElement(self.presentation, self, **element)
        elif 'sheets_chart' in element:
            log.debug('Sheets Chart %s loaded.', element['object_id'])
            return PageElement(self.presentation, self, **element)

    def yield_elements(self, __sub_list=[]):
        """Generates PageElement objects according to type.

        *NEVER pass an argument to this function, the parameter
        is only to add recursive list flattening with respect to
        nested element groups.
        """
        for element in __sub_list or self._page_elements:
            if isinstance(element, list):
                self.yield_elements(element)

            yield self.__load_element(element)

    def elements(self):
        """Return a list of PageElement instances."""
        return [element for element in self.yield_elements()]

    def __iter__(self):
        return self.yield_elements()

    def __contains__(self, element_id):
        """Checks if this page contains elements referred to
        by argument.

        :element_id: Unique Google PageElement ID string.
        :returns: True or False

        """
        element_id_set = set()
        for each in self.yield_elements():
            if each:
                element_id_set.add(each.id)

        return element_id in element_id_set

    def __getitem__(self, element_id):
        """Returns element within presentation identified
        by the given argument, raises TypeError
        if such element isn't present.
        """
        for element in self.yield_elements():
            if element_id == element.id:
                return element

        raise TypeError


class PageElement(GoogleObject):

    """Initialized PageElement object and
    sets metadata properties and shared object
    operations.
    """

    _types = {'shape', 'table', 'image', 'video', 'word_art', 'sheets_chart'}

    # TODO:
    #     i/ title and description not initializing

    def __init__(self, presentation=None, page=None, **kwargs):
        self.presentation = presentation
        self.page = page

        super(PageElement, self).__init__(**kwargs)

    @property
    def id(self):
        return self._object_id

    @property
    def size(self):
        return self._size

    @property
    def transform(self):
        return self._transform

    def update(self, update):
        return self.presentation.add_update(update)

    def delete(self):
        """Adds deleteObject request to
        presentation updates list.
        """
        self.presentation.add_update(
            SlidesUpdate.delete_object(self._id)
        )

    def about(self):
        """returns dict returning vital information
        about page element
        """
        meta = {
            'kind': self.__class__.__name__.upper(),
            'id': self.id,
            'size': self.size
        }
        log.debug(meta)
        return meta


class Shape(PageElement):

    """Docstring for Shape."""

    def __init__(self, presentation=None, page=None, **kwargs):
        # set private attrs not done by base class
        shape = kwargs.pop('shape')
        set_private_attrs(self, shape)

        super(Shape, self).__init__(presentation, page, **kwargs)

    @property
    def text(self):
        if hasattr(self, '_text'):
            return TextContent(
                self.presentation,
                self.page,
                self,
                **self._text
            )

    @property
    def type(self):
        return self._shape_type

    def about(self):
        meta = super(self.__class__, self).about()
        meta['text'] = self.text
        return meta


class Table(PageElement):

    """Represents a Google Slides Table Resource"""

    # TODO:
    #     i/ add dynamic row functionality
    #     that works in tandem with corresponding cells

    def __init__(self, presentation=None, page=None, **kwargs):
        table = kwargs.pop('table')
        set_private_attrs(self, table)

        super(Table, self).__init__(presentation, page, **kwargs)

    def __iter__(self):
        return self.cells()

    def rows(self):
        for row in self._table_rows:
            yield [self.Cell(self, cell) for cell in row.get('table_cells')]

    def cells(self):
        for row in self._table_rows:
            for cell in row.get('table_cells'):
                yield self.Cell(self, **cell)

    def get_cell(self, row, column):
        """Fetches cell data and returns as object."""

        cell_data = self._table_rows[row]['table_cells'][column]
        return self.Cell(self, **cell_data)

    class Cell(GoogleObject):
        """Table Cell, only used by table"""

        def __init__(self, table, **kwargs):
            self.table = table
            super(Table.Cell, self).__init__(**kwargs)

        @property
        def text(self):
            if hasattr(self, '_text'):
                return TextContent(
                    self.table.presentation,
                    self.table.page,
                    self.table,
                    **self._text
                )

        @property
        def row_index(self):
            return self._location.get('row_index')

        @property
        def column_index(self):
            return self._location.get('column_index')

        @property
        def location(self):
            return (self.row_index, self.column_index)

        def about(self):
            meta = super(self.table.__class__, self.table).about()
            meta.update({
                'text': self.text,
                'location': self.location
            })
            log.debug('Cell description: {}'.format(meta))
            return meta


class TextContent(GoogleObject):

    """Docstring for TextElement. """

    _properties = {'textElements, lists'}

    def __init__(self, presentation=None, page=None, element=None, **kwargs):
        self.presentation = presentation
        self.page = page
        self.element = element

        super(TextContent, self).__init__(**kwargs)

    def __iter__(self):
        for text_element in self._text_elements:
            yield self.TextElement(self, self.element, **text_element)

    class TextElement(GoogleObject):

        _properties = {
            'startIndex',
            'endIndex',
            'paragraphMarker',
            'textRun',
            'autoText'
        }

        def __init__(self, text_content, page_element, **kwargs):
            self.text_content = text_content
            self.page_element = page_element
            super(TextContent.TextElement, self).__init__(**kwargs)

        @property
        def start_index(self):
            return self._start_index

        @property
        def end_index(self):
            return self._end_index

        @property
        def text(self):
            if hasattr(self, '_text_run'):
                return self._text_run['content']

        @text.setter
        def text(self, value):
            if not self._text:
                self.page_element.update(SlidesUpdate.delete_text(self.id))

            self.page_element.update(
                SlidesUpdate.insert_text(self.id, value)
            )

            self._text['raw_text'] = value

        @text.deleter
        def text(self):
            self.page_element.update(
                SlidesUpdate.delete_text()
            )

        def match(self, regex):
            """Returns True or False if regular expression
            matches the text inside.
            """
            if self.text and re.match(regex, self.text):
                return True
            else:
                return False

# update requests


class SlidesUpdate(object):

    """creates google-api-wrapper ready batchUpdate
    request dictionaries
    """

    @staticmethod
    def delete_object(obj_id):
        return {
            'deleteObject': {
                'objectId': obj_id
            }
        }

    @staticmethod
    def replace_all_text(find, replace, case_sensitive=False):
        return {
            'replaceAllText': {
                'replaceText': replace,
                'containsText': {
                    'text': find,
                    'matchCase': case_sensitive
                }
            }
        }

    @staticmethod
    def insert_text(obj_id, text, row=None, column=None, insertion_index=0):
        return {
            'insertText': {
                'objectId': obj_id,
                'text': text,
                'cellLocation': {
                    'rowIndex': row,
                    'columnIndex': column
                },
                'insertionIndex': insertion_index

            }
        }

    @staticmethod
    def delete_text(obj_id, row=None, column=None, mode='DELETE_ALL'):
        return {
            'deleteText': {
                'objectId': obj_id,
                'cellLocation': {
                    'rowIndex': row,
                    'columnIndex': column
                },
                'deleteMode': mode
            }
        }
