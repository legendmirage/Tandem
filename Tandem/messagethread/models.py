from django.db import models

# Create your models here.
class Messagethread(models.Model):
	student = models.ForeignKey('student.Student')
	subject = models.CharField(max_length=100)
	unRead = models.BooleanField(default=False)

	def as_json(self):
		return dict(id = self.id, student=self.student.id, student_firstname=self.student.firstName, student_lastname=self.student.lastName, subject=self.subject, unRead=self.unRead)