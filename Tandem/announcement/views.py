from django.shortcuts import render
from django.shortcuts import render_to_response

# Create your views here.
def announceView(request):
	return render_to_response('templates/announcement.html')