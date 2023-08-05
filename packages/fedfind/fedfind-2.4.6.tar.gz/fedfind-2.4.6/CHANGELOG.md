## Changelog

### 2.4.6 - 2016-04-28

*   [fedfind-2.4.6.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.6.tar.xz)

1.  `get_release`: handle 2 Week Atomic 'compose IDs' as `cid`
2.  `PostRelease`: make `respin` a str, not an int (technically an API change but...meh)

### 2.4.5 - 2016-04-14

*   [fedfind-2.4.5.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.5.tar.xz)

1.  `helpers.get_weight`: allow ignoring arch

### 2.4.4 - 2016-04-10

*   [fedfind-2.4.4.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.4.tar.xz)

1.  `helpers.pdc_query`: handle non-paged queries
2.  **NEW** `helpers.get_weight`: indicate how important an image is (for sorting download tables etc.)

### 2.4.3 - 2016-03-30

*   [fedfind-2.4.3.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.3.tar.xz)

1.  Re-add `Milestone` class for milestone releases, now we have F24 Alpha

### 2.4.2 - 2016-03-30

*   [fedfind-2.4.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.2.tar.xz)

1.  Don't use PDC for `get_package_nvras` for Pungi 4 composes temporarily (pdc-updater GitHub issue #10)

### 2.4.1 - 2016-03-21

*   [fedfind-2.4.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.1.tar.xz)

1.  Tests require mock as well as pytest (in setup.py)
2.  Fix the tests to run in Koji (hopefully)

### 2.4.0 - 2016-03-21

*   [fedfind-2.4.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.4.0.tar.xz)

1.  **API** `Release.get_package_nvras` replaces `get_package_versions`, outputs N(E)VRAs now
2.  CLI: allow specifying release by compose ID or label as well as release/milestone/compose/respin
3.  `helpers.pdc_query` now handles query params as a tuple list as well as as a dict
4.  `setup.py` test integration: now you can run `python setup.py test`

### 2.3.0 - 2016-03-17

*   [fedfind-2.3.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.3.0.tar.xz)

