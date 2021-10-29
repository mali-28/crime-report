const UserRequestRow = (props) => {
    return <>
        <div className="bio-row">
            <p><span>{props.title}</span>: {props.value}</p>
        </div>

    </>
}

export default UserRequestRow;