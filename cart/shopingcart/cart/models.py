from django.db import models
from django.conf import settings
from  django.shortcuts import reverse

# Create your models here.


class Product(models.Model):
    title=models.CharField(max_length=15,default='a')
    price=models.FloatField(max_length=15,default=0)
    slug=models.SlugField(default=0)
    # image=models.ImageField(upload_to='documents/',default='')

    def __str__(self):
        return  self.title

    def get_absolute_url(self):
        return reverse("product",kwargs={'slug':self.slug})

    def get_absolute_url_cart(self):
        return reverse("addtocart",kwargs={'slug':self.slug})
    def get_absolute_url_cartview(self):
        return reverse("usercart",kwargs={'slug':self.slug})

class OrderItem(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True)
    ordered=models.BooleanField(default=False)
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.IntegerField(default=1)

    def get_total_item_price(self):
        return self.quantity*self.product.price


class Order(models.Model):
     user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,null=True)
     ordered=models.BooleanField(default=False)
     item=models.ManyToManyField(OrderItem)


