from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from message.models import Message
from student.models import Student
from messagethread.models import Messagethread
import datetime

# Create your views here.
def allMessages(request):
	messages = Message.objects.order_by('-timestamp')
	threads = Messagethread.objects.all()
	threadIDs = [t.id for t in threads]
	variables = {'messages': messages, 'messageThreads': threads, 'threadIDs': threadIDs}
	return render_to_response('message.html', RequestContext(request, variables))

def messagesByThread(request, threadID):
	t = Messagethread.objects.get(id=threadID)
	messages = Message.objects.filter(thread=t)
	variables = {'messagesByThread': messages}
	return render_to_response('message.html', RequestContext(request, variables))

def new(request):
	if request.POST:
		lastname = request.POST['recipient'].split(',')[0]
		stud = Student.objects.get(lastName=lastname)
		subj = request.POST['subject']
		details = request.POST['details']
		t = Messagethread(student=stud, subject=subj)
		t.save()
		m = Message(student=s, subject=subj, content=details, timestamp=datetime.now(), thread=t)
		m.save()
	return allMessages(request)
