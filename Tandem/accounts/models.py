from django.db import models
from django.contrib.auth.models import User
from django import forms

# Create your models here.
# Code taken from Sylvia's thesis project
class RegistrationForm(forms.Form):
    """
    A registration form that creates a User with an email, but the email is not required.
    Automatically creates that user's default gallery.
    Based off of Django's UserCreationForm, is NOT a ModelForm.
    """
    username = forms.RegexField(label=("Username"), max_length=30, regex=r'^[\w\$\-\_\.\+\!\*\(\)\,]+$',
        help_text = ("Required. 30 characters or fewer. Letters, digits and $+-._!*,() only."),
        error_messages = {'invalid': ("This value may contain only letters, numbers and $+-._!*,() characters.")})
    password1 = forms.CharField(label=("Password"), widget=forms.PasswordInput)
    password2 = forms.CharField(label=("Password confirmation"), widget=forms.PasswordInput,
        help_text = ("Enter the same password as above, for verification."))
    email = forms.CharField(required=False)

    def clean_username(self):
        username = self.cleaned_data["username"]
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username
        raise forms.ValidationError(("A user with that username already exists."))

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1", "")
        password2 = self.cleaned_data["password2"]
        if password1 != password2:
            raise forms.ValidationError(("The two password fields didn't match."))
        return password2

    def clean_email(self):
        """
        Verifies that email is unique.
        """
        email = self.cleaned_data["email"]
        if email=='':
            return ''
        try:
            User.objects.get(email=email)
        except User.DoesNotExist:
            return email
        raise forms.ValidationError(("A user with that email already exists."))
    
    def save(self, commit=True):
        user = User.objects.create_user(username=self.cleaned_data["username"],
                                        password=self.cleaned_data["password1"],
                                        email=self.cleaned_data["email"]
                                        )
        #likes_title = user.username.capitalize() + "'s Likes"
        #gallery_likes = Gallery(likes = True, title = likes_title)
        if commit:
            user.save()
        return user
