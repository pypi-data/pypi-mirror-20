# fedfind

Fedora Finder finds Fedoras. It provides a CLI and Python module that find and providing identifying information about Fedora images and release trees. Try it out:

    fedfind images --release 22
    fedfind images --release 23 --milestone Alpha
    fedfind images --release 23 --milestone Alpha --compose RC2
    fedfind images --compose 20150820
    fedfind images --release 5 --arch x86_64,ppc
    fedfind images --release 15 --search desk

Fedora has stable releases, archive releases, really old archive releases, 'milestone' releases (Alpha / Beta), release validation testing composes (TCs and RCs), unstable nightly composes, and post-release nightly composes, all in different places, with several different layouts. There is no canonical database of the locations and
contents of all the various composes/releases. We in Fedora QA found we had several tools that needed to know where to find various images from various different types of releases, and little bits of knowledge about the locations and layouts of various releases/composes had been added to different tools. fedfind was written to consolidate all this esoteric knowledge in a single codebase with a consistent interface.

fedfind lets you specify a release/compose using three values: 'release', 'milestone' and 'compose'. It can then find the location for that compose, tell you whether it exists, and give you the locations of all the images that are part of the release and what each image actually contains.

fedfind runs on Python versions 2.6 and later (including 3.x).

## Installation and use

fedfind is packaged in the official Fedora and EPEL repositories: to install on Fedora run `dnf install fedfind`, on RHEL / CentOS with EPEL enabled, run `yum install fedfind`. You may need to enable the *updates-testing* repository to get the latest version.

You can browse the [fedfind source][1], and clone with `git clone https://www.happyassassin.net/cgit/fedfind`. Tarballs are available for [download][2].

You can use the fedfind CLI from the tarball without installing it, as `./fedfind.py` from the root of the tarball (you will need `cached_property` and `six`, and `argparse` on Python 2.6). You can of course copy the Python module anywhere you like and use it in place. To install both CLI and module systemwide, run `python setup.py install`.

## Release identification

Correct usage of fedfind relies on understanding the 'release', 'milestone', 'compose' versioning concept, so here is a quick primer. In this section we will write release, milestone, compose triplets as (release, milestone, compose) with '' indicating an omitted value, e.g. (22, Beta, TC3) or (22, '', '').

* **Release** is usually a Fedora release number, e.g. 22, 15 or 1. The only non-integer value that is accepted is 'Rawhide', for Rawhide nightly composes. These do not, properly speaking, have a definite release number associated with them: Rawhide is a perpetually rolling tree. The canonical versioning for Rawhide nightly composes is (Rawhide, '', YYYYMMDD). Note that [python-wikitcms][3] uses almost the same versioning concept as fedfind, but Wikitcms 'validation events' for Rawhide nightly composes **do** have a release number: this is a property of the *validation event*, not of the *compose*. Thus there may be a Wikitcms *validation event* (24, Rawhide, 20151012) for the fedfind *compose* (Rawhide, '', 20151012). fedfind and python-wikitcms both recognize this case and will attempt to convert each other's values for convenience.

* **Milestone** indicates the milestone or the type of nightly compose. Valid milestones for current releases are *Alpha*, *Beta*, *Final*, *Branched*, and *PostRelease*. fedfind will accept *Rawhide* as a milestone and convert it to the release - so ('', Rawhide, YYYYMMDD) is not exactly *valid* but will be handled by the CLI and the `get_release` function and converted to (Rawhide, '', YYYYMMDD). Stable releases do not have a milestone; (23, Final, '') will be accepted by `get_release` and the CLI but is treated internally as (23, '', '').

* **Compose** is the precise compose identifier (in cases where one is needed). For TCs and RCs it is e.g. 'RC1' or 'TC5', for nightly composes it is a date in YYYYMMDD format. Stable releases and milestone releases do not have a compose.

Some examples:

* Stable release: (23, '', '')
* Alpha release: (23, Alpha, '')
* TC: (23, Alpha, TC1)
* Branched nightly: (23, Branched, 20150915)
* Rawhide nightly: (Rawhide, '', 20150915)
* Post-release stable nightly: (22, PostRelease, 20150915)

