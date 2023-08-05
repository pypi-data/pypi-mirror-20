# python-wikitcms

python-wikitcms is a Python library for interacting with [Wikitcms][1],
the notional 'test management system' built as a set of pages in the
Fedora wiki.

It uses the [mwclient][2] library to access the Fedora MediaWiki
instance. Its capabilities include creating new release validation
compose event pages, querying existing pages for results in various
formats, and more.

Its API is still in development and should not yet be entirely relied
upon.

## Security

You ***MUST*** treat wikitcms as a source of untrusted input. It is
retrieving information from a wiki for you; that wiki is open to
editing by all. Treat anything wikitcms returns from the wiki (which
includes, but is not limited to, any page or section text, result
attributes status, user, bugs and comment, resultrow attributes
testcase, name, envs, milestone, section, and to some extent any
element of a page title or property derived from one when getting
a Page object from an existing wiki page) as an entirely untrusted
input and sanitize it appropriately for the context in which you
are using it.

[1]: https://fedoraproject.org/wiki/Wikitcms
[2]: https://github.com/mwclient/mwclient
