.. raw:: html

   <p align="center">

.. raw:: html

   </p>

.. raw:: html

   <p align="center">

An Official Integration for GitHub and GitHub Enterprise.

.. raw:: html

   </p>

gitsome
=======

|Build Status| |Codecov|

|PyPI version| |PyPI| |License|

Why ``gitsome``?
----------------

The Git Command Line
~~~~~~~~~~~~~~~~~~~~

Although the standard Git command line is a great tool to manage your
Git-powered repos, it can be **tough to remember the usage** of:

-  150+ porcelain and plumbing commands
-  Countless command-specific options
-  Resources such as tags and branches

The Git command line **does not integrate with GitHub**, forcing you to
toggle between command line and browser.

``gitsome`` - A Supercharged Git/GitHub CLI With Autocomplete
-------------------------------------------------------------

.. raw:: html

   <p align="center">

.. raw:: html

   </p>

``gitsome`` aims to supercharge your standard git/shell interface by
focusing on:

-  **Improving ease-of-use**
-  **Increasing productivity**

Deep GitHub Integration
~~~~~~~~~~~~~~~~~~~~~~~

Not all GitHub workflows work well in a terminal; ``gitsome`` attempts
to target those that do.

``gitsome`` includes 29 GitHub integrated commands that work with
**`ALL <#enabling-gh-tab-completions-outside-of-gitsome>`__** shells:

::

    $ gh <command> [param] [options]

-  `Quick reference <#github-integration-commands-quick-reference>`__
-  `General
   reference <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md>`__

Run ``gh`` commands along with
`Git-Extras <https://github.com/tj/git-extras/blob/master/Commands.md>`__
and `hub <https://hub.github.com/>`__ commands to unlock even more
GitHub integrations!

.. figure:: http://i.imgur.com/sG09AJH.png
   :alt: Imgur

   Imgur

Git and GitHub Autocompleter With Interactive Help
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can run the \ **optional**\  shell:

::

     $ gitsome

to enable **autocompletion** and **interactive help** for the following:

-  Git commands
-  Git options
-  Git branches, tags, etc
-  `Git-Extras
   commands <https://github.com/tj/git-extras/blob/master/Commands.md>`__
-  `GitHub integration
   commands <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md>`__

.. figure:: http://i.imgur.com/08OMNjz.png
   :alt: Imgur

   Imgur

.. figure:: http://i.imgur.com/fHjMwlh.png
   :alt: Imgur

   Imgur

General Autocompleter
~~~~~~~~~~~~~~~~~~~~~

``gitsome`` autocompletes the following:

-  Shell commands
-  Files and directories
-  Environment variables
-  Man pages
-  Python

To enable additional autocompletions, check out the `Enabling Bash
Completions <#enabling-bash-completions>`__ section.

.. figure:: http://i.imgur.com/hg1dpk6.png
   :alt: Imgur

   Imgur

Fish-Style Auto-Suggestions
---------------------------

``gitsome`` supports Fish-style auto-suggestions. Use the
``right arrow`` key to complete a suggestion.

.. figure:: http://i.imgur.com/ZRaFGpY.png
   :alt: Imgur

   Imgur

Python REPL
-----------

``gitsome`` is powered by
```xonsh`` <https://github.com/scopatz/xonsh>`__, which supports a
Python REPL.

Run Python commands alongside shell commands:

.. figure:: http://i.imgur.com/NYk7WYO.png
   :alt: Imgur

   Imgur

Additional ``xonsh`` features can be found in the
```xonsh tutorial`` <http://xon.sh/tutorial.html>`__.

Command History
---------------

``gitsome`` keeps track of commands you enter and stores them in
``~/.xonsh_history.json``. Use the up and down arrow keys to cycle
through the command history.

.. figure:: http://i.imgur.com/wq0caZu.png
   :alt: Imgur

   Imgur

Customizable Highlighting
-------------------------