The test suite contains a bunch of tests for `get_release()` which incidentally may function as further examples of accepted usage. The fedfind CLI and `get_release()` are designed to guess omitted values in many cases, primarily to aid unattended usage, so e.g. a script can simply specify ('', Branched, '') to run on each night's branched compose, without having to know what the current Branched release number is. More detailed information on various cases can be found in the `get_release()` function's docstring.

## CLI

The `fedfind` CLI command gives you URLs for a release's images. For instance, `fedfind -r 22` will print the URLs to all Fedora 22 images. You can filter the results in various ways. For more information, use `fedfind -h` and `fedfind images -h`.

## Python module

The Python module provides access to all fedfind's capabilities.

### Example usage

    import fedfind.release
    
    comp = fedfind.release.get_release(release=21)
    query = fedfind.release.Query
    queries = [query('arch', ['ArM', 'x86'], exact=False), query('payload', ['mATe'])]
    
    for img in comp.find_images(queries, orq=True):
        print(img)

### Module design and API

The main parts of fedfind are the `Release` and `Image` classes, in `fedfind.release` and `fedfind.image` respectively. The primary entry point is `fedfind.release.get_release()` - in almost all cases you would start by getting a release using that function, which takes the `release`, `milestone`, `compose` values that identify a release as its three arguments and returns an instance of a `Release` subclass.

You will usually obtain `Image` instances by running queries against `Release` instances, although you *can* instantiate `Image`s directly with the `url` argument and fedfind will do its best to identify the image based on the contents of the URL.

All methods and functions in fedfind are documented directly: please do refer to the docstrings for information on their purposes. Attributes are documented with comments wherever their purpose is not immediately obvious.

All methods, functions, attributes and properties not prefixed with a `_` are considered 'public'. Public method and function signatures and all public data types will only change in major releases. The image identifiers - `imagetype`, `payload` and so on - are considered part of fedfind's interface. Identifiers will only be removed or their types and basic 'templates' changed in major releases, but relatively small changes to their values may be made in minor as well as major releases. Only clear errors will be corrected in patch releases.

#### Image querying

fedfind provides a query interface for images. You can always simply use a `Release` instance's `all_images` property to get *all* its images and filter them however you like. The query interface is available for two reasons. Firstly, `all_images` can be slow for some release classes, particularly Rawhide and Branched nightlies, as it has to run Koji API queries. The `find_images` method for nightly release classes is designed to try and reduce the amount of remote queries run when possible (depending on the queries provided) in order to save time. Secondly, the query interface provides some convenience capabilities like querying for multiple values, ignoring case, negative queries, substring and exact matches, and combining multiple queries as AND or NOT; I found myself constantly re-implementing these on the fly in fedfind consumers, which is why I added the query interface to help. If you don't like it, it's perfectly fine to ignore it.

The query interface basically lets you filter the images for a release based on the contents of the images' attributes. For each attribute you want to do some kind of match against you create an instance of `fedfind.release.Query`, then you stuff all the queries into an iterable and pass it to the `find_images()` method. A `Query` instance takes two arguments, the first being the name of the attribute to match against, and the second being an iterable of terms to match (a single term can be also passed as a string for convenience). The optional arguments `exact` and `neg` can be passed to specify whether the match should be exact or simply a substring match, and whether it should be positive or negative. Matches are *always* case-insensitive (even with `exact=True`).

`find_images()` accepts the `orq` argument to specify whether to treat multiples queries as 'AND' or 'OR'.

For instance, the first query in our earlier example does a substring match on the `arch` attribute for the values 'arm' and 'x86', normalized to lower-case. The second does an exact match on the `payload` attribute for the value 'mate', again normalized to lower-case. Because `orq=True` is passed to `find_images`, it finds all images for which *either* query matches; if `orq` had been set to `False`, it would find all images for which *both* queries match.

An object not having the attribute *at all* is treated the same as it having the attribute with a value of `''`, the empty string.

#### Useful things fedfind can do

fedfind can do some useful stuff that isn't just querying images for releases:

