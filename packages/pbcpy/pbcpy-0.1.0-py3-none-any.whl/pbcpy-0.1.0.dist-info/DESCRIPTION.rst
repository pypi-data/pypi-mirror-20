pbcpy is a Python3 package providing some useful tools when dealing with
molecules and materials under periodic boundary conditions (PBC).
Foundation of the package are the Cell and Coord classes, which define a unit cell under PBC, and a cartesian/crystal coordinate respectively.
pbcpy also provides tools to deal with quantities represented on an equally spaced grids, through the Grid and Plot classes. Operations such as interpolations or taking arbitrary 1D/2D/3D cuts are made very easy.
In addition, pbcpy exposes a fully periodic N-rank array, the pbcarray, which is derived from the numpy.ndarray.
Finally, pbcpy provides IO support to some common file formats:
  The Quantum Espresso .pp format (read only)
  The XCrySDen .xsf format (write only) 

