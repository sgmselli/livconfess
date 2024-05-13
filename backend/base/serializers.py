from rest_framework import serializers
from .models import Confession, Comment, UserKey

class AnonymousUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserKey
        fields = ['key']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ConfessionSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Confession
        fields = '__all__'