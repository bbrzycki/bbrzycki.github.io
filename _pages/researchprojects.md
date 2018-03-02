---
layout: archive
title: "Research Projects"
permalink: /researchprojects/
author_profile: true
---

Test markup

{% if site.author.googlescholar %}
  I've done some research! Yay!
{% endif %}

{% include base_path %}

{% for post in site.researchprojects reversed %}
  {% include archive-single.html %}
{% endfor %}
