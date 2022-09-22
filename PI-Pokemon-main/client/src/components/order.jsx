import { useDispatch } from "react-redux"
import { sort } from "../redux/actions";

export default function Order(){
    let dispatch = useDispatch();
    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }
    return <div>
        <h5>Orden alfabético</h5>
        <select name="select" onChange={onSelectChange}>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
        </select>
    </div>
}