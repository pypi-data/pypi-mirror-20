cPrometheus
===========

Make `prometheus_client` go faster, with zero effort.

```
import cPrometheus  # MOAR speed

# Now do stuff with prometheus_client, but faster
import prometheus_client
# ...
```

Note: This is not compatible with multiprocess mode. If you are using
multiprocess mode, this package is not for you.

How It Works
------------

Internally, `prometheus_client` stores values in a class called `_MutexValue`.
As the name suggests, this class is protected by a mutex, and can become a
bottleneck when placed in tight inner loops.

This package monkey patches `prometheus_client` to use its own class,
`_AtomicValue`,  which internally uses gcc's `__atomic` operations.

Yes, I know `stdatomic` is more portable, but I've got a requirement to
support gcc 4.8.

Further Work
------------

- Be more portable
- Consider stealing Java 8 `DoubleAdder`'s design, if even more speed is
  needed.
- Can multiprocess be done?