You can control the ansi colors used for highlighting by updating your
``~/.gitsomeconfig`` file.

Color options include:

::

    'black', 'red', 'green', 'yellow',
    'blue', 'magenta', 'cyan', 'white'

For no color, set the value(s) to ``None``. ``white`` can appear as
light gray on some terminals.

.. figure:: http://i.imgur.com/BN1lfEf.png
   :alt: Imgur

   Imgur

Available Platforms
-------------------

``gitsome`` is available for Mac, Linux, Unix,
`Windows <#windows-support>`__, and
`Docker <#running-as-docker-container>`__.

TODO
----

    Not all GitHub workflows work well in a terminal; ``gitsome``
    attempts to target those that do.

-  Add additional GitHub API integrations

``gitsome`` is just getting started. Feel free to
`contribute! <#contributing>`__

Index
-----

GitHub Integration Commands
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  `GitHub Integration Commands
   Syntax <#github-integration-commands-syntax>`__
-  `GitHub Integration Commands
   Listing <#github-integration-commands-listing>`__
-  `GitHub Integration Commands Quick
   Reference <#github-integration-commands-quick-reference>`__
-  `GitHub Integration Commands Reference in
   COMMANDS.md <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md>`__

   -  ```gh configure`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-configure>`__
   -  ```gh create-comment`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-create-comment>`__
   -  ```gh create-issue`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-create-issue>`__
   -  ```gh create-repo`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-create-repo>`__
   -  ```gh emails`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-emails>`__
   -  ```gh emojis`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-emojis>`__
   -  ```gh feed`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-feed>`__
   -  ```gh followers`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-followers>`__
   -  ```gh following`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-following>`__
   -  ```gh gitignore-template`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-gitignore-template>`__
   -  ```gh gitignore-templates`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-gitignore-templates>`__
   -  ```gh issue`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-issue>`__
   -  ```gh issues`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-issues>`__
   -  ```gh license`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-license>`__
   -  ```gh licenses`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-licenses>`__
   -  ```gh me`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-me>`__
   -  ```gh notifications`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-notifications>`__
   -  ```gh octo`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-octo>`__
   -  ```gh pull-request`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-pull-request>`__
   -  ```gh pull-requests`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-pull-requests>`__
   -  ```gh rate-limit`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-rate-limit>`__
   -  ```gh repo`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-repo>`__
   -  ```gh repos`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-repos>`__
   -  ```gh search-issues`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-search-issues>`__
   -  ```gh search-repos`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-search-repos>`__
   -  ```gh starred`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-starred>`__
   -  ```gh trending`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-trending>`__
   -  ```gh user`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-user>`__
   -  ```gh view`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-view>`__

-  `Option: View in a
   Pager <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#option-view-in-a-pager>`__
-  `Option: View in a
   Browser <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#option-view-in-a-browser>`__

Installation and Tests
~~~~~~~~~~~~~~~~~~~~~~

-  `Installation <#installation>`__

   -  `Pip Installation <#pip-installation>`__
   -  `Virtual Environment
      Installation <#virtual-environment-installation>`__
   -  `Running as a Docker Container <#running-as-docker-container>`__
   -  `Running the ``gh configure``
      Command <#running-the-gh-configure-command>`__

      -  `For GitHub Enterprise Users <#for-github-enterprise-users>`__

   -  `Enabling Bash Completions <#enabling-bash-completions>`__
   -  `Enabling ``gh`` Tab Completions Outside of
      ``gitsome`` <#enabling-gh-tab-completions-outside-of-gitsome>`__

      -  `For Zsh Users <#for-zsh-users>`__

   -  `Optional: Installing ``PIL`` or
      ``Pillow`` <#optional-installing-pil-or-pillow>`__
   -  `Supported Python Versions <#supported-python-versions>`__
   -  `Supported Platforms <#supported-platforms>`__
   -  `Windows Support <#windows-support>`__

