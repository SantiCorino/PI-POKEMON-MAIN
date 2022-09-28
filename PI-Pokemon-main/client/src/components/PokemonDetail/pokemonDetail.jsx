import s from "./pokemonDetail.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { clearPokemons, searchPokemonDetail } from "../../redux/actions";
import Loading from "../Loading/loading";

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
    return <div className={s.containerDetail}>
        {
            pokemon ?
            <> 
            <div className={s.detailAsh}>
                <img src="https://www.clipartmax.com/png/full/174-1740310_%C2%A0-anime.png" height="420px" alt="" />
            </div>
            <div>
                <div className={s.detailList}>
                    <h2 className={s.detailName}>{pokemon.name}</h2>
                    <div className={s.detailCont}>
                        <h3 className={s.detailLabel}>ID</h3><h3 className={s.detailValue}>{pokemon.id}</h3>
                    </div>
                    <div className={s.detailTypesCont}>
                        <h4 className={s.detailTypesLabel}>Tipos
                            <div className={s.detailTypesAux}>
                                {pokemon.types?.map((t)=>(
                                    <h4 className={s.detailTypesValue}>{t}</h4>
                                ))}
                            </div>
                        </h4>
                    </div>
                    <div className={s.detailCont}>
                        <h4 className={s.detailLabel}>HP</h4><h4 className={s.detailValue}>{pokemon.hp}</h4>
                    </div>
                    <div className={s.detailCont}>
                        <h4 className={s.detailLabel}>Ataque</h4><h4 className={s.detailValue}>{pokemon.attack}</h4>
                    </div>
                    <div className={s.detailCont}>
                        <h4 className={s.detailLabel}>Defensa</h4><h4 className={s.detailValue}>{pokemon.defense}</h4>
                    </div>
                    <div className={s.detailCont}>
                        <h4 className={s.detailLabel}>Velocidad</h4><h4 className={s.detailValue}>{pokemon.speed}</h4>
                    </div>
                    <div className={s.detailCont}>
                        <h4 className={s.detailLabel}>Altura</h4><h4 className={s.detailValue}>{pokemon.height}</h4>
                    </div>
                    <div className={s.detailCont}>
                        <h4 className={s.detailLabel}>Peso</h4><h4 className={s.detailValue}>{pokemon.weight}</h4>
                    </div>
                </div>
                <div className={s.detailBack}>
                    <Link to="/home">
                        <button className={s.detailBackButton}><h4 className={s.detailBackContent}>Volver</h4></button>
                    </Link>
                </div>
            </div>
            <div className={s.imgContainer}>
                <img src={pokemon.image} alt="imagen" className={s.detailImg}/>
            </div>
            </> :
            <Loading/>
        }
    </div>
}