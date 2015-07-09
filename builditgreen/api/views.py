from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Project, State
from .serializers import StateMapSerializer, ProjectSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from datetime import date

class StateMapListView(generics.ListAPIView):
    serializer_class = StateMapSerializer
    queryset = State.objects.all()


class AllTrends(APIView):

    def get(self, request, format=None):
        """
        Return trends by year.
        """
        trends_dict = {}
        year_list = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
        projects_certified_dict = {i: Project.objects.filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}

        trends_dict["total_certifications"] = projects_certified_dict


        # projects_certified_2014 = {"Total Projects Certified 2014": Project.objects.filter
        #     (certification_date__gte=datetime(2014, 1, 1)).filter(certification_date__lte=datetime(2014, 12, 31))
        #     .count()}
        #
        # projects_certified_2013 = {"Total Projects Certified 2013": Project.objects.filter
        #     (certification_date__gte=datetime(2013, 1, 1)).filter(certification_date__lte=datetime(2013, 12, 31))
        #     .count()}
        #
        # projects_certified_2012 = {"Total Projects Certified 2012": Project.objects.filter
        #     (certification_date__gte=datetime(2012, 1, 1)).filter(certification_date__lte=datetime(2012, 12, 31))
        #     .count()}
        #
        # projects_certified_2011 = {"Total Projects Certified 2011": Project.objects.filter
        #     (certification_date__gte=datetime(2011, 1, 1)).filter(certification_date__lte=datetime(2011, 12, 31))
        #     .count()}

        return Response(trends_dict)






#
# class GoldYearlyTrendListView(generics.ListAPIView):
#     serializer_class = GoldTrendSerializer
#     queryset = Project.objects.all()


