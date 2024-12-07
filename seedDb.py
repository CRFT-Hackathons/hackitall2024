from datetime import datetime, timedelta
import random
from typing import List
import uuid
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

# Mock categories based on your enum

POST_CATEGORIES = [
    "food_support",
    "medical_aid",
    "education",
    "housing_support",
    "emotional_support",
    "elderly_care",
    "child_care",
    "disaster_relief",
    "job_training",
    "environmental_protection",
]

# "text": "Act as a needy person / ONG / somebody older. Ask for help in the community, for example, you are an older person that needs transport to go to for a checkup, or you need someone to help you with groceries. You can also ask for help with a community project, for example, you need volunteers to help you clean a park or you need donations for a community garden. Or even for your own garden. Be creative and ask for help in the community.",


# Mock user data
def generate_mock_users(count: int = 10) -> List[dict]:
    users = []
    for _ in range(count):
        user = {
            "id": str(uuid.uuid4()),  # Generate UUID for user ID
            "created_at": datetime.now(),
        }
        users.append(user)
    return users


# Mock post data
def generate_mock_posts(users: List[dict], count: int = 20) -> List[dict]:
    posts = []
    now = datetime.now()

    for _ in range(count):
        # Random date within last 30 days
        created_at = now - timedelta(days=random.randint(0, 30))
        # Registration period between 1-14 days
        reg_period = random.randint(1, 14)
        registration_start = created_at + timedelta(days=1)
        registration_end = registration_start + timedelta(days=reg_period)

        post = {
            "owner_id": random.choice(users)["id"],
            "title": f"Community Project #{random.randint(1000, 9999)}",
            "category": random.choice(POST_CATEGORIES),
            "description": "Mock description",
            "created_at": created_at,
            "registration_start": registration_start,
            "registration_end": registration_end,
            "is_open": random.choice([True, False]),
            "required_people": random.randint(5, 50),
            "media_url": f"https://example.com/images/{uuid.uuid4()}.jpg",
        }
        posts.append(post)
    return posts


# Example usage with SQL output
def main():
    # Generate mock data
    users = generate_mock_users(10)
    posts = generate_mock_posts(users, 20)

    # Print example INSERT statements
    print("-- Example INSERT statements for users:")
    for user in users[:2]:  # Just show 2 examples
        print(
            f"INSERT INTO users (id, created_at) VALUES ('{user['id']}', '{user['created_at'].isoformat()}');"
        )

    print("\n-- Example INSERT statements for posts:")
    for post in posts[:2]:  # Just show 2 examples
        print(f"""INSERT INTO posts (
            owner_id, title, category, description, created_at,
            registration_start, registration_end, is_open, required_people, media_url
        ) VALUES (
            '{post['owner_id']}', '{post['title']}', '{post['category']}',
            '{post['description']}', '{post['created_at'].isoformat()}',
            '{post['registration_start'].isoformat()}', '{post['registration_end'].isoformat()}',
            {str(post['is_open']).lower()}, {post['required_people']}, '{post['media_url']}'
        );""")


if __name__ == "__main__":
    main()
