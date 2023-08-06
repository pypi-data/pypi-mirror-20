===================
**Field Zp** module
===================

Short description
-----------------

The module provides a realization of field **Zp** (from algebra) where **p** is prime

Module stuff:

1. Zp.Zp - field class
2. Zp.example - example function

Examples
--------

*>>>  from Zp import Zp*

*>>>  F = Zp(5)*

*>>>  F*

**Z/5**

*>>>  F(3)*

**3**

*>>>  F[2]*

**2**

*>>>  a, b = F(2), F(3)*

*>>>  a * b*

**1**

*>>>  a / b*

**4**

*>>>  list(F)*

**[0, 1, 2, 3, 4]**
