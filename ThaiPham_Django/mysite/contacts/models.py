from django.db import models

# Create your models here.


class Company(models.Model):
    company_name = models.CharField(max_length=200)


class Contact(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    full_name = models.CharField(max_length=200)
    business_phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    message = models.CharField(max_length=200)
    company_name_id = models.ForeignKey(Company, on_delete=models.CASCADE)


