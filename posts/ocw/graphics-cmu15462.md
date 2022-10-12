---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: category
author_profile: true
regenerate: true
sidebar:
  nav: "navi"
---

<h2 class="archive__subtitle">메모 정보</h2>

[![Image]( https://img.youtube.com/vi/W6yEALqsD7k/0.jpg)](https://youtu.be/W6yEALqsD7k)

[Course Info](http://15462.courses.cs.cmu.edu/fall2022/)

<div>
{% assign entries_layout = 'grid' %}
{% for category in site.categories %}
  {% if category[0] == "graphics-cmu15462"%}
      <h2 class="archive__subtitle">{{ category[0] }}</h2>
      <div class="entries-{{ entries_layout }}">
        {% for post in category.last %}
          {% if post.categories.last == "graphics-cmu15462" %}
            {% include archive-single.html type=entries_layout %}
          {% endif %}
        {% endfor %}
      </div>
      <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  {% endif %}
{% endfor %}
</div>