from django.conf.urls import patterns, include, url
from django.contrib.auth.views import logout, login

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Tandem.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'accounts.views.homepage'),
    url(r'^register/$', 'accounts.views.registrationView'),
    url(r'^login/$',  'accounts.views.loginView'),
    url(r'^logout/$', 'accounts.views.logoutView'),

    url(r'^announcements/$', 'announcement.views.announceView'),
    url(r'^announcements/new/?$', 'announcement.views.new', name='newAnnounce'),
    url(r'^student/(?P<student_id>\d+)/?$', 'student.views.profile'),
    #url(r'^$', 'student.views.homepage'),
    url(r'^messages/$', 'message.views.allMessages'),
    url(r'^messages/new/?$', 'message.views.new', name='newMessage'),
    url(r'^messages/readThread/?$', 'message.views.readThread', name='readThread'),
    url(r'^messages/reply/?$', 'message.views.reply', name='replyMessage'),
    url(r'^student/(?P<student_id>\d+)/addEvent$', 'event.views.new'),
    url(r'^event/delete/(?P<event_id>\d+)/?$', 'event.views.delete'),
    url(r'^announcements/delete/(?P<announce_id>\d+)/?$', 'announcement.views.delete'),
)
	
