from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'}) # Password can't be retrieved and is only used for creating/updating users(POST/PUT requests)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        #User.objects.create_user() is a built-in method that creates a new user and hashes the password properly. It takes care of all the necessary steps to create a user, including hashing the password and saving the user to the database.
        #User.objects.create() is a more general method that creates a new instance of the User model without any additional processing. If you use this method to create a user, you would need to manually hash the password before saving it to the database, which can lead to security issues if not done correctly.
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
       # user = User.objects.create_user(**validated_data)
        return user


