from django.db import models

# Create your models here.
class Messagethread(models.Model):
	student = models.ForeignKey('student.Student')
	subject = models.CharField(max_length=100)
	unRead = models.BooleanField(default=False)