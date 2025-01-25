
from django.urls import path
from .views import *
 

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback, name='spotify-callback'),
    path('is_authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view())
] 