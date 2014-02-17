---
layout: post
title: New Theme for PHPDocumentor
categories:
- PHP
tags:
- PHP
- phpDocumentor
---
Last week I installed a Continuous Integration server (What a pain ! After trying Cruise Control and Sonar, I can tell that Hudson is the best of the three) and in this process I had to install PHPDocumentor to generate my documentation.

As the base themes didn't satisfy me, I had to look for other ones and I found two :

1. [http://zymengine.com/dev/news/30-phpdoc-extjs-converter-template](http://zymengine.com/dev/news/30-phpdoc-extjs-converter-template)
2. [http://evolve.crazytje.be/](http://evolve.crazytje.be/)

The first one is pretty cool, based on the ExtJS library and really easy to use.

The second one is an evolution of the first one without frames (I hate frames) and this time coded with JQuery.

But the second version dropped the tabs...
<img style="float:right" title="Tabbed theme Screenshot" src="https://raw.github.com/onigoetz/phpdoc_template-tabbed/master/screenshot.png" alt="Evolve 0.7 Screenshot" width="300" height="198" />
What my version offers :

- Tabs, added with jQuery UI Tabs
- Some icons used from Famfamfam's Silk icons pack
- New look, as a mac user ... I like OS X design...
- Cleaner interface

I didn't add the ability to search like in the first version, but I will add it when I need it.

## [Download](https://github.com/onigoetz/phpdoc_template-tabbed/archive/0.7.0.zip)


The code is provided as is, I created it for my own use and publish it in case someone would want it. Enjoy ;-)

## Install
To install it it's easy. Unzip the folder and copy the content of `src` to the phpDocumentor folders.
for me it was :

	/usr/share/php/PhpDocumentor/phpDocumentor/Converters/HTML/Smarty/Evolve
	/usr/share/php/data/PhpDocumentor/phpDocumentor/Converters/HTML/Smarty/Evolve
	
I had problems when I put the file only in one place.
Then to use, type :

	./phpdocumentor/phpdoc -o HTML:Smarty/Evolve:default <your options here>