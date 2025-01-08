import pandas as pd
from api.models import User
from api.serializers import UserCreateSerializer

def run():
    # Read CSV file into a DataFrame
    csv_file_path = 'users.csv'  # Update the path if necessary
    df = pd.read_csv(csv_file_path)
    
    # Iterate through the DataFrame and create User instances using the serializer
    for index, row in df.iterrows():
        try:
            
            # Prepare the data dictionary
            user_data = {
                'username': row['username'],
                'email': row['email'],
                'password': row['password'],
                'bio': row.get('bio', ''),
            }
            
            # Initialize the serializer with the data
            serializer = UserCreateSerializer(data=user_data)
            
            # Validate the data
            if serializer.is_valid():
                serializer.save()
                print(f"Created user '{serializer.data['username']}'.")
            else:
                print(f"Validation error for user '{row['username']}': {serializer.errors}")
                
        except Exception as e:
            print(f"Error importing user '{row['username']}': {e}")
    
    print("CSV data has been loaded into the Django database.")