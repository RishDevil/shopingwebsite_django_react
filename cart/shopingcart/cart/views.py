from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from django.contrib import messages
from django.contrib import messages
from django.views.generic import ListView,DetailView
from .models import  Product,Order,OrderItem
from django.shortcuts import get_object_or_404,render


# Create your views here.
def logout(requests):
    auth.logout(requests)
    return redirect('login')

def newh2(requests):
    return render(requests,"newh2.html")

@login_required
def newh(requests):
    return render(requests,"newh.html")

def acc(requests):
    return render(requests,"homeacc.html")
def login(requests):
    if requests.method=='POST':
        u=requests.POST["uname"]
        p=requests.POST["pass"]
        user=auth.authenticate(username=u,password=p)
        if user is not None:
           auth.login(requests,user)
           requests.session['username']=u
           requests.session['pass']=p
           return redirect('newh')
        else:
            messages.info(requests,'invalid credentials')
            return redirect('login')


    else:
        if requests.session.has_key('username'):
            return render(requests,'login.html',{'name':requests.session['username'],'pass':requests.session['pass']})
        else:

            return render(requests,'login.html')
def Register(requests):
    if requests.method =='POST':
        fname=requests.POST["firstname"]
        lname=requests.POST["lastname"]
        uname=requests.POST["username"]
        p1=requests.POST["pass1"]
        p2=requests.POST["pass2"]
        emaile=requests.POST["email"]
        if(p1==p2):

            if User.objects.filter(username=uname).exists():
                messages.info(requests,'user exists')
                return redirect('register')

            elif User.objects.filter(email=emaile).exists():
                messages.info(requests,'email exists')
                return redirect('register')
            else :
                user=User.objects.create_user(username=uname,password=p1,email=emaile,first_name=fname,last_name=lname)
                user.save();
                return redirect('')
        else :
            messages.info(requests,'password mismatch')
            return redirect('register')
    else :
     return render(requests,'register.html')
from django.shortcuts import render

# Create your views here.

class ProductList(LoginRequiredMixin,ListView):
    model=Product
    template_name = 'newh.html'


class ProductDetail(LoginRequiredMixin,DetailView):
    model=Product
    template_name = 'newh2.html'

@login_required
def addtocart(request,slug):
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
            messages.info(request,"add to cart")
            return redirect('product',slug=slug)

        else:
            order.item.add(order_item)
            messages.info(request,"add to cart")
            return redirect('product',slug=slug)
    else:
        order=Order.objects.create(user=request.user)
        order.item.add(order_item)
        messages.info(request," addeed")
        return redirect('product',slug=slug)
 


def cart(request,slug):
    list=[]
    try:
        order_qs=Order.objects.get(user=request.user,ordered=False)
        

    except:
        return redirect('product',slug=slug)

 
    return render(request,'cart.html',{'o':order_qs})





