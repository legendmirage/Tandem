from django.conf.urls import patterns, include, url
from django.contrib.auth.views import logout, login

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Tandem.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
<<<<<<< HEAD
    url(r'^announcements/?$', 'announcement.views.announceView'),
    url(r'^announcements/(?P<announcement_id>\d+)/edit/?$', 'announcement.views.edit', name='editAnnounce'),
    url(r'^announcements/new/?$', 'announcement.views.new', name='newAnnounce'),
    url(r'^student/(?P<student_id>\d+)/?$', 'student.views.profile'),
    url(r'^$', 'student.views.homepage'),
    url(r'^messages/?$', 'message.views.allMessages'),
=======

    url(r'^$', 'accounts.views.homepage'),
    url(r'^register/$', 'accounts.views.registrationView'),
    url(r'^login/$',  'accounts.views.loginView'),
    url(r'^logout/$', 'accounts.views.logoutView'),

    url(r'^announcements/$', 'announcement.views.announceView'),
    url(r'^student/(?P<student_id>\d+)$', 'student.views.profile'),
    url(r'^messages/$', 'message.views.allMessages'),

>>>>>>> 6569b85a86d353947c89e1f12e60cbde7fe62def
)
	
