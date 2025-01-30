from django.db import models
from django.contrib.auth.models import AbstractUser

# Category model
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    artwork = models.ManyToManyField('Artwork', through='ArtworkCategory', related_name='category_artworks')

    def __str__(self):
        return self.name
    
# Tag model
class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    artwork = models.ManyToManyField('Artwork', through='ArtworkTag', related_name='tag_artworks')

    def __str__(self):
        return self.name
    
# Comment model
class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content 
    
# ReportedUser model
class ReportedUser(models.Model):
    id = models.AutoField(primary_key=True)
    reason = models.TextField()
    reported_user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='reported_user')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.reason
    
# Collection model
class Collection(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    artwork = models.ManyToManyField('Artwork', through='CollectionArtwork', related_name='collection_artworks')

    def __str__(self):
        return self.name

# Artwork model
class Artwork(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=500)
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, through='ArtworkCategory', related_name='artwork_categories')
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    tag = models.ManyToManyField(Tag, through='ArtworkTag', related_name='artwork_tags')
    collection = models.ManyToManyField(Collection, through='CollectionArtwork', related_name='artwork_collections')

    def __str__(self):
        return self.title
    
# ArtworkCategory model
class ArtworkCategory(models.Model):
    id = models.AutoField(primary_key=True)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
# CollectionArtwork model
class CollectionArtwork(models.Model):
    id = models.AutoField(primary_key=True)
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)

# ArtworkTag model
class ArtworkTag(models.Model):
    id = models.AutoField(primary_key=True)
    artwork = models.ForeignKey('Artwork', on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

# User model
class User(AbstractUser):
    bio = models.TextField(blank=True, null=True)