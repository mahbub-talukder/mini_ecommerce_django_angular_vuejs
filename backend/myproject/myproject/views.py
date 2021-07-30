from rest_framework.decorators import api_view
from rest_framework.response import Response


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def initialRes(request):
     return Response(data = {"message" : "Api works, please set end point with 'api/' "},status = status.HTTP_200_OK)
