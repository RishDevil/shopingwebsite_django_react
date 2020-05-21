from cart.models import Product,Order,OrderItem
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    item=serializers.SerializerMethodField()
    total_price=serializers.SerializerMethodField()
    class Meta:
        model=OrderItem
        fields=['quantity','item','total_price']

    def get_item(self,obj):
        return ProductSerializer(obj.product).data   

    def get_total_price(self,obj):
        return   obj.get_total_item_price() 

class OrderSerializer(serializers.ModelSerializer):
    items=serializers.SerializerMethodField()
    
    class Meta:
        model=Order
        fields=['id','items']
    def get_items(self,obj):
        return    OrderItemSerializer(obj.item.all(),many=True).data 

