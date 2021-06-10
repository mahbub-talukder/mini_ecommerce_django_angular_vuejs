from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from .serializers import UserSerializer
from .models import User
import jwt, datetime
from django.db import connection
from rest_framework.parsers import JSONParser
def checklogin(token):
    if token:
           x = token.split()
           token = x[1]
    if not token:
        raise AuthenticationFailed
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return AuthenticationFailed
        
# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data={"status":True,"message":"Registration Successfull","data":serializer.data},status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        userserial = UserSerializer(user)
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow(),
            'user_info' : userserial.data
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data = {
            'status':True,
            'token': token,
        }
        return response


class UserView(APIView):

    def get(self, request):
        # token = request.COOKIES.get('jwt')
        token = request.headers["Authorization"]
        verify =  checklogin(token)
        if not verify :
            response = {"success" : False,"message" : "Authetication token is expired"}
            return Response(response)

        user = User.objects.filter(id=verify['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)
            


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
