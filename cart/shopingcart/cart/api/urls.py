from django.urls import path
from .views import ProductView,ProductViewDetail,AddToCart,Odersumary

urlpatterns = [
    path('', ProductView.as_view()),
    path('<slug>/',ProductViewDetail.as_view()),
    path('addcart/a',AddToCart.as_view()),
    path('odersumary',Odersumary.as_view())
    

    ]