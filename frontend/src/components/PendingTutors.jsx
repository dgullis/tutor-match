import { updatePendingTutor } from "../services/users"

const PendingTutorList = (props) => {

    return (
        <div class = "container">
            <div className = "row justify-content-center mt-3">
                <div className = "col-md-4 text-center">
                <h4>Pending Tutors: </h4>
                {props.pending.map((user) => (
                    <>
                    <div>
                        Name: {user.name}<br/>
                        E-mail: {user.email}<br/>
                    </div>
                    <div className = "d-grid">
                                <button type = "submit" className = "btn btn-primary pt-3 pb-3" onClick = {(e) => updatePendingTutor(props.idToken, user.firebase_id)}>Approve</button>
                    </div><br/>
                    </>
                ))}
            </div>
        </div>
        </div>
    )
}

export default PendingTutorList