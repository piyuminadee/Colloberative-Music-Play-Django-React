from django.shortcuts import render, redirect
from .creadintial import CLIENT_ID, CLIENT_SECREAT, REDIRECT_URI
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import update_or_create_user_tokens, is_spotify_authenticated

def spotify_callback(request):
    # Retrieve the code and error from the request
    code = request.GET.get('code')
    error = request.GET.get('error')  
    
    # If there's an error, return the error as a response
    if error:
        return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
    
    # Make the POST request to Spotify to exchange the code for tokens
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECREAT
    }).json()

    # Extract access token, refresh token, token type, and expiration
    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    # If the response does not contain the necessary data, return an error response
    if not access_token or not refresh_token or not expires_in:
        return Response({'error': 'Failed to retrieve tokens from Spotify.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Ensure that the session exists
    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    # Update or create user tokens in the database
    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token
    ) 
    
    # Redirect to a frontend URL (make sure this is correctly configured)
    return redirect('frontend:')  # Ensure 'frontend:' is a valid URL pattern in your project


class AuthURL(APIView):
    def get(self, request, format=None):
        # Define the required scopes for Spotify access
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
        
        # Prepare the authorization URL
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url
        
        return Response({'url': url}, status=status.HTTP_200_OK)


class IsAuthenticated(APIView):
    def get(self, request, format=None):
        # Check if the user is authenticated on Spotify
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key
        )
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
