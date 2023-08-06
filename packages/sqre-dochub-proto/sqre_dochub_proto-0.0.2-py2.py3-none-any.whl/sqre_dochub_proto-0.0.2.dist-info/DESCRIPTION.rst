# dochub-prototype
DocHub prototype - www.lsst.io.generator

## Usage

```python
#/usr/bin/env python
from dochubproto import DocHubProto

p = DocHubProto()
idx = p.render_index()
```

## Environment

`DocHubProto` uses the following environment variables: `KEEPER_URL`,
`LOGLEVEL`, `TEMPLATE_DIR`, `UL_TEMPLATE_NAME`, `IDX_TEMPLATE_NAME`, and
`MAX_DOCUMENT_DATA_AGE`.  If those are not specified, the default values
are, respectively, `https://keeper.lsst.codes`, `WARNING`, `templates`
relative to the `dochubproto` module, `doclist.jinja2`, `index.jinja2`,
and `3600` (age is expressed in seconds and must be convertible to a
Python float).

## Methods

* `check_state()` returns one of `STATE_EMPTY`, `STATE_READY`,
  `STATE_REFRESHING`, or `STATE_STALE`, which map to the strings
  `empty`, `ready`, `refreshing`, or `stale`, respectively.  A stale
  document is one that has not been updated in more than the maximum
  document data age as specified at instance initialization (see above,
  default one hour).

* `get_document_data()` and `get_fresh_document_data()` return a `dict`
  whose keys are document sections (e.g. `DMTN`) and within each
  section, a list ordered by document handle (e.g. `dmtn-038`).

* `render()` returns an HTML unordered list entity created from the
  document data, encoded as UTF-8.  `render_index()` returns an HTML
  document created from the document data, encoded as UTF-8.

* `debug()`, `info()`, `warning()`, `error()`, and `critical()` each
  log a message at the specified level; it uses a `structlog` logger to
  log JSON output via `apikit`.




