from django.shortcuts import render
# from django.http import HttpReques
from .serializer import RoomSerializer
from rest_framework import generics
from .models import Room 

# Create your views here.
class Roomview(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer