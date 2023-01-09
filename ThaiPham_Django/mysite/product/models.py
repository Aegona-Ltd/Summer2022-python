from django.db import models

# Create your models here.


class Custumer(models.Model):
    custumer_name = models.CharField(max_length=200)


class Manufactuer(models.Model):
    manufactuer_name = models.CharField(max_length=200)


class Category(models.Model):
    parent_id = models.IntegerField(default=0)
    category_name = models.CharField(max_length=200)


class Product(models.Model):
    product_name = models.CharField(max_length=200)
    product_description = models.CharField(max_length=200)
    product_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    product_quantity = models.IntegerField(default=0)
    product_category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_manufactuer = models.ForeignKey(
        Manufactuer, on_delete=models.CASCADE)


class Order(models.Model):
    order_date = models.DateTimeField(auto_now_add=True)
    order_quantity = models.CharField(max_length=200)
    custumer = models.ForeignKey(Custumer, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
