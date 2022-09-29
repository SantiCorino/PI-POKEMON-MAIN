import s from "./notFound.module.css";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../redux/actions";

export default function NotFound() {
    const dispatch = useDispatch();
    function onClick(){
        dispatch(getAllPokemons())
    };
    return <div className={s.containerNotFound}>
        <img src="https://fontmeme.com/permalink/220928/2bd93f98f19a40d53d2127509f284dbc.png" alt="" className={s.notfoundImg}/>
        <button onClick={onClick} className={s.notfoundButton} >Atras</button>
    </div>
}