from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from announcement.models import Announcement
from django.http import HttpResponseRedirect

# Create your views here.
def announceView(request):
	if request.user.is_authenticated():
		variables = {'announcements': Announcement.objects.order_by('-timestamp')}
		return render_to_response('announcement.html', RequestContext(request, variables))
	return HttpResponseRedirect('/login/')

def new(request):
	if request.user.is_authenticated():
		if request.POST:
			subj = request.POST['subject']
			details = request.POST['details']
			a = Announcement(subject=subj, content=details)
			a.save()
		return announceView(request)
	return HttpResponseRedirect('/login/')	

def edit(request, subject, content,announce_id):
	if request.user.is_authenticated():
		a=Announcement.objects.get(id=announce_id)
		a.subject=subject
		a.content=content
		return HttpResponseRedirect('/announcements')
	return HttpResponseRedirect('/login/')	

def delete(request,announce_id):
	if request.user.is_authenticated():
		a=Announcement.objects.get(id=announce_id)
		a.delete()
		return HttpResponseRedirect('/announcements')
	return HttpResponseRedirect('/login/')