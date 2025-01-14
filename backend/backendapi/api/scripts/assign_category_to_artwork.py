import random
from api.models import Artwork, Category, ArtworkCategory

def run():
    artworks = Artwork.objects.all()
    categories = list(Category.objects.all())
    
    if not categories:
        print("No categories available to assign.")
        return
    
    for artwork in artworks:
        try:
            category = random.choice(categories)
            ArtworkCategory.objects.create(artwork=artwork, category=category)
            print(f"Assigned category '{category.name}' to artwork '{artwork.title}'.")
        except Exception as e:
            print(f"Error assigning category to artwork '{artwork.title}': {e}")
    
    print("All artworks have been assigned random categories.")