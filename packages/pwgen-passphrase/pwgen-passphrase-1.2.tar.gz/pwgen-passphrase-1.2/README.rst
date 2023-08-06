pwgen-passphrase
================

Secure wordlist-based passphrase generator

Description
-----------

Use ``pwgen-passphrase`` to generate secure (yet easy to remember) random passphrase from wordlist.
See legendary `xkcd: Password Strength <https://xkcd.com/936>`_ comic strip for more details ;-)

Included wordlists are:

- `diceware <http://world.std.com/~reinhold/diceware.html>`_ (English: 7776 words)
- `eff-long <https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases>`_ (English: 7776 words)
- `eff-short <https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases>`_ (English: 1296 words)
- `eff-short2 <https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases>`_ (English: 1296 words)
- `bip0039 <https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki>`_ (English: 2048 words)
- `skey <https://tools.ietf.org/html/rfc1760>`_ (English: 2048 words)
- `cracklib-small <https://github.com/cracklib/cracklib>`_ (English: 52875 words)
- `aspell-en <http://aspell.net>`_ (English: 123232 words)
- `aspell-cs <http://aspell.net>`_ (Czech: 304607 words)

Requirements
------------

- `Python 3 <https://www.python.org>`_
- Optional: `PyQt <https://www.riverbankcomputing.com/software/pyqt/intro>`_
  (for copying generated passphrase to clipboard)
- Optional: `regex <https://bitbucket.org/mrabarnett/mrab-regex>`_
  (for better regex filtering, e.g. ``^[\p{Ll}]+`` for Unicode lower-case letters only)

Usage
-----

Run ``pwgen-passphrase --help`` to see all available options.

Example::

    [randall@xkcd.com ~] pwgen-passphrase -w cracklib-small -l 4 -t
    correct horse battery staple
    
    Statistics:
    ===========
    Number of words in passphrase: 4
    Wordlist length: 52875 words
    Passphrase strength (entropy): 62.8 bits
    
    Passphrase length: 28 chars
    Length of equivalent case sensitive alphanumeric password: 11 chars
    Length of equivalent all ASCII printable characters password: 10 chars

Help
----
::

    usage: pwgen-passphrase [-h] [-t] [-c] [-s SEPARATOR] [-n COUNT]
                            [-w {aspell-cs,aspell-en,bip0039,cracklib-small,diceware,eff-long,eff-short,eff-short2,skey} | -f WORDLIST_FILE]
                            [-l LENGTH | -b BITS] [-L | -U | -C] [--min MIN]
                            [--max MAX] [-r] [-e REGEX] [--version]
    
    generate secure random passphrase from wordlist
    
    optional arguments:
      -h, --help            show this help message and exit
      -t, --stats           show statistics about generated passphrase
      -c, --clipboard       copy generated passphrase to clipboard (needs PyQt)
      -s SEPARATOR, --separator SEPARATOR
                            words separator (default is space)
      -n COUNT, --count COUNT
                            generate multiple passphrases (default is 1)
      -w {aspell-cs,aspell-en,bip0039,cracklib-small,diceware,eff-long,eff-short,eff-short2,skey}, --wordlist {aspell-cs,aspell-en,bip0039,cracklib-small,diceware,eff-long,eff-short,eff-short2,skey}
                            select wordlist (default is eff-long)
      -f WORDLIST_FILE, --wordlist-file WORDLIST_FILE
                            path to external wordlist file
      -l LENGTH, --length LENGTH
                            length of generated passphrase (number of words,
                            default is 6)
      -b BITS, --bits BITS  minimal passphrase strength (bits of entropy)
      -L, --lower           make words lowercase
      -U, --upper           make words uppercase
      -C, --capitalize      make words capitalized
      --min MIN             limit minimum length of word (default is unlimited)
      --max MAX             limit maximum length of word (default is unlimited)
      -r, --transliterate   transliterate Unicode characters to ASCII and remove
                            duplicates
      -e REGEX, --regex REGEX
                            remove words that do not match regular expression
      --version             show program's version number and exit
