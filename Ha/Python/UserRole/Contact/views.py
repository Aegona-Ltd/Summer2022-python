
import json
from django.shortcuts import render,redirect
from django import forms
from .models import User,Role
from datetime import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth import login,authenticate
from django.contrib import messages

# Create your views here.

def contact(request):
    if request.method == 'POST':
        fullname = request.POST.get('fullname')
        companyname = request.POST.get('companyname')
        businessphonne = request.POST.get('businessphonne')
        email = request.POST.get('email')
        password = request.POST.get('password')
        message = request.POST.get('message')
        created_at = datetime.now()
        updated_at = datetime.now()
        roleid_id = 1
        user_data = User(fullname=fullname, companyname=companyname, businessphonne=businessphonne, email=email, password=password, message=message,created_at=created_at, updated_at=updated_at,roleid_id = roleid_id)
        user_data.save()
        return render(request, 'success.html')
    return render(request, 'contact.html')

def read(request):
    contact_list = User.objects.all()
    paginator = Paginator(contact_list, 6) # Show 25 contacts mỗi page

    page_number = request.GET.get("page")
    try:
        contacts = paginator.page(page_number)
    except PageNotAnInteger:
        # Nếu page_number không thuộc kiểu integer, trả về page đầu tiên
        contacts = paginator.page(1)
    except EmptyPage:
        # Nếu page không có item nào, trả về page cuối cùng
        contacts = paginator.page(paginator.num_pages)

    return render(request, "getform.html", {"contacts": contacts})

class Form(forms.ModelForm):  
    class Meta:  
        model = User
        fields = ['fullname', 'companyname', 'businessphonne', 'email', 'password', 'message', 'roleid']
        role = (
            ("staff","Staff"),
            ("customer","Customer"),
        )
        widgets = {'roleid': forms.Select(choices=role)}

def update(request, pk):
    form = User.objects.get(id=pk)
    updateform = Form(instance=form)
    if request.method == 'POST':
        form.created_at = datetime.now()
        form.updated_at = datetime.now()
        updateform = Form(request.POST, instance=form)
        if updateform.is_valid():
            updateform.save()
            return redirect('/')
    context = {
                'id': pk,
                'updateform': updateform,
            }
    return render(request,'update.html',context)

def delete(request, pk):
    form = User.objects.get(id=pk)
    form.delete()
    return read(request)

def login_user(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        roleid = int( request.POST['role'])
        data = (email,password,roleid)
        print(data)
        user =User.objects.values_list('email','password','roleid')
        print(user)
        if data in user:
            if 3 in data:
                return redirect('admin')   
            elif 2 in data:
                return render(request, 'staff.html')
            else:
                return render(request, 'customer.html')
        else:
            messages.info(request, 'Invalid Email or Password')
            return redirect('login')
    else:
        return render(request, 'login.html')


       