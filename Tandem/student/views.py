from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext
from student.models import Student
from event.models import Event
from django import forms


# Create your views here.
def profile(request, student_id):
	student = Student.objects.get(id=student_id)
	events = Event.objects.filter(student=student)
	num_events=len(events)
	variables = {"student" : student, "events" : events, 'num_events': num_events, "stud_id": student.id}
	#print student.firstName
	return render_to_response('profile.html', RequestContext(request, variables))


# class EditStudentForm(forms.Form):
#     preferredName = forms.CharField()
#     dateofBirth = 
#     email = forms.EmailField(required=False)
#     message = forms.CharField(widget=forms.Textarea)

