## Changelog

### 2.0.1 - 2017-02-15

*   [resultsdb_conventions-2.0.1.tar.xz](https://releases.pagure.org/fedora-qa/resultsdb_conventions/resultsdb_conventions-2.0.1.tar.xz)

1.  Update README and release script
2.  Require `productmd` in `setup.py`
3.  Add copy of license

### 2.0.0 - 2017-02-07

*   [resultsdb_conventions-2.0.0.tar.xz](https://releases.pagure.org/fedora-qa/resultsdb_conventions/resultsdb_conventions-2.0.0.tar.xz)

1.  **API**: Don't unnecessarily explicitly take parent class args in child classes
2.  **API**: Introduce generic productmd image class, make compose class a productmd class
3.  **API**: Split into a multiple module library for independence and scalability
4.  **API**: Require metadata instead of using fragile compose ID parsing in productmd classes
5.  **NEW**: Add `meta.conventions` extradata item indicating conventions result complies with
6.  Require setuptools_git in the setup script and use sdist again
7.  Make fedfind dependency optional

### 1.0.1 - 2017-02-02

*   [resultsdb_conventions-1.0.1.tar.xz](https://releases.pagure.org/fedora-qa/resultsdb_conventions/resultsdb_conventions-1.0.1.tar.xz)

1.  Pass through what the API result submission function returns

### 1.0.0 - 2017-02-02

*   [resultsdb_conventions-1.0.0.tar.xz](https://releases.pagure.org/fedora-qa/resultsdb_conventions/resultsdb_conventions-1.0.0.tar.xz)

1.  Initial release of resultsdb_conventions
