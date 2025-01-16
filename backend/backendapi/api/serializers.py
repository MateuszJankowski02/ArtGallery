from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
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
    category = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    tag = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all())
    collection = serializers.PrimaryKeyRelatedField(many=True, queryset=Collection.objects.all())

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

    def update(self, instance, validated_data):
        instance.bio = validated_data.get('bio', instance.bio)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id', 'username', 'bio', 'email']
        read_only_fields = ['id']

class UserProfilePatchSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=False,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        required=False,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    bio = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True, required=False)
    current_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'bio', 'password', 'current_password']

    def validate(self, attrs):
        if 'password' in attrs:
            if not attrs.get('current_password'):
                raise serializers.ValidationError({"current_password": "Current password is required to set a new password."})
            if not self.instance.check_password(attrs['current_password']):
                raise serializers.ValidationError({"current_password": "Current password is incorrect."})
        return attrs

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.bio = validated_data.get('bio', instance.bio)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        fields = ['username' ,'email', 'password']

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username and not email:
            raise serializers.ValidationError('A username or email is required to log in.')
        if not password:
            raise serializers.ValidationError('A password is required to log in.')

        # Check if provided login is an email or just a username
        user = User.objects.filter(email=email).first() or User.objects.filter(username=username).first()
        
        if not user:
            raise serializers.ValidationError('User not found.')

        if not user.check_password(password):
            raise serializers.ValidationError('Invalid password.')

        return {
            'id': user.id,
        }

    
class UserCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            bio=validated_data.get('bio', ''),
            password=validated_data['password']
        )
        token = Token.objects.create(user=user)
        return user
    
class ArtworkBasicSerializer(serializers.ModelSerializer):
    tag = serializers.StringRelatedField(many=True)

    class Meta:
        model = Artwork
        fields = ['id', 'url', 'tag', 'category']


class ArtworkCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Category.objects.all()
    )
    tag = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Tag.objects.all(), required=False
    )
    collection = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Collection.objects.all(), required=False
    )

    class Meta:
        model = Artwork
        fields = ['id', 'title', 'description', 'url', 'category', 'tag', 'collection', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def create(self, validated_data):
        categories = validated_data.pop('category')
        tags = validated_data.pop('tag', [])
        collections = validated_data.pop('collection', [])
        artwork = Artwork.objects.create(**validated_data)
        artwork.category.set(categories)
        artwork.tag.set(tags)
        artwork.collection.set(collections)
        return artwork
