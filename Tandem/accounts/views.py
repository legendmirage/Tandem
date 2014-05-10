from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.template import RequestContext
from django.contrib.auth import login, authenticate, logout
from accounts.models import RegistrationForm
from django.template import RequestContext
from student.models import Student

# Create your views here.
# Code taken from Sylvia's thesis project
def registrationView(request):
    # @summary: 
    #    View to register a new user on the website.
    variables = {}
    if request.method=="POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.save()
            user = authenticate(username=form.cleaned_data["username"], password=form.cleaned_data["password1"])
            login(request, user)
            #return HttpResponseRedirect(user.get_absolute_url())
            return HttpResponseRedirect('/')

    else: #blank form
        form = RegistrationForm()
    variables['form'] = form
    return render_to_response('registration/register.html', RequestContext(request, variables))

def loginView(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect('/')
	else:
		if request.POST:
			username = request.POST['username']
			password = request.POST['password']
			user = authenticate(username=username, password=password)
			if user is not None:
				if user.is_active:
					login(request, user)
					return HttpResponseRedirect('/')
				else:
					# Return a 'disabled account' error message
					return HttpResponseRedirect('/')
			else:
				# Return an 'invalid login' error message.
				return HttpResponseRedirect('/')
		else:
			return render_to_response('registration/login.html', RequestContext(request))

def logoutView(request):
    # @summary: 
    #    View to redirect a logout back to the landing page.
    logout(request)
    return HttpResponseRedirect('/')

def homepage(request):
	if request.user.is_authenticated():
		students = Student.objects.all()
		namePairs = students.values_list('firstName', 'lastName')
		student_names = [str(stud[0]) + ' ' + str(stud[1]) for stud in namePairs]
		num_students = len(students)
		student_ids = [stud.id for stud in students]

		variables = {'students' : students, 'student_names' : student_names, 'num_students': num_students, 'student_ids': student_ids}

		return render_to_response('home.html', RequestContext(request, variables))
	return HttpResponseRedirect('/login/')
