from django.urls import path
from Contact import views
from rest_framework_simplejwt import views as jwt_views
urlpatterns = [
    path("contact", views.contact, name="contact"),
    path("update/<int:pk>", views.update, name="update"),  
    path("delete/<int:pk>", views.delete, name="delete"),  
    path('login/',views.login_user, name='login'),
    path("", views.read, name="read"),   
]
