from django.contrib import admin

from .models import Confession, IP, Comment

admin.site.register(Confession)
admin.site.register(Comment)
admin.site.register(IP)