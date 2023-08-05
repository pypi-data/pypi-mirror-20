ReqWise
=======

If you need or prefer to use Linux RPMs only, ReqWise will read your Python project's
requirements and seek for them in multiple different sources, while ensuring they
are matching the version specified in the requirement files.

<div align="center"><img src="./doc/reqwise.png" alt="Reqwise output" width="400"></div><hr />

Install
-------

To install reqwise on your system, run the following command:

    sudo pip install .

Supported Sources
-----------------

- YUM/DNF (system defined repositories)
- COPR    (https://copr.fedorainfracloud.org)
- Koji    (http://koji.fedoraproject.org)


Examples
--------

Search for the default requirements files in the current directory:

    reqwise

Search the requirements in COPR:

    reqwise --copr el7-rhos9-test-deps

By default, reqwise will look for RPM short version (x.y.z), you can search for the long version (x.y.z-w):

    reqwise --long

### Configuration (Optional)

Can be set in your current working directory (reqwise.conf) or
in '/etc/reqwise/reqwise.conf'

The configuration file consists of sources. Source is where reqwise
will look for your requirement

An example for configration file:

    [copr]
    el7-rhos9-test-deps
    el7-rhos10-test-deps

    [koji]
    disabled=True

    [yum]
    repos=my_repo,another_repo
