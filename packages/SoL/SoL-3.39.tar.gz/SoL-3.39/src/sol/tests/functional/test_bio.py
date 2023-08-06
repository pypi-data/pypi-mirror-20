# -*- coding: utf-8 -*-
# :Project:   SoL -- Test for the batched I/O
# :Created:   lun 09 feb 2009 10:45:08 CET
# :Author:    Lele Gaifax <lele@metapensiero.it>
# :License:   GNU General Public License version 3 or later
# :Copyright: © 2009, 2010, 2013, 2014, 2015, 2016 Lele Gaifax
#

from webtest.app import AppError

from metapensiero.sqlalchemy.proxy.json import py2json, json2py
from yaml import safe_load_all

from . import AuthenticatedTestCase, FunctionalTestCase


class TestBackup(FunctionalTestCase):
    def extract_everything_sol(self, archive):
        from io import BytesIO
        import zipfile

        zipf = zipfile.ZipFile(BytesIO(archive), 'r')
        return zipf.read('everything.sol')

    def extract_tourneys_yaml(self, archive):
        content = self.extract_everything_sol(archive)
        return list(safe_load_all(content))[1:]

    def extract_tourneys_json(self, archive):
        content = self.extract_everything_sol(archive)
        return list(json2py(content))[1:]

    def test_backup(self):
        from ..data import TourneyData

        response = self.app.get('/bio/backup')
        self.assertEqual(response.content_type, 'application/zip')
        tourneys = self.extract_tourneys_yaml(response.body)
        self.assertEqual(len(tourneys), len(TourneyData.rows))

    def test_backup_json(self):
        from ..data import TourneyData

        response = self.app.get('/bio/backup?serialization_format=json')
        self.assertEqual(response.content_type, 'application/zip')
        tourneys = self.extract_tourneys_json(response.body)
        self.assertEqual(len(tourneys), len(TourneyData.rows))

    def test_backup_played_tourneys(self):
        import transaction
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        response = self.app.get('/bio/backup?only_played_tourneys=1')
        self.assertEqual(response.content_type, 'application/zip')
        tourneys = self.extract_tourneys_yaml(response.body)
        self.assertEqual(len(tourneys), 0)

        s = DBSession()
        with transaction.manager:
            first = s.query(Tourney) \
                     .filter_by(description=TourneyData.first.description).one()
            first.updateRanking()

        response = self.app.get('/bio/backup?only_played_tourneys=1')
        self.assertEqual(response.content_type, 'application/zip')
        tourneys = self.extract_tourneys_yaml(response.body)
        self.assertEqual(len(tourneys), 1)


class TestDump(FunctionalTestCase):
    def test_dump_all(self):
        response = self.app.get('/bio/dump')
        self.assertIn('competitors:', response)
        self.assertEqual(response.content_type, 'text/x-yaml')

    def test_dump_tourney(self):
        response = self.app.get('/bio/dump?idtourney=1')
        self.assertIn('competitors:', response)
        self.assertEqual(response.content_type, 'text/x-yaml')

    def test_dump_club(self):
        response = self.app.get('/bio/dump?idclub=1')
        self.assertIn('competitors:', response)
        self.assertEqual(response.content_type, 'text/x-yaml')

    def test_dump_gzip(self):
        from gzip import decompress
        response = self.app.get('/bio/dump?idtourney=1&gzip=1')
        self.assertIn(b'competitors:', decompress(response.body))
        self.assertEqual(response.content_type, 'application/x-gzip')

    def test_dump_championship(self):
        response = self.app.get('/bio/dump?idchampionship=2')
        self.assertIn('competitors:', response)
        self.assertEqual(response.content_type, 'text/x-yaml')

    def test_anonymous_restore(self):
        self.assertRaises(AppError,
                          self.app.post,
                          '/bio/upload',
                          upload_files=[('archive', '/tmp/foo.zip', b"")])

    def test_anonymous_save(self):
        self.assertRaises(AppError,
                          self.app.post,
                          '/bio/saveChanges')


