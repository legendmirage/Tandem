from django.shortcuts import render
from django.shortcuts import render_to_response
from django import forms

# Create your views here.

def createEvent(request):
	if request.method == 'POST': # If the form has been submitted...
        form = ContactForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            subject = form.clean_data['subject']
            description = form.clean_data['description']
            attention = form.clean_data['attention']
            student = form.clean_data['student']
            date = form.clean_data['date']
            e=Event(student=student,attention=attention,description=description,subject=subject,date=date)
            e.save()
            return HttpResponseRedirect('/thanks/') # Redirect after POST
    else:
        form = ContactForm() # An unbound form

    return render(request, 'contact.html', {
        'form': form,
    })