Python Password Generator - pypass-generator
============================================

Generates passwords and passphrases

You can ``pip install pypass-generator``

**Current State:** generates passphrases using the ``pypass.passphrase.PassphraseGenerator`` namespace from any word generator. Includes a Diceware word generator in ``pypass.generator.Diceware``

Randomization is done in a secure fashion using ``random.SystemRandom``, and it's easy to write your own generator if you don't want to use Diceware.

The Diceware word list is included as a SQLite database, so no network connectivity is required. (If you don't trust this version, you can regenerate the database from the live official wordlist by using utility functions inside ``diceware``.)

.. contents::



::

    >>> from pypass.passphrase import PassphraseGenerator, transform

    >>> generator = PassphraseGenerator(elements=5, separator='',
    ...                                 word_transform=transform.capitalize(),
    ...                                 phrase_transform=transform.add_numbers(2))
    >>> generator.generate()
    u'BeKneadJigBooneHansel29'

In the above, 5 words (``elements=5``) are generated using the default Diceware generator. No separator is placed between the words, but each word is passed to a transform function that capitalizes its first letter. Finally, the phrase is passed to a transform that adds two random digits to the end.

Transforms
----------

The ``pypass.passphrase.transform`` module provides several functions that return callable transformation functions suitable for ``word_transform`` and ``phrase_transform``.  These are:

* ``transform.add_numbers(count)`` - returns a transform that adds ``count`` random digits to the end of the word/phrase

  Examples::

      # add 3 random digits to the end each word generated
      generator = PassphraseGenerator(word_transform=transform.add_numbers(3))

      # add 2 random digits to the end of the generated phrase
      generator = PassphraseGenerator(phrase_transform=transform.add_numbers(2))

* ``transform.add_symbols(count, symbols=...)`` - returns a transform that adds ``count`` special chars/symbols to the end of the word/phrase. You can optionally specify your own list/string of symbols; by default uses the `list of password special characters from OWASP`_

  .. _list of password special characters from OWASP: https://www.owasp.org/index.php/Password_special_characters

  Examples::

      # add 2 ASCII special chars to the end of the generated phrase
      generator = PassphraseGenerator(phrase_transform=transform.add_symbols(2))

      # add 2 chars from the QWERTY top row to the end of the generated phrase
      generator = PassphraseGenerator(phrase_transform=transform.add_symbols(2, symbols='!@#$%^&*()'))


* ``transform.capitalize()`` - returns a transform that will capitalize the first letter of the word/phrase

  Examples::

      # capitalize the first letter of each word generated
      generator = PassphraseGenerator(word_transform=transform.capitalize()

* ``transform.leet(probability=0.2)`` - returns a transform that will perform 'l33t-sp34k' transforms to the word/phrase. The probablilty that a subtitutable letter will be substituted is configurable, default is 0.2 (20%). **This transform is incomplete and should be considered "pre-release".**

  Examples::

      # leet transform the phrase with a 20% chance of substituting each letter
      generator = PassphraseGenerator(phrase_transform=transform.leet())

      # leet transform the phrase with a 50% chance of substituting each letter
      generator = PassphraseGenerator(phrase_transform=transform.leet(probability=0.5))

* ``transform.chain(...)`` - returns a transform that will perform the supplied list of transforms, in order, to the word/phrase.

  Examples::

      # Capitalize words, then add 2 random digits to the end of each
      generator = PassphraseGenerator(word_transform=transform.chain(transform.capitalize(),
                                                                     transform.add_numbers(2)))

You can also easily write your own transform function. A transform function accepts a single string argument and returns the transformed string.

Example::

    def all_uppercase(word):
        return word.upper()

    generator = PassphraseGenerator(word_transform=all_uppercase)

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


Command-line Tool
-----------------

There is a very basic command-line passphrase generator in ``pypass.makepass``. I'm not providing detailed documentation at this time, because it's pre-alpha state. Contributions welcome!


Future
------

Features I know I would like to add:

* Reliable and pessimistic password/passphrase strength estimation (as bits of entropy)
* An English Words generator (or several) to generate non-diceware passwords
