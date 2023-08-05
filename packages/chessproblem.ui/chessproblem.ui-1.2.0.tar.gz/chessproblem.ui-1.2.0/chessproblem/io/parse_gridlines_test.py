# Copyright 2012 Stefan Hoening
# 
# This file is part of the "Chess-Problem-Editor" software.
# 
# Chess-Problem-Editor is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# Chess-Problem-Editor is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
# 
# Diese Datei ist Teil der Software "Chess-Problem-Editor".
# 
# Chess-Problem-Editor ist Freie Software: Sie koennen es unter den Bedingungen
# der GNU General Public License, wie von der Free Software Foundation,
# Version 3 der Lizenz oder (nach Ihrer Option) jeder spaeteren
# veroeffentlichten Version, weiterverbreiten und/oder modifizieren.
# 
# Chess-Problem-Editor wird in der Hoffnung, dass es nuetzlich sein wird, aber
# OHNE JEDE GEWAEHRLEISTUNG, bereitgestellt; sogar ohne die implizite
# Gewaehrleistung der MARKTFAEHIGKEIT oder EIGNUNG FUER EINEN BESTIMMTEN ZWECK.
# Siehe die GNU General Public License fuer weitere Details.
# 
# Sie sollten eine Kopie der GNU General Public License zusammen mit diesem
# Programm erhalten haben. Wenn nicht, siehe <http://www.gnu.org/licenses/>.

import unittest

from chessproblem.io import parse_gridlines

class ParseGridLinesTest(unittest.TestCase):

    def testSimpleSingleGridLine(self):
        gridlines = parse_gridlines('v345')
        self.assertEqual(1, len(gridlines))
        g = gridlines[0]
        self.assertEqual('v', g.orientation)
        self.assertEqual(3, g.x)
        self.assertEqual(4, g.y)
        self.assertEqual(5, g.length)

    def testComplexSingeGridLine(self):
        gridlines = parse_gridlines('h{10}{11}{12}')
        self.assertEqual(1, len(gridlines))
        g = gridlines[0]
        self.assertEqual('h', g.orientation)
        self.assertEqual(10, g.x)
        self.assertEqual(11, g.y)
        self.assertEqual(12, g.length)

if __name__ == '__main__':
    unittest.main()

