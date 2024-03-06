import { Container, Row, Col, Card } from "react-bootstrap";

const ProfileSubjects = (props) => {

    return (

        <Container>
            <Row>
                <strong>Available to tutor</strong>
                <Col>
                    {props.gcse && (
                        <>
                        GCSEs: {props.gcse.map((subject) => (
                            <div>
                                {subject.name}
                            </div>
                        ))}
                        </>
                    )}
                </Col>
                    
                <Col>
                    {props.alevel && (
                        <>
                        A Levels: {props.alevel.map((subject) => (
                            <div>
                                {subject.name}
                            </div>
                        ))}
                        </>

                    ) }
                </Col>
            </Row>
        </Container> 
    )

}

export default ProfileSubjects

{/* <div class = "container">
            <div class = "row">
                <div class = "col-sm">
        GCSEs: {props.gcse.map((subject) => (
            <div>
                {subject.name}
            </div>
        ))}
        </div>
        <div class = "col-sm">
        A Levels: {props.alevel.map((subject) => (
            <div>
                {subject.name}
            </div>
        ))}</div></div></div>
    ) */}

        