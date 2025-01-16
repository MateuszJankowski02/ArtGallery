from django.urls import path
from api import views

urlpatterns = [
    path('artworks/', views.ListCreateArtworkAPIView.as_view(), name='artworks'),
    path('artworks/create/' , views.CreateArtworkAPIView.as_view(), name='create_artwork'),
    path('artworks/basic/', views.ListArtworkBasicAPIView.as_view(), name='basic_artworks'),
    path('artworks/basic/category/<int:category_id>/', views.ListArtworkBasicByCategoryAPIView.as_view(), name='artworks_by_category'),
    path('artworks/<int:pk>/', views.RetrieveUpdateDestroyArtworkAPIView.as_view(), name='artwork'),
    path('categories/', views.ListCreateCategoryAPIView.as_view(), name='categories'),
    path('tags/', views.ListCreateTags.as_view(), name='tags'),
    path('collections/', views.ListCreateCollectionAPIView.as_view(), name='collections'),
    path('comments/', views.ListCreateCommentAPIView.as_view(), name='comments'),
    path('reported_users/', views.ListCreateReportedUserAPIView.as_view(), name='reported_users'),
    path('artwork_categories/', views.ListCreateArtworkCategoryAPIView.as_view(), name='artwork_categories'),
    path('collection_artworks/', views.ListCreateCollectionArtworkAPIView.as_view(), name='collection_artworks'),
    path('artwork_tags/', views.ListCreateArtworkTagAPIView.as_view(), name='artwork_tags'),
    path('users/', views.ListUserAPIView.as_view(), name='users'),
    path('users/create/', views.CreateUserAPIView.as_view(), name='create_user'),
    path('users/login/', views.LoginUserAPIView.as_view(), name='login_user'),
    path('users/profile/<int:pk>/', views.RetrieveUserProfileAPIView.as_view(), name='user'),
    path('users/profile/update/<int:pk>/', views.UpdateUserProfileAPIView.as_view(), name='update_user_profile'),
]