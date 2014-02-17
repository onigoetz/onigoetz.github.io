---
layout: post
title: Update PHP to the latest version on Debian Lenny
categories:
- Hosting
tags:
- Debian
- PHP
- Tutorial
---
It's easier than you think.

First you have to add the dotdeb packages to the /etc/apt/sources.list file

{% highlight bash %}
deb http://packages.dotdeb.org stable all
deb-src http://packages.dotdeb.org stable all
{% endhighlight %}

if you want the php 5.3 branch, add these lines instead

{% highlight bash %}
deb http://php53.dotdeb.org stable all
deb-src http://php53.dotdeb.org stable all
{% endhighlight %}

You have then to install the gpg keys :

{% highlight bash %}
gpg --keyserver keys.gnupg.net --recv-key 89DF5277
gpg -a --export 89DF5277 | sudo apt-key add -
{% endhighlight %}

(remove "sudo" if you're already root)

Then do :

{% highlight bash %}
apt-get update
apt-get upgrade
{% endhighlight %}

Here you have, the latest PHP version (5.2.14 or 5.3.3 at this moment)
