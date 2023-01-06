from django.urls import path,re_path

from . import views

app_name = 'contacts'
urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    path('postContact', views.postContact, name='postcontact'),
    path(r'getContacts/', views.getContacts, name='getcontacts'),
]
