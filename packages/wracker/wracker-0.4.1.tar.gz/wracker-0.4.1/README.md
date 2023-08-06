# Wracker

(PRE-ALPHA DO NOT USE) A Python clone of bundler.  The wheel racker!

## Commands

* `wracker install` installs packages from a `requirements.in` file (in your CWD
  or parent directories) and writes the specific versions to `requirements.txt`

* `wracker exec` sets `$PYTHONPATH` to use only the packages in your
  requirements.txt, nothing more.  It also modifies `$PATH` to point to a
  'clean' virtualenv, which wracker manages for you.  These virtualenvs do not
  have `pip` installed so hopefully they never become polluted (although there
  are no hard locks in place or anything like that).

  It also adds entrypoints to your `$PATH`, so `wracker exec pep8` will use a
  frozen pep8 if available.

## Todo

(Presented in no particular order.)

* [ ] Support installation with Python 3

* [ ] VCS URLs

* [ ] `-r` includes

* [ ] Verification that all versions are compatible (similar to pip-tools)

* [ ] Tests
