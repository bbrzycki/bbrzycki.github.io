---
layout: archive
title: "Code"
permalink: /code/
author_profile: true
---

<!-- {% if site.author.github %}
  I have a GitHub!
{% endif %} -->

{% include base_path %}

{% for post in site.code reversed %}
  {% include archive-single.html %}
{% endfor %}
