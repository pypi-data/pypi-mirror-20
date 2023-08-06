# python-confdir
Loads configuration from directory structure

The aim is to make configuration easily inheritable in docker images.

## usage

For example you may create base image with Django application having following code in `settings.py`:

```python
from confdir import load_conf

globals().update(load_conf('conf_dir'))
```
and directory `conf_dir` containing all the default settings values.

Then if you create another image from the base one, you may just easily add or remove files under the `conf_dir` without need to use weird `sed` commands or even replacing the whole `settings.py`.

See [test_confdir/](test_confdir) and [test_confdir.py](test_confdir.py) for more information.