-  `Developer Installation <#developer-installation>`__

   -  `Continuous Integration <#continuous-integration>`__
   -  `Unit Tests and Code Coverage <#unit-tests-and-code-coverage>`__
   -  `Documentation <#documentation>`__

Misc
~~~~

-  `Contributing <#contributing>`__
-  `Credits <#credits>`__
-  `Contact Info <#contact-info>`__
-  `License <#license>`__

GitHub Integration Commands Syntax
----------------------------------

Usage:

::

    $ gh <command> [param] [options]

GitHub Integration Commands Listing
-----------------------------------

::

      configure            Configure gitsome.
      create-comment       Create a comment on the given issue.
      create-issue         Create an issue.
      create-repo          Create a repo.
      emails               List all the user's registered emails.
      emojis               List all GitHub supported emojis.
      feed                 List all activity for the given user or repo.
      followers            List all followers and the total follower count.
      following            List all followed users and the total followed count.
      gitignore-template   Output the gitignore template for the given language.
      gitignore-templates  Output all supported gitignore templates.
      issue                Output detailed information about the given issue.
      issues               List all issues matching the filter.
      license              Output the license template for the given license.
      licenses             Output all supported license templates.
      me                   List information about the logged in user.
      notifications        List all notifications.
      octo                 Output an Easter egg or the given message from Octocat.
      pull-request         Output detailed information about the given pull request.
      pull-requests        List all pull requests.
      rate-limit           Output the rate limit.  Not available for Enterprise.
      repo                 Output detailed information about the given filter.
      repos                List all repos matching the given filter.
      search-issues        Search for all issues matching the given query.
      search-repos         Search for all repos matching the given query.
      starred              Output starred repos.
      trending             List trending repos for the given language.
      user                 List information about the given user.
      view                 View the given index in the terminal or a browser.

GitHub Integration Commands Reference: COMMANDS.md
--------------------------------------------------

See the `GitHub Integration Commands Reference in
COMMANDS.md <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md>`__
for a **detailed discussion** of all GitHub integration commands,
parameters, options, and examples.

Check out the next section for a **quick reference**.

GitHub Integration Commands Quick Reference
-------------------------------------------

Configuring ``gitsome``
~~~~~~~~~~~~~~~~~~~~~~~

To properly integrate with GitHub, you must first configure ``gitsome``:

::

    $ gh configure

For GitHub Enterprise users, run with the ``-e/--enterprise`` flag:

::

    $ gh configure -e

Listing Feeds
~~~~~~~~~~~~~

Listing Your News Feed
^^^^^^^^^^^^^^^^^^^^^^

::

    $ gh feed

.. figure:: http://i.imgur.com/2LWcyS6.png
   :alt: Imgur

   Imgur

Listing A User's Activity Feed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

View your activity feed or another user's activity feed, optionally
through a pager with ``-p/--pager``. The `pager
option <#option-view-in-a-pager>`__ is available for many commands.

::

    $ gh feed donnemartin -p

.. figure:: http://i.imgur.com/kryGLXz.png
   :alt: Imgur

   Imgur

Listing A Repo's Activity Feed
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

    $ gh feed donnemartin/gitsome -p

.. figure:: http://i.imgur.com/d2kxDg9.png
   :alt: Imgur

   Imgur

Listing Notifications
~~~~~~~~~~~~~~~~~~~~~

::

    $ gh notifications

.. figure:: http://i.imgur.com/uwmwxsW.png
   :alt: Imgur

   Imgur

Listing Pull Requests
~~~~~~~~~~~~~~~~~~~~~

View all pull requests for your repos:

::

    $ gh pull-requests

.. figure:: http://i.imgur.com/4A2eYM9.png
   :alt: Imgur

   Imgur

Filtering Issues
~~~~~~~~~~~~~~~~

View all open issues where you have been mentioned:

