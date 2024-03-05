class Availability:
    def __init__(self, start_time, end_time, available):
        self.start_time = start_time
        self.end_time = end_time
        self.available = available

class User:
    def __init__(self, firebase_id, name, email, status, safeguarding, availability=None, bio=None, profileImage=None):
        self.firebase_id = firebase_id
        self.name = name
        self.email = email
        self.status = status
        self.availability = availability
        self.bio = bio
        self.profileImage = profileImage
        self.safeguarding = safeguarding

