from django.shortcuts import render,redirect
from django import forms
from .models import Contact
from datetime import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


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
        contact_data = Contact(fullname=fullname, companyname=companyname, businessphonne=businessphonne, email=email, password=password, message=message,created_at=created_at, updated_at=updated_at)
        contact_data.save()
        return render(request, 'success.html')
    return render(request, 'contact.html')

def read(request):
    # readcontact = Contact.objects.all()
    # return render(request, 'getform.html',{'readcontact': readcontact})
    contact_list = Contact.objects.all()
    paginator = Paginator(contact_list, 6) # Show 25 contacts mỗi page

    page_number = request.GET.get("page_number")
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
        model = Contact
        fields = ['fullname', 'companyname', 'businessphonne', 'email', 'password', 'message']

def update(request, pk):
    form = Contact.objects.get(id=pk)
    updateform = Form(instance=form)
    if request.method == 'POST':
        updateform = Form(request.POST, instance=form)
        if updateform.is_valid():
            updateform.save()
            return read(request)
    context = {
                'id': pk,
                'updateform': updateform,
            }
    return render(request,'update.html',context)

def delete(request, pk):
    form = Contact.objects.get(id=pk)
    form.delete()
    return read(request)