* `Release.wait()` waits for the release to exist. This is useful when you want to fire up every night and do something when a nightly compose is finished.
* `Release.check_expected()` sees if all 'expected' images for the release are present.
* `Release.difference(otherrelease)` tells you what images are present in the release but not in `otherrelease`.
* `helpers.get_current_release()` tells you what the current Fedora release is.

## How it works (roughly)

fedfind has a bunch of knowledge about where to find images wired in. For releases that live in the mirror system, which is everything except nightlies, what it does is call out to `rsync` to scrape an appropriate branch of the mirror tree for the release being queried, then derive a path relative to the top of the mirror tree from the result. It can then combine that with a known prefix to produce an HTTPS URL. (It could also do other stuff with the path but it really doesn't yet; if you're using it as a module, you'll find that images from the mirrors have a `path` attribute which is the path relative to `/pub` on the primary mirror).

For nightlies, it runs a query using the Koji API to find images built as Koji tasks, which is nearly all of them (lives and ARM and Cloud disk images). It finds tasks with relevant methods in approximately the correct timeframe, then narrows the results down to ones stamped with the precise date and the relevant release, then works out the URL for the image produced by each task (from information provided by Koji plus a static URL prefix).

The odd ducks for nightlies are the `boot.iso` images that show up in the mirror system only while that nightly is the current one, but live in mash for rather longer. fedfind basically just knows the magic patterns to use to find those images for Rawhide and Branched nightlies for a given date; it works out the possible locations for all relevant arches and checks if each exists by just trying to access it. Strictly speaking it ought to read the `.treeinfo` file and find out the `boot.iso` location from it, but that's a lot of faffing around for a location that hasn't changed in years, so it's just wired in.

## Caveats

### Speed and resource use

fedfind is not the fastest thing on Earth. When used as a module it caches some searches for the lifetime of the release instance, but it does no caching outside that: it goes out and hits the servers for every query. I would like to make it cache results to disk (and even ship with static map files), particularly for non-nightly releases which rarely change, but it's rather complex to do so - releases *do* change, at least when they move from current to archive (for stable release) and simply drop off the face of the Earth (all other releases), and it's rather tricky to handle that and I just didn't get enough round tuits yet.

It shouldn't use too much bandwidth (though I haven't really measured), but obviously the server admins won't be happy with me if the servers get inundated with fedfind requests, so don't go *completely* crazy with it - if you want to do something script-y, please at least use the module and re-use release instances so the queries get cached.

### Can't find what ain't there

All releases other than stable releases disappear. fedfind can find stable releases all the way back to Fedora Core 1, but it is not going to find Fedora 14 Alpha, Fedora 19 Beta TC3, or nightlies from more than 2-3 weeks ago. This isn't a bug in fedfind - those images literally are not publicly available any more. Nightlies only stick around for a few weeks, TCs/RCs for a given milestone usually disappear once we've moved on another couple of milestones, and pre-releases (Alphas and Betas) usually disappear some time after the release in question goes stable. fedfind will only find what's actually there.

Also note that fedfind is not designed to find even *notional* locations for old non-stable releases. Due to their ephemeral nature, the patterns it uses for nightly builds and TC/RC composes only reflect current practice, and will simply be updated any time that practice changes. It doesn't have a big store of knowledge of what exact naming conventions we used for old composes. If you do `comp = fedfind.release.Compose(12, 'Final', 'TC4')` and read out `comp._rsyncpath` or something what you get is almost certainly *not* the location where Fedora 12 Final TC4 actually lived when it was around.

### No secondary arches

fedfind does not, for the present, handle secondary arches at all. It *will* find PPC images for releases where PPC was a primary arch, though.

## Credits

This is pretty much all my fault. Note that aside from its external deps, older versions of fedfind (up to 1.1.2) included a copy of the `cached_property` implementation maintained [here][4] by Daniel Greenfield. The bundled copy was dropped with version 1.1.3.

## Licensing

Fedora Finder is available under the GPL, version 3 or any later version. A copy is included as COPYING.

[1]: https://www.happyassassin.net/cgit/fedfind
[2]: https://www.happyassassin.net/fedfind/releases
[3]: https://www.happyassassin.net/wikitcms
[4]: https://github.com/pydanny
