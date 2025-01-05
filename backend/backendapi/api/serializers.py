from rest_framework import serializers
from api.models import *


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ReportedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportedUser
        fields = '__all__'
        read_only_fields = ['created_at']

class ArtworkCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkCategory
        fields = '__all__'

class ArtworkTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkTag
        fields = '__all__'

class CollectionArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionArtwork
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'last_login', 'username', 'is_superuser', 'bio', 'email']
        read_only_fields = ['last_login', 'is_superuser']


