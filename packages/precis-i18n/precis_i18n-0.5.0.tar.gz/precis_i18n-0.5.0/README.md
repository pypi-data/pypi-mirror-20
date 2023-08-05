# PRECIS-i18n: Internationalized Usernames and Passwords

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/byllyfish/precis_i18n/master/LICENSE.txt) [![Build Status](https://travis-ci.org/byllyfish/precis_i18n.svg?branch=master)](https://travis-ci.org/byllyfish/precis_i18n) [![codecov.io](https://codecov.io/gh/byllyfish/precis_i18n/coverage.svg?branch=master)](https://codecov.io/gh/byllyfish/precis_i18n?branch=master)

If you want your application to accept unicode user names and passwords, you must be careful in how you validate and compare them. The PRECIS framework makes internationalized user names and passwords safer for use by applications. PRECIS profiles transform unicode strings into a canonical form, suitable for comparison.

This module implements the PRECIS Framework as described in:

- PRECIS Framework: Preparation, Enforcement, and Comparison of Internationalized Strings in Application Protocols ([RFC 7564](https://tools.ietf.org/html/rfc7564))
- Preparation, Enforcement, and Comparison of Internationalized Strings Representing Usernames and Passwords ([RFC 7613](https://tools.ietf.org/html/rfc7613))
- Preparation, Enforcement, and Comparison of Internationalized Strings Representing Nicknames ([RFC 7700](https://tools.ietf.org/html/rfc7700))

Requires Python 3.3 or later.

## Usage

Use the `get_profile` function to obtain a profile object, then use its `enforce` method. The `enforce` method returns a Unicode string.

```

>>> from precis_i18n import get_profile
>>> username = get_profile('UsernameCaseMapped')
>>> username.enforce('Kevin')
'kevin'
>>> username.enforce('\u212Aevin')
'kevin'
>>> username.enforce('\uFF2Bevin')
'kevin'
>>> username.enforce('\U0001F17Aevin')
Traceback (most recent call last):
    ...
UnicodeEncodeError: 'UsernameCaseMapped' codec can't encode character '\U0001f17a' in position 0: DISALLOWED/symbols

```

Alternatively, you can use the Python `str.encode` API. Import the `precis_i18n.codec` module to register the PRECIS codec names. Now you can use the `str.encode` method with any unicode string. The result will be a UTF-8 encoded byte string or a `UnicodeEncodeError` if the string is disallowed.

```

>>> import precis_i18n.codec
>>> 'Kevin'.encode('UsernameCasePreserved')
b'Kevin'
>>> '\u212Aevin'.encode('UsernameCasePreserved')
b'Kevin'
>>> '\uFF2Bevin'.encode('UsernameCasePreserved')
b'Kevin'
>>> '\u212Aevin'.encode('UsernameCaseMapped')
b'kevin'
>>> '\uFF2Bevin'.encode('OpaqueString')
b'\xef\xbc\xabevin'
>>> '\U0001F17Aevin'.encode('UsernameCasePreserved')
Traceback (most recent call last):
    ...
UnicodeEncodeError: 'UsernameCasePreserved' codec can't encode character '\U0001f17a' in position 0: DISALLOWED/symbols

```

## Supported Profiles and Codecs

Each PRECIS profile has a corresponding codec name. The `CaseMapped` variant converts the string to lower case for implementing case-insensitive comparison.

- UsernameCasePreserved
- UsernameCaseMapped
- OpaqueString
- NicknameCasePreserved
- NicknameCaseMapped

The `CaseMapped` profiles use Unicode Default Case Folding. There are additional codecs that use Unicode `ToLower` to support draft RFC changes.

- UsernameCaseMapped:ToLower
- NicknameCaseMapped:ToLower

The PRECIS base string classes are also available:

- IdentifierClass
- FreeFormClass

## Error Messages

A PRECIS profile raises a `UnicodeEncodeError` exception if a string is disallowed. The `reason` field specifies the
kind of error.

Reason | Explanation
-------|-------------
DISALLOWED/arabic_indic | Arabic-Indic digits cannot be mixed with Extended Arabic-Indic Digits. (Context)
DISALLOWED/bidi_rule | Right-to-left string cannot contain left-to-right characters due to the "Bidi" rule. (Context)
DISALLOWED/controls | Control character is not allowed.
DISALLOWED/empty | After applying the profile, the result cannot be empty.
DISALLOWED/exceptions | Exception character is not allowed.
DISALLOWED/extended_arabic_indic | Extended Arabic-Indic digits cannot be mixed with Arabic-Indic Digits. (Context)
DISALLOWED/greek_keraia | Greek keraia must be followed by a Greek character. (Context)
DISALLOWED/has_compat | Compatibility characters are not allowed.
DISALLOWED/hebrew_punctuation | Hebrew punctuation geresh or gershayim must be preceded by Hebrew character. (Context)
DISALLOWED/katakana_middle_dot | Katakana middle dot must be accompanied by a Hiragana, Katakana, or Han character. (Context)
DISALLOWED/middle_dot | Middle dot must be surrounded by the letter 'l'. (Context)
DISALLOWED/old_hangul_jamo | Conjoining Hangul Jamo is not allowed.
DISALLOWED/other | Other character is not allowed.
DISALLOWED/other_letter_digits | Non-traditional letter or digit is not allowed.
DISALLOWED/precis_ignorable_properties | Default ignorable or non-character is not allowed.
DISALLOWED/punctuation | Non-ASCII punctuation character is not allowed.
DISALLOWED/spaces | Space character is not allowed.
DISALLOWED/symbols | Non-ASCII symbol character is not allowed.
DISALLOWED/unassigned | Unassigned unicode character is not allowed.
DISALLOWED/zero_width_joiner | Zero width joiner must immediately follow a combining virama. (Context)
DISALLOWED/zero_width_nonjoiner | Zero width non-joiner must immediately follow a combining virama, or appear where it breaks a cursive connection in a formally cursive script. (Context)


## Examples

There are multiple ways to write "Kevin" by varying only the "K".

Original String|UsernameCasePreserved|UsernameCaseMapped|Nickname
---------------|-----------------|------------------|------------------
Kevin | Kevin | kevin | kevin
&#8490;evin '\u212aevin' | Kevin | kevin | kevin
&#65323;evin '\uff2bevin' | Kevin | kevin | kevin
&#922;evin '\u039aevin' | &#922;evin '\u039aevin' | &#954;evin '\u03baevin' | &#954;evin '\u03baevin'
&#7730;evin '\u1e32evin' | &#7730;evin '\u1e32evin' | &#7731;evin '\u1e33evin' | &#7731;evin '\u1e33evin'
&#7732;evin '\u1e34evin' | &#7732;evin '\u1e34evin' | &#7733;evin '\u1e35evin' | &#7733;evin '\u1e35evin'
&#11369;evin '\u2c69evin' | &#11369;evin '\u2c69evin' | &#11370;evin '\u2c6aevin' | &#11370;evin '\u2c6aevin'
&#42816;evin '\ua740evin' | &#42816;evin '\ua740evin' | &#42817;evin '\ua741evin' | &#42817;evin '\ua741evin'
&#42818;evin '\ua742evin' | &#42818;evin '\ua742evin' | &#42819;evin '\ua743evin' | &#42819;evin '\ua743evin'
&#42820;evin '\ua744evin' | &#42820;evin '\ua744evin' | &#42821;evin '\ua745evin' | &#42821;evin '\ua745evin'
&#42914;evin '\ua7a2evin' | &#42914;evin '\ua7a2evin' | &#42915;evin '\ua7a3evin' | &#42915;evin '\ua7a3evin'
&#9408;evin '\u24c0evin' | DISALLOWED | DISALLOWED | kevin
&#127258;evin '\U0001f11aevin' | DISALLOWED | DISALLOWED | (K)evin
&#127290;evin '\U0001f13aevin' | DISALLOWED | DISALLOWED | Kevin
&#127322;evin '\U0001f15aevin' | DISALLOWED | DISALLOWED | &#127322;evin '\U0001f15aevin'
&#127354;evin '\U0001f17aevin' | DISALLOWED | DISALLOWED | &#127354;evin '\U0001f17aevin'
