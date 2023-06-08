from rest_framework.exceptions import *
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core import serializers as dj_serializers
import datetime
import jwt
from .models import *
from .serializers import *


# Create your views here.

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # print(serializer, serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LoginUser(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        print(request.POST.get('origin',"not found"))

        if user is None:
            raise AuthenticationFailed('Incorrect Email!')
        else:
            if not user.check_password(password):
                raise AuthenticationFailed('Incorrect Password!')
            else:
                payload = {
                    'id': user.id,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=90),
                    'iat': datetime.datetime.utcnow()
                }

                token = jwt.encode(payload, 'secret', algorithm='HS256')
                user_data = {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email,
                    'profile_img_url': user.profile_img_url
                }
                response = Response()
                response.data = user_data
                # response.set_cookie(key='jwt', value=token, httponly=True)
                # response.set_cookie(key='jwt', value=token, httponly=True, samesite=None,domain='blogging-app-mu.vercel.app')
                response.data['jwt'] = token
                return response


# class LogoutUser(APIView):
#     def post(self, request):
#         response = Response()
#         response.delete_cookie('jwt')
#         response.data = {
#             'message': 'success'
#         }
#         return response


class Posts(APIView):
    def get(self, request):
        cat = request.GET.get('cat')
        blogs = Blog.objects.all()
        if cat:
            blogs = blogs.filter(category__iexact=cat)
        return JsonResponse(list(blogs.values()), safe=False)


class SinglePost(APIView):
    def verify(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise NotAuthenticated("User not Logged In")
        try:
            payload = jwt.decode(token, 'secret', algorithms='HS256')
            user = User.objects.get(id=payload['id'])
            return [1, user]
        except jwt.ExpiredSignatureError:
            response = Response()
            response.delete_cookie('jwt')
            response.data = {"detail": "User not Logged In"}
            return [0, response]

    def get(self, request, id):
        # blog=BlogSerializer(Blog.objects.get(id=id))
        # return Response(blog.data)
        blog = Blog.objects.filter(id=id).values()[0]
        user_id = blog['user_id']
        user = User.objects.filter(id=user_id).values('name', 'profile_img_url')[0]
        # print(user)
        blog_data = {
            **blog,
            'user_name': user['name'],
            'user_profile_img_url': user['profile_img_url']
        }
        return JsonResponse(blog_data, safe=False)

    def post(self, request):
        check, response = self.verify(request)
        if check:
            user = response
            # print(request.data)
            serializer = BlogSerializer(data=request.data, context={'user': user})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return response

    def put(self, request, id):
        check, response = self.verify(request)
        if check:
            blog = Blog.objects.get(id=id)
            # print(request.data)
            serializer = BlogSerializer(data=request.data, instance=blog)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return response

    def delete(self, request, id):
        check, response = self.verify(request)
        if check:
            user = response
            blog = Blog.objects.get(id=id)
            if blog.user == user:
                blog.delete()
                return Response({'message: Blog deleted successfully'})
            else:
                raise PermissionDenied
        else:
            return response

# class Home(APIView):
#     def get(self, request):
#         token = request.COOKIES.get('jwt')
#
#         if token:
#             try:
#                 payload = jwt.decode(token, 'secret', algorithms='HS256')
#             except jwt.ExpiredSignatureError:
#                 pass
