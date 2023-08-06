# -*- coding: utf-8 -*-
# :Project:   SoL
# :Created:   gio 23 ott 2008 11:16:12 CEST
# :Author:    Lele Gaifax <lele@metapensiero.it>
# :License:   GNU General Public License version 3 or later
# :Copyright: © 2008, 2009, 2010, 2013, 2014, 2016 Lele Gaifax
#

from . import AuthenticatedTestCase


class TestViews(AuthenticatedTestCase):
    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        first = s.query(Tourney) \
                .filter_by(description=TourneyData.first.description).one()
        self.idtourney = first.idtourney

    def test_competitors_metadata(self):
        response = self.app.get('/tourney/competitors?metadata=metadata&filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['metadata']['fields'][-1]['name'], "player1Country")

    def test_competitors(self):
        response = self.app.get('/tourney/competitors?filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 6)

    def test_players(self):
        response = self.app.get('/tourney/players')
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")

    def test_matches(self):
        response = self.app.get('/tourney/matches?filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 9)

    def test_ranking_metadata(self):
        response = self.app.get('/tourney/ranking?metadata=metadata&filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['metadata']['fields'][0]['name'], 'rank')

    def test_update_ranking(self):
        response = self.app.get('/tourney/updateRanking?idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], False)
        self.assertIn('not allowed', result['message'])

    def test_boards(self):
        response = self.app.get('/tourney/boards?filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 3)
        b = result['root'][0]
        self.assertEqual(b['competitor1Opponents'], [5, 4])
        self.assertEqual(b['competitor2Opponents'], [1, 3])
        b = result['root'][1]
        self.assertEqual(b['competitor1Opponents'], [2, 5])
        self.assertEqual(b['competitor2Opponents'], [4, 2])
        b = result['root'][2]
        self.assertEqual(b['competitor1Opponents'], [6, 1])
        self.assertEqual(b['competitor2Opponents'], [3, 6])

    def test_countdown(self):
        response = self.app.get('/tourney/countdown?idtourney=%d'
                                % self.idtourney)
        self.assertIn('Countdown', response.text)

    def test_start_countdown(self):
        response = self.app.post('/tourney/countdown?idtourney=%d&start=12121212'
                                 % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], False)
        self.assertIn('not owned by you', result['message'])

    def test_pre_countdown(self):
        response = self.app.get('/tourney/pre_countdown?idtourney=%d'
                                '&duration=2&prealarm=1' % self.idtourney)
        self.assertIn('Countdown', response.text)


class TestBoardsOnOddTourney(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        first = s.query(Tourney) \
                .filter_by(description=TourneyData.odd.description).one()
        self.idtourney = first.idtourney

    def test_boards(self):
        from metapensiero.sqlalchemy.proxy.json import py2json

        response = self.app.get('/tourney/newTurn?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")

        response = self.app.get('/tourney/boards?filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 9)
        opps = {}
        for b in result['root']:
            self.assertEqual(b['competitor1Opponents'], [])
            self.assertEqual(b['competitor2Opponents'], [])
            if b['idcompetitor2']:
                opps[b['idcompetitor1']] = [b['idcompetitor2']]
                opps[b['idcompetitor2']] = [b['idcompetitor1']]
            else:
                opps[b['idcompetitor1']] = opps[b['idcompetitor2']] = []

        results = [('idmatch', dict(idmatch=b['idmatch'], score1=25, score2=0))
                   for b in result['root']]
        response = self.app.post('/bio/saveChanges', dict(modified_records=py2json(results),
                                                          deleted_records=py2json([])))
        result = response.json
        self.assertTrue(result['success'])
        self.assertEqual(result['message'], "Ok")

        response = self.app.get('/tourney/updateRanking?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")

        response = self.app.get('/tourney/newTurn?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")

        response = self.app.get('/tourney/boards?filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 9)
        for b in result['root']:
            self.assertEqual(b['competitor1Opponents'], opps[b['idcompetitor1']])
            self.assertEqual(b['competitor2Opponents'], opps[b['idcompetitor2']])


class TestRanking(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        first = s.query(Tourney) \
                .filter_by(description=TourneyData.first.description).one()
        self.idtourney = first.idtourney

    def test_ranking(self):
        response = self.app.get('/tourney/updateRanking?idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['currentturn'], result['rankedturn'])
        self.assertEqual(result['prized'], False)

        response = self.app.get('/tourney/ranking?filter_idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 6)
        self.assertEqual([r['rank'] for r in result['root']],
                         list(range(1, 7)))
        astuples = [(r['prize'], r['points'], r['bucholz'],
                     r['netscore'], r['totscore'], r['rank'])
                    for r in result['root']]
        astuples.sort()
        self.assertEqual([r[5] for r in astuples], list(range(6, 0, -1)))

    def test_delete_turns(self):
        response = self.app.get('/tourney/deleteFromTurn?idtourney=%d&fromturn=2'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['currentturn'], result['rankedturn'])
        self.assertEqual(result['currentturn'], 1)
        self.assertFalse(result['finalturns'])
        self.assertFalse(result['prized'])

    def test_create_turn(self):
        response = self.app.get('/tourney/updateRanking?idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)

        response = self.app.get('/tourney/newTurn?idtourney=%d' % self.idtourney)

        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['currentturn'], 4)


class TestRankingAtTurn(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        first = s.query(Tourney) \
                .filter_by(description=TourneyData.first.description).one()
        self.idtourney = first.idtourney
        self.c3desc = first.competitors[2].description

    def test_ranking_at_turn(self):
        response = self.app.get('/tourney/ranking?filter_idtourney=%d&turn=1'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 6)
        self.assertEqual(result['root'][0]['description'], self.c3desc)
        self.assertEqual(result['root'][0]['points'], 2)

        response = self.app.get('/tourney/ranking?filter_idtourney=%d&turn=2'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 6)
        self.assertEqual(result['root'][0]['description'], self.c3desc)
        self.assertEqual(result['root'][0]['points'], 4)


class TestFinals(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()

        apr24 = s.query(Tourney).filter_by(description=TourneyData.apr24.description).one()
        self.idtourney = apr24.idtourney

    def test_finals(self):
        from metapensiero.sqlalchemy.proxy.json import py2json
        from ...models import DBSession, Tourney

        response = self.app.get('/tourney/updateRanking?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertTrue(result['success'])

        response = self.app.get('/tourney/finalTurn?idtourney=%d' % self.idtourney)

        result = response.json
        self.assertTrue(result['success'])
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['rankedturn'], result['currentturn']-1)
        self.assertTrue(result['finalturns'])

        self.app.get('/pdf/scorecards/%d' % self.idtourney)

        s = DBSession()

        apr24 = s.query(Tourney).get(self.idtourney)
        results = [('idmatch', dict(idmatch=m.idmatch, score1=10, score2=20))
                   for m in apr24.matches if m.final]
        self.assertEqual(len(results), 2)
        response = self.app.post('/bio/saveChanges', dict(modified_records=py2json(results),
                                                          deleted_records=py2json([])))
        self.assertTrue(response.json['success'])
        self.assertEqual(response.json['message'], "Ok")

        response = self.app.get('/tourney/updateRanking?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertTrue(result['success'])
        self.assertEqual(result['rankedturn'], result['currentturn'])
        self.assertFalse(result['prized'])


class TestFinalsSwap(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def setUp(self):
        import transaction
        from os.path import dirname, join
        from ...models import DBSession, Tourney
        from ...models.bio import load_sol

        s = DBSession()

        fullname = join(dirname(dirname(__file__)), 'scr',
                        'Campionato_CCM_2014_2015-2014-12-14+7.sol')
        with transaction.manager:
            tourneys, skipped = load_sol(s, fullname)
            guid = tourneys[0].guid

        s = DBSession()

        tourney = s.query(Tourney).filter_by(guid=guid).one()
        self.idtourney = tourney.idtourney

    def test_final(self):
        from metapensiero.sqlalchemy.proxy.json import py2json
        from ...models import DBSession, Tourney

        s = DBSession()

        tourney = s.query(Tourney).get(self.idtourney)

        self.assertFalse(tourney.prized)
        self.assertFalse(tourney.finalturns)
        self.assertEqual(tourney.currentturn, 7)
        self.assertEqual(tourney.rankedturn, tourney.currentturn)

        response = self.app.get('/tourney/finalTurn?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertTrue(result['success'])
        self.assertFalse(result['prized'])
        self.assertEqual(result['currentturn'], 8)
        self.assertTrue(result['finalturns'])

        s = DBSession()

        tourney = s.query(Tourney).get(self.idtourney)
        finalmatches = [m for m in tourney.matches if m.final]
        self.assertEqual(len(finalmatches), 1)

        final = finalmatches[0]
        self.assertEqual(final.competitor1.player1.firstname, 'Ayesh Nilan')
        self.assertEqual(final.competitor2.player1.firstname, 'Suresh')

        results = [('idmatch', dict(idmatch=final.idmatch, score1=4, score2=23))]
        response = self.app.post('/bio/saveChanges', dict(modified_records=py2json(results),
                                                          deleted_records=py2json([])))
        self.assertTrue(response.json['success'])
        self.assertEqual(response.json['message'], "Ok")

        response = self.app.get('/tourney/updateRanking?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertTrue(result['success'])
        self.assertEqual(result['rankedturn'], result['currentturn'])
        self.assertTrue(result['prized'])
        currentturn = result['currentturn']

        response = self.app.get('/tourney/ranking?filter_idtourney=%d' % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['count'], 17)
        ranking = result['root']
        first = ranking[0]
        second = ranking[1]
        self.assertEqual(first['prize'], 1000)
        self.assertIn('Suresh', first['description'])
        self.assertEqual(second['prize'], 900)
        self.assertIn('Ayesh Nilan', second['description'])

        response = self.app.get('/tourney/deleteFromTurn?idtourney=%d&fromturn=%d'
                                % (self.idtourney, currentturn-1))
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")
        self.assertEqual(result['currentturn'], result['rankedturn'])
        self.assertFalse(result['finalturns'])
        self.assertFalse(result['prized'])


class TestPrizing(AuthenticatedTestCase):
    USERNAME = 'admin'
    PASSWORD = 'admin'

    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        t = s.query(Tourney) \
             .filter_by(description=TourneyData.second.description).one()
        self.idtourney = t.idtourney

    def test_assign_prizes(self):
        from ...models import DBSession, Tourney

        response = self.app.get('/tourney/updateRanking?idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)

        response = self.app.get('/tourney/assignPrizes?idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")

        s = DBSession()
        t = s.query(Tourney).get(self.idtourney)
        self.assertEqual(t.prized, True)
        self.assertEqual(t.ranking[0].prize, 18)

        return t


class TestResetPrizing(TestPrizing):
    def test_assign_prizes(self):
        super().test_assign_prizes()

        response = self.app.get('/tourney/resetPrizes?idtourney=%d'
                                % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertEqual(result['message'], "Ok")


class TestRatedPrizing(TestPrizing):
    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        first = s.query(Tourney) \
                .filter_by(description=TourneyData.rated.description).one()
        self.idtourney = first.idtourney

    def test_assign_prizes(self):
        t = super().test_assign_prizes()
        self.assertEqual(t.rating.rates[-1].date, t.date)


class TestTourneyReplay(AuthenticatedTestCase):
    USERNAME = 'Lele'
    PASSWORD = 'lele'

    def setUp(self):
        from ...models import DBSession, Tourney
        from ..data import TourneyData

        s = DBSession()
        t = s.query(Tourney) \
             .filter_by(description=TourneyData.apr24.description).one()
        self.idtourney = t.idtourney
        self.idchampionship = t.idchampionship

    def test_replay_gets_right_owner(self):
        from datetime import date
        from ...models import DBSession, Tourney
        from ..data import PlayerData

        response = self.app.get('/tourney/replayToday?idtourney=%d' % self.idtourney)
        result = response.json
        self.assertEqual(result['success'], True)

        today = date.today()
        s = DBSession()
        n = s.query(Tourney) \
            .filter_by(idchampionship=self.idchampionship, date=today).one()
        self.assertEqual(n.owner.firstname, PlayerData.lele.firstname)

        idtourney = n.idtourney
        response = self.app.post('/tourney/countdown?idtourney=%d&start=12121212'
                                 % idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertIn('started', result['message'])

        response = self.app.post('/tourney/countdown?idtourney=%d'
                                 % idtourney)
        result = response.json
        self.assertEqual(result['success'], True)
        self.assertIn('terminated', result['message'])
