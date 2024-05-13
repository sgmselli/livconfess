from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
import random

from uuid import uuid4

from .models import Confession, Comment, UserKey
from .serializers import ConfessionSerializer, AnonymousUserSerializer

@api_view(['POST'])
def create_comment(request):
    data = request.data['body']
    confession_id = data['id']

    comment = Comment.objects.create(
        text = data['text']
    )

    confession = Confession.objects.get(id=confession_id)
    confession.comments.add(comment)

    return Response({'added': True})

@api_view(['POST'])
def get_confession(request):
    data = request.data['body']
    confession_id = data['id']
    confession = Confession.objects.get(id=confession_id)
    print(confession.comments.all())
    serializer = ConfessionSerializer(confession, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_new_confessions(request):
    confessions = Confession.objects.all()[::-1][:100]
    serializer = ConfessionSerializer(confessions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_top_confessions(request):
    confessions = Confession.objects.all()[:100]
    ordered_confessions = sorted(confessions, key=lambda x: x.total_votes(), reverse=True)

    serializer = ConfessionSerializer(ordered_confessions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_hot_confessions(request):

    thirty_days_ago = datetime.now() - timedelta(days=30)
    less_than_30_days = Confession.objects.filter(time_stamp__gt=thirty_days_ago)

    ordered_confessions = sorted(less_than_30_days, key=lambda x: x.total_votes(), reverse=True)[:100]
    random.seed(42)

    serializer = ConfessionSerializer(ordered_confessions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def is_upvoted(request):
    data = request.data['body']
    confession_id = data['id']
    confession = Confession.objects.get(id=confession_id)
    user_key = data['user_key']

    if not UserKey.objects.filter(key=user_key).exists():
        return Response(False)      

    if confession.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
        return Response(True)
    else:
        return Response(False)

@api_view(['POST'])
def is_downvoted(request):
    data = request.data['body']
    confession_id = data['id']
    user_key = data['user_key']
    confession = Confession.objects.get(id=confession_id)

    if not UserKey.objects.filter(key=user_key).exists():
        return Response(False)

    if confession.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
        return Response(True)
    else:
        return Response(False)
    
@api_view(['POST'])
def create_confession(request):
    data = request.data['body']
    
    confession = Confession.objects.create(
        username = data['username'],
        instagram = data['instagram'],
        text = data['text'],
        time_stamp = datetime.now(),
    )
    serializer = ConfessionSerializer(confession, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def upvote_post(request):
    data = request.data['body']
    confession_id = data['id']
    user_key = data['user_key']

    try:
        confession = Confession.objects.get(id=confession_id)

        if not UserKey.objects.filter(key=user_key).exists():
            return(Response({'upvotes':'unchanged', 'downvote': 'unchanged'}))
            
        if confession.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
            confession.upvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'removed', 'downvote': 'unchanged'}))
            
        elif (not confession.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()) and (confession.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()):
            confession.upvotes.add(UserKey.objects.get(key=user_key))
            confession.downvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'added', 'downvote': 'removed'}))
            
        else:
            confession.upvotes.add(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'added', 'downvote': 'unchanged'}))
    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
        
@api_view(['POST'])
def downvote_post(request):
    data = request.data['body']
    confession_id = data['id']
    user_key = data['user_key']

    try:
        confession = Confession.objects.get(id=confession_id)

        if not UserKey.objects.filter(key=user_key).exists():
            return(Response({'upvotes':'unchanged', 'downvote': 'unchanged'}))
        
        if confession.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
            confession.downvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'unchanged', 'downvote': 'removed'}))
        
        elif (not confession.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()) and (confession.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()):
            confession.downvotes.add(UserKey.objects.get(key=user_key))
            confession.upvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'removed', 'downvote': 'added'}))
        
        else:
            confession.downvotes.add(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'added', 'downvote': 'unchanged'}))

    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
        
@api_view(['POST'])
def upvote_comment(request):
    data = request.data['body']
    comment_id = data['id']

    user_key = data['user_key']

    try:
        comment = Comment.objects.get(id=comment_id)

        if not UserKey.objects.filter(key=user_key).exists():
            return(Response({'upvotes':'unchanged', 'downvote': 'unchanged'}))
            
        if comment.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
            comment.upvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'removed', 'downvote': 'unchanged'}))
            
        elif (not comment.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()) and (comment.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()):
            comment.upvotes.add(UserKey.objects.get(key=user_key))
            comment.downvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'added', 'downvote': 'removed'}))
            
        else:
            comment.upvotes.add(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'added', 'downvote': 'unchanged'}))
    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
    
@api_view(['POST'])
def downvote_comment(request):
    data = request.data['body']
    comment_id = data['id']
    user_key = data['user_key']

    try:
        comment = Comment.objects.get(id=comment_id)

        if not UserKey.objects.filter(key=user_key).exists():
            return(Response({'upvotes':'unchanged', 'downvote': 'unchanged'}))
        
        if comment.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
            comment.downvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'unchanged', 'downvote': 'removed'}))
        
        elif (not comment.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()) and (comment.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists()):
            comment.downvotes.add(UserKey.objects.get(key=user_key))
            comment.upvotes.remove(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'removed', 'downvote': 'added'}))
        
        else:
            comment.downvotes.add(UserKey.objects.get(key=user_key))
            return(Response({'upvotes':'added', 'downvote': 'unchanged'}))
    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
    
@api_view(['POST'])
def comment_is_upvoted(request):
    data = request.data['body']
    comment_id = data['id']
    comment = Comment.objects.get(id=comment_id)
    user_key = data['user_key']

    if not UserKey.objects.filter(key=user_key).exists():
        return Response(False)  

    if comment.upvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
        return Response(True)
    else:
        return Response(False)

@api_view(['POST'])
def comment_is_downvoted(request):
    data = request.data['body']
    comment_id = data['id']
    comment = Comment.objects.get(id=comment_id)
    user_key = data['user_key']

    if not UserKey.objects.filter(key=user_key).exists():
        return Response(False)

    if comment.downvotes.filter(id=UserKey.objects.get(key=user_key).id).exists():
        return Response(True)
    else:
        return Response(False)
    
@api_view(['POST'])
def create_anonymous_user(request):
    
        user = UserKey.objects.create(
            key = 'user'+str(uuid4())
        )      
        serializer = AnonymousUserSerializer(user, many=False)
        return Response(serializer.data)

     