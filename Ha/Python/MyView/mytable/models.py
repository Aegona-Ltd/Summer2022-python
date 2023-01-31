from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    fullname = models.CharField(max_length=250)
    companyname = models.CharField(max_length=250)
    businessphonne = models.CharField(max_length=10)
    message = models.TextField(max_length=3000)
    created_at = models.DateField()
    updated_at = models.DateField()
    roleid = models.ForeignKey(Role, on_delete=models.CASCADE)

    USERNAME_FIELD = 'email'