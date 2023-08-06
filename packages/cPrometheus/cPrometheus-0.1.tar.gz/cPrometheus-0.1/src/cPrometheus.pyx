cdef extern from *:
    int __ATOMIC_RELAXED
    void __atomic_load(double *ptr, double* ret, int memorder)
    void __atomic_store(double *ptr, double* val, int memorder)
    bint __atomic_compare_exchange(double *ptr, double *expected, double *desired, bint weak, int success_memorder, int failure_memorder)

cdef class _AtomicValue(object):
    cdef double value
    def __cinit__(self, *args, **kwargs):
        self.value = 0.0

    cpdef void inc(self, double amount):
        cdef double preincremented
        cdef double incremented
        while True:
            __atomic_load(&self.value, &preincremented, __ATOMIC_RELAXED)
            incremented = preincremented + amount
            if __atomic_compare_exchange(
                &self.value,
                &preincremented,
                &incremented,
                False,
                __ATOMIC_RELAXED,
                __ATOMIC_RELAXED):
                    return

    cpdef void set(self, double amount):
        __atomic_store(&self.value, &amount, __ATOMIC_RELAXED)

    cpdef double get(self):
        cdef double result
        __atomic_load(&self.value, &result, __ATOMIC_RELAXED)
        return result

import prometheus_client.core
prometheus_client.core._ValueClass = _AtomicValue
