from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Form, Question, Response
from .serializers import FormSerializer, ResponseSerializer

# Endpoint for admins to create a form.
# Only authenticated users can access this.
class FormCreateView(generics.CreateAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # When a form is created, automatically assign the logged-in user as the owner.
        # Then, create the Question objects from the request data.
        form = serializer.save(owner=self.request.user)
        questions_data = self.request.data.get('questions', [])
        for q_text in questions_data:
            Question.objects.create(form=form, text=q_text)

# Endpoint for the public to view a specific form.
# Anyone can access this.
class PublicFormDetailView(generics.RetrieveAPIView):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = [permissions.AllowAny]

# Endpoint for the public to submit a response.
# Anyone can access this.
class ResponseSubmitView(generics.CreateAPIView):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer
    permission_classes = [permissions.AllowAny]
