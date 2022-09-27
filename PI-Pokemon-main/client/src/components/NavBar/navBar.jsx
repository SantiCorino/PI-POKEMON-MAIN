import s from "./navBar.module.css";

import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/searchBar";

export default function Nav(){
    
    return <div className={s.nav}>
        <Link to="/home">
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c31f.png" alt="" className={s.homeLink} />
        </Link>
        <SearchBar />
        <Link to="/add">
            <img src="https://cutewallpaper.org/24/pokemon-egg-png/egg-pokémon-masters-bulbapedia-the-communitydriven-pokémon-encyclopedia.png" alt="" className={s.addLink} />
        </Link>
    </div>
  
}