const Profile = (props) => {
    return (
        <article key = {props.firebase_id}>
            Name: {props.name}
            Email: {props.email}
            Status: {props.status}
        </article>
        
    )
}
export default Profile