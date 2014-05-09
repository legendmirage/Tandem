from django.db import models

class Message(models.Model):
	student = models.ForeignKey('student.Student')
	subject = models.CharField(max_length=100)
	content = models.TextField()
	receive = models.BooleanField(default=False)
	timestamp = models.DateTimeField('Last Updated')
	thread = models.ForeignKey('messagethread.Messagethread')

	def as_json(self):
		return dict(id=self.id, stud_id=self.student.id, subject=self.subject, content=self.content, receive=self.receive, thread_id=self.thread.id, time=str(self.timestamp))