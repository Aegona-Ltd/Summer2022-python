import math
from django.shortcuts import render
from .models import Contact, Company
from django.db.models import F

# Create your views here.
from .forms import ContactForm
from django.views.decorators.csrf import csrf_exempt
import requests


def index(request):
    return render(request, "contacts/contact.html")

@csrf_exempt
def postContact(request):
    # if this is a POST request we need to process the form data
    if request.method == "POST":
        # create a form instance and populate it with data from the request:
        form = ContactForm(request.POST)
        full_name = form["Full_Name"].value()
        company_name = form["Company_Name"].value()
        business_phone = form["Business_Phone"].value()
        email = form["Email"].value()
        message = form["Message"].value()

        capchaRespone = request.POST["g-recaptcha-response"]

        payload = {
            "response": capchaRespone,
            "secret": "6LcdmMwjAAAAADzZNCPFWkfxCCvCG287m_JGMgkJ",
        }

        r = requests.post(
            "https://www.google.com/recaptcha/api/siteverify", params=payload
        )
        if r.status_code == 200:
            if Company.objects.filter(company_name=company_name).exists():
                company_data = Company.objects.get(company_name=company_name)
                Contact.objects.create(
                    company_name_id_id=company_data.pk,
                    full_name=full_name,
                    business_phone=business_phone,
                    email=email,
                    message=message,
                )

            else:
                companyData=Company.objects.create(company_name=company_name)
                Contact.objects.create(
                    company_name_id_id=companyData.pk,
                    full_name=full_name,
                    business_phone=business_phone,
                    email=email,
                    message=message,
                )
        return render(request, "contacts/contact.html")


def getContacts(request):
    itemPerPage = 5
    page = None
   
    if request.method == 'GET' and 'page' in request.GET:
        page = int(request.GET["page"])
    else:
        page = 1   
          
    offSet = (page - 1) * itemPerPage
    contactList = Contact.objects.all().order_by('created_at')[offSet:offSet+itemPerPage]
    totalContacts =  math.ceil(Contact.objects.all().count()/5)
    print(totalContacts)
    context = {"contactList": contactList, "total": range(totalContacts)}

    return render(request, "admins/admin.html", context)


def getContactsByMail(request):
    itemPerPage = 5
    page = int(request.GET["page"])
    r_email = request.GET["email"]
    print(r_email)
    offSet = (page - 1) * itemPerPage
    contactList = Contact.objects.filter(email=r_email).all()[offSet:itemPerPage]
    context = {"contactList": contactList}
    # print(jsonList)
    return render(request, "admins/admin.html", context)


def getContactsByName(request):
    itemPerPage = 5
    page = int(request.GET["page"])
    r_name = request.GET["name"]
    print(r_name)
    offSet = (page - 1) * itemPerPage
    contactList = Contact.objects.filter(full_name=r_name).all()[offSet:itemPerPage]
    context = {"contactList": contactList}
    # print(jsonList)
    return render(request, "admins/admin.html", context)
