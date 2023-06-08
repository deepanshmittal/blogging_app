from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'profile_img_url']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validate_data):
        password = validate_data.pop('password', None)
        instance = self.Meta.model(**validate_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class BlogSerializer(serializers.ModelSerializer):
    # user=UserSerializer()
    class Meta:
        model = Blog
        exclude= ['user']
        # depth=1

    def create(self,validate_data):
        instance=self.Meta.model(**validate_data,user=self.context['user'])
        instance.save()
        return instance