# Bramble contributor agreement

Thank you for contributing to Bramble. This short agreement records one thing: that your
contribution carries the same license as the rest of Bramble, so the apps built from it can keep
shipping through app stores. It is not a copyright assignment, and it is not a traditional
Contributor License Agreement. You keep your copyright.

"You" means the person or organization submitting a contribution. "Contribution" means code,
documentation, translations or other material you intentionally submit to this repository for
inclusion in Bramble, usually in a pull request. "Webvana" means Webvana Inc., which maintains
Bramble.

## What you agree to

1. **Your license.** You license your contribution under the GNU General Public License version 3
   (GPLv3; the text is in [LICENSE](LICENSE)) together with the additional permission for app
   stores under GPLv3 section 7 that is published in
   [APP-STORE-EXCEPTION.md](APP-STORE-EXCEPTION.md). You agree to that permission as it reads at
   commit `8f165e958fdb6b817ad6e6b4477ee1c69b9dde61` of this repository's `main` branch. That
   file is the complete statement of the permission. This agreement does not repeat, add to or
   change it.

2. **AGPL parts are not covered.** `services/mailbox`, and any other path that
   APP-STORE-EXCEPTION.md excludes, is licensed under the GNU Affero General Public License
   version 3 (AGPLv3; see `services/mailbox/LICENSE`). You license a contribution to such a path
   under the AGPLv3 only. The app store permission does not apply to it.

3. **It is yours to give.** You confirm that you wrote the contribution yourself and have the
   right to license it on these terms, or that your employer, or whoever else holds the rights,
   has authorized you to contribute it on these terms. If your contribution includes work by
   others, you say so in the pull request, and that work keeps its own license.

4. **You keep your copyright.** Nothing here transfers ownership of your contribution to Webvana
   or to anyone else. Nothing here lets Webvana or anyone else license your contribution on terms
   other than those in points 1 and 2. In particular, nobody may use this agreement to put your
   contribution under a proprietary license or a permissive license.

5. **Bramble stays free software.** Webvana commits that Bramble's source code remains available
   to everyone under the GPLv3 (the AGPLv3 for the paths in point 2). The app store permission
   only lets the apps be conveyed through app stores. It removes no right anyone has under the
   GPL.

## How you agree

Open your pull request. A bot comments on it asking you to sign. Post this comment on the pull
request, on its own:

> I have read the CLA Document and I hereby sign the CLA

The bot records your GitHub username, your GitHub account id, the pull request number and the time
of the comment in a file on the `cla-signatures` branch of this repository, and the `CLA` check on
the pull request turns green. You sign once; it covers that pull request and your later ones to
this repository. Make your commits with an email address linked to your GitHub account, or the
bot cannot match them to you.

## What this agreement does not cover

Contributions you made before signing. They remain under the GPLv3 alone (the AGPLv3 for the
paths in point 2) unless you agree to the app store permission separately; see "Granted by" in
APP-STORE-EXCEPTION.md.
