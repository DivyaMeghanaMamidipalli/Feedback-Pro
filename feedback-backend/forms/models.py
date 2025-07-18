from django.db import models
from django.contrib.auth.models import User
import uuid

class Form(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# This model stores each question within a form.
class Question(models.Model):
    QUESTION_TYPES = [
        ('TEXT', 'Single Line Text'),
        ('TEXTAREA', 'Multi-line Text'),
        ('NUMBER', 'Number'),
        ('CHOICE', 'Multiple Choice'),
    ]
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    question_type = models.CharField(max_length=10, choices=QUESTION_TYPES, default='TEXT')
    options = models.JSONField(null=True, blank=True)

    def __str__(self):
        return self.text

class Response(models.Model):
    form = models.ForeignKey(Form, related_name='responses', on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    answers = models.JSONField()

    def __str__(self):
        return f"Response to {self.form.title} at {self.submitted_at}"