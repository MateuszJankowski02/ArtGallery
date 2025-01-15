import random
from api.models import Artwork, Tag, ArtworkTag

def run():
    tag_names = [
    "fruits", "vase", "light and shadow", "nature", "composition", "flowers", "food", "realism",
    "face", "emotions", "profile", "gaze", "classical portrait", "expression", "chiaroscuro", "silhouette",
    "mountains", "lake", "forest", "sunset", "nature", "space", "scenery", "panoramic view",
    "geometry", "lines", "colors", "chaos", "shapes", "textures", "symmetry", "dynamism",
    "dreams", "symbolism", "fantasy", "unreal", "visions", "illusion", "subconscious", "contrasts",
    "light", "pastel colors", "brushstrokes", "fleeting moments", "nature", "harmony", "water", "everyday life",
    "marble", "shape", "space", "texture", "figure", "monumentalism", "details", "proportions",
    "perspective", "harmony", "classicism", "proportions", "mythological figures", "religion", "frescoes", "idealism",
    "modernity", "conceptualism", "minimalism", "mixed media", "installation", "expression", "technology", "innovation",
    "folklore", "handicrafts", "tradition", "ornaments", "wood", "embroidery", "patterns", "locality"
]

    tags = []

    # Retrieve or create Tag instances
    for name in tag_names:
        tag, created = Tag.objects.get_or_create(name=name)
        tags.append(tag)
        if created:
            print(f"Created new tag '{name}'.")

    artworks = Artwork.objects.all()

    for artwork in artworks:
        try:
            # Assign a random number of tags to each artwork
            num_tags = random.randint(1, 3)
            selected_tags = random.sample(tags, num_tags)
            for tag in selected_tags:
                ArtworkTag.objects.create(artwork=artwork, tag=tag)
                print(f"Assigned tag '{tag.name}' to artwork '{artwork.title}'.")
        except Exception as e:
            print(f"Error assigning tags to artwork '{artwork.title}': {e}")

    print("All artworks have been assigned tags from the list.")