from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from autorent.api.v1.viewsets import CookieTokenObtainPairViewSet,CookieTokenRefreshViewSet, LogoutViewSet

from .router.api import api_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/",
        include((api_urls, "myproject.router.api.api_urls"), namespace="api"),
    ),
    path("api/token/", CookieTokenObtainPairViewSet.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", CookieTokenRefreshViewSet.as_view(), name="token_refresh"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/logout/", LogoutViewSet.as_view(), name="logout"),  # ✅ logout
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
