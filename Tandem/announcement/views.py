from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse
from announcement.models import Announcement

# Create your views here.
def announceView(request):
	variables = {'announcements': Announcement.objects.order_by('-timestamp')}
<<<<<<< HEAD
	return render_to_response('templates/announcement.html', RequestContext(request, variables))

def new(request, subj, cont):
	a = Announcement(subject=subj, content=cont)
	a.save()
	return HttpResponse('<div>good job!!!</div>')

def edit(request, subject, content):
	'''
	a = Announcement.objects.get(id=kwargs['id'])
	if a:
		for key in kwargs.keys():
			a.
	'''
	return HttpResponse('<div>well at least this worked</div>')
=======
	return render_to_response('announcement.html', RequestContext(request, variables))
>>>>>>> 6569b85a86d353947c89e1f12e60cbde7fe62def
