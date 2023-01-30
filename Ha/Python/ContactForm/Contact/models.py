from django.db import models

# Create your models here.


class Contact(models.Model):
    fullname = models.CharField(max_length=250)
    companyname = models.CharField(max_length=250)
    businessphonne = models.CharField(max_length=10)
    email = models.EmailField()
    password = models.CharField(max_length=10)
    message = models.TextField(max_length=3000)
    created_at = models.DateField()
    updated_at = models.DateField()
    class Meta:
        db_table = 'Contact'
