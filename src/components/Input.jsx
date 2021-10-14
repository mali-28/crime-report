
const Input = ({ title, error, onChange, ...props }) => {
    return <>
        <div className="mb-3">
            <label htmlFor={props.id}>{title}</label>
            <input onChange={(e)=>{
                onChange(e.target.value)
            }} 
            type={props.type || "text"} 
            className={`form-control ${!error ? "is-valid" : "is-invalid"}`} id={props.id} value={props.value} placeholder={props.placeholder} required />
            <div className="invalid-feedback">{error}</div>

        </div>
    </>
}

export default Input;