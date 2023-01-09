from django.urls import path

from . import views

app_name = 'products'
urlpatterns = [
    # ex: /polls/
    # path('', views.index, name='index'),
    path(r'getProducts/', views.getProducts, name='getProducts'),
    path(r'getOrders/', views.getOrders, name='getOrders'),
]
