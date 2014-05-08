from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.template import RequestContext
from django.contrib.auth import login, authenticate, logout
from accounts.models import RegistrationForm

# Create your views here.
# Code taken from Sylvia's thesis project
def registrationView(request):
    # @summary: 
    #    View to register a new user on the website.
    variables = {}
    if request.method=="POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.save()
            user = authenticate(username=form.cleaned_data["username"], password=form.cleaned_data["password1"])
            login(request, user)
            #return HttpResponseRedirect(user.get_absolute_url())
            return HttpResponseRedirect('/')

    else: #blank form
        form = RegistrationForm()
    variables['form'] = form
    return render_to_response('registration/register.html', RequestContext(request, variables))

def logoutView(request):
    # @summary: 
    #    View to redirect a logout back to the landing page.
    logout(request)
    return HttpResponseRedirect('/')