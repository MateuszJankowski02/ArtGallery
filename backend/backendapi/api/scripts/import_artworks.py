import pandas as pd
from api.models import Artwork, User
from api.serializers import ArtworkSerializer

def run():
    # Read CSV file into a DataFrame
    csv_file_path = 'artworks.csv'  # Update the path if necessary
    df = pd.read_csv(csv_file_path)
    
    # Iterate through the DataFrame and create model instances
    for index, row in df.iterrows():
        try:
            artwork_data = {
                'title': row['title'],
                'description': row['description'],
                'url': row['url'],
                'user': row['user']
            }
            serializer = ArtworkSerializer(data=artwork_data)
            if serializer.is_valid():
                serializer.save()
                print(f"Created artwork '{serializer.data['title']}'.")
            else:
                print(f"Validation error for artwork '{row['title']}': {serializer.errors}")
        except Exception as e:
            print(f"Error importing artwork '{row['title']}': {e}")

    print("CSV data has been loaded into the Django database.")