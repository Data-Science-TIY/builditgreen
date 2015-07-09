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


class TrendsOverview(APIView):

    def get(self, request, format=None):
        """
        Return trends by year.
        """
        year_2013 = {2013: Project.objects.filter(certification_date__gte=datetime(2013, 1, 30))\
            .filter(certification_date__lte=datetime(2013, 12, 30)).count()}
        return Response(year_2013)




#
# class GoldYearlyTrendListView(generics.ListAPIView):
#     serializer_class = GoldTrendSerializer
#     queryset = Project.objects.all()


