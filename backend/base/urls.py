from . import views
from django.urls import path, include

urlpatterns = [
    path('ip/', views.create_ip),
    path('confession/', views.get_confession),
    path('new/confessions/', views.get_new_confessions),
    path('hot/confessions/', views.get_hot_confessions),
    path('top/confessions/', views.get_top_confessions),
    path('create/confession/', views.create_confession),
    path('upvote/', views.upvote_post),
    path('downvote/', views.downvote_post),
    path('upvoted/', views.is_upvoted),
    path('downvoted/', views.is_downvoted),
    path('comment/', views.create_comment),
    path('comment/upvote/', views.upvote_comment),
    path('comment/downvote/', views.downvote_comment),
    path('comment/upvoted/', views.comment_is_upvoted),
    path('comment/downvoted/', views.comment_is_downvoted),
]
