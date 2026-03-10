from django.urls import path
from accounts import views as UserViews

urlpatterns = [
    # Define API endpoints here
    path('register/', UserViews.RegisterView.as_view()), # This endpoint will handle user registration. When a POST request is made to /api/v1/register/, it will invoke the RegisterView, which will create a new user based on the provided data.
]