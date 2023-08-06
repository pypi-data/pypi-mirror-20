# -*- coding: utf-8 -*-
from __future__ import unicode_literals
# stdlib
import ftplib
import os
import shutil
import zipfile
# third party
from django.core.management.base import BaseCommand
from django.contrib.gis.utils import LayerMapping
# project
from ...models import Municipio, STATES


ALL_STATES = [choice[0] for choice in STATES]

DOWNLOADS_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    'IBGE_DOWNLOADS'
)


def download_from_ibge(state, print_out):
    print_out('Downloading {} zip file from IBGE.'.format(state))
    zip_file_path = os.path.join(DOWNLOADS_PATH,
                                 '{}.zip'.format(state))

    with open(zip_file_path, 'wb') as zip_file:
        ftp = ftplib.FTP('geoftp.ibge.gov.br')
        ftp.login('anonymous', 'anonymous')
        ftp.cwd(
            'organizacao_do_territorio/malhas_territoriais/'
            'malhas_municipais/municipio_2015/UFs/{}'.format(state)
        )
        ftp.retrbinary(
            'RETR {}_municipios.zip'.format(state.lower()),
            zip_file.write
        )
        ftp.quit()

    return zip_file_path


def unzip_file(zip_file_path, state, print_out):
    print_out('Extracting contents from {} zip file.'.format(state))
    extracted_contents_path = os.path.join(os.path.dirname(zip_file_path),
                                           state)
    if not os.path.isdir(extracted_contents_path):
        os.mkdir(extracted_contents_path)

    zip_file = zipfile.ZipFile(zip_file_path)
    zip_file.extractall(extracted_contents_path)

    shp_file_name = [
        name for name in zip_file.namelist()
        if name.endswith('.shp')
    ][0]
    shp_file_path = os.path.join(extracted_contents_path, shp_file_name)
    return shp_file_path


def import_data(shp_file_path, state, print_out):
    print_out('Importing data for {}.'.format(state))

    # Save Municipios
    model_shp_mapping = {
        'name': 'NM_MUNICIP',
        'geocode': 'CD_GEOCMU',
        'geometry': 'MULTIPOLYGON',
    }
    LayerMapping(Municipio,
                 shp_file_path,
                 model_shp_mapping,
                 transform=False,
                 unique='geocode',
                 encoding='utf-8').save(strict=True)

    # Update Municipios' `state` field
    count = Municipio.objects.filter(state__isnull=True).update(state=state)
    print_out('{} Municipios were created for {}.'.format(count, state))


def fetch_data_and_create_municipios(states, print_out):
    # Create downloads directory
    if not os.path.isdir(DOWNLOADS_PATH):
        os.mkdir(DOWNLOADS_PATH)

    try:
        # For each state: fetch, parse and save Municipios data
        for state in states:
            print_out('-' * 60)
            zip_file_path = download_from_ibge(state, print_out)
            shp_file_path = unzip_file(zip_file_path, state, print_out)
            import_data(shp_file_path, state, print_out)
    finally:
        # Remove downloads directory
        shutil.rmtree(DOWNLOADS_PATH)


class Command(BaseCommand):
    help = 'Loads brazilian municipalities from IBGE'

    def add_arguments(self, parser):
        parser.add_argument(
            '--state',
            action='append',
            choices=ALL_STATES,
            help='Specify which state(s) will have its (their) municipalities'
                 ' loaded. This argument can be specified multiple times.'
        )

    def handle(self, *args, **options):
        def print_out(msg):
            self.stdout.write(self.style.SUCCESS(msg))

        states = options['state']
        if not states:
            states = ALL_STATES

        fetch_data_and_create_municipios(states, print_out)
