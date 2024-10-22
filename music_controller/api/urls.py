
from django.urls import path
from .views import Roomview

urlpatterns = [
    path('home', Roomview.as_view()),
]