import { Button } from '@mui/material';
const Table = ({ val, ...props }) => {
    return <tr>
        <td>
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
            <span className="user-link">{val.fname} {val.lname}</span>
            <span className="user-subhead">{val.id}</span>
        </td>
        <td>
            {val.phone}
        </td>
        <td className="text-center">
            <span className={`badge bg-${val.isAdmin ? "success" : "danger"} p-2 `}>{val.isAdmin ? "admin" : "user"}</span>
        </td>
        <td>
            {val.email}
        </td>
        <td><div>
            <Button variant="outlined" color={props.color} onClick={() => { props.onClick(val.id) }}>{props.title}</Button>
        </div>
        </td>
    </tr>
}

export default Table;