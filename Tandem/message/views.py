from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from message.models import Message

# Create your views here.
def allMessages(request):
	messages = Message.objects.order_by('-timestamp').order_by('read')
	variables = {'messages': messages}
	return render_to_response('templates/message.html', RequestContext(request, variables))
