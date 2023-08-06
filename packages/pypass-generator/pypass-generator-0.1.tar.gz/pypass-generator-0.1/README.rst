Python Password Generator - pypass-generator
============================================

Generates passwords and passphrases

**Current State:** generates passphrases using the ``pypass.passphrase.PassphraseGenerator`` namespace from any word generator. Includes a Diceware word generator in ``pypass.generator.Diceware``

Randomization is done in a secure fashion using ``random.SystemRandom``, and it's easy to write your own generator if you don't want to use Diceware.

The Diceware word list is included as a SQLite database, so no network connectivity is required. (If you don't trust this version, you can regenerate the database from the live official wordlist by using utility functions inside ``diceware``.)


Examples
--------

::

    >>> from pypass.passphrase import PassphraseGenerator, transform

    >>> generator = PassphraseGenerator(elements=5, separator='',
    ...                                 word_transform=transform.capitalize(),
    ...                                 phrase_transform=transform.add_numbers(2))
    >>> generator.generate()
    u'BeKneadJigBooneHansel29'

In the above, 5 words (``elements=5``) are generated using the default Diceware generator. No separator is placed between the words, but each word is passed to a transform function that capitalizes its first letter. Finally, the phrase is passed to a transform that adds two random digits to the end.

Generators
----------

You can supply a generator object to ``PassphraseGenerator`` to use in place of the default ``Diceware`` generator. At this time, all that's required for a generator object to work properly is for it to have a method ``random()`` that meets the following design contract:

* ``random()`` with no arguments should return a single element (e.g. word)
* ``random(int)`` should:
  - if int < 1, raise ``ValueError``
  - if int == 1, return a single element (word) as a string
  - if int > 1, return that number of elements as a list of strings

**Note: you must make your own guarantees about sufficient randomness/security**; ``pypass`` doesn't enforce anything. If you want secure passphrases/passwords, you should use the included generators.

See the ``MockGenerator`` class in ``test_passphraseGenerator.py`` for a simple and very insecure generator.

Future
------

Features I know I would like to add:

* Reliable and pessimistic password/passphrase strength estimation (as bits of entropy)
* An English Words generator (or several) to generate non-diceware passwords
