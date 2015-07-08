from rest_framework import serializers
from .models import Project, State


class ProjectSerializer(serializers.ModelSerializer):
    pass


class StateMapSerializer(serializers.ModelSerializer):
    number_of_projects = serializers.SerializerMethodField()
    number_of_public_projects = serializers.SerializerMethodField()


    class Meta:
        model = State
        fields = ('abbreviation', 'name', 'number_of_projects', 'number_of_public_projects')

    def get_number_of_projects(self, obj):
        return obj.project_set.all().count()

    def get_number_of_public_projects(self, obj):
        return obj.project_set.filter(is_confidential="No").count()
    #
    # def get_number_of_LEED_single_family_home_projects(self, obj):
    #     return obj.project_set.filter().count()

