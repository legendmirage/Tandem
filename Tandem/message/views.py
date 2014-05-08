from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from message.models import Message
from messagethread.models import Messagethread

# Create your views here.
def allMessages(request):
<<<<<<< HEAD
	messages = Message.objects.order_by('-timestamp')
	threads = Messagethread.objects.all()
	threadIDs = [t.id for t in threads]
	variables = {'messages': messages, 'messageThreads': threads, 'threadIDs': threadIDs}
	return render_to_response('templates/message.html', RequestContext(request, variables))

def messagesByThread(request, threadID):
	t = Messagethread.objects.get(id=threadID)
	messages = Message.objects.filter(thread=t)
	variables = {'messagesByThread': messages}
	return render_to_response('templates/message.html', RequestContext(request, variables))
 
=======
	return render_to_response('message.html')
>>>>>>> 6569b85a86d353947c89e1f12e60cbde7fe62def
