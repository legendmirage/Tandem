from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from announcement.models import Announcement

# Create your views here.
def announceView(request):
	variables = {'announcements': Announcement.objects.order_by('-timestamp')}
	return render_to_response('announcement.html', RequestContext(request, variables))

def new(request):
	if request.POST:
		subj = request.POST['subject']
		details = request.POST['details']
		a = Announcement(subject=subj, content=details)
		a.save()
		return HttpResponse('<div>good job!!!</div>')
	else:
		return announceView(request)

def edit(request, subject, content):
	'''
	a = Announcement.objects.get(id=kwargs['id'])
	if a:
		for key in kwargs.keys():
			a.
	'''
	return HttpResponse('<div>well at least this worked</div>')
