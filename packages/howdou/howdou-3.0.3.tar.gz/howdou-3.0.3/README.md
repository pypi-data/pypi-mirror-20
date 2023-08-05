Howdou
====================================================

This is a fork of Benjamin Gleitzman's excellent
[Howdoi](https://github.com/gleitz/howdoi) tool.

It's been extended to support a local indexed cache of answers using
[Elasticsearch](http://en.wikipedia.org/wiki/Elasticsearch) as the backend
search server. This allows faster searches and the ability to add custom answer
annotations and documentation via a local
[YAML](http://en.wikipedia.org/wiki/YAML) file.

I made this modification when I realized that howdoi is ideal for finding
common one-liners when what I really needed was help finding less common guides
and solutions for subtle, but more complex problems. In these cases, I found
that the solutions provided by howdoi still required I do more research and
write notes, notes that I needed to store somewhere for later reference.

My solution was to organized my notes in a YAML file, index this file with
Elasticsearch, and modify howdoi to refer to my Elasticsearch index first.

Instant coding answers via the command line
-------------------------------------------

Are you a hack programmer? Do you find yourself constantly Googling for
how to do basic programing tasks?

Suppose you want to know how to format a date in bash. Why open your browser
and read through blogs (risking major distraction) when you can simply stay
in the console and ask howdou:

    $ howdou format date bash
    > DATE=`date +%Y-%m-%d`

howdou will answer all sorts of queries:

    $ howdou print stack trace python
    > import traceback
    >
    > try:
    >     1/0
    > except:
    >     print '>>> traceback <<<'
    >     traceback.print_exc()
    >     print '>>> end of traceback <<<'
    > traceback.print_exc()

    $ howdou convert mp4 to animated gif
    > video=/path/to/video.avi
    > outdir=/path/to/output.gif
    > mplayer "$video" \
    >         -ao null \
    >         -ss "00:01:00" \  # starting point
    >         -endpos 10 \ # duration in second
    >         -vo gif89a:fps=13:output=$outdir \
    >         -vf scale=240:180

    $ howdou create tar archive
    > tar -cf backup.tar --exclude "www/subf3" www

Installation
------------

First, install Elasticsearch. On Ubuntu, this is simply:

    sudo apt-get install default-jre elasticsearch

or:

    cd /tmp
    wget https://download.elasticsearch.org/elasticsearch/release/org/elasticsearch/distribution/deb/elasticsearch/2.0.0/elasticsearch-2.0.0.deb
    sudo dpkg -i elasticsearch-2.0.0.deb
    sudo service elasticsearch start

Enable inline script searches:

    sudo sh -c "echo 'script.engine.groovy.inline.search: on' >> /etc/elasticsearch/elasticsearch.yml"
    sudo service elasticsearch restart 

You may also need to enable the service to start at boot with:

    sudo update-rc.d elasticsearch defaults
    sudo update-rc.d elasticsearch enable

Make sure that the version of ElasticSearch matches the version of the elasticsearch Python package installed in your virtualenv.

Then install howdou via pip with:

    pip install howdou

or

    pip install git+https://github.com/chrisspen/howdou.git#egg=howdou

or

    python setup.py install

https://elasticsearch-py.readthedocs.org/en/master/

Usage
-----

The command line is pretty straight-forward:

    usage: howdou.py [-h] [-p POS] [-a] [-l] [-c] [-n NUM_ANSWERS] QUERY [QUERY ...]

    instant coding answers via the command line

    positional arguments:
      QUERY                 the question to answer

    optional arguments:
      -h, --help            show this help message and exit
      -p POS, --pos POS     select answer in specified position (default: 1)
      -a, --all             display the full text of the answer
      -l, --link            display only the answer link
      -c, --color           enable colorized output
      -n NUM_ANSWERS, --num-answers NUM_ANSWERS
                            number of answers to return
      -C, --clear-cache     clear the cache

To take full advantage of howdou, you'll need to maintain a local howdou.yml
file, which is a simple serialized list of QA-sets that look like:

    -   questions:
        -   format date bash
        answers:
        -   weight: 1
            date: 2014-5-14
            source: http://stackoverflow.com/questions/1401482/yyyy-mm-dd-format-date-in-shell-script
            formatter: bash
            text: |-
                DATE=`date +%Y-%m-%d`

Note each item is an association of many-questions to many-answers.
This is because there are many ways to ask the same thing, and we want the
index to be as likely as possible to correctly match your question to an
answer.

There's also an explicit weight value, which will be incorporated into
Elasticsearch's own search weight to control the order that results are shown.

To automatically reindex your changes, checking every 5 minutes, run:

    crontab -e

and add these lines:

    # Do a quick frequent update.
    */5 * * * * . /home/yourusername/.bash_aliases; howdou --action=reindex

    # Do a slower but more thorough update less frequently.
    0 6 * * * . /home/yourusername/.bash_aliases; howdou --action=reindex --force

Elasticsearch
-------------

A caveat with the Elasticsearch backend is that the default configuration can be a huge memory hog.

You'll probably want to edit `/etc/elasticsearch/jvm.options` and drastically reduce the values for `Xms` and `Xmx`.

Development
-----------

Tests require the Python development headers to be installed, which you can install on Ubuntu with:

    sudo add-apt-repository ppa:fkrull/deadsnakes
    sudo apt-get update
    sudo apt-get install python-dev python3-dev python3.4-minimal python3.4-dev python3.5-minimal python3.5-dev pandoc

To run all [tests](http://tox.readthedocs.org/en/latest/):

    export TESTNAME=; tox

To run tests for a specific environment (e.g. Python 2.7):

    export TESTNAME=; tox -e py27

To run a specific test:

    export TESTNAME=:HowdouTestCase.test_unicode_answer; tox -e py27
