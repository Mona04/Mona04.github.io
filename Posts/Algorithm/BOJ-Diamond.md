---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: category
author_profile: true
sidebar:
  nav: "navi"
---

<div>
{% assign entries_layout = 'grid' %}
{% for category in site.categories %}
  {% if category[0] == "BOJ-Diamond"%}
      <h2 class="archive__subtitle">{{ category[0] }}</h2>
      <div class="entries-{{ entries_layout }}">
        {% for post in category.last %}
          {% if post.categories.last == "BOJ-Diamond" %}
            {% include archive-single.html type=entries_layout %}
          {% endif %}
        {% endfor %}
      </div>
      <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  {% endif %}
{% endfor %}
</div>