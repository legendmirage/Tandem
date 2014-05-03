from django.db import models

class Message(models.Model):
	student = models.ForeignKey('student.Student')
	#teacher = models.ForeignKey('Teacher'), should we use a teacher class?
	subject = models.CharField(max_length=100)
	content = models.TextField()
	sentByTeacher = models.BooleanField(default=True)
	timestamp = models.DateTimeField('Last Updated')
	read = models.BooleanField(default=False)
	replied = models.BooleanField(default=False)