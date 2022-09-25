import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../redux/actions";

export default function NotFound() {
    const dispatch = useDispatch();
    function onClick(){
        dispatch(getAllPokemons())
    };
    return <div>
        <h2>¿Quién es ese Pokémon?</h2>
        <img src="https://www.larata.cl/wp-content/uploads/2016/08/pokemon-musicos.jpg" alt="" />
        <button onClick={onClick}>Atras</button>
    </div>
}