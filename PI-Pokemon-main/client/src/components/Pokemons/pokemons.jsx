import s from "./pokemons.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { clearPokemons, getAllPokemons } from "../../redux/actions";
import Loading from "../Loading/loading";
import NotFound from "../NotFound/notFound";
import Pagination from "../Pagination/pagination";
import Pokemon from "../Pokemon/pokemon";

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
    function onNotFoundLoad(){
        alert(pokemons)
    }
    console.log(pokemons);
    return <div className={s.etc} >
        <div className={s.layout} >
            { 
            typeof(pokemons[0])==='string' ? <div onLoad={onNotFoundLoad}><NotFound/></div> :
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
        </div><br/>
        <div className={s.pagination}>
            <Pagination page={page} setPage={setPage} />
        </div>
    </div>
};