Colour - TODO
=============

TODO
----

- colour (20 items in 13 files)

    - appearance (8 items in 5 files)

        - ciecam02.py

            - (260, 7) # TODO: Compute hue composition.
            - (702, 7) # TODO: Check for negative values and their handling.

        - hunt.py

            - (418, 7) # TODO: Implement hue quadrature & composition computation.
            - (449, 7) # TODO: Implement whiteness-blackness :math:`Q_{wb}` computation.

        - llab.py

            - (309, 7) # TODO: Implement hue composition computation.

        - nayatani95.py

            - (271, 7) # TODO: Implement hue quadrature & composition computation.
            - (289, 7) # TODO: Investigate components usage.

        - rlab.py

            - (246, 7) # TODO: Implement hue composition computation.

    - colorimetry (2 item in 2 files)

        - spectrum.py

            - (1943, 11) # TODO: Provide support for fractional interval like 0.1, etc...

        - tristimulus.py

            - (686, 11) # TODO: Investigate code vectorisation.

    - models (4 item in 3 file)

        - rgb

            - tests (1 item in 1 file)

                - tests_derivation.py

                    - (302, 15) # TODO: Simplify that monster.

            - derivation.py

                - (220, 7) # TODO: Investigate if we return an ndarray here with primaries and whitepoint stacked together.

            - rgb_colourspace.py

                - (518, 11) # TODO: Revisit for potential behaviour / type checking.
                - (545, 11) # TODO: Revisit for potential behaviour / type checking.

    - notation (5 items in 2 files)

        - tests (3 items in 1 file)

            - tests_munsell.py

                - (94, 3) # TODO: Investigate if tests can be simplified by using a common valid set of specifications.
                - (4528, 11) # TODO: This test is covered by the previous class, do we need a dedicated one?
                - (4574, 11) # TODO: This test is covered by the previous class, do we need a dedicated one?

        - munsell.py

            - (837, 11) # TODO: Consider refactoring implementation.
            - (1176, 11) # TODO: Should raise KeyError, need to check the tests.

    - volume (1 item in 1 file)
        
        -  rgb.py
            
            - (319, 7) # TODO: Investigate for generator yielding directly a ndarray.

About
-----

| **Colour** by Colour Developers - 2013-2017
| Copyright © 2013-2017 – Colour Developers – `colour-science@googlegroups.com <colour-science@googlegroups.com>`_
| This software is released under terms of New BSD License: http://opensource.org/licenses/BSD-3-Clause
| `http://github.com/colour-science/colour <http://github.com/colour-science/colour>`_
