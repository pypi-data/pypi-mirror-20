# bgframework
Django background management full-stack framework

# Page Style

This framework use 'ace-admin-template', demo at http://tkliuxing.github.io/ace/ , document at http://tkliuxing.github.io/ace/docs/

# Add-ons Usage

1. Install this package: `pip install bgframework`
2. Create your Django project
3. Install 'bgframework' and 'sekizai' and 'bootstrapform' into your Django settings `INSTALLED_APPS`:
```python
INSTALLED_APPS = [
    # ... django apps
    'sekizai',
    'bootstrapform',
    'bgframework',
    # ... your apps
]
```
4. Migrate database
5. Put the following code into your 'root url file':
```python
from bgframework.add_ons import get_addons_urls, load_bgframework_addons
load_bgframework_addons()

urlpatterns = [
	# ...
]

urlpatterns += [
	url(r'^addons/', include(get_addons_urls(), namespace="addons")),
]
```
6. Create `bgf_addons.py` file at your Django apps:
```python
from bgframework import add_ons
from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from .views import (
    YourViews01,
    YourViews02,
)

class MyAppAddon(add_ons.BaseAddon):

    # Add-ons url, it look like: 'http://your domain/addons/myapp/...'
    urlpatterns = [
        url(r'myapp/view01/$', YourViews01.as_view(), name="myapp_view01"),
        url(r'myapp/view02/$', YourViews02.as_view(), name="myapp_view02"),
    ]
    # Top navbar display name
    name = _('MyAppName')
    # Second level navbar
    navs = {
        _('MyAppNameNav01'): {                  # display name
            "url_name":"addons:myapp_view01",   # target url
            "sort": 4,                          # sequence number 
            "nav_id":"nav-myapp_view01",        # navbar html element id
            "iconclass":"icon-male",            # icon style
            "group_required":"admin manager"    # required permissions
        },
        _('MyAppNameNav02'): {
            "url_name":"addons:myapp_view02",
            "sort": 5,
            "nav_id":"nav-myapp_view02",
            "iconclass":"icon-reorder",
            "group_required":"customer service"
        },
    }
add_ons.register(MyAppAddon)
```
