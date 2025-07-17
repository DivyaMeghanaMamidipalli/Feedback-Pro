# forms/urls.py
from django.urls import path
from .views import FormCreateView, PublicFormDetailView, ResponseSubmitView

urlpatterns = [
    # e.g., POST /api/forms/create/
    path('forms/create/', FormCreateView.as_view(), name='form-create'),
    # e.g., GET /api/forms/1/
    path('forms/<int:pk>/', PublicFormDetailView.as_view(), name='public-form-detail'),
    # e.g., POST /api/submit/
    path('submit/', ResponseSubmitView.as_view(), name='response-submit'),
]