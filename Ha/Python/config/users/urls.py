from users import views
from django.urls import path
from django.contrib.auth import views as auth_views
urlpatterns = [
    path("contact", views.contact, name="contact"),
    path("update/<int:pk>", views.update, name="update"),  
    path("delete/<int:pk>", views.delete, name="delete"),  
    path('login/',views.login_user, name='login'),
    path('logout/',auth_views.LogoutView.as_view(next_page='login'),name='logout'),
    path("admin", views.read, name="admin"),   
]

