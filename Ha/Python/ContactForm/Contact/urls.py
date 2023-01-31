from django.urls import path
from Contact import views

urlpatterns = [
    path("contact", views.contact, name="contact"),
    path("", views.read, name="read"),   
    path("update/<int:pk>", views.update, name="update"),  
    path("delete/<int:pk>", views.delete, name="delete"),  
]


# urlpatterns = [
#     url(r'^list-posts/$', ListPostView.as_view(), name='list-posts'),
#     url(r'^create-post/$', CreatePostView.as_view(), name='create-post'),
#     url(r'^update-post/(?P<pk>[-\w]+)$', UpdatePostView.as_view(), name='update-post'),
# ]