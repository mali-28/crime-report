import {Button} from '@mui/material';

const AdminTable = ({val,title, ...props}) =>{
    return<>
    <tr key={val.id}>
            <td >{val.id}</td>
            <td className="text-capitalize">{val.fname + " " + val.lname}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td>{val.isAdmin ? "admin" : "user"}</td>
            <td><Button variant="outlined"  color={props.color} onClick={() => { props.onClick()}}>{title}</Button></td>
          </tr>
    </>
}
export default AdminTable;