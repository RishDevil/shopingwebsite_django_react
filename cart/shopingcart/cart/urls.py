from django.urls import path
from . import views
from .views import ProductList,ProductDetail,addtocart


urlpatterns = [
    path('',views.acc,name='acc'),
    path('register',views.Register,name='register'),
    path('login',views.login,name='login'),
    path('newh',ProductList.as_view(),name='newh'),
    path('product/<slug>/',ProductDetail.as_view(),name='product'),
    path('addtocart/<slug>/',addtocart,name='addtocart'),
    
    path('logout',views.logout,name='logout'),
    path('cartuser/<slug>',views.cart,name='usercart')

]
