---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---

Test markup

{% if site.author.googlescholar %}
  I've done some research! Yay!
{% endif %}

{% include base_path %}

{% for post in site.research reversed %}
  {% include archive-single.html %}
{% endfor %}
