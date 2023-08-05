GenIce
======

Generate proton-disordered ice structures for GROMACS.

Requirements
------------

-  Python 3
-  NetworkX
-  numpy

Note: WinPython includes all of these requirements. ##Installation
GenIce is registered to PyPI (Python Package Index). Install with pip3.

::

    pip3 install genice

Uninstallation
--------------

::

    pip3 uninstall genice

Usage
-----

::

    usage: genice [-h] [--rep REP REP REP] [--dens DENS] [--seed SEED]
                  [--format gmeqdXoc] [--water model] [--guest D=empty] [--debug]
                  [--quiet]
                  Type

    positional arguments:
      Type                  Crystal type (1c,1h,etc.)

    optional arguments:
      -h, --help            show this help message and exit
      --rep REP REP REP, -r REP REP REP
                            Repeat the unit cell in x,y, and z directions. [2,2,2]
      --dens DENS, -d DENS  Specify the ice density in g/cm3
      --seed SEED, -s SEED  Random seed [1000]
      --format gmeqdXoc, -f gmeqdXoc
                            Specify file format [g(romacs)|m(dview)|e(uler)|q(uate
                            rnion)|d(igraph)|o(penScad)|c(entersofmass)]
      --water model, -w model
                            Specify water model. (tip3p, tip4p, etc.)
      --guest D=empty, -g D=empty
                            Specify guest in the cage. (D=empty, T=co2, etc.)
      --debug, -D           Output debugging info.
      --quiet, -q           Do not output progress messages.

Example
-------

-  To make a 3x3x3 units of a hydrogen-disordered ice IV (4) of TIP4P
   water in GROMACS .gro format:

   ::

       genice --water tip4p --rep 3 3 3  4 > ice4.gro

-  To make a CS1 clathrate hydrate structure of TIP4P water containing
   CO2 in GROMACS .gro format:

   ::

       genice -g 12=co2 -g 14=co2 --water tip4p CS1 > cs1.gro

-  To make a 2x2x4 units of CS2 clathrate hydrate structure of TIP4P
   water containing THF (united atom with a dummy site) in the large
   cage in GROMACS .gro format:

   ::

       genice -g 16=uathf6 --water tip4p --rep 2 2 4  CS2 > cs2-224.gro

Structure generation
--------------------

The program generates various ice lattice with proton disorder and
without defect. Total dipole moment is always set to zero. The minimal
structure (with --rep 1 1 1 option) is not always the unit cell of the
lattice because it is difficult to deal with the hydrogen bond network
topology of tiny lattice under periodic boundary condition. Note that
the generated structure is not optimal according to the potential
energy.

Ice structures
--------------

