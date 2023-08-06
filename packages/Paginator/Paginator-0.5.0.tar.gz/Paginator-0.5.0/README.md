# Paginator

Paginator for SQLAlchemy query object, list or iterable

---

## Install

    pip install paginator

### Simple Usage with an iterable

    from paginator import Paginator

    items = range(1, 1000)
    
    items = Paginator(items, page=1, per_page=10)
    
    for item in items:
        pass
    
    

### Simple Usage with an iterable and callback

    from paginator import Paginator

    items = range(1, 1000)
    
    def my_callback(item):
        # do something
        return item
        
    items = Paginator(items, page=1, per_page=10, callback=my_callback)
    
    for item in items:
        pass
       

#### API

**Paginator(query, page=1, per_page=10, total=None, padding=0, callback=None, static_query=False)**
        
        :param query: Iterable to paginate. Can be a query object, list or any iterables
        :param page: current page
        :param per_page: max number of items per page
        :param total: Max number of items. If not provided, it will use the query to count
        :param padding: Number of elements of the next page to show
        :param callback: a function to callback on each item being iterated.
        :param static_query: bool - When True it will return the query as is, without slicing/limit. Usally when using the paginator to just create the pagination.
        :return:
        
### Jinja macro
 
 
    {#: PAGINATION -------------------------------------------------------------- #}
    {#
         :paginator: iterator
         :endpoint:
         :prev: Text for previous button
         :next: Text for Next button
         :class_: A class name for pagination if customed. If you are extending the class
                 best to add the original class and your custom class
                 ie: 'pagination my_custom_pagination' or 'pager my_custom_page'
         :pager: If true it will show a pager instead of numbered pagination
    
    #}
    {% macro pagination(paginator, endpoint=None, prev="", next="", class_=None, pager=False) %}
        {% if not endpoint %}
            {% set endpoint = request.endpoint %}
        {% endif %}
        {% if "page" in kwargs %}
            {% set _ = kwargs.pop("page") %}
        {% endif %}
    
        {%  if not class_ %}
            {% set class_ = "pagination" %}
            {% if pager %}
                {% set class_ = "pager" %}
            {% endif %}
        {% endif %}
    
        {% set _prev_btn = "<span aria-hidden='true'>&larr;</span> %s" % prev %}
        {% set _next_btn = "<span aria-hidden='true'>&rarr;</span> %s" % next %}
    
        <nav>
          <ul class="{{ class_ }}">
    
              {%- if paginator.has_prev %}
                <li class="previous">
                    <a href="{{ url_for(endpoint, page=paginator.prev_page_number, **kwargs) }}">
                         {{ _prev_btn | safe }}</a>
                </li>
              {% else %}
                <li class="disabled previous">
                    <a href="#">{{ _prev_btn | safe }}</a>
                </li>
              {%- endif %}
    
    
                {% if not pager %}
    
                      {%- for page in paginator.iter_pages() %}
                        {% if page %}
                          {% if page != paginator.page %}
                            <li><a href="{{ url_for(endpoint, page=page, **kwargs) }}"
                             rel="me">{{ page }}</a></li>
                          {% else %}
                            <li class="active"><span>{{ page }}</span></li>
                          {% endif %}
                        {% else %}
                          <li><span class=ellipsis>…</span></li>
                        {% endif %}
                      {%- endfor %}
    
                {% endif %}
    
    
              {%- if paginator.has_next %}
                <li class="next">
                    <a href="{{ url_for(endpoint, page=paginator.next_page_number, **kwargs) }}">
                        {{ _next_btn | safe }}</a>
                </li>
              {% else %}
                <li class="disabled next">
                    <a href="#">{{ _next_btn | safe }}</a>
                </li>
              {%- endif %}
          </ul>
        </nav>
    
    {% endmacro %}
    
### DOCUMENTATION IN CONSTRUCTION

---

(c) 2015 Mardix

