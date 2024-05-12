from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
import random

from .models import Confession, IP, Comment
from .serializers import ConfessionSerializer

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

    ip = get_client_ip(request)
    if not IP.objects.filter(ip_address=ip).exists():
        IP.objects.create(ip_address=ip)
        return Response(False)

    if confession.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
        return Response(True)
    else:
        return Response(False)

@api_view(['POST'])
def is_downvoted(request):
    data = request.data['body']
    confession_id = data['id']
    confession = Confession.objects.get(id=confession_id)

    ip = get_client_ip(request)
    if not IP.objects.filter(ip_address=ip).exists():
        IP.objects.create(ip_address=ip)
        return Response(False)

    if confession.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
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

def get_client_ip(request):
    x_forward_for = request.META.get("HTTP_X_FORWARD_FOR")
    if x_forward_for:
        ip = x_forward_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")

    seperated_nets = ip.split('.')
    first_two_nets = seperated_nets[0]+'.'+seperated_nets[1]+','+seperated_nets[2]
    return first_two_nets

@api_view(['POST'])
def create_ip(request):
    ip = get_client_ip(request)
    if not IP.objects.filter(ip_address=ip).exists():
        IP.objects.create(ip_address=ip)
        return Response({'created': True})
    return Response({'created': False})

@api_view(['POST'])
def upvote_post(request):
    data = request.data['body']
    confession_id = data['id']

    try:
        confession = Confession.objects.get(id=confession_id)

        ip = get_client_ip(request)
        if not IP.objects.filter(ip_address=ip).exists():
            return(Response({'upvotes':'unchanged', 'downvote': 'unchanged'}))
        
        if confession.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
            confession.upvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'removed', 'downvote': 'unchanged'}))
        
        elif (not confession.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists()) and (confession.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists()):
            confession.upvotes.add(IP.objects.get(ip_address=ip))
            confession.downvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'added', 'downvote': 'removed'}))
        
        else:
            confession.upvotes.add(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'added', 'downvote': 'unchanged'}))

    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
        
@api_view(['POST'])
def downvote_post(request):
    data = request.data['body']
    confession_id = data['id']

    try:
        confession = Confession.objects.get(id=confession_id)

        ip = get_client_ip(request)
        if not IP.objects.filter(ip_address=ip).exists():
            IP.objects.create(ip_address=ip)

        if confession.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
            confession.downvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'unchanged', 'downvote': 'removed'}))
        
        elif (not confession.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists()) and (confession.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists()):
            confession.downvotes.add(IP.objects.get(ip_address=ip))
            confession.upvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'removed', 'downvote': 'added'}))
        
        else:
            confession.downvotes.add(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'unchanged', 'downvote': 'added'}))

    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
        
@api_view(['POST'])
def upvote_comment(request):
    data = request.data['body']
    comment_id = data['id']

    try:
        comment = Comment.objects.get(id=comment_id)

        ip = get_client_ip(request)
        if not IP.objects.filter(ip_address=ip).exists():
            IP.objects.create(ip_address=ip)
        
        if comment.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
            comment.upvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'removed', 'downvote': 'unchanged'}))
        
        elif not comment.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists() and comment.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
            comment.upvotes.add(IP.objects.get(ip_address=ip))
            comment.downvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'added', 'downvote': 'removed'}))
        else:
            comment.upvotes.add(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'added', 'downvote': 'unchanged'}))

    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
    
@api_view(['POST'])
def downvote_comment(request):
    data = request.data['body']
    comment_id = data['id']

    try:
        comment = Comment.objects.get(id=comment_id)

        ip = get_client_ip(request)
        if not IP.objects.filter(ip_address=ip).exists():
            return(Response({'upvotes':'unchanged', 'downvote': 'unchanged'}))
        
        if comment.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
            comment.downvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'unchanged', 'downvote': 'removed'}))
        elif not comment.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists() and comment.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
            comment.downvotes.add(IP.objects.get(ip_address=ip))
            comment.upvotes.remove(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'removed', 'downvote': 'added'}))
        else:
            comment.downvotes.add(IP.objects.get(ip_address=ip))
            return(Response({'upvotes':'unchanged', 'downvote': 'added'}))

    except:
        return Response({'upvotes':'unchanged', 'downvotes':'unchanged'})
    
@api_view(['POST'])
def comment_is_upvoted(request):
    data = request.data['body']
    comment_id = data['id']
    comment = Comment.objects.get(id=comment_id)

    ip = get_client_ip(request)
    if not IP.objects.filter(ip_address=ip).exists():
        return Response(False)

    if comment.upvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
        return Response(True)
    else:
        return Response(False)

@api_view(['POST'])
def comment_is_downvoted(request):
    data = request.data['body']
    comment_id = data['id']
    comment = Comment.objects.get(id=comment_id)

    ip = get_client_ip(request)
    if not IP.objects.filter(ip_address=ip).exists():
        return Response(False)

    if comment.downvotes.filter(id=IP.objects.get(ip_address=ip).id).exists():
        return Response(True)
    else:
        return Response(False)