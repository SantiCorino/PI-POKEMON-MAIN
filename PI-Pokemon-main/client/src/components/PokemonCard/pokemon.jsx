import { Link } from "react-router-dom"

export default function Pokemon({id, name, image, types}){
    let typesMap = types.map((t)=>(
        <li>{t}</li>
    ))
    return <div>
        <Link to={`/pokemons/${id}`} >
            <h2>{name}</h2>
            <h3>ID: {id}</h3>
            <img src={image} alt="imagen" />
            <ul>
                {typesMap}
            </ul>
        </Link>
    </div>
}