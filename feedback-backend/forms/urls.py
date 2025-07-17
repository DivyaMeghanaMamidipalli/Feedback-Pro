# forms/urls.py
from django.urls import path
from .views import (
    UserCreateView,
    FormCreateView, 
    PublicFormDetailView, 
    ResponseSubmitView,
    AdminFormListView,
    FormResponseDetailView
)

urlpatterns = [
    # Public endpoints
    path('register/', UserCreateView.as_view(), name='register'),
    path('forms/<uuid:pk>/', PublicFormDetailView.as_view(), name='public-form-detail'),
    path('submit/', ResponseSubmitView.as_view(), name='response-submit'),

    # Secure Admin endpoints
    path('forms/create/', FormCreateView.as_view(), name='form-create'),
    path('admin/my-forms/', AdminFormListView.as_view(), name='my-forms-list'),
    path('admin/forms/<uuid:pk>/responses/', FormResponseDetailView.as_view(), name='form-responses-detail'),
]