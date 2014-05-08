from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from announcement.models import Announcement

# Create your views here.
def announceView(request):
	variables = {'announcements': Announcement.objects.order_by('-timestamp')}
	return render_to_response('announcement.html', RequestContext(request, variables))