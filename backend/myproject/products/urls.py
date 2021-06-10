from django.urls import path
from .views import allproductList,create_products, product_getById,update_products

urlpatterns = [
    path('allproductList',allproductList),
    path('create_products',create_products),
    path('getproductbyId/<int:id>',product_getById),
    path('update_products/<int:id>',update_products),
]