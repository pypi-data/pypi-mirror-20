cimport numpy as np
cimport cpy_haar_random
import numpy as np
from libc.math cimport M_PI
from libc.stdlib cimport rand, RAND_MAX

cdef long double r():
    cdef long double res;
    res = <long double>rand()/<long double>RAND_MAX;
    return res

def cpyget_su2():
    cdef long double phi = asinl(sqrtl(r()))
    cdef long double chi = r() * 2. * M_PI
    cdef long double psi = r() * 2 * M_PI
    return np.matrix([[np.exp(1j*psi)*cosl(phi), np.exp(1j*chi)*sinl(phi)],
                      [-1.*np.exp(-1j*chi)*sinl(phi), np.exp(-1j*psi)*cosl(phi)]],
                    dtype=np.complex_)
