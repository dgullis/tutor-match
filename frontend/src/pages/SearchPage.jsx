import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select'
import { searchTutor } from '../services/subjects';
import { TutorSearchResult } from '../components/TutorSearchResult';
import { useAuth } from '../components/authContext';

const SearchPage = () => {
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState([]);
    const [searchResults, setSearchResults] = useState(null)
    const [searchResultMessage, setSearchResultMessage] = useState("")
    const { user, idToken } = useAuth()
    const navigate = useNavigate()

    const subjects = [
        {value: '', label: 'Select Subject'},
        {value: "Maths", label:"Maths"},
        {value: "Science", label:"Science"},
        {value: "English", label:"English"}
    ]

    const grades = [
        {value: '', label: 'Select Grade'},
        {value: "gcse", label:"GCSE"},
        {value: "alevel", label:"A level"}
    ]

    const handleSubjectChange = (selectedOption) => {
        setSelectedSubject(selectedOption);
    }

    const handleGradeChange = (selectedOption) => {
        setSelectedGrade(selectedOption);

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const queryParams = {
            "subject": selectedSubject.value,
            "grade": selectedGrade.value
        }
        setSearchResults(null)
        if( !selectedGrade.value || !selectedSubject.value ){
            setSearchResultMessage("Please select a subject and grade before searching")
        } else {
            try {
                var results = await searchTutor(queryParams, idToken)
                if (results.result.length >= 1){
                    setSearchResults(results.result)
                    setSearchResultMessage("")
                } else {
                    setSearchResultMessage("No tutors found")
                }
                
            } catch(error) {
                console.log(error)
            }
        }
    }

return (
    <>

    <Container style={{ width: "75%" }} className="d-flex justify-content-center">
    <Row >
    <Col className="text-center">
        Select a subject and grade to find suitable tutors
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="subject" style={{ margin: '20px', minWidth: '500px' }}>
            <Select
                options={subjects}
                value={selectedSubject}
                onChange={handleSubjectChange}
                placeholder="Select subject"
                
            />
        </Form.Group>
        
        <Form.Group controlId="grade" style={{ margin: '20px'}}>
            <Select
                options={grades}
                value={selectedGrade}
                onChange={handleGradeChange}
                placeholder="Select grade"
                
            />
        </Form.Group>

        <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mx-auto" style={{ backgroundColor: '#025E84', color: 'whitesmoke', border: 'none' , width: '300px', margin: '0px 20px 20px 20px'}}>
                Search for tutors
            </Button>
        </div>
        
    </Form>
        </Col>
        </Row>
    </Container>
    


    {searchResultMessage && 
        <Alert variant="info" style={{ width: '50%', margin: "20px auto" }}>
            {searchResultMessage}
        </Alert>
    }


 
    <div className= 'd-flex flex-column align-items-center'>
        {searchResults && 
            searchResults.map((tutor) => (
              
                    <TutorSearchResult tutor={tutor}/>
               
            ))
        }
    </div>



    </>
)


}

export default SearchPage;