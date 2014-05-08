from django.db import models

class Event(models.Model):
	student = models.ForeignKey('student.Student')
	#teacher = models.ForeignKey('teacher.Teacher')
	subject = models.CharField(max_length=100)
	description = models.TextField()
	date = models.DateField()
	attention = models.BooleanField(default=False)
