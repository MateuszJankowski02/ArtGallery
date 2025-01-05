from django.urls import path
from api import views

urlpatterns = [
    path('artworks/', views.ListCreateArtworkAPIView.as_view(), name='artworks'),
    path('categories/', views.ListCreateCategoryAPIView.as_view(), name='categories'),
    path('tags/', views.ListCreateTags.as_view(), name='tags'),
    path('collections/', views.ListCreateCollectionAPIView.as_view(), name='collections'),
    path('comments/', views.ListCreateCommentAPIView.as_view(), name='comments'),
    path('reported_users/', views.ListCreateReportedUserAPIView.as_view(), name='reported_users'),
]