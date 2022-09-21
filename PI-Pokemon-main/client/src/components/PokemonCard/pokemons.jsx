import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllPokemons } from "../../redux/actions";
import Pokemon from "./pokemon";

export default function Pokemons(){
    let { pokemons } = useSelector((state)=>state)
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllPokemons())
    }, [])
    console.log(pokemons);
    return <div>
        { pokemons.map((p)=>{ 
            return <Pokemon 
                id={p.id}
                name={p.name} 
                image={p.image}
                types={p.types}
            />
        }) }
    </div>
}