PyLexicon: A Dictionary Module for Python
======================================

PyLexicon is an updated and streamlined dictionary module for Python 3 to
get meanings, synonyms, antonyms, and translations. It uses `WordNet`_
for definitions, `Thesaurus.com`_ for synonyms and antonyms, and `Google
Translate`_ for translations.

This module uses ``requests`` and ``BeautifulSoup4`` as dependencies.

Installation
------------

``pip install PyLexicon``

Usage
-----

PyLexicon is designed with simplicity in mind, which makes it easy to use.

PyLexicon has only three functions: ``define``, ``synonym`` ,and
``antonym``

Define:
~~~~~~~

.. code:: python

    >>> print(PyLexicon.define('hello'))
    {'Noun': ['an expression of greeting']}

Synonym:
~~~~~~~~

.. code:: python

    >>> print(PyLexicon.synonym('happy'))
    ['cheerful', 'contented', 'overjoyed', 'ecstatic', 'elated']

Antonym:
~~~~~~~~

.. code:: python

    >>> print(PyLexicon.antonym('happy'))
    ['melancholy', 'upset', 'disappointed', 'sorrowful', 'unfriendly']

.. _WordNet: https://wordnet.princeton.edu/
.. _Thesaurus.com: http://www.thesaurus.com/
.. _Google Translate: https://translate.google.com/
