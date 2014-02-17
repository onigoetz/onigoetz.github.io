---
layout: post
title: Laravel Profiler
categories: []
tags:
- laravel
- profiler
---

After a few years, I took the time to clean up the code of my Profiler and publish it on Github
[https://github.com/onigoetz/profiler](https://github.com/onigoetz/profiler)

Also available on [Packagist](https://packagist.org/packages/onigoetz/profiler)

It's a simple profiler for Laravel 4 able to provide you with precious informations about your code.

This version is still young, but should be quite stable.

7 panels are available for the moment :

- __Time__: gives only the full page execution time for the moment, the idea is to provide a full breakdown of the different parts of the execution, like in the symfony profiler
- __Database__: shows the queries and the bindings
- __Routes__: lists the routes and highlights the matched route
- __Variables__: dumps the GET/POST/FILES/COOKIES/Session/SERVER variables
- __Log__: dumps the logs directly from monolog
- __Files__: lists the loaded files
- __Bookmarklets__: a few useful bookmarklets

I hope this package can help you develop your applications quicker.

