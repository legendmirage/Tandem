from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from announcement.models import Announcement
from django.http import HttpResponseRedirect

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
	return announceView(request)

# def edit(request,announce_id):
# 	a=Announcement.objects.get(id=announce_id)
# 	a.subject=request.POST['subject']
# 	a.content=content
# 	return HttpResponseRedirect('/announcements')

def delete(request,announce_id):
	a=Announcement.objects.get(id=announce_id)
	a.delete()
	return HttpResponseRedirect('/announcements')