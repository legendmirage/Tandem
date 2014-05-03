from django.db import models

class Announcement(models.Model):
	subject = models.CharField(max_length=100)
	#teacher = models.ForeignKey('teacher.Teacher')
	content = models.TextField()
	timestamp = models.DateTimeField('Last Updated')
