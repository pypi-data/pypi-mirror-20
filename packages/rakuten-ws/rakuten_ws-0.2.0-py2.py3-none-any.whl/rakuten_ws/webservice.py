# coding: utf-8
from __future__ import unicode_literals

import time
import os.path as op

from .baseapi import ApiEndpoint, ApiService, BaseWebService, ApiMethod
from .baserms import BaseRmsService, ZeepClient, RestClient, RestMethod
from . import parameters


class IchibaAPI(ApiService):
    item = ApiEndpoint(ApiMethod('search', api_version='20140222'),
                       ApiMethod('ranking', api_version='20120927'))
    genre = ApiEndpoint(ApiMethod('search', api_version='20120723'))
    tag = ApiEndpoint(ApiMethod('search', api_version='20140222'))
    product = ApiEndpoint(ApiMethod('search', api_version='20140305'), api_endpoint='Product')


class BooksAPI(ApiService):
    api_version = "20130522"

    total = ApiEndpoint(ApiMethod('search'))
    book = ApiEndpoint(ApiMethod('search'))
    cd = ApiEndpoint(ApiMethod('search'), api_endpoint='BooksCD')
    dvd = ApiEndpoint(ApiMethod('search'), api_endpoint='BooksDVD')
    foreign_book = ApiEndpoint(ApiMethod('search'))
    magazine = ApiEndpoint(ApiMethod('search'))
    game = ApiEndpoint(ApiMethod('search'))
    software = ApiEndpoint(ApiMethod('search'))
    genre = ApiEndpoint(ApiMethod('search', api_version="20121128"))


class TravelAPI(ApiService):
    api_version = "20131024"

    hotel = ApiEndpoint(ApiMethod('simple_search', 'simple_hotel_search'),
                        ApiMethod('detail_search', 'hotel_detail_search'),
                        ApiMethod('search_vacant', 'vacant_hotel_search'),
                        ApiMethod('ranking', 'hotel_ranking'),
                        ApiMethod('get_chain_list', 'get_hotel_chain_list'),
                        ApiMethod('keyword_search', 'keyword_hotel_search'),
                        api_endpoint="Travel")
    area = ApiEndpoint(ApiMethod('get_class', 'get_area_class'), api_endpoint="Travel")


class AuctionAPI(ApiService):
    api_version = "20120927"

    genre_id = ApiEndpoint(ApiMethod('search'))
    genre_keyword = ApiEndpoint(ApiMethod('search'))
    item = ApiEndpoint(ApiMethod('search'))
    item_code = ApiEndpoint(ApiMethod('search'))


class KoboAPI(ApiService):
    api_version = "20131010"

    genre = ApiEndpoint(ApiMethod('search', 'genre_search'), api_endpoint="Kobo", api_version="20131010")
    ebook = ApiEndpoint(ApiMethod('search', 'ebook_search'), api_endpoint="Kobo", api_version="20140811")


class GoraAPI(ApiService):
    golf = ApiEndpoint(ApiMethod('search', 'gora_golf_course_search', api_version="20131113"),
                       ApiMethod('detail', 'gora_golf_course_detail', api_version="20140410"),
                       api_endpoint="Gora")
    plan = ApiEndpoint(ApiMethod('search', 'gora_plan_search', api_version="20150706"),
                       api_endpoint="Gora")


class RecipeAPI(ApiService):
    api_version = "20121121"

    category = ApiEndpoint(ApiMethod('ranking', 'category_ranking'),
                           ApiMethod('list', 'category_list'),
                           api_endpoint="Recipe")


class OtherAPI(ApiService):
    high_commission_shop = ApiEndpoint(ApiMethod('list', api_version="20131205"), api_endpoint="HighCommissionShop")


class RmsInventoryAPI(ZeepClient):
    wsdl = "file://%s" % op.abspath(op.join(op.dirname(__file__), 'wsdl', 'inventoryapi.wsdl'))


class RmsOrderAPI(ZeepClient):
    wsdl = "file://%s" % op.abspath(op.join(op.dirname(__file__), 'wsdl', 'orderapi.wsdl'))


class RmsProductAPI(RestClient):
    api_version = '2.0'
    search = RestMethod(http_method='GET')


class RmsItemAPI(RestClient):
    get = RestMethod(http_method='GET')
    insert = RestMethod(http_method='POST', params=parameters.item_insert)
    update = RestMethod(http_method='POST', params=parameters.item_update)
    delete = RestMethod(http_method='POST', params=parameters.item_delete)
    search = RestMethod(http_method='GET')


class RmsItemsAPI(RestClient):
    update = RestMethod(http_method='POST', params=parameters.items_update)


class RmsCabinetAPI(RestClient):
    get_usage = RestMethod(http_method='GET', name='usage/get')
    get_folders = RestMethod(http_method='GET', name='folders/get')
    get_files = RestMethod(http_method='GET', name='folder/files/get')
    search_files = RestMethod(http_method='GET', name='files/search')
    get_trash_files = RestMethod(http_method='GET', name='trashbox/files/get')
    delete_file = RestMethod(http_method='POST', name='file/delete', root_xml_key="fileDelete")
    revert_trash_file = RestMethod(http_method='POST', name='trashbox/file/revert', root_xml_key="fileRevert")
    insert_file = RestMethod(http_method='POST', name='file/insert', form_data='file', root_xml_key="fileInsert",
                             params=parameters.cabinet_insert_file)
    update_file = RestMethod(http_method='POST', name='file/update', form_data='file', root_xml_key="folderUpdate")
    insert_folder = RestMethod(http_method='POST', name='folder/insert', root_xml_key="folderInsert")

    def upload_images(self, sku, *images, **kwargs):
        attempts = kwargs.get('attempts', 5)
        result = self.search_files(file_name=sku)
        excluded_files = []
        if 'files' in result:
            excluded_files = [int(f['FileId']) for f in result['files']['file']]

        for image_url in images:
            self.insert_file(file={'file_name': "%s" % sku, 'folder_id': 0}, filename=image_url)

        def get_new_urls():
            files = []
            result = self.search_files(file_name=sku)
            if 'files' in result:
                for f in sorted(result['files']['file'], key=lambda x: x['TimeStamp']):
                    if int(f['FileId']) not in excluded_files:
                        files.append(f['FileUrl'])
            return files
        for i in range(attempts):
            urls = get_new_urls()
            if len(urls) == len(images):
                return urls
            time.sleep(1)
        return []


class RmsNavigationAPI(RestClient):
    get_genre = RestMethod(http_method='GET', name='genre/get')
    get_tag = RestMethod(http_method='GET', name='genre/tag/get')
    get_header = RestMethod(http_method='GET', name='genre/header/get', root_xml_key='navigationHeaderGet')


class RmsService(BaseRmsService):
    item = RmsItemAPI()
    items = RmsItemsAPI()
    product = RmsProductAPI()
    cabinet = RmsCabinetAPI()
    navigation = RmsNavigationAPI()

    order = RmsOrderAPI()
    inventory = RmsInventoryAPI()


class RakutenWebService(BaseWebService):

    rms = RmsService()

    ichiba = IchibaAPI()
    books = BooksAPI()
    travel = TravelAPI()
    auction = AuctionAPI()
    kobo = KoboAPI()
    gora = GoraAPI()
    recipe = RecipeAPI()
    other = OtherAPI()
