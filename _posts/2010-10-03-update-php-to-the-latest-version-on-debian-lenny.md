---
layout: post
title: Update PHP to the latest version on Debian Lenny
categories:
- Hosting
tags:
- Debian
- PHP
- Tutorial
status: publish
type: post
published: true
meta:
  _edit_last: '2'
  _wp_old_slug: ''
  wpzoom_post_title: 'Yes'
  wpzoom_post_readmore: 'Yes'
  wpzoom_post_url: ''
---
It's easier than you think.

First you have to add the dotdeb packages to the /etc/apt/sources.list file

<code lang="bash">
deb http://packages.dotdeb.org stable all
deb-src http://packages.dotdeb.org stable all
</code>

if you want the php 5.3 branch, add these lines instead

<code lang="bash">
deb http://php53.dotdeb.org stable all
deb-src http://php53.dotdeb.org stable all
</code>

You have then to install the gpg keys :

<code lang="bash">
gpg --keyserver keys.gnupg.net --recv-key 89DF5277
gpg -a --export 89DF5277 | sudo apt-key add -
</code>

(remove "sudo" if you're already root)

Then do :

<code lang="bash">
apt-get update
apt-get upgrade
</code>

Here you have, the latest PHP version (5.2.14 or 5.3.3 at this moment)
