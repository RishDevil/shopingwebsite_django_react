from .serializers import ProductSerializer,OrderSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from cart.models import Product,Order,OrderItem
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status


class  ProductView(ListAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

class  ProductViewDetail(RetrieveAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer

    def get_object(self):
        slug=self.kwargs.get('slug')
        return get_object_or_404(Product,slug=slug)

class Odersumary(RetrieveAPIView):
    serializer_class=OrderSerializer
    

    def get_object(self):
        try:
            print(self.request.user)
            order=Order.objects.get(user=self.request.user,ordered=False)
            
            # for i in order.item:
                # print (i.title)
              
            return order
        except :
            print('exceptiom')    
     


     
    



class AddToCart(APIView):

    def post(self,request,*args,**kwargs):
        slug=request.data.get('slug')
        if slug is None:
            print('404............',slug)
            return  Response({'message':'invalid request'},status=status.HTTP_400_BAD_REQUEST)
        item=get_object_or_404(Product,slug=slug)
        order_item,create=OrderItem.objects.get_or_create(user=request.user,ordered=False,product=item)
        order_qs=Order.objects.filter(user=request.user,ordered=False)
        print(order_qs)
        if order_qs.exists():
            print(order_qs)
            order=order_qs[0]
            if order.item.filter(product__slug=slug).exists():
                order_item.quantity+=1
                order_item.save()
                
                return  Response("added")

            else:
                order.item.add(order_item)
                
                return  Response("added")
        else:
            order=Order.objects.create(user=request.user)
            order.item.add(order_item)
           
            return  Response("added")   







