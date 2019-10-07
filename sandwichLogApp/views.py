from rest_framework import viewsets
from .serializers import UserSerializer, CategorySerializer, SandwichSerializer
from .models import User, Category, Sandwich

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SandwichViewSet(viewsets.ModelViewSet):
    queryset = Sandwich.objects.all()
    serializer_class = SandwichSerializer
