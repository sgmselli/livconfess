from django.db import models

from datetime import datetime
from uuid import uuid4

class UserKey(models.Model):
    key = models.CharField(max_length=100)

    def __str__(self):
        return self.key
    
class Test(models.Model):
    test = models.CharField(max_length=100)

class Comment(models.Model):
    id = 'comment'+str(uuid4())
    username = models.CharField(max_length=1000, default='anonymous')
    text = models.CharField(max_length=1000)
    time_stamp = models.CharField(max_length=100, default=datetime.now())
    upvotes = models.ManyToManyField(UserKey, related_name='comment_upvotes', blank=True)
    downvotes = models.ManyToManyField(UserKey, related_name='comment_downvotes', blank=True)

    def __str__(self):
        return self.text
    
    def get_upvotes(self):
        return self.upvotes

    def total_votes(self):
        return self.upvotes.count()-self.downvotes.count()

class Confession(models.Model):
    id = 'confession'+str(uuid4())
    username = models.CharField(max_length=16, default='anonymous')
    instagram = models.CharField(max_length=30, default='')
    text = models.CharField(max_length=500)
    time_stamp = models.CharField(max_length=100, default=datetime.now())
    upvotes = models.ManyToManyField(UserKey, related_name='upvotes', blank=True)
    downvotes = models.ManyToManyField(UserKey, related_name='downvotes', blank=True)
    comments = models.ManyToManyField(Comment, related_name='comments', blank=True)

    def __str__(self):
        return self.text
    
    def get_upvotes(self):
        return self.upvotes

    def total_votes(self):
        return self.upvotes.count()-self.downvotes.count()
    
    def total_comments(self):
        return self.comments.count()
    