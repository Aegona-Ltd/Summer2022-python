from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.Model):
    rolename = models.CharField(max_length=50)

# Create your models here.
class User(AbstractUser):
    # last_login =None
    # is_superuser = None
    # is_staff = None
    # is_active = None
    # first_name = None
    # last_name = None
    # date_joined = None
    # groups = None
    email=models.EmailField( unique=True, blank=False, null=False)
    companyname = models.CharField(max_length=250)
    businessphonne = models.CharField(max_length=10)
    message = models.TextField(max_length=3000)
    created_at = models.DateField(auto_now=True)
    updated_at = models.DateField(auto_now=True)
    roleid = models.ForeignKey(Role, on_delete=models.CASCADE, blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def __str__(self):
        return self.email