1.  **API** Drop `payload` image property in favour of productmd `subvariant`
2.  Synthesize `subvariant` for non-Pungi 4 composes
3.  **NEW** Reintroduce `Compose` release class for mirrored candidate composes
4.  Extend test coverage
5.  Fix `Postrelease` instances with respin 0 (they weren't locating properly before)
6.  Fix `exists` for all pre-Pungi 4 release types (it was recursing infinitely...oops)
7.  `helpers.label_from_cid` now bails without wasting a remote trip if type is not 'production'
8.  Fix some issues with `version` property for Pungi 4 production composes

### 2.2.3 - 2016-03-17

*   [fedfind-2.2.3.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.2.3.tar.xz)

1.  Fix `get_release` when passing a Rawhide compose ID

### 2.2.2 - 2016-03-16

*   [fedfind-2.2.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.2.2.tar.xz)

1.  Fix `helpers.get_size()` with Python 3

### 2.2.1 - 2016-03-16

*   [fedfind-2.2.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.2.1.tar.xz)

1.  Add missing CHANGELOG entry for 2.2.0

### 2.2.0 - 2016-03-16

*   [fedfind-2.2.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.2.0.tar.xz)

1.  **NEW** `cid_from_label` and `label_from_cid` helpers (they do what they say on the tin)
2.  **NEW** `Production` release class representing 'production' composes on kojipkgs
3.  **NEW** `Release.get_package_versions` method moved here from python-wikitcms
4.  `Release.previous_release` for all Pungi 4 releases now goes through PDC
5.  `get_release` can now handle URL, compose ID, and compose label
6.  Major updates to tests (better coverage of helpers and release, all tests run offline)
7.  A few miscellaneous bug fixes

### 2.1.1 - 2016-03-03

*   [fedfind-2.1.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.1.1.tar.xz)

1. Fix `check_expected()` for mixed-case payloads

### 2.1.0 - 2016-03-02

*   [fedfind-2.1.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.1.0.tar.xz)

1. Mixed-case payloads (to match productmd variants more closely)
2. Fix Atomic identification (Atomic images were incorrectly assigned payload 'cloud' in 2.0.0)
3. Fix type for Atomic installer images with final names in old releases
4. Restore some special case handling from 1.x for tricky old release image filenames
5. Use 'Everything' not 'generic' as the payload for old release 'generic' images
6. Move compose ID parsing into `helpers` (so wikitcms can share it)
7. Don't crash in `all_images` for `Pungi4Release` instances that don't exist
8. Make the fake compose IDs for non-Pungi 4 releases a bit better
9. Fix `find_cid()` when there is no compose ID (should return '', not crash)
10. **NEW** add `branched` boolean arg for `get_current_release()` (will return Branched if it exists)

### 2.0.0 - 2016-02-29

*   [fedfind-2.0.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-2.0.0.tar.xz)

fedfind 2.0 is a **really major** release which pretty much rewrites fedfind for a world where Fedora composes are done with Pungi 4. It is more incompatible than not with fedfind 1.x, existing users are almost certain to need changes. Only the CLI interface is mostly unchanged (the `--respin / -i` argument is added, but is optional and all previous invocations should still work and return as close as possible to the same results).

If you have code which uses fedfind you may *seriously consider* stopping using it entirely; it is possible you can achieve your requirements now with Pungi 4 compose metadata and information from [PDC](https://pdc.fedoraproject.org). The primary use cases for fedfind now are only locating composes (if fedmsg messages are not sufficient for you; the locations of new composes are sent out via fedmsg now), synthesizing the `payload` concept which is still missing from productmd, and (to an extent) making it possible to interact with non-Pungi 4 composes in the same way as Pungi 4 composes, if you need to do that (i.e. if you need to deal with old stable releases or the two-week Atomic nightly composes). If you do not need to do any of those things you likely no longer need fedfind.

1. **API** `Image` and `Query` classes dropped entirely
2. **API** `kojiclient.py` (and the `ClientSession` class) removed
3. **API** Many now-unneeded constants from `fedfind.const` removed
4. **API** `respin` concept added to versioning to account for Pungi 4 composes using it
5. **API** `Compose` and `Milestone` classes temporarily dropped as we don't yet know how to do them with Pungi 4
6. **API** `Release.all_images` is now a list of productmd-style image dicts, not of fedfind `Image` instances
7. **API** `Release.koji_done` and `Release.pungi_done` replaced by a single `Release.done` property
8. **API** `Release.check_expected` and `Release.difference` now return `(payload, type, arch)` 3-tuples
9. **API** `Release.find_images` is removed
10. **API** `Release.image_from_url_or_path` is removed
11. **API** `Nightly.all_boot_images` and `Nightly.all_koji_images` are removed
12. **API** `Nightly.get_koji_tasks` and `Nightly.get_koji_images` are removed
13. **API** `MirrorRelease.get_mirror_images()` is removed
14. **API** use unicode literals and print function on Python 2
15. **NEW** `Release.metadata` dict of productmd-style metadata is added
16. **NEW** `Release.location` top-level release location property is added (faked up for non-Pungi 4 releases)
17. **NEW** `Release.cid` 'compose ID' property is added (sloppily faked for non-Pungi 4 releases)
18. **NEW** `Release.all_paths` added (though you're most likely to want `all_images`)
19. Synthesis of `payload` property adapted from old `Image` code
20. Synthesis of partly productmd-compatible metadata for non-Pungi 4 composes
21. Some embryonic support for querying stuff in PDC

### 1.6.2 - 2015-10-02

*   [fedfind-1.6.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.6.2.tar.xz)

1.  Updated location of PostRelease releases (they got moved)

### 1.6.1 - 2015-09-29

*   [fedfind-1.6.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.6.1.tar.xz)

1.  Rewrite `get_release()` and add tests for it (API and expected results do not change)
2.  Fix `get_current_release()` for Python 3
3.  Revise documentation somewhat

### 1.6 - 2015-09-19

*   [fedfind-1.6.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.6.tar.xz)

1.  **API** Treat 'docker' as an `imagetype` (replacing 'filesystem') not a `loadout`
2.  **NEW** Add `shortdesc` attribute for images (shorter description)
3.  **NEW** Add `helpers.get_current_release()` using pkgdb API (better than rsync scrape)
4.  **NEW** Add `PostRelease` class for post-release stable nightly composes
5.  **API** Change `expected_images()`, `difference()` and `check_expected()` to use a 4-tuple with `imagesubtype` included
6.  **API** Catch more 'cloud atomic' image variants properly
7.  **NEW** Add `canned` imagetype, use it for the Cloud Atomic installer image
8.  **API** For images with `subflavor`, `payload` is now `(flavor)_(subflavor)`, not `(flavor) (subflavor)`

### 1.5.1 - 2015-09-02

*   [fedfind-1.5.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.5.1.tar.xz)

1.  **NEW** Add `size` attribute for images
2.  Treat images with 'SRPMS' in their names as `source` imagetype (really old releases)
3.  **NEW** Add `imagesubtype` attribute for images (Vagrant and disk images have various subtypes)

### 1.5 - 2015-08-27

*   [fedfind-1.5.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.5.tar.xz)

1.  Return rsync retcodes properly in `rsync_helper()`
2.  Have `url_exists()` only return `False` for rsync when 'not found' return code hit
3.  Retry rsync commands when server is full
4.  **NEW** Add `wait()` method for Releases to wait for the compose to exist
5.  Sanity check URLs passes to `url_exists()`
6.  Add pytext/tox test framework and tests
7.  Make `expected_images` more accurate, add Cloud images

### 1.4.2 - 2015-08-21

*   [fedfind-1.4.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.4.2.tar.xz)

1.  Python 3 fix (broke non-nightly image searching and a few other things on Py3...)

### 1.4.1 - 2015-08-21

*   [fedfind-1.4.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.4.1.tar.xz)

1.  Fix a bug in `koji_done` caused by the query opt fixes in 1.4
2.  Add Branched release guessing (so you can pass `-m Branched` and it will guess the release number). Will also guess today's date if you don't pass `-c`
3.  Fix a bug in rsync calls which meant we were getting more data than we meant to

### 1.4 - 2015-08-20

*   [fedfind-1.4.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.4.tar.xz)

1.  Drop the `multiprocessing` stuff from 1.3, use xmlrpclib `multicall` to batch Koji requests instead
2.  Improve the Koji caching mechanism for partial matches
3.  Fix wrong opt names in Koji query opts (some queries weren't actually doing what they meant to do at all)

### 1.3 - 2015-08-20

*   [fedfind-1.3.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.3.tar.xz)

1.  Fix `-r NN` in the CLI (broken in 1.2)
2.  Add `previous_release` property for Releases
3.  Various improvements to image parsing (find more images and identify them more accurately)
4.  Add `difference()` method for Releases (show images that are in this release but not the other)
5.  Add `check_expected()` method for Releases (check if all 'important' images are present)
6.  **API**: rename `find_task_url()` to `find_task_images()` and make it return all images (not just one)
7.  Add `find_task_urls()` which actually returns URLs
8.  Add a Koji query cache mechanism for `Nightly` instances
9.  Add `koji_done()` and `pungi_done()` properties (for all Releases, but mostly useful for `Nightly`)
10. Parallelize Koji queries using `multiprocessing`

### 1.2 - 2015-07-23

*   [fedfind-1.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.2.tar.xz)

1.  Add a proper logging mechanism
2.  Allow 'Rawhide' as a release value (but, unfortunately, broke `-r NN` in the CLI)

### 1.1.5 - 2015-04-30

*   [fedfind-1.1.5.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.1.5.tar.xz)

1.  Add a `-g` parameter that prints the 'generic' URL for the given release
2.  Allow `--milestone Branched` and `--milestone Rawhide` (they are never really necessary, but it's not unusual to pass them instinctively, and as we can handle them, better to do so than fail)

### 1.1.4 - 2015-04-23

*   [fedfind-1.1.4.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.1.4.tar.xz)

1.  Drop shebangs from files that can't be executed, use 'env' in shebangs in files that can be executed, don't specify a python version in shebangs (as fedfind is python version-agnostic)

### 1.1.3 - 2015-04-16

*   [fedfind-1.1.3.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.1.3.tar.xz)

1.  Drop bundled copy of cached-property, as it's now packaged for Fedora and EPEL (and available from pypi on other platforms)

### 1.1.2 - 2015-03-10

*   [fedfind-1.1.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.1.2.tar.xz)

1.  Update milestone release mirror path: now uses _ not - as separator

### 1.1.1 - 2015-02-26

*   [fedfind-1.1.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.1.1.tar.xz)

1.  Handle an argparse bug upstream which causes a crash instead of a nice usage message when invoked with no subcommand

### 1.1.0 - 2015-02-26

*   [fedfind-1.1.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.1.0.tar.xz)

1.  Python 3 support
2.  Cleaner approach to using dl.fedoraproject.org instead of download.fedoraproject.org URLs for some images (see 1.0.8)

### 1.0.8 - 2015-02-25

*   [fedfind-1.0.8.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.8.tar.xz)

1.  Use dl.fedoraproject.org URLs, not download.fedoraproject.org, for TC/RC images

### 1.0.7 - 2015-02-25

*   [fedfind-1.0.7.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.7.tar.xz)

1.  Fix a bug which broke finding nightly Koji images by type

### 1.0.6 - 2015-02-18

*   [fedfind-1.0.6.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.6.tar.xz)

1.  Adjustments for the attempt to consolidate versioning across fedfind, python-wikitcms and relval using `release`, `milestone`, `compose` attributes to identify all images/events
2.  Misc. bug fixes and doc cleanups
3.  Add `version` attribute for `Image` objects

### 1.0.5 - 2015-02-12

*   [fedfind-1.0.5.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.5.tar.xz)

1.  Some refinements and bug fixes in image detection
2.  Provide a sort weight property for images
3.  Use xmlrpclib instead of koji to improve portability

### 1.0.4 - 2015-02-09

*   [fedfind-1.0.4.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.4.tar.xz)

1.  Bugfix to the EL 6 compatibility

### 1.0.3 - 2015-02-09

*   [fedfind-1.0.3.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.3.tar.xz)

1.  A lot of pylint cleanups, including various bugfixes found along the way
2.  Python 2.6 compatibility + subprocess32 usage made optional == EL 6 compatibility! Repo now has EL6 and EL7 builds. Note, requires EPEL (for koji package)

### 1.0.2 - 2015-02-06

*   [fedfind-1.0.2.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.2.tar.xz)

1.  Multiple small bugfixes and cleanups (mainly to Koji querying)
2.  Rejigged how the CLI command is implemented (doesn't change usage from the RPM, lets you run `./fedfind.py` directly from a git checkout if you like)

### 1.0.1 - 2015-02-06

*   [fedfind-1.0.1.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.1.tar.xz)

1.  Add ppc to arch list

### 1.0 - 2015-02-05

*   [fedfind-1.0.tar.xz](https://www.happyassassin.net/fedfind/releases/fedfind-1.0.tar.xz)

1.  Initial release of fedfind
