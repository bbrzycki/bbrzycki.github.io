---
layout: archive
title: "Code"
permalink: /code/
author_profile: true
---

Here are some coding projects I've worked on!

<!-- {% if site.author.github %}
  I have a GitHub! Poggers!
{% endif %} -->

{% include base_path %}

{% for post in site.code reversed %}
  {% include archive-single.html %}
{% endfor %}
