"""
Django settings for Tandem project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '%shw56vev9!_wa!vop$^#ksquu9$)q_bt=vy06emvkp$$kap*0'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'student',
    'message',
    'announcement',
    'event',
    'messagethread',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'Tandem.urls'

WSGI_APPLICATION = 'Tandem.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/


#STATIC_ROOT = '/home/yinfu/Desktop/Tandem/Tandem/Tandem/static/'
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
    #'/Users/jcweaver/Documents/6.813/Tandem/Tandem/static/',
    #'/Users/jacquelinehung/Dropbox/MIT notes/2014 spring/6.831/group project/Tandem/Tandem/static/', #jackie
    '/home/yinfu/Desktop/Tandem/Tandem/Tandem/static/', #yinfu
    # '/Users/jcweaver/Documents/6.813/Tandem/Tandem/static/' #jcweaver
)

#TEMPLATE_DIRS = ('C:/Users/Akhil/sylvia/Tandem/Tandem/templates,') #Sylvia's path
TEMPLATE_DIRS = ('/home/yinfu/Desktop/Tandem/Tandem/Tandem')  #Yinfu's path
#TEMPLATE_DIRS = ('/Users/jcweaver/Documents/6.813/Tandem/Tandem/') #Joanie's path
#TEMPLATE_DIRS = ("/Users/jacquelinehung/Dropbox/MIT notes/2014 spring/6.831/group project/Tandem/Tandem/") #jackie's path

