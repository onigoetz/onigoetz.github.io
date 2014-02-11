---
layout: post
title: Update PEAR to the latest version
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
  wpzoom_post_url: ''
  wpzoom_post_readmore: 'Yes'
  wpzoom_post_title: 'Yes'
---
Debian is a very good distrib.

But sometimes it's need of stability keeps us on old versions.

so here are the instructions to update PEAR php.

<code lang="bash">
pear update-channels
pear upgrade-all
</code>

Done !
