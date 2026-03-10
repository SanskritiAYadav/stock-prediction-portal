from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # AllowAny permission class allows anyone to access this view, regardless of whether they are authenticated or not. This is appropriate for a registration view, as we want to allow new users to create accounts without requiring them to be logged in. By setting permission_classes to [AllowAny], we ensure that anyone can access the registration endpoint and create a new user account.
# Create your views here.
