from django.db import models
from django.contrib.auth.models import User

# This model stores the main form, linking it to the admin who created it.
class Form(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# This model stores each question within a form.
class Question(models.Model):
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)

    def __str__(self):
        return self.text

# This model stores the responses submitted by public users.
# A JSONField is perfect for storing flexible answers (e.g., {"Question 1": "Answer 1", ...})
class Response(models.Model):
    form = models.ForeignKey(Form, related_name='responses', on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    answers = models.JSONField()

    def __str__(self):
        return f"Response to {self.form.title} at {self.submitted_at}"