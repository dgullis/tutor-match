class Availability:
    def __init__(self, start_time, end_time, available):
        self.start_time = start_time
        self.end_time = end_time
        self.available = available

class User:
    def __init__(self, name, email, password, status, availability):
        self.name = name
        self.email = email
        self.password = password
        self.status = status
        self.availability = None

