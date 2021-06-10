from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.db import connection
from .models import Products
from .serializers import ProductsSerializer
import jwt
from rest_framework.parsers import JSONParser

# Create your views here.


def checklogin(token):
    if token:
        x = token.split()
        token = x[1]
    if not token:
        return False
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return False


@api_view(['GET'])
def allproductList(request):
    row = Products.objects.all().order_by('-id')
    productserialized = ProductsSerializer(row,many = True)
    return Response(data=  productserialized.data,status=status.HTTP_200_OK)
    # with connection.cursor() as cursor:
    #     cursor.execute('SELECT * FROM products_products')
    #     columns = [col[0] for col in cursor.description]
    #     rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    #     return Response(rows)
@api_view(['GET'])
def product_getById(request,id):
    token = ''
    if "Authorization" in request.headers:
        token = request.headers["Authorization"]
    if not token:
        return Response(data={"success": False,"message": "Sorry! Unauthorized Access,Did not any token?"},status=status.HTTP_401_UNAUTHORIZED)
    verify = checklogin(token)
    if not verify:
        return Response(data={"success": False,"message": "Authetication token is expired,please login"},status=status.HTTP_401_UNAUTHORIZED) 
    query =  Products.objects.get(pk = id)
    row =  ProductsSerializer(query)
    return Response(data=row.data,status=status.HTTP_200_OK)
    

@api_view(['POST'])
def create_products(request):
    # for authinticate
    token = ''
    if "Authorization" in request.headers:
        token = request.headers["Authorization"]
    if not token:
        return Response(data={"success": False,"message": "Sorry! Unauthorized Access,Did not any token?"},status=status.HTTP_401_UNAUTHORIZED)
    verify = checklogin(token)
    if not verify:
        return Response(data={"success": False,"message": "Authetication token is expired,please login"},status=status.HTTP_401_UNAUTHORIZED) 

    products = JSONParser().parse(request)
    product_serializer =  ProductsSerializer(data =  products)
    if product_serializer.is_valid():
        product_serializer.save()
        return Response(data={"success":True,"message":"Product create successfull","Inserted_data":product_serializer.data},status=status.HTTP_201_CREATED)
    return Response(data=product_serializer.errors,status=status.HTTP_417_EXPECTATION_FAILED)
    
@api_view(['PUT'])
def update_products(request,id):
    # for authinticate
    token = ''
    if "Authorization" in request.headers:
        token = request.headers["Authorization"]
    if not token:
        return Response(data={"success": False,"message": "Sorry! Unauthorized Access,Did not any token?"},status=status.HTTP_401_UNAUTHORIZED)
    verify = checklogin(token)
    if not verify:
        return Response(data={"success": False,"message": "Authetication token is expired,please login"},status=status.HTTP_401_UNAUTHORIZED) 
        
    request_data =  JSONParser().parse(request)
    query =  Products.objects.get(pk = id)
    productupdate =  ProductsSerializer(query,data=request_data)
    if productupdate.is_valid():
        productupdate.save()
        return Response(data={"success":True,"message":"Product update successfull","updated_data":productupdate.data},status=status.HTTP_200_OK)
    return Response(data=productupdate.errors,status=status.HTTP_417_EXPECTATION_FAILED)
