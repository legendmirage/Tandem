from django.db import models
from django import forms

class Event(models.Model):
	student = models.ForeignKey('student.Student')
	#teacher = models.ForeignKey('teacher.Teacher')
	subject = models.CharField(max_length=100)
	description = models.TextField()
	date = models.DateField()
	attention = models.BooleanField(default=False)

class EventForm(forms.Form):
	subject=forms.CharField(max_length=100)
	description=forms.CharField()
	date=forms.DateField(initial=datetime.date.today)
	attention=forms.BooleanField(default=False)