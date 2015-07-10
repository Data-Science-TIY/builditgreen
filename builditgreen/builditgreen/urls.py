"""builditgreen URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from api import views as api_views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^api/us/$', api_views.StateMapListView.as_view(), name="state_map"),
    url(r'^api/trends/$', api_views.AllTrends.as_view(), name="all_trends"),
    url(r'^api/projects/$', api_views.ProjectListView.as_view(), name="all_projects"),
    url(r'^api/projects/2009/$', api_views.Project2009ListView.as_view(), name="projects_2009"),
    url(r'^api/projects/2-2/$', api_views.Project2Point2ListView.as_view(), name="projects_2_2"),
    url(r'^api/projects/2-1/$', api_views.Project2Point1ListView.as_view(), name="projects_2_1"),
    url(r'^api/score2009/$', api_views.Score2009ListView.as_view(), name="score_2009"),
    url(r'^api/score2-2/$', api_views.ScoreTwoPointTwoListView.as_view(), name="score_2_2"),
    url(r'^api/score2-1/$', api_views.ScoreTwoPointOneListView.as_view(), name="score_2_1"),
]
