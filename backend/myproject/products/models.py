from django.db import models
from django.db.models.fields import CharField, DateField, IntegerField

# Create your models here.
class Products(models.Model):
    product_name = models.CharField(max_length=250,blank=False,default='')
    product_code = models.CharField(max_length=200,blank=False,default='')
    price = models.IntegerField(blank=False,default=00)
    brand = models.CharField(max_length=250,blank=False,default='')
    rating = models.CharField(max_length=250,blank=False,default='')
    expire_date = models.DateField(null=True,default='')


