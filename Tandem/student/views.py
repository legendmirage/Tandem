from django.shortcuts import render
from django.shortcuts import render_to_response
from django.template import RequestContext
from student.models import Student
from event.models import Event


# Create your views here.
def profile(request, student_id):
	student = Student.objects.get(id=student_id)
	events = Event.objects.filter(student=student)
	variables = {"student" : student, "events" : events}
	#print student.firstName
	return render_to_response('profile.html', RequestContext(request, variables))

def homepage(request):
	students = Student.objects.all()
	namePairs = students.values_list('firstName', 'lastName')
	student_names = [str(stud[0]) + ' ' + str(stud[1]) for stud in namePairs]
	num_students = len(students)
	student_ids = [stud.id for stud in students]

	variables = {'students' : students, 'student_names' : student_names, 'num_students': num_students, 'student_ids': student_ids}

	return render_to_response('home.html', RequestContext(request, variables))