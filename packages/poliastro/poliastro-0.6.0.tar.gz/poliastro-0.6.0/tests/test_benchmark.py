import pytest

import astropy.units as u

from poliastro.bodies import Earth
from poliastro.iod import vallado, izzo


def lambert_solution(lambert, *args, **kwargs):
    return next(lambert(*args, **kwargs))


@pytest.mark.parametrize("lambert", [vallado.lambert, izzo.lambert])
def test_lambert_single_rev(benchmark, lambert):
    k = Earth.k
    r0 = [15945.34, 0.0, 0.0] * u.km
    r = [12214.83399, 10249.46731, 0.0] * u.km
    tof = 76.0 * u.min

    benchmark(lambert_solution, lambert, k, r0, r, tof)


@pytest.mark.parametrize("lambert", [izzo.lambert])
def test_lambert_multi_rev(benchmark, lambert):
    k = Earth.k
    r0 = [22592.145603, -1599.915239, -19783.950506] * u.km
    r = [1922.067697, 4054.157051, -8925.727465] * u.km
    tof = 10 * u.h

    benchmark(lambert_solution, lambert, k, r0, r, tof, M=1)