class TestGuestUploadViews(AuthenticatedTestCase):
    def test_upload_portrait(self):
        response = self.app.post(
            '/bio/upload',
            upload_files=[('portrait', 'foo.png', b"")])
        self.assertEqual(response.content_type, 'text/html')
        self.assertEqual(json2py(response.text)['success'], False)

    def test_upload_emblem(self):
        response = self.app.post(
            '/bio/upload',
            upload_files=[('emblem', 'foo.png', b"")])
        self.assertEqual(response.content_type, 'text/html')
        self.assertEqual(json2py(response.text)['success'], False)

    def test_upload_sol(self):
        from os.path import dirname, join

        dump = join(dirname(dirname(__file__)), "scr", "dump.sol.gz")
        response = self.app.post(
            '/bio/upload',
            upload_files=[('archive', dump)])
        self.assertEqual(response.content_type, 'text/html')
        self.assertEqual(json2py(response.text)['success'], False)


class TestAdminUploadViews(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def test_upload_portrait(self):
        response = self.app.post(
            '/bio/upload',
            upload_files=[('portrait', 'bar.png', b"")])
        self.assertEqual(response.content_type, 'text/html')
        # Dropped support in 3.0
        self.assertEqual(json2py(response.text)['success'], False)

    def test_upload_emblem(self):
        response = self.app.post(
            '/bio/upload',
            upload_files=[('emblem', 'bar.png', b"")])
        self.assertEqual(response.content_type, 'text/html')
        # Dropped support in 3.0
        self.assertEqual(json2py(response.text)['success'], False)

    def test_restore(self):
        from os.path import dirname, exists, join

        dump = join(dirname(dirname(__file__)), "scr", "backup.zip")
        response = self.app.post(
            '/bio/upload',
            upload_files=[('archive', dump)])
        self.assertEqual(response.content_type, 'text/html')
        self.assertEqual(json2py(response.text)['success'], True)
        settings = self.app.app.registry.settings
        edir = settings['sol.emblems_dir']
        pdir = settings['sol.portraits_dir']
        self.assertTrue(exists(join(edir, 'scr.png')))
        self.assertTrue(exists(join(pdir, 'lele.png')))


class TestAdminSaveChanges(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def test_save_empty(self):
        modified = []
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

    def test_save_ok(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()
        juri = s.query(Player) \
               .filter_by(firstname=PlayerData.juri.firstname).one()

        modified = [('idplayer', dict(idplayer=juri.idplayer,
                                      lastname='Golin',
                                      nickname='picol'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

        s = DBSession()
        juri = s.query(Player).get(juri.idplayer)
        self.assertEqual(juri.lastname, "Golin")
        self.assertEqual(juri.nickname, "picol")

    def test_save_emblem(self):
        from os.path import exists, join
        from ...models import DBSession, Club
        from ..data import ClubData

        s = DBSession()
        scr = s.query(Club) \
               .filter_by(description=ClubData.scr.description).one()

        img = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"
               "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO"
               "9TXL0Y4OHwAAAABJRU5ErkJggg==")

        modified = [('idclub', dict(idclub=scr.idclub,
                                    image=img,
                                    emblem='foo.png'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

        settings = self.app.app.registry.settings
        edir = settings['sol.emblems_dir']
        self.assertTrue(exists(join(edir, 'b60ab2708daec7685f3d412a5e05191a.png')))

        s = DBSession()
        scr = s.query(Club).get(scr.idclub)
        self.assertEqual(scr.emblem, "b60ab2708daec7685f3d412a5e05191a.png")

    def test_save_portrait(self):
        from os.path import exists, join
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()
        juri = s.query(Player) \
               .filter_by(firstname=PlayerData.juri.firstname).one()

        img = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA"
               "AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO"
               "9TXL0Y4OHwAAAABJRU5ErkJggg==")

        modified = [('idplayer', dict(idplayer=juri.idplayer,
                                      image=img,
                                      portrait='foo.png'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

        settings = self.app.app.registry.settings
        pdir = settings['sol.portraits_dir']
        self.assertTrue(exists(join(pdir, 'b60ab2708daec7685f3d412a5e05191a.png')))

        s = DBSession()
        juri = s.query(Player).get(juri.idplayer)
        self.assertEqual(juri.portrait, "b60ab2708daec7685f3d412a5e05191a.png")

    def test_save_cant_delete(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()
        juri = s.query(Player) \
               .filter_by(firstname=PlayerData.juri.firstname).one()

        modified = []
        deleted = [('idplayer', juri.idplayer)]
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertIn("Deletion not allowed:", response.json['message'])

    def test_insert_ok(self):
        from ...models import DBSession, Player

        modified = [('idplayer', dict(idplayer=0,
                                      lastname='Foo',
                                      firstname='bar',
                                      nickname='nick'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

        s = DBSession()
        foo = s.query(Player) \
               .filter_by(lastname='Foo').one()
        self.assertEqual(foo.firstname, "Bar")
        self.assertEqual(foo.nickname, "nick")

    def test_insert_missing_field(self):
        modified = [('idplayer', dict(idplayer=0,
                                      lastname='Foo'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertIn("are mandatory", response.json['message'])

        modified = [('idclub', dict(idclub=0,
                                    nationality='ITA'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertIn("is mandatory", response.json['message'])

    def test_save_double_record(self):
        from ...models import DBSession, Tourney
        from ..data import PlayerData, TourneyData

        modified = [('idplayer', dict(idplayer=0,
                                      lastname=PlayerData.lele.lastname,
                                      firstname=PlayerData.lele.firstname))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertIn("is already present", response.json['message'])

        modified = [('idplayer', dict(idplayer=0,
                                      lastname=PlayerData.lele.lastname,
                                      firstname=PlayerData.lele.firstname,
                                      nickname=PlayerData.lele.nickname))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertIn("specify a different nickname to disambiguate",
                      response.json['message'])

        s = DBSession()
        first = s.query(Tourney) \
               .filter_by(date=TourneyData.first.date,
                          description=TourneyData.first.description).one()

        modified = [('idtourney', dict(idtourney=0,
                                       idchampionship=first.idchampionship,
                                       date=first.date,
                                       description=first.description))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertIn("There cannot be two tourneys",
                      response.json['message'])


class TestResetNickName(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def test_reset_nickname(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()
        lele = s.query(Player) \
               .filter_by(firstname=PlayerData.lele.firstname).one()

        for value, expected in ((None, ''), ('  ', ''), (' lele ', 'lele')):
            modified = [('idplayer', dict(idplayer=lele.idplayer,
                                          nickname=value))]
            deleted = []
            response = self.app.post(
                '/bio/saveChanges',
                dict(modified_records=py2json(modified),
                     deleted_records=py2json(deleted)))
            self.assertEqual(response.json['success'], True)
            self.assertEqual(response.json['message'], "Ok")

            s = DBSession()
            lele = s.query(Player).get(lele.idplayer)
            self.assertEqual(lele.nickname, expected)


class TestProtectedSaveChanges(AuthenticatedTestCase):
    USERNAME = 'Lele'
    PASSWORD = 'lele'

    def test_save_ok(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()
        fata = s.query(Player) \
                .filter_by(firstname=PlayerData.fata.firstname).one()

        modified = [('idplayer', dict(idplayer=fata.idplayer,
                                      language='zz'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

    def test_save_ko(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()
        fata = s.query(Player) \
                .filter_by(firstname=PlayerData.fata.firstname).one()
        previous_language = fata.language
        juri = s.query(Player) \
               .filter_by(firstname=PlayerData.juri.firstname).one()

        modified = [('idplayer', dict(idplayer=fata.idplayer,
                                      language='zz')),
                    ('idplayer', dict(idplayer=juri.idplayer,
                                      language='zz'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], False)
        self.assertEqual(
            response.json['message'],
            "Non ti è permessa la modifica di record di cui non sei responsabile!")

        s = DBSession()
        fata = s.query(Player).filter_by(firstname=PlayerData.fata.firstname).one()
        self.assertEqual(fata.language, previous_language)

    def test_insert_delete_ok(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        modified = [('idplayer', dict(idplayer=0,
                                      lastname='Foo',
                                      firstname='bar',
                                      nickname='nick'))]
        deleted = []
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")

        s = DBSession()
        foo = s.query(Player).filter_by(lastname='Foo').one()
        lele = s.query(Player).filter_by(nickname=PlayerData.lele.nickname).one()
        self.assertEqual(foo.firstname, "Bar")
        self.assertEqual(foo.nickname, "nick")
        self.assertEqual(foo.idowner, lele.idplayer)

        modified = []
        deleted = [('idplayer', foo.idplayer)]
        response = self.app.post(
            '/bio/saveChanges',
            dict(modified_records=py2json(modified),
                 deleted_records=py2json(deleted)))
        self.assertEqual(response.json['success'], True)
        self.assertEqual(response.json['message'], "Ok")


class TestProtectedUploadViews(AuthenticatedTestCase):
    USERNAME = 'Lele'
    PASSWORD = 'lele'

    def test_upload_sol(self):
        from os.path import dirname, join
        from ...models import DBSession, Championship, Club, Player, Tourney
        from ..data import PlayerData

        dump = join(dirname(dirname(__file__)), "scr", "dump.sol.gz")
        response = self.app.post(
            '/bio/upload',
            upload_files=[('archive', dump)])
        self.assertEqual(response.content_type, 'text/html')
        self.assertEqual(json2py(response.text)['success'], True)

        s = DBSession()

        lele = s.query(Player).filter_by(nickname=PlayerData.lele.nickname).one()

        bice = s.query(Player).filter_by(lastname='Festi').one()
        self.assertEqual(bice.idowner, lele.idplayer)

        cship = s.query(Championship).filter_by(description="Fulldump Test 1").one()
        self.assertEqual(cship.idowner, lele.idplayer)

        tourney = s.query(Tourney).filter_by(description="5° TestTourney").one()
        self.assertEqual(tourney.idowner, lele.idplayer)

        club = s.query(Club).filter_by(description="Test Carrom Club").one()
        self.assertEqual(club.idowner, lele.idplayer)

    def test_upload_zip(self):
        response = self.app.post('/bio/upload',
                                 upload_files=[('archive', '/tmp/foo.zip', b"")])
        self.assertIn('"success":false', response.text)

    def test_upload_other(self):
        response = self.app.post('/bio/upload',
                                 upload_files=[('archive', '/tmp/foo.bar', b"")])
        self.assertIn('"success":false', response.text)


class TestRecomputeRatingView(AuthenticatedTestCase):
    USERNAME = 'Lele'
    PASSWORD = 'lele'

    def test_recompute_rating(self):
        from ...models import DBSession, Rating

        s = DBSession()

        rating = s.query(Rating).first()
        response = self.app.post('/bio/recomputeRating?idrating=%d' % rating.idrating)
        self.assertEqual(response.json['success'], True)


class TestMergePlayersView(AuthenticatedTestCase):
    USERNAME = 'Lele'
    PASSWORD = 'lele'

    def setUp(self):
        from ...models import DBSession, Player
        from ..data import PlayerData

        s = DBSession()

        self.juri = s.query(Player) \
                     .filter_by(firstname=PlayerData.juri.firstname).one()
        self.to_be_merged = s.query(Player) \
                             .filter_by(firstname=PlayerData.merge1.firstname).all()

    def test_merge(self):
        response = self.app.post('/bio/mergePlayers?tid=%d&sids=%s'
                                 % (self.juri.idplayer,
                                    '&sids='.join(str(p.idplayer)
                                                  for p in self.to_be_merged)))
        self.assertEqual(response.json['success'], True)

    def test_wrong_merge(self):
        response = self.app.post('/bio/mergePlayers?tid=%d&sids=%s'
                                 % (self.juri.idplayer, self.juri.idplayer))
        self.assertEqual(response.json['success'], False)


class TestAdminLogout(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def test_logout(self):
        from pathlib import Path

        for zip in Path('/tmp/sol_backups').glob('*.zip'):
            zip.unlink()
        response = self.app.get('/auth/logout')
        self.assertEqual(response.json['message'], 'Goodbye')
        self.assert_(list(Path('/tmp/sol_backups').glob('*.zip')))
