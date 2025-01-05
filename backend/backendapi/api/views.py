from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import Artwork, Category, Tag, Collection, Comment, ReportedUser
from api.serializers import ArtworkSerializer, CategorySerializer, TagSerializer, CollectionSerializer, CommentSerializer, ReportedUserSerializer


# Create your views here.
class ListCreateArtworkAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArtworkSerializer

    def get_queryset(self):
        queryset = Artwork.objects.all().filter(user=self.request.user)

        return queryset
        
class ListCreateCategoryAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.all()

        return queryset

class ListCreateTags (generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TagSerializer

    def get_queryset(self):
        queryset = Tag.objects.all()

        return queryset
    
class ListCreateCollectionAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CollectionSerializer

    def get_queryset(self):
        queryset = Collection.objects.all().filter(user=self.request.user)

        return queryset

class ListCreateCommentAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all().filter(user=self.request.user)

        return queryset
    
class ListCreateReportedUserAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReportedUserSerializer

    def get_queryset(self):
        queryset = ReportedUser.objects.all().filter(user=self.request.user)

        return queryset