::

    $ gh issues --issue_state open --issue_filter mentioned

.. figure:: http://i.imgur.com/AB5zxxo.png
   :alt: Imgur

   Imgur

View all issues, filtering for only those assigned to you, regardless of
state (open, closed):

::

    $ gh issues --issue_state all --issue_filter assigned

For more information about the filter and state qualifiers, visit the
```gh issues`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-issues>`__
reference in
`COMMANDS.md <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md>`__.

Filtering Starred Repos
~~~~~~~~~~~~~~~~~~~~~~~

::

    $ gh starred "repo filter"

.. figure:: http://i.imgur.com/JB88Kw8.png
   :alt: Imgur

   Imgur

Searching Issues and Repos
~~~~~~~~~~~~~~~~~~~~~~~~~~

Searching Issues
^^^^^^^^^^^^^^^^

Search issues that have the most +1s:

::

    $ gh search-issues "is:open is:issue sort:reactions-+1-desc" -p

.. figure:: http://i.imgur.com/DXXxkBD.png
   :alt: Imgur

   Imgur

Search issues that have the most comments:

::

    $ gh search-issues "is:open is:issue sort:comments-desc" -p

Search issues with the "help wanted" tag:

::

    $ gh search-issues "is:open is:issue label:\"help wanted\"" -p

Search issues that have your user name tagged **@donnemartin**:

::

    $ gh search-issues "is:issue donnemartin is:open" -p

Search all your open private issues:

::

    $ gh search-issues "is:open is:issue is:private" -p

For more information about the query qualifiers, visit the `searching
issues
reference <https://help.github.com/articles/searching-issues/>`__.

Searching Repos
^^^^^^^^^^^^^^^

Search all Python repos created on or after 2015, with >= 1000 stars:

::

    $ gh search-repos "created:>=2015-01-01 stars:>=1000 language:python" --sort stars -p

.. figure:: http://i.imgur.com/kazXWWY.png
   :alt: Imgur

   Imgur

For more information about the query qualifiers, visit the `searching
repos
reference <https://help.github.com/articles/searching-repositories/>`__.

Listing Trending Repos and Devs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

View trending repos:

::

    $ gh trending [language] [-w/--weekly] [-m/--monthly] [-d/--devs] [-b/--browser]

.. figure:: http://i.imgur.com/aa1gOg7.png
   :alt: Imgur

   Imgur

View trending devs (devs are currently only supported in browser):

::

    $ gh trending [language] --devs --browser

Viewing Content
~~~~~~~~~~~~~~~

The ``view`` command
^^^^^^^^^^^^^^^^^^^^

View the previously listed notifications, pull requests, issues, repos,
users etc, with HTML nicely formatted for your terminal, or optionally
in your browser:

