from django.db import models

class Student(models.Model):
	firstName = models.CharField(max_length=15)
	lastName = models.CharField(max_length=25)
	preferredName = models.CharField(max_length=15)
	parent1 = models.CharField(max_length=40)
	parent2 = models.CharField(max_length=40)
	birthdate = models.DateTimeField('Date of Birth')
	# parent1_email=models.CharField(max_length=25)
	# parent2_email=models.CharField(max_length=25)
	# parent1_phone=models.CharField(max_length=25)
	# parent2_phone=models.CharField(max_length=25)

