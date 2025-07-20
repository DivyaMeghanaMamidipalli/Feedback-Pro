from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Form, Question, Response
from .serializers import FormSerializer, ResponseSerializer, UserSerializer, QuestionSerializer,AdminFormDetailSerializer
from django.contrib.auth.models import User


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class FormCreateView(generics.CreateAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        form = serializer.save(owner=self.request.user)
        questions_data = self.request.data.get('questions', [])
        for q_data in questions_data:
            Question.objects.create(form=form, **q_data)

class PublicFormDetailView(generics.RetrieveAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = [permissions.AllowAny]

class ResponseSubmitView(generics.CreateAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
    permission_classes = [permissions.AllowAny]

class AdminFormListView(generics.ListAPIView):
    serializer_class = FormSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Form.objects.filter(owner=self.request.user).order_by('-created_at')

class FormResponseDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AdminFormDetailSerializer 

    def get_queryset(self):
        return Form.objects.filter(owner=self.request.user)