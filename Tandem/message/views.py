from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from message.models import Message
from student.models import Student
from messagethread.models import Messagethread
import datetime
from django.http import HttpResponseRedirect, HttpResponse
from django.http import Http404

# Create your views here.
def allMessages(request):
	if request.user.is_authenticated():
		messages = Message.objects.order_by('-timestamp')
		#threads = Messagethread.objects.all()
		allThreads = Messagethread.objects.all()
		threads = [t.as_json() for t in allThreads]
		students = Student.objects.order_by('lastName')
		threadIDs = [t.id for t in allThreads]
		student_ids = [s.id for s in students]

		studentNames = {} #maps stud id to stud name <last, first>
		numUnread = {} #maps stud id to num unread threads
		studToThread = {} #maps stud id to threads
		threadToMsgs = {} #maps thread id to messages

		for stud in students:
			numUnread[stud.id] = 0
			studToThread[stud.id] = []
			studentNames[stud.id] = stud.lastName + ", " + stud.firstName
		for t in allThreads:
			msgs = Message.objects.filter(thread=t);
			threadToMsgs[t.id] = [msg.as_json() for msg in msgs]
			if t.unRead:
				numUnread[t.student.id] += 1
				studToThread[t.student.id].append(t.as_json())


		variables = {'student_ids':student_ids, 'studentNames':studentNames, 'threadToMsgs':threadToMsgs, 'studToThread': studToThread, 'numUnread':numUnread, 'messages': messages, 'messageThreads': threads, 'threadIDs': threadIDs, 'students': students}
		return render_to_response('message.html', RequestContext(request, variables))
	return HttpResponseRedirect('/login/')

def new(request):
	if request.user.is_authenticated():
		if request.POST:
			lastname = request.POST['recipient'].split(',')[0]
			stud = Student.objects.get(lastName=lastname)
			subj = request.POST['subject']
			details = request.POST['details']
			t = Messagethread(student=stud, subject=subj)
			t.save()
			m = Message(student=stud, subject=subj, content=details, timestamp=datetime.datetime.now(), thread=t)
			m.save()
		return allMessages(request)
	return HttpResponseRedirect('/login/')


def reply(request):
	if request.user.is_authenticated():
		if request.POST:
			try:
				lastname = request.POST['replyRecipient']
				stud = Student.objects.get(lastName=lastname)
				subj = request.POST['replySubject']
				details = request.POST['responseText']
				t = Messagethread.objects.get(subject=subj)
				t.save()
				m = Message(student=stud, subject=subj, content=details, timestamp=datetime.datetime.now(), thread=t)
				m.save()
			except ValueError:
				return HttpResponse('key Error')

			return HttpResponseRedirect('/messages/')
	return HttpResponseRedirect('/login/')


def readThread(request):
	if request.user.is_authenticated():
		#if request.is_ajax():
		#	return ('it works!');
		subj = request.POST['subject']
		t = Messagethread.objects.get(subject=subj)
		t.unRead = False
		t.save()
		return 
	return HttpResponseRedirect('/login/')


