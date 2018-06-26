---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

Here are some academic research projects I've worked on!

<!-- {% if site.author.googlescholar %}
  I've done some research! Yay!
{% endif %} -->

{% include base_path %}

{% for post in site.research reversed %}
  {% include archive-single.html %}
{% endfor %}
