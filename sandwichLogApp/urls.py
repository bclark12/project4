from rest_framework import routers
from . import views
from django.urls import include, path

router = routers.DefaultRouter()
router.register('issue', views.IssueViewSet)
router.register('user', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]