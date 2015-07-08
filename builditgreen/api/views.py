from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Project, State
from .serializers import StateMapSerializer, ProjectSerializer


class StateMapListView(generics.ListAPIView):
    serializer_class = StateMapSerializer
    queryset = State.objects.all()
