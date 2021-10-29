const Input = (props) => {
    return <>
        <div className="mb-3">
            <label htmlFor={props.name}>{props.title}</label>
            <input name={props.name} onChange={props.onChange} type={props.type || "text"} className="form-control vw-90" id={props.name} placeholder={props.title} value={props.value} required />

        </div></>
}
export default Input;