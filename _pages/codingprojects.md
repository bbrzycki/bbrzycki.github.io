---
layout: archive
title: "Coding Projects"
permalink: /codingprojects/
author_profile: true
---

{% if site.author.github %}
  I have a GitHub! Poggers!
{% endif %}

{% include base_path %}

{% for post in site.codingprojects reversed %}
  {% include archive-single.html %}
{% endfor %}
