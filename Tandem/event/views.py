from django.shortcuts import render
from django.shortcuts import render_to_response
from django import forms
from event.models import EventForm
import datetime

# Create your views here.

def createEvent(request):
	variables={}
	print "lol"
	if request.method == 'POST': # If the form has been submitted...
		print "post"
        form = EventForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            subject = form.cleaned_data['subject']
            description = form.cleaned_data['description']
            attention = form.cleaned_data['attention']
            student = form.cleaned_data['student']
            date = form.cleaned_data['date']
            e=Event(student=student,attention=attention,description=description,subject=subject,date=date)
            e.save()
            return HttpResponseRedirect('/') # Redirect after POST
    else:
    	print "Before form"
        form = EventForm() # An unbound form
        print "HERE"
    variables['form'] = form
    return render_to_response('profile.html', RequestContext(request, variables))

def new(request):
	if request.POST:
		subject = request.POST['subject']
		description = request.POST['description']
		attention = request.POST['attention']
		date = request.POST['date']
		student = request.POST['student']
		e=Event(student=student,attention=attention,description=description,subject=subject,date=date)
        e.save()
        return HttpResponseRedirect('/') # Redirect after POST
	else:
		return render_to_response('profile.html', RequestContext(request, variables))