from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.models import *
from api.serializers import *


'''

ListCreateAPIViews

'''
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
    
class ListCreateArtworkCategoryAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArtworkCategorySerializer

    def get_queryset(self):
        queryset = ArtworkCategory.objects.all()

        return queryset
    
class ListCreateArtworkTagAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArtworkTagSerializer

    def get_queryset(self):
        queryset = ArtworkTag.objects.all()

        return queryset
    
class ListCreateCollectionArtworkAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CollectionArtworkSerializer

    def get_queryset(self):
        queryset = CollectionArtwork.objects.all()

        return queryset
    
'''

ListAPIView

'''
    
class ListUserAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()

        return queryset
    
'''

RetrieveUpdateDestroyAPIViews

'''

class RetrieveUpdateDestroyArtworkAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ArtworkSerializer

    queryset = Artwork.objects.all()
