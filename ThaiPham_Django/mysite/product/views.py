import math
from django.shortcuts import render
from .models import Order, Product

# Create your views here.

def getProducts(request):
    itemPerPage = 5
    page = None

    if request.method == "GET" and "page" in request.GET:
        page = int(request.GET["page"])
    else:
        page = 1

    offSet = (page - 1) * itemPerPage
    productList = Product.objects.all()[offSet : offSet + itemPerPage]
    totalproducts = math.ceil(Product.objects.all().count() / 5)
    print(totalproducts)
    context = {"productList": productList, "total": range(totalproducts)}

    return render(request, "products/product.html", context)


def getOrders(request):
    itemPerPage = 5
    page = None

    if request.method == "GET" and "page" in request.GET:
        page = int(request.GET["page"])
    else:
        page = 1

    offSet = (page - 1) * itemPerPage
    orderList = Order.objects.all()[offSet : offSet + itemPerPage]
    totalorders = math.ceil(Order.objects.all().count() / 5)
    print(totalorders)
    context = {"orderList": orderList, "total": range(totalorders)}

    return render(request, "products/order.html", context)
