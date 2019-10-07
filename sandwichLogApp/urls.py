from rest_framework import routers
from . import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
router.register('category', views.CategoryViewSet)
router.register('sandwich', views.SandwichViewSet)

urlpatterns = [
    path('', include(router.urls))
]