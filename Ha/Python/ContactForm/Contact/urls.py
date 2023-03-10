from django.urls import path
from Contact import views

urlpatterns = [
    path("contact", views.contact, name="contact"),
    path("", views.read, name="read"),   
    path("update/<int:pk>", views.update, name="update"),  
    path("delete/<int:pk>", views.delete, name="delete"),  
]
