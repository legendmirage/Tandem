from django.db import models

class Message(models.Model):
	student = models.ForeignKey('student.Student')
	subject = models.CharField(max_length=100)
	content = models.TextField()
	receive = models.BooleanField(default=False)
	timestamp = models.DateTimeField('Last Updated')
	thread = models.ForeignKey('messagethread.Messagethread')