import s from "./home.module.css";
import Order from "../Order/order";
import Pokemons from "../Pokemons/pokemons";

export default function Home(){
    return <div className={s.containerHome}>
        <Order />
        <Pokemons />
    </div>
}