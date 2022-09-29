import s from "./navBar.module.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../redux/actions";

export default function Nav(){
    const dispatch = useDispatch();
    function onClick(){
        dispatch(getAllPokemons());
    }
    return <div className={s.nav}>
        <Link to="/home">
            <img src="https://img3.freepng.es/dy/293d7332f655567a827df886b531d114/L0KzQYi4UsE5N2JnTJGAYUO7RIG3gvI1PWg4SJC8NUK5Q4S3WcE2OWQ7S6cDNUG6Q4mATwBvbz==/5a38400bb45730.3526330915136358517387.png" alt="" onClick={onClick} className={s.homeLink} />
        </Link>
        <Link to="/">
            <img src="https://logoeps.com/wp-content/uploads/2012/10/pokemon-logo-vector.png" alt="" className={s.navImg}/>
        </Link>
        <Link to="/add">
            <img src="https://cutewallpaper.org/24/pokemon-egg-png/egg-pokémon-masters-bulbapedia-the-communitydriven-pokémon-encyclopedia.png" alt="" className={s.addLink} />
        </Link>
    </div>
  
}