
requiremnets.txt

-e git://github.com/pmaigutyak/mp-flatpages.git#egg=mp-flatpages


urls.py

from flatpages.views import flatpage


urlpatterns = [
    url(r'^(?P<url>.*)$', flatpage, name='flatpage'),
]
