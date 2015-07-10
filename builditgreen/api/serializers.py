from rest_framework import serializers
from .models import Project, State
from django.db.models import Avg

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('certification_date', 'gross_square_foot', 'points_achieved', 'leed_version', 'certification_level')


# class GoldTrendSerializer(serializers.ModelSerializer):
#     year_2000 = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Project
#         fields = ("year_2000")
#
#     def get_year_2000(self, obj):
#         pass
#
# idea = create model for each year, serialize year with searches on year

class StateMapSerializer(serializers.ModelSerializer):
    number_of_projects = serializers.SerializerMethodField()
    number_of_public_projects = serializers.SerializerMethodField()
    number_of_leed_single_family_home_projects = serializers.SerializerMethodField()
    number_of_leed_nc_v2009 = serializers.SerializerMethodField()
    number_of_leed_nc_2_2 = serializers.SerializerMethodField()
    number_of_leed_nc_2_1 = serializers.SerializerMethodField()
    number_of_leed_for_schools_2009 = serializers.SerializerMethodField()
    number_of_leed_for_homes_multi_family_low_rise = serializers.SerializerMethodField()
    number_of_leed_for_homes_multi_family_mid_rise = serializers.SerializerMethodField()
    number_of_scored_leed_projects = serializers.SerializerMethodField()
    average_of_scored_leed_projects_all = serializers.SerializerMethodField()
    average_of_leed_single_family_home_projects = serializers.SerializerMethodField()
    average_of_leed_nc_v2009 = serializers.SerializerMethodField()
    average_of_leed_nc_2_2 = serializers.SerializerMethodField()
    average_of_leed_nc_2_1 = serializers.SerializerMethodField()
    average_of_leed_for_schools_2009 = serializers.SerializerMethodField()
    average_of_leed_for_homes_multi_family_low_rise = serializers.SerializerMethodField()
    average_of_leed_for_homes_multi_family_mid_rise = serializers.SerializerMethodField()
    number_gold = serializers.SerializerMethodField()
    number_silver = serializers.SerializerMethodField()
    number_platinum = serializers.SerializerMethodField()
    number_certified = serializers.SerializerMethodField()
    number_of_projects_population_corrected = serializers.SerializerMethodField()


    class Meta:
        model = State
        fields = ('abbreviation', 'name', 'population' ,'number_of_projects',
                  'number_of_projects_population_corrected','number_of_public_projects',
                  'number_of_leed_single_family_home_projects', 'number_of_leed_nc_v2009',
                  'number_of_leed_nc_2_2', 'number_of_leed_nc_2_1', 'number_of_leed_for_schools_2009',
                  'number_of_leed_for_homes_multi_family_mid_rise', 'number_of_leed_for_homes_multi_family_low_rise',
                  'number_of_scored_leed_projects', 'average_of_scored_leed_projects_all',
                  'average_of_leed_single_family_home_projects', 'average_of_leed_nc_v2009',
                  'average_of_leed_nc_2_2', 'average_of_leed_nc_2_1', 'average_of_leed_for_schools_2009',
                  'average_of_leed_for_homes_multi_family_mid_rise', 'average_of_leed_for_homes_multi_family_low_rise',
                  'number_gold', 'number_silver', 'number_platinum', 'number_certified')

    def get_number_of_projects(self, obj):
        return obj.project_set.all().count()

    def get_number_of_projects_population_corrected(self, obj):
        if obj.population != 0:
            return (obj.project_set.all().count()/obj.population*10000)
        else:
            return 0

    def get_number_of_public_projects(self, obj):
        return obj.project_set.filter(is_confidential="No").count()

    def get_number_of_leed_single_family_home_projects(self, obj):
        return obj.project_set.filter(leed_version="LEED For Homes Single Family").count()

    def get_number_of_leed_nc_v2009(self, obj):
        return obj.project_set.filter(leed_version="LEED-NC v2009").count()

    def get_number_of_leed_nc_2_2(self, obj):
        return obj.project_set.filter(leed_version="LEED-NC 2.2").count()

    def get_number_of_leed_nc_2_1(self, obj):
        return obj.project_set.filter(leed_version="LEED-NC 2.1").count()

    def get_number_of_leed_for_schools_2009(self, obj):
        return obj.project_set.filter(leed_version="LEED FOR SCHOOLS v2009").count()

    def get_number_of_leed_for_homes_multi_family_low_rise(self, obj):
        return obj.project_set.filter(leed_version="LEED For Homes Multi Family Low-Rise").count()

    def get_number_of_leed_for_homes_multi_family_mid_rise(self, obj):
        return obj.project_set.filter(leed_version="LEED For Homes Multi Family Mid-Rise").count()

    def get_number_of_scored_leed_projects(self, obj):
        return obj.project_set.filter(points_achieved__gte=1).count()

    def get_average_of_scored_leed_projects_all(self, obj):
        if not obj.project_set.filter(points_achieved__gte=1).aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(points_achieved__gte=1).aggregate(Avg('points_achieved'))\
                                 ['points_achieved__avg']))

    def get_average_of_leed_single_family_home_projects(self, obj):
        if not obj.project_set.filter(leed_version="LEED For Homes Single Family")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED For Homes Single Family")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_average_of_leed_nc_v2009(self, obj):
        if not obj.project_set.filter(leed_version="LEED-NC v2009")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED-NC v2009")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_average_of_leed_nc_2_2(self, obj):
        if not obj.project_set.filter(leed_version="LEED-NC 2.2")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED-NC 2.2")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_average_of_leed_nc_2_1(self, obj):
        if not obj.project_set.filter(leed_version="LEED-NC 2.1")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED-NC 2.1")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_average_of_leed_for_schools_2009(self, obj):
        if not obj.project_set.filter(leed_version="LEED FOR SCHOOLS v2009")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED FOR SCHOOLS v2009")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_average_of_leed_for_homes_multi_family_low_rise(self, obj):
        if not obj.project_set.filter(leed_version="LEED For Homes Multi Family Low-Rise")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED For Homes Multi Family Low-Rise")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_average_of_leed_for_homes_multi_family_mid_rise(self, obj):
        if not obj.project_set.filter(leed_version="LEED For Homes Multi Family Mid-Rise")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']:
            return 0
        else:
            return int(round(obj.project_set.filter(leed_version="LEED For Homes Multi Family Mid-Rise")\
                .aggregate(Avg('points_achieved'))['points_achieved__avg']))

    def get_number_platinum(self, obj):
        return obj.project_set.filter(certification_level="Platinum").count()

    def get_number_silver(self, obj):
        return obj.project_set.filter(certification_level="Silver").count()

    def get_number_gold(self, obj):
        return obj.project_set.filter(certification_level="Gold").count()

    def get_number_certified(self, obj):
        return obj.project_set.filter(certification_level="Certified").count()



