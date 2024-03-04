const ProfileSubjects = (props) => {
    return(

<div class = "container">
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
    )
        }
export default ProfileSubjects
        