from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from student.models import Student


# Create your views here.
def profile(request):
	return render_to_response('templates/profile.html')

def homepage(request):
	variables = {'students' : Student.objects.all()}
	return render_to_response('templates/home.html', RequestContext(request, variables))