from django.contrib import admin
from .models import Form, Question, Response

class ResponseInline(admin.TabularInline):
    model = Response
    extra = 0 
    readonly_fields = ('submitted_at', 'answers') 
    can_delete = False

@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'created_at')
    inlines = [ResponseInline] 

admin.site.register(Question)
admin.site.register(Response)