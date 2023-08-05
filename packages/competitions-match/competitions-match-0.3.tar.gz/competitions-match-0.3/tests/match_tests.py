# -*- coding: utf-8  -*-
"""Tests for match class registration and use."""

# Copyright (C) 2015 Alexander Jones
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

from __future__ import unicode_literals

from . import TestCase

from competitions.match.default.SimpleMatch import SimpleMatch
from competitions.match.default.TestMatch import TestMatch


class TestSimpleMatch(TestCase):

    """Basic sanity checks for SimpleMatch."""

    def test_simulation(self):
        """Test SimpleMatch construction and simulation."""
        team1 = 'First'
        team2 = 'Second'
        for __ in range(1000):
            match = SimpleMatch(team1, team2)
            self.assertEqual(match.team1, team1)
            self.assertEqual(match.team2, team2)
            match.play()
            if match.score1 > match.score2:
                self.assertEqual(match.winner, team1)
            elif match.score2 > match.score1:
                self.assertEqual(match.winner, team2)
            else:
                self.assertIsNone(match.winner)
            shortstr = '{}-{}'.format(match.score1, match.score2)
            self.assertEqual(match.score_str(), shortstr)
            longstr = '{} {} - {} {}'.format(team1, match.score1, match.score2,
                                             team2)
            self.assertEqual(str(match), longstr)


class TestTestMatch(TestCase):

    """Basic sanity checks for TestMatch."""

    def test_simulation(self):
        """Test TestMatch construction and simulation."""
        team1 = 'First'
        team2 = 'Second'
        for __ in range(1000):
            match = TestMatch(team1, team2)
            self.assertEqual(match.team1, team1)
            self.assertEqual(match.team2, team2)
            match.play()
            self.assertEqual(match.score1, 5)
            self.assertEqual(match.score2, 0)
            self.assertEqual(match.winner, team1)
            shortstr = '5-0'
            self.assertEqual(match.score_str(), shortstr)
            longstr = 'First 5 - 0 Second'
            self.assertEqual(str(match), longstr)
