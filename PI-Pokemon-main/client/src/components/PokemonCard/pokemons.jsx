import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearPokemons, getAllPokemons } from "../../redux/actions";
import Loading from "../loading";
import NotFound from "../notFound";
import Pagination from "../pagination";
import Pokemon from "./pokemon";

export default function Pokemons(){
    const pokemons = useSelector((state)=>state.filteredPokemons);
    const [ page, setPage ] = useState(1);
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllPokemons());
        return ()=>{
            dispatch(clearPokemons())
        }
    }, [dispatch])
    console.log(pokemons);
    return <div>
        <div>
            { 
            typeof(pokemons[0])==='string' ? <div><NotFound/><h2>{pokemons}</h2></div> :
            pokemons.length ?
            pokemons
            .slice(
                (page-1)*12,
                (page-1)*12+12
            )
            .map((p)=>{ 
                return <Pokemon 
                    key={p.id}
                    id={p.id}
                    name={p.name} 
                    image={p.image}
                    types={p.types}
                />
            }) :
            <div><Loading/></div>
            }
        </div>
        <Pagination page={page} setPage={setPage} />
    </div>
};