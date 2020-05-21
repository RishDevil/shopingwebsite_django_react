from django import template
from  cart.models import Order

register=template.Library()

@register.filter
def  carttotal(user):
    if user.is_authenticated:
       order_qs=Order.objects.filter(user=user,ordered=False)
       if order_qs.exists():
           return order_qs[0].item.count()
    return 0

