import s from "./pokemon.module.css";
import { Link } from "react-router-dom";

export default function Pokemon({id, name, image, types}){
    let typesMap = types.map((t)=>(
        <h3 className={t}>{t}</h3>
    ))
    return <div className={s.aux}>
        <Link to={`/pokemons/${id}`} >
            <div className={s.card}>
                <div className={s.nameCont}>
                    <h2 className={s.name}>{name}</h2>
                </div>
                <div className={s.imgCont}>
                    <img src={image} alt="imagen" className={s.img} />
                </div>
                <div key={id} className={s.types} >
                    {typesMap}
                </div>
            </div>
        </Link>
    </div>
}