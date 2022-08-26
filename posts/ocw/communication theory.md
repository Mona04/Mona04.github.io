---
layout: category
author_profile: true
regenerate: true
sidebar:
  nav: "navi"
---

<h2 class="archive__subtitle">강의 정보</h2>

[KOCW 통신이론 고려대 2019 1학기](http://kocw.or.kr/home/search/kemView.do?kemId=1349189)

[교과서](https://www.amazon.com/Fundamentals-Communication-Systems-Global-Author/dp/B00QAXFP1A)

<div>
{% assign entries_layout = 'grid' %}
{% for category in site.categories %}
  {% if category[0] == "communication theory"%}
      <h2 class="archive__subtitle">{{ category[0] }}</h2>
      <div class="entries-{{ entries_layout }}">
        {% for post in category.last %}
            {% include archive-single.html type=entries_layout %}          
        {% endfor %}
      </div>
      <a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
  {% endif %}
{% endfor %}
</div>