[![NPM version](https://badge.fury.io/js/curiosity.png)](http://badge.fury.io/js/curiosity)
[![Build Status](https://secure.travis-ci.org/vesln/curiosity.png)](http://travis-ci.org/vesln/curiosity)
[![Coverage Status](https://coveralls.io/repos/vesln/curiosity/badge.png?branch=master)](https://coveralls.io/r/vesln/curiosity?branch=master)
[![Code Climate](https://codeclimate.com/github/vesln/curiosity.png)](https://codeclimate.com/github/vesln/curiosity)

# Curiosity

![Curiosity](http://i.imgur.com/KuQHBUp.png)

## Synopsis

Raw and curious metrics about your JavaScript project.

## Description

```
  Usage: curiosity <path>

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    --ignore <path>     specify path to ignore
    --formatter <name>  specify formatter to use
    --formatters        display all formatters
```

## Formatters

```
    json
    summary
    total

    local formatters in: /Users/your-username/.curiosity/formatters
```

## Installation

```bash
$ npm install curiosity -g
```

## Tests

### Running the tests

```bash
$ npm install
$ make test
```

### Test coverage

```bash
$ make test-cov
```

### JSHint

```bash
$ make jshint
```

## Support the author

Do you like this project? Star the repository, spread the word - it really helps. You may want to follow
me on [Twitter](https://twitter.com/vesln) and
[GitHub](https://github.com/vesln). Thanks!

## License

**MIT License**

Copyright (C) 2013 Veselin Todorov (hi@vesln.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
