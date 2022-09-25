import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { clearPokemons, searchPokemonDetail } from "../../redux/actions";

export default function PokemonDetail(){
    const pokemon = useSelector((state)=>state.filteredPokemons[0])
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(searchPokemonDetail(id))
        return ()=>{
            dispatch(clearPokemons())
        }
    }, [dispatch, id])
    console.log(pokemon);
    return <div>
        {
            pokemon ?
            <> 
            <h2>Soy PokemonDetail</h2>
            <h2>{pokemon.name}</h2>
            <h3>ID: {pokemon.id}</h3>
            <img src={pokemon.image} alt="imagen" />
            <h4>Tipos:
                {pokemon.types?.map((t)=>(
                    <div>{t}</div>
                ))}
            </h4>
            <h4>HP: {pokemon.hp}</h4>
            <h4>Ataque: {pokemon.attack}</h4>
            <h4>Defensa: {pokemon.defense}</h4>
            <h4>Velocidad: {pokemon.speed}</h4>
            <h4>Altura: {pokemon.height}</h4>
            <h4>Peso: {pokemon.weight}</h4>
            <Link to="/home">
                <button>Volver</button>
            </Link>
            </> :
            <div>Estoy loading!</div>
        }
    </div>
}