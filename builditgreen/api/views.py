from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Project, State, Score2009, ScoreTwoPointOne, ScoreTwoPointTwo
from .serializers import StateMapSerializer, ProjectSerializer, ScoreTwoPointOneSerializer, ScoreTwoPointTwoSerializer, \
    Score2009Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime
from django.db.models import Avg
from datetime import date


class StateMapListView(generics.ListAPIView):
    serializer_class = StateMapSerializer
    queryset = State.objects.all()


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1)


class Project2009ListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1).filter(leed_version="LEED-NC v2009")\
        .filter(certification_date__gte=datetime(2000, 12, 31))


class Project2Point1ListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1).filter(leed_version="LEED-NC 2.1")\
        .filter(certification_date__gte=datetime(2000, 12, 31))


class Project2Point2ListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(points_achieved__gte=1).filter(leed_version="LEED-NC 2.2")\
        .filter(certification_date__gte=datetime(2000, 12, 31))


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


class ScoreVersion2009Trends(APIView):

    def get(self, request, format=None):
        """
        Return trends by certification level and overall.
        # """
        trends_dict = {}
        # year_list = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
        # scores_possible = {}
        #
        # version_2009_score_list = sorted([score for score in Score2009._meta.get_all_field_names()])
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects.all().aggregate(Avg(score))['{}__avg'
        #                 .format(score)])) for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Platinum")
        #               .aggregate(Avg(score))['{}__avg'.format(score)])) for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_platinum"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Gold")
        #               .aggregate(Avg(score))['{}__avg'.format(score)])) for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_gold"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Silver")
        #               .aggregate(Avg(score))['{}__avg'.format(score)])) for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_silver"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Certified")
        #               .aggregate(Avg(score))['{}__avg'.format(score)])) for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_certified"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects
        #                                             .filter(project__certification_date__gte=datetime(2015, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2015, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_2015"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects
        #                                             .filter(project__certification_date__gte=datetime(2014, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2014, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_2014"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects
        #                                             .filter(project__certification_date__gte=datetime(2013, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2013, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_2013"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects
        #                                             .filter(project__certification_date__gte=datetime(2012, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2012, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_2012"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(Score2009.objects
        #                                             .filter(project__certification_date__gte=datetime(2011, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2011, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2009_score_list}
        # trends_dict["average_scores_and_possible_2009_2011"] = score_dict

        scores_2009_list = ['wec2', 'eqc3_2', 'ssc2', 'eqc2', 'eac1', 'eqc6_2', 'ssc8', 'eqc6_1', 'mrc1_2', 'ssc4_4',
                            'mrc4', 'ssc7_2', 'eqc4_3', 'eac4', 'extra4', 'extra2', 'mrc3', 'ssc1', 'eqc4_2', 'eqc8_2',
                            'mrc1_1', 'eqc4_1', 'eqc5', 'mrc2', 'wec3', 'extra1', 'eqc4_4', 'ssc6_1', 'ssc4_3',
                            'ssc6_2', 'ssc5_2', 'eqc7_2', 'eac6', 'eqc7_1', 'eac5', 'eqc3_1', 'ssc7_1', 'idc1',
                            'ssc4_1', 'ssc5_1', 'mrc6', 'eqc1', 'ssc4_2', 'wec1', 'eqc8_1', 'extra3', 'idc2', 'ssc3',
                            'mrc7', 'eac3', 'eac2', 'mrc5']
        score_dict = {score: float("{0:.2f}".format(Score2009.objects
                                                    .filter(project__certification_date__gte=datetime(2011, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2011, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2009_list}
        trends_dict["average_scores_2009_2011"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects.all().aggregate(Avg(score))['{}__avg'
                        .format(score)])) for score in scores_2009_list}
        trends_dict["average_scores_2009"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Platinum")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in scores_2009_list}
        trends_dict["average_scores_2009_platinum"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Gold")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in scores_2009_list}
        trends_dict["average_scores_2009_gold"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Silver")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in scores_2009_list}
        trends_dict["average_scores_2009_silver"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects.filter(project__certification_level="Certified")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in scores_2009_list}
        trends_dict["average_scores__2009_certified"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects
                                                    .filter(project__certification_date__gte=datetime(2015, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2015, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2009_list}
        trends_dict["average_scores_2009_2015"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects
                                                    .filter(project__certification_date__gte=datetime(2014, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2014, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2009_list}
        trends_dict["average_scores_2009_2014"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects
                                                    .filter(project__certification_date__gte=datetime(2013, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2013, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2009_list}
        trends_dict["average_scores_2009_2013"] = score_dict

        score_dict = {score: float("{0:.2f}".format(Score2009.objects
                                                    .filter(project__certification_date__gte=datetime(2012, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2012, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2009_list}
        trends_dict["average_scores_2009_2012"] = score_dict


        scores_2009_possible = ['mrc3_possible', 'mrc6_possible', 'eac6_possible', 'extra2_possible', 'ssc5_1_possible',
                                'eqc6_2_possible', 'mrc7_possible', 'ssc4_4_possible', 'eqc6_1_possible',
                                'wec3_possible', 'eqc1_possible', 'idc1_possible', 'eac3_possible', 'eqc3_1_possible',
                                'eqc5_possible', 'wec2_possible', 'eac4_possible', 'eqc8_1_possible', 'extra4_possible',
                                'mrc4_possible', 'extra1_possible', 'ssc7_1_possible', 'eqc4_3_possible',
                                'eqc4_2_possible', 'eqc7_2_possible', 'ssc5_2_possible', 'ssc4_2_possible',
                                'eqc3_2_possible', 'eqc7_1_possible', 'ssc7_2_possible', 'eac5_possible',
                                'eqc2_possible', 'extra3_possible', 'ssc3_possible', 'ssc4_1_possible', 'ssc8_possible',
                                'mrc2_possible', 'mrc1_1_possible', 'ssc6_2_possible', 'mrc5_possible',
                                'eqc8_2_possible', 'eqc4_1_possible', 'ssc6_1_possible', 'wec1_possible',
                                'mrc1_2_possible', 'ssc1_possible', 'eqc4_4_possible', 'eac2_possible', 'ssc2_possible',
                                'ssc4_3_possible', 'eac1_possible', 'idc2_possible']
        score_dict = {score.replace("_possible", ""): float("{0:.2f}".format(Score2009.objects
                                                    .filter(project__certification_date__gte=datetime(2011, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2011, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2009_possible}
        trends_dict["possible_scores_2009"] = score_dict



        return Response(trends_dict)


class ScoreVersion21Trends(APIView):

    def get(self, request, format=None):
        """
        Return trends by certification level and overall.
        """
        trends_dict = {}
        year_list = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]

        version_2_1_score_list = sorted([score for score in ScoreTwoPointOne._meta.get_all_field_names()])
        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects.all().aggregate(Avg(score))['{}__avg'
                                                    .format(score)])) for score in version_2_1_score_list}
        trends_dict["average_scores_and_possible_v2_1"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Platinum")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in version_2_1_score_list}
        trends_dict["average_scores_and_possible_v2_1_platinum"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects.filter(project__certification_level="Gold")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in version_2_1_score_list}
        trends_dict["average_scores_and_possible_v2_1_gold"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Silver")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in version_2_1_score_list}
        trends_dict["average_scores_and_possible_v2_1_silver"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Certified")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in version_2_1_score_list}
        trends_dict["average_scores_and_possible_v2_1_certified"] = score_dict

        trends_dict = {}
        scores_2_1_possible = ['eac1_possible', 'ssc5_1_possible', 'ssc4_1_possible', 'eqc4_1_possible',
                               'ssc1_possible', 'eac5_possible', 'eqc3_2_possible', 'mrc1_3_possible',
                               'wec1_1_possible', 'eqc4_3_possible', 'mrc7_possible', 'wec2_possible',
                               'ssc7_1_possible', 'mrc5_2_possible', 'eqc1_possible', 'eqc3_1_possible',
                               'ssc3_possible', 'eqc6_2_possible', 'eqc8_2_possible', 'ssc5_2_possible',
                               'ssc4_2_possible', 'eac3_possible', 'eqc2_possible', 'mrc3_2_possible',
                               'mrc4_2_possible', 'eac2_3_possible', 'wec1_2_possible', 'mrc1_1_possible',
                               'ssc4_3_possible', 'mrc3_1_possible', 'eqc4_4_possible', 'eac4_possible',
                               'eac6_possible', 'mrc4_1_possible', 'wec3_1_possible', 'eqc6_1_possible',
                               'mrc2_2_possible', 'eac2_1_possible', 'eqc4_2_possible', 'ssc8_possible',
                               'mrc2_1_possible', 'idc1_possible', 'wec3_2_possible', 'eac2_2_possible',
                               'eqc7_2_possible', 'mrc6_possible', 'ssc4_4_possible', 'ssc7_2_possible',
                               'mrc1_2_possible', 'ssc6_2_possible', 'eqc8_1_possible', 'eqc5_possible',
                               'mrc5_1_possible', 'ssc2_possible', 'eqc7_1_possible', 'ssc6_1_possible',
                               'idc2_possible']

        score_dict = {score.replace("_possible", ""): float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Certified")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1_possible}
        trends_dict["scores_possible_v2_1"] = score_dict

        scores_2_1 = ['ssc8', 'mrc7', 'eqc1', 'eqc5', 'eac2_3', 'wec3_2', 'mrc4_2', 'mrc1_2', 'eqc6_1', 'eqc2', 'eac4',
                      'eac5', 'eqc7_1', 'eqc8_1', 'ssc2', 'ssc4_4', 'mrc2_1', 'mrc3_1', 'eqc4_3', 'idc1', 'eqc4_2',
                      'mrc2_2', 'mrc1_3', 'eac2_2', 'eqc6_2', 'mrc5_2', 'ssc5_2', 'ssc4_3', 'ssc7_1', 'mrc3_2',
                      'ssc5_1', 'wec1_1', 'ssc6_2', 'eqc3_1', 'mrc1_1', 'ssc4_2', 'eqc3_2', 'ssc1', 'mrc4_1', 'mrc5_1',
                      'wec3_1', 'ssc7_2', 'eqc4_1', 'eac6', 'eqc4_4', 'eac2_1', 'idc2', 'eqc7_2', 'mrc6', 'ssc4_1',
                      'eqc8_2', 'eac3', 'eac1', 'wec2', 'wec1_2', 'ssc3', 'ssc6_1']

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects.all().aggregate(Avg(score))['{}__avg'
                                                    .format(score)])) for score in scores_2_1}
        trends_dict["average_scores_v2_1"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Platinum")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_platinum"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects.filter(project__certification_level="Gold")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in scores_2_1}
        trends_dict["average_scores_v2_1_gold"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Silver")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_silver"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_level="Certified")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_certified"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2005, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2005, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2005"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2006, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2006, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2006"] = score_dict
        #
        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2007, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2007, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2007"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2008, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2008, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2008"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2009, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2009, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2009"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2010, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2010, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2010"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2011, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2011, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2011"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointOne.objects
                                                    .filter(project__certification_date__gte=datetime(2012, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2012, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in scores_2_1}
        trends_dict["average_scores_v2_1_2012"] = score_dict

        return Response(trends_dict)


class ScoreVersion22Trends(APIView):

    def get(self, request, format=None):
        """
        Return trends by certification level and overall.
        """
        # trends_dict = {}
        #
        # version_2_2_score_list = sorted([score for score in ScoreTwoPointTwo._meta.get_all_field_names()])
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects.all().aggregate(Avg(score))['{}__avg'
        #                                             .format(score)])) for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_level="Platinum")
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_platinum"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects.filter(project__certification_level="Gold")
        #               .aggregate(Avg(score))['{}__avg'.format(score)])) for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_gold"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_level="Silver")
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_silver"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects.filter(project__certification_level=\
        #                                                                             "Certified").aggregate(Avg(score))
        #                                             ['{}__avg'.format(score)])) for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_certified"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2009, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2009, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_2009"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2010, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2010, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_2010"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2012, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2012, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_2012"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2011, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2011, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_2_2_2011"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2008, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2008, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_2_2_2008"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2007, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2007, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_2_2_2007"] = score_dict
        #
        # score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
        #                                             .filter(project__certification_date__gte=datetime(2013, 1, 1))
        #                                             .filter(project__certification_date__lte=datetime(2013, 12, 31))
        #                                             .aggregate(Avg(score))['{}__avg'.format(score)]))
        #               for score in version_2_2_score_list}
        # trends_dict["average_scores_and_possible_v2_2_2013"] = score_dict

        score_2_2_list = ['wec2', 'eqc3_2', 'ssc2', 'eqc2', 'eac1', 'eqc6_2', 'ssc8', 'mrc3_2', 'eqc6_1', 'mrc2_2',
                          'mrc1_2', 'ssc4_4', 'ssc7_2', 'mrc1_3', 'eqc4_3', 'eac4', 'ssc1', 'eqc4_2', 'eqc8_2',
                          'mrc1_1', 'eqc4_1', 'eqc5', 'wec3_1', 'mrc4_2', 'eqc4_4', 'wec3_2', 'ssc6_1', 'mrc3_1',
                          'ssc4_3', 'ssc6_2', 'wec1_1', 'ssc5_2', 'eqc7_2', 'eac6', 'eqc7_1', 'eac5', 'eqc3_1',
                          'wec1_2', 'ssc7_1', 'mrc5_2', 'mrc2_1', 'idc1', 'ssc4_1', 'ssc5_1', 'mrc6', 'eqc1',
                          'mrc4_1', 'ssc4_2', 'eqc8_1', 'mrc5_1', 'idc2', 'ssc3', 'mrc7', 'eac3', 'eac2']

        trends_dict = {}

        # version_2_2_score_list = sorted([score for score in ScoreTwoPointTwo._meta.get_all_field_names()])
        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects.all().aggregate(Avg(score))['{}__avg'
                                                    .format(score)])) for score in score_2_2_list}
        trends_dict["average_scores_v2_2"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_level="Platinum")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_v2_2_platinum"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects.filter(project__certification_level="Gold")
                      .aggregate(Avg(score))['{}__avg'.format(score)])) for score in score_2_2_list}
        trends_dict["average_scores_v2_2_gold"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_level="Silver")
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_v2_2_silver"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects.filter(project__certification_level=\
                                                                                    "Certified").aggregate(Avg(score))
                                                    ['{}__avg'.format(score)])) for score in score_2_2_list}
        trends_dict["average_scores_v2_2_certified"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2009, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2009, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_v2_2_2009"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2010, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2010, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_v2_2_2010"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2012, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2012, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_v2_2_2012"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2011, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2011, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_2_2_2011"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2008, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2008, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_2_2_2008"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2007, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2007, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_2_2_2007"] = score_dict

        score_dict = {score: float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2013, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2013, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_list}
        trends_dict["average_scores_v2_2_2013"] = score_dict

        score_2_2_possible = ['mrc2_1_possible', 'mrc6_possible', 'eac6_possible', 'mrc5_2_possible', 'mrc3_2_possible',
                              'ssc5_1_possible', 'eqc6_2_possible', 'mrc7_possible', 'ssc4_4_possible',
                              'eqc6_1_possible', 'eqc1_possible', 'idc1_possible', 'eac3_possible', 'eqc3_1_possible',
                              'eqc5_possible', 'wec2_possible', 'eac4_possible', 'wec1_1_possible', 'eqc8_1_possible',
                              'mrc2_2_possible', 'wec3_2_possible', 'ssc7_1_possible', 'eqc4_3_possible',
                              'eqc4_2_possible', 'eqc7_2_possible', 'wec1_2_possible', 'ssc5_2_possible',
                              'ssc4_2_possible', 'eqc3_2_possible', 'eqc7_1_possible', 'mrc3_1_possible',
                              'mrc1_3_possible', 'ssc7_2_possible', 'eac5_possible', 'eqc2_possible', 'ssc3_possible',
                              'ssc4_1_possible', 'ssc8_possible', 'mrc5_1_possible', 'mrc1_1_possible',
                              'mrc4_2_possible', 'ssc6_2_possible', 'eqc8_2_possible', 'eqc4_1_possible',
                              'wec3_1_possible', 'ssc6_1_possible', 'mrc1_2_possible', 'ssc1_possible',
                              'eqc4_4_possible', 'eac2_possible', 'ssc2_possible', 'ssc4_3_possible',
                              'mrc4_1_possible', 'eac1_possible', 'idc2_possible']

        score_dict = {score.replace("_possible", ""): float("{0:.2f}".format(ScoreTwoPointTwo.objects
                                                    .filter(project__certification_date__gte=datetime(2013, 1, 1))
                                                    .filter(project__certification_date__lte=datetime(2013, 12, 31))
                                                    .aggregate(Avg(score))['{}__avg'.format(score)]))
                      for score in score_2_2_possible}
        trends_dict["scores_possible_v2_2"] = score_dict

        return Response(trends_dict)



