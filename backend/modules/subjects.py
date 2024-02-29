from db.mongodb import get_subjects_collection
from db.mongodb import get_users_collection
from bson import ObjectId


#define functions here related to subjects collection

class TutorAddingError(Exception):
    pass
class SubjectGradeNotFoundError(Exception):
    pass

def add_tutor_to_a_subject_grade(userId, subject, grade):
    subjects_collection = get_subjects_collection()

    try:
        result = subjects_collection.update_one(
            {"name": subject},
            {"$addToSet": {grade: userId}}
        )

        if result.matched_count == 1:
            if result.modified_count == 0:
                # User was already in the tutors list for the given grade
                raise TutorAddingError('Tutor already added to subject and grade')
            else:
                return {'message': 'Tutor added successfully'}
        else:
            raise SubjectGradeNotFoundError('Subject or grade not found')

    except Exception as e:
        raise ValueError(f'Error adding tutor: {str(e)}')
    

def search_by_subject_and_grade(subject, grade):
    subjects_collection = get_subjects_collection()
    users_collection = get_users_collection()
    
    try:
        result = subjects_collection.find_one({"name": subject}, {grade: 1})

        if result:
            #returns value of grade key i.e. array of tutorIds
            #if grade key not found returns empty array
            user_ids = result.get(grade, [])
            
            #iterates through list of tuturIds find the corresponding userfrom the users collection..
                #changes the value of _id from an ObjectId to a string
                    #adds the suers documents to the user information array
            user_information = [
                {**users_collection.find_one({"_id": ObjectId(user_id)}), '_id': str(ObjectId(user_id))}
                for user_id in user_ids
            ]

            #returns array of user documents i.e. 
                #[{'_id': '', 'name': '', 'email': 'dan15@.com', 'status': '', 'bio': ''}]
            return user_information
        else:
            raise SubjectGradeNotFoundError('Subject or grade not found')
        
    except Exception as e:
        raise ValueError(f'Error finding tutors: {str(e)}')