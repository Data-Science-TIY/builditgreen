from rest_framework import serializers
from .models import Project, State


class ProjectSerializer(serializers.ModelSerializer):
    pass


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

    class Meta:
        model = State
        fields = ('abbreviation', 'name', 'number_of_projects', 'number_of_public_projects',
                  'number_of_leed_single_family_home_projects', 'number_of_leed_nc_v2009',
                  'number_of_leed_nc_2_2', 'number_of_leed_nc_2_1', 'number_of_leed_for_schools_2009',
                  'number_of_leed_for_homes_multi_family_mid_rise', 'number_of_leed_for_homes_multi_family_low_rise')

    def get_number_of_projects(self, obj):
        return obj.project_set.all().count()

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

