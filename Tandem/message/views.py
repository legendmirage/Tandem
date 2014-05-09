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
	students = Student.objects.order_by('lastName')
	threadIDs = [t.id for t in threads]
	studentNames = [s.lastName + ", " + s.firstName for s in students]

	numUnread = {} #maps stud id to num unread threads
	studToThread = {} #maps stud id to threads
	threadToMsgs = {} #maps thread id to messages
	for stud in students:
		numUnread[stud.id] = 0
		studToThread[stud.id] = []
	for t in threads:
		msgs = Message.objects.filter(thread=t);
		threadToMsgs[t.id] = [msg.as_json() for msg in msgs]
		if t.unRead:
			numUnread[t.student.id] += 1
			studToThread[t.student.id].append(t.as_json())


	variables = {'studentNames':studentNames, 'threadToMsgs':threadToMsgs, 'studToThread': studToThread, 'numUnread':numUnread, 'messages': messages, 'messageThreads': threads, 'threadIDs': threadIDs, 'students': students}
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
