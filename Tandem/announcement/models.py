from django.db import models

class Announcement(models.Model):
	subject = models.CharField(max_length=100)
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now=True)
