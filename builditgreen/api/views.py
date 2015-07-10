from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Project, State, Score2009, ScoreTwoPointOne, ScoreTwoPointTwo
from .serializers import StateMapSerializer, ProjectSerializer, ScoreTwoPointOneSerializer, ScoreTwoPointTwoSerializer, \
    Score2009Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from datetime import date


class StateMapListView(generics.ListAPIView):
    serializer_class = StateMapSerializer
    queryset = State.objects.all()


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1)


class Project2009ListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1).filter(leed_version="LEED-NC v2009")


class Project2Point1ListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1).filter(leed_version="LEED-NC 2.1")


class Project2Point2ListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1).filter(leed_version="LEED-NC 2.2")


class Score2009ListView(generics.ListAPIView):
    serializer_class = Score2009Serializer
    queryset = Score2009.objects.all()


class ScoreTwoPointOneListView(generics.ListAPIView):
    serializer_class = ScoreTwoPointOneSerializer
    queryset = ScoreTwoPointOne.objects.all()


class ScoreTwoPointTwoListView(generics.ListAPIView):
    serializer_class = ScoreTwoPointTwoSerializer
    queryset = ScoreTwoPointTwo.objects.all()



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

        projects_registered_dict = {i: Project.objects.filter
            (registration_date__gte=datetime(i, 1, 1)).filter(registration_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["total_registrations"] = projects_registered_dict

        gold_certified_dict = {i: Project.objects.filter(certification_level="Gold").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["gold_certifications"] = gold_certified_dict

        platinum_certified_dict = {i: Project.objects.filter(certification_level="Platinum").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["platinum_certifications"] = platinum_certified_dict

        silver_certified_dict = {i: Project.objects.filter(certification_level="Silver").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["silver_certifications"] = silver_certified_dict

        certified_only_certified_dict = {i: Project.objects.filter(certification_level="Certified").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["certified_only_certifications"] = certified_only_certified_dict

        leed_nc_2_0_dict = {i: Project.objects.filter(leed_version="LEED-NC 2.0").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2_0_certifications"] = leed_nc_2_0_dict

        leed_nc_2_1_dict = {i: Project.objects.filter(leed_version="LEED-NC 2.1").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2_1_certifications"] = leed_nc_2_1_dict

        leed_nc_2_2_dict = {i: Project.objects.filter(leed_version="LEED-NC 2.2").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2_2_certifications"] = leed_nc_2_2_dict

        leed_nc_2009_dict = {i: Project.objects.filter(leed_version="LEED-NC v2009").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2009_certifications"] = leed_nc_2009_dict

        leed_single_family_dict = {i: Project.objects.filter(leed_version="LEED For Homes Single Family").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_for_single_family_certifications"] = leed_single_family_dict

        leed_multi_low_family_dict = {i: Project.objects.filter(leed_version="LEED For Homes Multi Family Low-Rise")
            .filter(certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_for_multi_low_family_certifications"] = leed_multi_low_family_dict

        leed_multi_mid_family_dict = {i: Project.objects.filter(leed_version="LEED For Homes Multi Family Mid-Rise")
            .filter(certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_for_multi_mid_family_certifications"] = leed_multi_mid_family_dict

        leed_nc_2_0_reg_dict = {i: Project.objects.filter(leed_version="LEED-NC 2.0").filter
            (registration_date__gte=datetime(i, 1, 1)).filter(registration_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2_0_registrations"] = leed_nc_2_0_reg_dict

        leed_nc_2_1_reg_dict = {i: Project.objects.filter(leed_version="LEED-NC 2.1").filter
            (registration_date__gte=datetime(i, 1, 1)).filter(registration_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2_1_registrations"] = leed_nc_2_1_reg_dict

        leed_nc_2_2_reg_dict = {i: Project.objects.filter(leed_version="LEED-NC 2.2").filter
            (registration_date__gte=datetime(i, 1, 1)).filter(registration_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_2_2_registrations"] = leed_nc_2_2_reg_dict

        leed_nc_v2009_reg_dict = {i: Project.objects.filter(leed_version="LEED-NC v2009").filter
            (registration_date__gte=datetime(i, 1, 1)).filter(registration_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_nc_v2009_registrations"] = leed_nc_v2009_reg_dict

        leed_single_family_reg_dict = {i: Project.objects.filter(leed_version="LEED For Homes Single Family").filter
            (certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_for_single_family_registrations"] = leed_single_family_reg_dict

        leed_multi_low_family_reg_dict = {i: Project.objects.filter(leed_version="LEED For Homes Multi Family Low-Rise")
            .filter(certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_for_multi_low_family_registrations"] = leed_multi_low_family_reg_dict

        leed_multi_mid_family_reg_dict = {i: Project.objects.filter(leed_version="LEED For Homes Multi Family Mid-Rise")
            .filter(certification_date__gte=datetime(i, 1, 1)).filter(certification_date__lte=datetime(i, 12, 31))
            .count() for i in year_list}
        trends_dict["leed_for_multi_mid_family_registrations"] = leed_multi_mid_family_reg_dict

        return Response(trends_dict)






#
# class GoldYearlyTrendListView(generics.ListAPIView):
#     serializer_class = GoldTrendSerializer
#     queryset = Project.objects.all()