::

    $ gh view [#] [-b/--browser]

.. figure:: http://i.imgur.com/NVEwGbV.png
   :alt: Imgur

   Imgur

The ``issue`` command
^^^^^^^^^^^^^^^^^^^^^

View an issue:

::

    $ gh issue donnemartin/saws/1

.. figure:: http://i.imgur.com/ZFv9MuV.png
   :alt: Imgur

   Imgur

The ``pull-request`` command
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

View a pull request:

::

    $ gh pull-request donnemartin/awesome-aws/2

.. figure:: http://i.imgur.com/3MtKjKy.png
   :alt: Imgur

   Imgur

Setting Up ``.gitignore``
~~~~~~~~~~~~~~~~~~~~~~~~~

List all available ``.gitignore`` templates:

::

    $ gh gitignore-templates

.. figure:: http://i.imgur.com/u8qYx1s.png
   :alt: Imgur

   Imgur

Set up your ``.gitignore``:

::

    $ gh gitignore-template Python > .gitignore

.. figure:: http://i.imgur.com/S5m5ZcO.png
   :alt: Imgur

   Imgur

Setting Up ``LICENSE``
~~~~~~~~~~~~~~~~~~~~~~

List all available ``LICENSE`` templates:

::

    $ gh licenses

.. figure:: http://i.imgur.com/S9SbMLJ.png
   :alt: Imgur

   Imgur

Set up your or ``LICENSE``:

::

    $ gh license MIT > LICENSE

.. figure:: http://i.imgur.com/zJHVxaA.png
   :alt: Imgur

   Imgur

Summoning Octocat
~~~~~~~~~~~~~~~~~

Call on Octocat to say the given message or an Easter egg:

::

    $ gh octo [say]

.. figure:: http://i.imgur.com/bNzCa5p.png
   :alt: Imgur

   Imgur

Viewing Profiles
~~~~~~~~~~~~~~~~

Viewing A User's Profile
^^^^^^^^^^^^^^^^^^^^^^^^

::

    $ gh user octocat

.. figure:: http://i.imgur.com/xVoVPVe.png
   :alt: Imgur

   Imgur

Viewing Your Profile
^^^^^^^^^^^^^^^^^^^^

View your profile with the ``gh user [YOUR_USER_ID]`` command or with
the following shortcut:

::

    $ gh me

.. figure:: http://i.imgur.com/csk5j0S.png
   :alt: Imgur

   Imgur

Creating Comments, Issues, and Repos
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a comment:

::

    $ gh create-comment donnemartin/gitsome/1 -t "hello world"

Create an issue:

::

    $ gh create-issue donnemartin/gitsome -t "title" -b "body"

Create a repo:

::

    $ gh create-repo gitsome

Option: View in a Pager
~~~~~~~~~~~~~~~~~~~~~~~

Many ``gh`` commands support a ``-p/--pager`` option that displays
results in a pager, where available.

Usage:

::

    $ gh <command> [param] [options] -p
    $ gh <command> [param] [options] --pager

Option: View in a Browser
~~~~~~~~~~~~~~~~~~~~~~~~~

Many ``gh`` commands support a ``-b/--browser`` option that displays
results in your default browser instead of your terminal.

Usage:

::

    $ gh <command> [param] [options] -b
    $ gh <command> [param] [options] --browser

See the
`COMMANDS.md <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md>`__
for a detailed listing of all GitHub integration commands, parameters,
options, and examples.

Having trouble remembering these commands? Check out the handy
`autocompleter with interactive
help <#git-and-github-autocompleter-with-interactive-help>`__ to guide
you through each command.

*Note, you can combine ``gitsome`` with other utilities such as
`Git-Extras <https://github.com/tj/git-extras/blob/master/Commands.md>`__.*

Installation
------------

Pip Installation
~~~~~~~~~~~~~~~~

|PyPI version| |PyPI|

``gitsome`` is hosted on
`PyPI <https://pypi.python.org/pypi/gitsome>`__. The following command
will install ``gitsome``:

::

    $ pip3 install gitsome

You can also install the latest ``gitsome`` from GitHub source which can
contain changes not yet pushed to PyPI:

::

    $ pip3 install git+https://github.com/donnemartin/gitsome.git

If you are not installing in a ``virtualenv``, you might need to run
with ``sudo``:

::

    $ sudo pip3 install gitsome

``pip3``
^^^^^^^^

Depending on your setup, you might also want to run ``pip3`` with the
```-H flag`` <http://stackoverflow.com/a/28619739>`__:

::

    $ sudo -H pip3 install gitsome

For most linux users, ``pip3`` can be installed on your system using the
``python3-pip`` package.

For example, Ubuntu users can run:

::

    $ sudo apt-get install python3-pip

See this `ticket <https://github.com/donnemartin/gitsome/issues/4>`__
for more details.

Virtual Environment Installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can install Python packages in a
```virtualenv`` <http://docs.python-guide.org/en/latest/dev/virtualenvs/>`__
to avoid potential issues with dependencies or permissions.

If you are a Windows user or if you would like more details on
``virtualenv``, check out this
`guide <http://docs.python-guide.org/en/latest/dev/virtualenvs/>`__.

Install ``virtualenv`` and ``virtualenvwrapper``:

::

    $ pip3 install virtualenv
    $ pip3 install virtualenvwrapper
    $ export WORKON_HOME=~/.virtualenvs
    $ source /usr/local/bin/virtualenvwrapper.sh

Create a ``gitsome`` ``virtualenv`` and install ``gitsome``:

::

    $ mkvirtualenv gitsome
    $ pip3 install gitsome

If the ``pip`` install does not work, you might be running Python 2 by
default. Check what version of Python you are running:

::

    $ python --version

If the call above results in Python 2, find the path for Python 3:

::

    $ which python3  # Python 3 path for mkvirtualenv's --python option

Install Python 3 if needed. Set the Python version when calling
``mkvirtualenv``:

::

    $ mkvirtualenv --python [Python 3 path from above] gitsome
    $ pip3 install gitsome

If you want to activate the ``gitsome`` ``virtualenv`` again later, run:

::

    $ workon gitsome

To deactivate the ``gitsome`` ``virtualenv``, run:

::

    $ deactivate

Running as a Docker Container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can run gitsome in a Docker container to avoid installing Python and
``pip3`` locally. To install Docker check out the `official Docker
documentation <https://docs.docker.com/engine/getstarted/step_one/#step-1-get-docker>`__.

Once you have docker installed you can run gitsome:

::

    $ docker run -ti --rm mariolet/gitsome

You can use Docker volumes to let gitsome access your working directory,
your local .gitsomeconfig and .gitconfig:

::

    $ docker run -ti --rm -v $(pwd):/src/              \
       -v ${HOME}/.gitsomeconfig:/root/.gitsomeconfig  \
       -v ${HOME}/.gitconfig:/root/.gitconfig          \
       mariolet/gitsome

If you are running this command often you will probably want to define
an alias:

::

    $ alias gitsome="docker run -ti --rm -v $(pwd):/src/              \
                      -v ${HOME}/.gitsomeconfig:/root/.gitsomeconfig  \
                      -v ${HOME}/.gitconfig:/root/.gitconfig          \
                      mariolet/gitsome"

To build the Docker image from sources:

::

    $ git clone https://github.com/donnemartin/gitsome.git
    $ cd gitsome
    $ docker build -t gitsome .

Starting the ``gitsome`` Shell
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once installed, run the optional ``gitsome`` autocompleter with
interactive help:

::

    $ gitsome

Running the optional ``gitsome`` shell will provide you with
autocompletion, interactive help, fish-style suggestions, a Python REPL,
etc.

Running ``gh`` Commands
~~~~~~~~~~~~~~~~~~~~~~~

Run GitHub-integrated commands:

::

    $ gh <command> [param] [options]

Note: Running the ``gitsome`` shell is not required to execute ``gh``
commands. After `installing <#installation>`__ ``gitsome`` you can run
``gh`` commands from any shell.

Running the ``gh configure`` Command
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To properly integrate with GitHub, ``gitsome`` must be properly
configured:

::

    $ gh configure

For GitHub Enterprise Users
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run with the ``-e/--enterprise`` flag:

::

    $ gh configure -e

View more details in the `gh
configure <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-configure>`__
section.

Enabling Bash Completions
~~~~~~~~~~~~~~~~~~~~~~~~~

By default, ``gitsome`` looks at the following `locations to enable bash
completions <https://github.com/donnemartin/gitsome/blob/master/xonsh/environ.py#L123-L131>`__.

To add additional bash completions, update the ``~/.xonshrc`` file with
the location of your bash completions.

If ``~/.xonshrc`` does not exist, create it:

::

    $ touch ~/.xonshrc

For example, if additional completions are found in
``/usr/local/etc/my_bash_completion.d/completion.bash``, add the
following line in ``~/.xonshrc``:

::

    $BASH_COMPLETIONS.append('/usr/local/etc/my_bash_completion.d/completion.bash')

You will need to restart ``gitsome`` for the changes to take effect.

Enabling ``gh`` Tab Completions Outside of ``gitsome``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can run ``gh`` commands outside of the ``gitsome`` shell completer.
To enable ``gh`` tab completions for this workflow, copy the
```gh_complete.sh`` <https://github.com/donnemartin/gitsome/blob/master/scripts/gh_complete.sh>`__
file locally.

Let bash know completion is available for the ``gh`` command within your
current session:

::

    $ source /path/to/gh_complete.sh

To enable tab completion for all terminal sessions, add the following to
your ``bashrc`` file:

::

    source /path/to/gh_complete.sh

Reload your ``bashrc``:

::

    $ source ~/.bashrc

Tip: ``.`` is the short form of ``source``, so you can run this instead:

::

    $ . ~/.bashrc

For Zsh Users
^^^^^^^^^^^^^

``zsh`` includes a module which is compatible with bash completions.

Download the
```gh_complete.sh`` <https://github.com/donnemartin/gitsome/blob/master/scripts/gh_complete.sh>`__
file as above and append the following to your ``.zshrc``:

::

    autoload bashcompinit
    bashcompinit
    source /path/to/gh_complete.sh

Reload your ``zshrc``:

::

     $ source ~/.zshrc

Optional: Installing ``PIL`` or ``Pillow``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Displaying the avatar for the ``gh me`` and ``gh user`` commands will
require installing the optional ``PIL`` or ``Pillow`` dependency.

Windows\* and Mac:

::

    $ pip3 install Pillow

\*See the `Windows Support <#windows-support>`__ section for limitations
on the avatar.

Ubuntu users, check out these `instructions on
askubuntu <http://askubuntu.com/a/272095>`__

Supported Python Versions
~~~~~~~~~~~~~~~~~~~~~~~~~

-  Python 3.4
-  Python 3.5

**Python 3.6 is not currently supported.** See this
`ticket <https://github.com/donnemartin/gitsome/issues/105>`__ for more
information.

``gitsome`` is powered by ``xonsh`` which does not currently support
Python 2.x, as discussed in this
`ticket <https://github.com/scopatz/xonsh/issues/66>`__.

Supported Platforms
~~~~~~~~~~~~~~~~~~~

-  Mac OS X

   -  Tested on OS X 10.10

-  Linux, Unix

   -  Tested on Ubuntu 14.04 LTS

-  Windows

   -  Tested on Windows 10

Windows Support
~~~~~~~~~~~~~~~

``gitsome`` has been tested on Windows 10 with ``cmd`` and ``cmder``.

Although you can use the standard Windows command prompt, you'll
probably have a better experience with either
`cmder <https://github.com/cmderdev/cmder>`__ or
`conemu <https://github.com/Maximus5/ConEmu>`__.

.. figure:: http://i.imgur.com/A1VCsjV.png
   :alt: Imgur

   Imgur

Text Only Avatar
^^^^^^^^^^^^^^^^

The commands
```gh user`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-user>`__
and
```gh me`` <https://github.com/donnemartin/gitsome/blob/master/COMMANDS.md#gh-me>`__
will always have the ``-t/--text_avatar`` flag enabled, since
```img2txt`` <#credits>`__ does not support the ansi avatar on Windows.

Config File
^^^^^^^^^^^

On Windows, the ``.gitsomeconfig`` file can be found in
``%userprofile%``. For example:

::

    C:\Users\dmartin\.gitsomeconfig

Developer Installation
----------------------

If you're interested in contributing to ``gitsome``, run the following
commands:

::

    $ git clone https://github.com/donnemartin/gitsome.git
    $ cd gitsome
    $ pip3 install -e .
    $ pip3 install -r requirements-dev.txt
    $ gitsome
    $ gh <command> [param] [options]

``pip3``
~~~~~~~~

If you get an error while installing saying that you need Python 3.4+,
it could be because your ``pip`` command is configured for an older
version of Python. To fix this issue, it is recommended to install
``pip3``:

::

    $ sudo apt-get install python3-pip

See this `ticket <https://github.com/donnemartin/gitsome/issues/4>`__
for more details.

Continuous Integration
~~~~~~~~~~~~~~~~~~~~~~

|Build Status|

Continuous integration details are available on `Travis
CI <https://travis-ci.org/donnemartin/gitsome>`__.

Unit Tests and Code Coverage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|Codecov|

Code coverage details are available on
`Codecov <https://codecov.io/github/donnemartin/gitsome>`__.

Run unit tests in your active Python environment:

::

    $ python tests/run_tests.py

Run unit tests with `tox <https://pypi.python.org/pypi/tox>`__ on
multiple Python environments:

::

    $ tox

Documentation
~~~~~~~~~~~~~

Source code documentation will soon be available on
`Readthedocs.org <https://readthedocs.org/>`__. Check out the `source
docstrings <https://github.com/donnemartin/gitsome/blob/master/gitsome/githubcli.py>`__.

Run the following to build the docs:

::

    $ scripts/update_docs.sh

Contributing
------------

Contributions are welcome!

Review the `Contributing
Guidelines <https://github.com/donnemartin/gitsome/blob/master/CONTRIBUTING.md>`__
for details on how to:

-  Submit issues
-  Submit pull requests

Credits
-------

-  `click <https://github.com/pallets/click>`__ by
   `mitsuhiko <https://github.com/mitsuhiko>`__
-  `github\_trends\_rss <https://github.com/ryotarai/github_trends_rss>`__
   by `ryotarai <https://github.com/ryotarai>`__
-  `github3.py <https://github.com/sigmavirus24/github3.py>`__ by
   `sigmavirus24 <https://github.com/sigmavirus24>`__
-  `html2text <https://github.com/aaronsw/html2text>`__ by
   `aaronsw <https://github.com/aaronsw>`__
-  `img2txt <https://github.com/hit9/img2txt>`__ by
   `hit9 <https://github.com/hit9>`__
-  `python-prompt-toolkit <https://github.com/jonathanslenders/python-prompt-toolkit>`__
   by `jonathanslenders <https://github.com/jonathanslenders>`__
-  `requests <https://github.com/kennethreitz/requests>`__ by
   `kennethreitz <https://github.com/kennethreitz>`__
-  `xonsh <https://github.com/scopatz/xonsh>`__ by
   `scopatz <https://github.com/scopatz>`__

Contact Info
------------

Feel free to contact me to discuss any issues, questions, or comments.

My contact info can be found on my `GitHub
page <https://github.com/donnemartin>`__.

License
-------

|License|

::

    Copyright 2016 Donne Martin

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

.. |Build Status| image:: https://travis-ci.org/donnemartin/gitsome.svg?branch=master
   :target: https://travis-ci.org/donnemartin/gitsome
.. |Codecov| image:: https://img.shields.io/codecov/c/github/donnemartin/gitsome.svg
   :target: https://codecov.io/github/donnemartin/gitsome
.. |PyPI version| image:: https://badge.fury.io/py/gitsome.svg
   :target: http://badge.fury.io/py/gitsome
.. |PyPI| image:: https://img.shields.io/pypi/pyversions/gitsome.svg
   :target: https://pypi.python.org/pypi/gitsome/
.. |License| image:: https://img.shields.io/:license-apache-blue.svg
   :target: http://www.apache.org/licenses/LICENSE-2.0.html
.. |License| image:: http://img.shields.io/:license-apache-blue.svg
   :target: http://www.apache.org/licenses/LICENSE-2.0.html
