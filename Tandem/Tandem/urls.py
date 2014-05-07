from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Tandem.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^announcements/$', 'announcement.views.announceView'),
    url(r'^student/(?P<student_id>\d+)$', 'student.views.profile'),
    url(r'^$', 'student.views.homepage'),
    url(r'^messages/$', 'message.views.allMessages'),
)
