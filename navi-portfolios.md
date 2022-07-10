---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: category
author_profile: true
regenerate: true
read_time: true
sidebar:
  nav: "navi"
---

#### 자기소개

+ ```Ue4```, ```hlsl```, ```c++```, ```wpf``` 위주로 공부 중입니다. 



<br/>

<div>
{% assign entries_layout = 'grid' %}
{% for category in site.categories %}
  {% if category[0] == "Portfolio"%}
      <h2 class="archive__subtitle">{{ category[0] }}s</h2>
      <div class="entries-{{ entries_layout }}">
        {% for post in category.last %}
          {% include archive-portfolio.html type=entries_layout %}
        {% endfor %}
      </div>
      <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  {% endif %}
{% endfor %}
</div>
