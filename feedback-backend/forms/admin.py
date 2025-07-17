from django.contrib import admin
from .models import Form, Question, Response

# This class allows us to see responses directly in the Form view
class ResponseInline(admin.TabularInline):
    model = Response
    extra = 0 # Don't show extra empty forms for adding new responses here
    readonly_fields = ('submitted_at', 'answers') # Make answers read-only in this view
    can_delete = False

@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'created_at')
    inlines = [ResponseInline] # Add the responses inline to the form view

# We also register Question and Response so they can be viewed separately if needed
admin.site.register(Question)
admin.site.register(Response)