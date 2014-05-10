from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django import forms
from event.models import EventForm, Event
from student.models import Student
import datetime

# Create your views here.

def createEvent(request):
	if request.user.is_authenticated():
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
	            return HttpResponseRedirect('/')
		else:
			print "Before form"
			form = EventForm() # An unbound form
			print "HERE"
		variables['form'] = form
		return render_to_response('profile.html', RequestContext(request, variables))
	return HttpResponseRedirect('/login/')

def new(request,student_id):
	if request.user.is_authenticated():
		print "called new"
		if request.POST:
			subject = request.POST['subject']
			description = request.POST['description']
			if 'attention' in request.POST:
				attention = True
			else:
				attention= False
			date = request.POST['date']
			info=date.split("/")
			newdate=info[2]+"-"+info[0]+"-"+info[1]
			student=Student.objects.get(id=student_id)
			e=Event(student=student,attention=attention,description=description,subject=subject,date=newdate)
			e.save()
			print "saved event"
			return HttpResponseRedirect('/student/'+student_id)
		else:
			print "returned empty"
			return render_to_response('profile.html', RequestContext(request, variables))
	return HttpResponseRedirect('/login/')

def delete(request,event_id):
	if request.user.is_authenticated():
		e=Event.objects.get(id=event_id)
		student_id=e.student.id
		e.delete()
		return HttpResponseRedirect('/student/'+str(student_id))
	return HttpResponseRedirect('/login/')