+----------+---------------+-------------+
| Symbol   | Description   | Remarks and |
|          |               | data        |
|          |               | sources     |
+==========+===============+=============+
| 1h, 1c   | Most popular  |             |
|          | Ice I         |             |
|          | (hexagonal or |             |
|          | cubic)        |             |
+----------+---------------+-------------+
| 2d       | Hypothetical  | Nakamura,   |
|          | Proton-disord | Tatsuya et  |
|          | ered          | al.         |
|          | Ice II.       | “Thermodyna |
|          |               | mic         |
|          |               | Stability   |
|          |               | of Ice II   |
|          |               | and Its     |
|          |               | Hydrogen-Di |
|          |               | sordered    |
|          |               | Counterpart |
|          |               | :           |
|          |               | Role of     |
|          |               | Zero-Point  |
|          |               | Energy.”    |
|          |               | The Journal |
|          |               | of Physical |
|          |               | Chemistry B |
|          |               | 120.8       |
|          |               | (2015):     |
|          |               | 1843–1848.  |
|          |               | Web.        |
+----------+---------------+-------------+
| 3, 4, 6, | Conventional  |             |
| 7, 12    | high-pressure |             |
|          | ices III, IV, |             |
|          | VI, VII, and  |             |
|          | XII.          |             |
+----------+---------------+-------------+
| 5        | Monoclinic    |             |
|          | ice V         |             |
|          | (testing).    |             |
+----------+---------------+-------------+
| 16       | Negative-pres | Falenty,    |
|          | sure          | A., Hansen, |
|          | ice XVI(16).  | T. C. &     |
|          |               | Kuhs, W. F. |
|          |               | Formation   |
|          |               | and         |
|          |               | properties  |
|          |               | of ice XVI  |
|          |               | obtained by |
|          |               | emptying a  |
|          |               | type sII    |
|          |               | clathrate   |
|          |               | hydrate.    |
|          |               | Nature 516, |
|          |               | 231-233     |
|          |               | (2014).     |
+----------+---------------+-------------+
| 17       | Negative-pres | del Rosso,  |
|          | sure          | Leonardo,   |
|          | ice XVII(17). | Milva       |
|          |               | Celli, and  |
|          |               | Lorenzo     |
|          |               | Ulivi. “Ice |
|          |               | XVII as a   |
|          |               | Novel       |
|          |               | Material    |
|          |               | for         |
|          |               | Hydrogen    |
|          |               | Storage.”   |
|          |               | Challenges  |
|          |               | 8.1 (2017): |
|          |               | 3.          |
+----------+---------------+-------------+
| 0        | Hypothetical  | Russo, J.,  |
|          | ice "0".      | Romano, F.  |
|          |               | & Tanaka,   |
|          |               | H. New      |
|          |               | metastable  |
|          |               | form of ice |
|          |               | and its     |
|          |               | role in the |
|          |               | homogeneous |
|          |               | crystalliza |
|          |               | tion        |
|          |               | of water.   |
|          |               | Nat Mater   |
|          |               | 13, 733-739 |
|          |               | (2014).     |
+----------+---------------+-------------+
| i        | Hypothetical  | Fennell, C. |
|          | ice "i".      | J. &        |
|          |               | Gezelter,   |
|          |               | J. D.       |
|          |               | Computation |
|          |               | al          |
|          |               | Free Energy |
|          |               | Studies of  |
|          |               | a New Ice   |
|          |               | Polymorph   |
|          |               | Which       |
|          |               | Exhibits    |
|          |               | Greater     |
|          |               | Stability   |
|          |               | than Ice I  |
|          |               | h. J. Chem. |
|          |               | Theory      |
|          |               | Comput. 1,  |
|          |               | 662-667     |
|          |               | (2005).     |
+----------+---------------+-------------+
| C0-II    | Filled ice C0 | Smirnov, G. |
|          | (Alias of     | S. &        |
|          | 17).          | Stegailov,  |
|          |               | V. V.       |
|          |               | Toward      |
|          |               | Determinati |
|          |               | on          |
|          |               | of the New  |
|          |               | Hydrogen    |
|          |               | Hydrate     |
|          |               | Clathrate   |
|          |               | Structures. |
|          |               | J Phys Chem |
|          |               | Lett 4,     |
|          |               | 3560-3564   |
|          |               | (2013).     |
+----------+---------------+-------------+
| C1       | Filled ice C1 |
|          | (Alias of     |
|          | 2d).          |
+----------+---------------+-------------+
| C2       | Filled ice C2 |
|          | (Alias of     |
|          | 1c).          |
+----------+---------------+-------------+
| sTprime  | Filled ice    | Smirnov, G. |
|          | sT'           | S. &        |
|          |               | Stegailov,  |
|          |               | V. V.       |
|          |               | Toward      |
|          |               | Determinati |
|          |               | on          |
|          |               | of the New  |
|          |               | Hydrogen    |
|          |               | Hydrate     |
|          |               | Clathrate   |
|          |               | Structures. |
|          |               | J Phys Chem |
|          |               | Lett 4,     |
|          |               | 3560-3564   |
|          |               | (2013).     |
+----------+---------------+-------------+
| CS1,     | Clathrate     | Matsumoto,  |
| CS2,     | hydrates CS1  | M. &        |
| TS1, HS1 | (sI), CS2     | Tanaka, H.  |
|          | (sII), TS1    | On the      |
|          | (sIII), and   | structure   |
|          | HS1 (sIV).    | selectivity |
|          |               | of          |
|          |               | clathrate   |
|          |               | hydrates.   |
|          |               | J. Phys.    |
|          |               | Chem. B     |
|          |               | 115,        |
|          |               | 8257-8265   |
|          |               | (2011).     |
+----------+---------------+-------------+
| RHO      | Hypothetical  | Huang, Y et |
|          | ice at        | al. “A New  |
|          | negative      | Phase       |
|          | pressure ice  | Diagram of  |
|          | 'sIII'.       | Water Under |
|          |               | Negative    |
|          |               | Pressure:   |
|          |               | the Rise of |
|          |               | the         |
|          |               | Lowest-Dens |
|          |               | ity         |
|          |               | Clathrate   |
|          |               | S-III.”     |
|          |               | Science     |
|          |               | Advances    |
|          |               | 2.2 (2016): |
|          |               | e1501010–e1 |
|          |               | 501010.     |
+----------+---------------+-------------+
| FAU      | Hypothetical  | “Prediction |
|          | ice at        | of a New    |
|          | negative      | Ice         |
|          | pressure ice  | Clathrate   |
|          | 'sIV'.        | with Record |
|          |               | Low         |
|          |               | Density: a  |
|          |               | Potential   |
|          |               | Candidate   |
|          |               | as Ice XIX  |
|          |               | in          |
|          |               | Guest-Free  |
|          |               | Form.”      |
|          |               | “Prediction |
|          |               | of a New    |
|          |               | Ice         |
|          |               | Clathrate   |
|          |               | with Record |
|          |               | Low         |
|          |               | Density: a  |
|          |               | Potential   |
|          |               | Candidate   |
|          |               | as Ice XIX  |
|          |               | in          |
|          |               | Guest-Free  |
|          |               | Form.”      |
|          |               | sciencedire |
|          |               | ct.com.     |
|          |               | N.p., n.d.  |
|          |               | Web. 21     |
|          |               | Feb. 2017.  |
+----------+---------------+-------------+
| CRN1,CRN | 4-coordinated | Mousseau,   |
| 2,       | continuous    | N, and G T  |
| CRN3     | random        | Barkema.    |
|          | network, a    | “Fast       |
|          | model for low | Bond-Transp |
|          | density       | osition     |
|          | amorphous     | Algorithms  |
|          | ice.          | for         |
|          |               | Generating  |
|          |               | Covalent    |
|          |               | Amorphous   |
|          |               | Structures. |
|          |               | ”           |
|          |               | Current     |
|          |               | Opinion in  |
|          |               | Solid State |
|          |               | and         |
|          |               | Materials … |
|          |               | 5.6 (2001): |
|          |               | 497–502.    |
|          |               | Web.        |
+----------+---------------+-------------+
| Struct01 | Space         | Frank-Kaspe |
| ..       | Fullerenes    | r           |
| Struct84 |               | type        |
|          |               | clathrate   |
|          |               | structures. |
|          |               | Dutour      |
|          |               | Sikirić,    |
|          |               | Mathieu,    |
|          |               | Olaf        |
|          |               | Delgado-Fri |
|          |               | edrichs,    |
|          |               | and Michel  |
|          |               | Deza.       |
|          |               | “Space      |
|          |               | Fullerenes: |
|          |               | a Computer  |
|          |               | Search for  |
|          |               | New         |
|          |               | Frank-Kaspe |
|          |               | r           |
|          |               | Structures” |
|          |               | Acta        |
|          |               | Crystallogr |
|          |               | aphica      |
|          |               | Section A   |
|          |               | Foundations |
|          |               | of          |
|          |               | Crystallogr |
|          |               | aphy        |
|          |               | 66.Pt 5     |
|          |               | (2010):     |
|          |               | 602–615.    |
+----------+---------------+-------------+
| A15,     | Space         | Aliases of  |
| sigma,   | Fullerenes    | the         |
| Hcomp,   |               | Struct??    |
| Z, mu,   |               | series. See |
| zra-d,   |               | the data    |
| 9layers, |               | source for  |
| 6layers, |               | their       |
| C36,     |               | names.      |
| C15,     |               | Dutour      |
| C14,     |               | Sikirić,    |
| delta,   |               | Mathieu,    |
| psigma   |               | Olaf        |
|          |               | Delgado-Fri |
|          |               | edrichs,    |
|          |               | and Michel  |
|          |               | Deza.       |
|          |               | “Space      |
|          |               | Fullerenes: |
|          |               | a Computer  |
|          |               | Search for  |
|          |               | New         |
|          |               | Frank-Kaspe |
|          |               | r           |
|          |               | Structures” |
|          |               | Acta        |
|          |               | Crystallogr |
|          |               | aphica      |
|          |               | Section A   |
|          |               | Foundations |
|          |               | of          |
|          |               | Crystallogr |
|          |               | aphy        |
|          |               | 66.Pt 5     |
|          |               | (2010):     |
|          |               | 602–615.    |
+----------+---------------+-------------+

Note: Some structures are identical; A15=CS1=MTN, Z=HS1, sigma=TS1,
CS2=16=C15.

Please ask vitroid@gmail.com to add new ice structures. ##Water models

+-------------+-------------------+
| symbol      | type              |
+=============+===================+
| ``tip3p``   | TIP3P (default)   |
+-------------+-------------------+
| ``tip4p``   | TIP4P             |
+-------------+-------------------+
| ``tip5p``   | TIP5P             |
+-------------+-------------------+

Guest molecules
---------------

+-----------------------------------------+--------------------------+
| symbol                                  | type                     |
+=========================================+==========================+
| ``co2``                                 | CO2                      |
+-----------------------------------------+--------------------------+
| ``uathf``                               | United atom 5-site THF   |
+-----------------------------------------+--------------------------+
| ``g12``,\ ``g14``,\ ``g15``,\ ``g16``   | A monatomic dummy site   |
+-----------------------------------------+--------------------------+
