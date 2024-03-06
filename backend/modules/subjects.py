from db.mongodb import get_subjects_collection
from db.mongodb import get_users_collection
from bson import ObjectId


#define functions here related to subjects collection

class TutorAddingError(Exception):
    pass
class SubjectGradeNotFoundError(Exception):
    pass

def add_tutor_to_a_subject_grade(firebase_id, subject, grade):
    subjects_collection = get_subjects_collection()

    try:
        result = subjects_collection.update_one(
            {"name": subject},
            {"$addToSet": {grade: firebase_id}}
        )

        if result.matched_count == 1:
            if result.modified_count == 0: 
                # User was already in the tutors list for the given grade
                raise TutorAddingError('You have already added this subject and grade.')
            else:
                return {'message': 'Subject and grade added successfully.'}
        else:
            raise SubjectGradeNotFoundError('Subject or grade not found')
    except TutorAddingError as tae:
        raise tae
    except SubjectGradeNotFoundError as sgnfe:
        raise sgnfe
    except Exception as e:
        raise ValueError(f'{str(e)}')
    

def search_by_subject_and_grade(subject, grade):
    subjects_collection = get_subjects_collection()
    users_collection = get_users_collection()
    
    try:
        result = subjects_collection.find_one({"name": subject}, {grade: 1})
        print(result)

        if result:
            #returns value of grade key i.e. array of tutorIds
            #if grade key not found returns empty array
            tutor_firebase_ids = result.get(grade, [])
            print("fb ids", tutor_firebase_ids)
            
            #iterates through list of tutor_firebase_ids to find the corresponding tutor from the users collection.
                    #adds the tutors documents to the tutor_information array
            tutor_information = [
                {**users_collection.find_one({"firebase_id": tutor_firebase_id}, {"_id": 0})}
                for tutor_firebase_id in tutor_firebase_ids
            ]

            #returns array of user documents i.e. 
                #[{'_id': '', 'name': '', 'email': 'dan15@.com', 'status': '', 'bio': ''}]
            print("backend results", tutor_information)
            return tutor_information
        else:
            raise SubjectGradeNotFoundError('Subject or grade not found')
        
    except Exception as e:
        raise ValueError(f'Error finding tutors: {str(e)}')
    
def returnSubjects(firebase_id, grade):
    subjects_collection = get_subjects_collection()
    
    try:
        result = subjects_collection.find({grade: firebase_id},{"name":1,"_id":0})
        print(result)

        if result:
            return list(result)
    
    
    except Exception as e:
        raise ValueError(f'Error finding subjects: {str(e)}')