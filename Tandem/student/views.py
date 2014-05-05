from django.shortcuts import render
from django.shortcuts import render_to_response

# Create your views here.
def profile(request):
	return render_to_response('templates/profile.html')

def homepage(request):
	return render_to_response('templates/home.html')