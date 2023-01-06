from django import forms

class ContactForm(forms.Form):
    Full_Name = forms.CharField()
    Company_Name = forms.CharField()
    Business_Phone = forms.CharField()
    Email = forms.CharField()
    Message = forms.CharField()

class Email(forms.Form):
    Email = forms.CharField()
