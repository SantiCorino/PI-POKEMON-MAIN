import s from "./pagination.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function Pagination({page, setPage }){
    const pokemons = useSelector((state)=>state.filteredPokemons);
    const [input, setInput] = useState(1);
    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1);
    };

    const previousPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    };

    const onKeyDown = e => {
        if (e.keyCode === 13) {
        setPage(parseInt(e.target.value));
        if (parseInt(e.target.value < 1) || parseInt(e.target.value) > Math.ceil(pokemons.length / 12) || isNaN(parseInt(e.target.value))) {
            setPage(1);
            setInput(1);
        } else {
            setPage (parseInt (e.target.value));
        }
        }
    };

    const onChange = e => {
        setInput (e.target.value);
    };

    return <div className={s.pagination}>
        <button disabled={page === 1 || page < 1} onClick={previousPage}>
        Prev
        </button>
        <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            name="page"
            autoComplete="off"
            value={input}
            type="number"
            min="1"
            max={Math.ceil(pokemons.length / 12)}
        />
        <p> de {Math.ceil(pokemons.length / 12)} </p>
        <button
            disabled={page === Math.ceil(pokemons.length / 12) || page > Math.ceil(pokemons.length / 12)}
            onClick={nextPage}
        >
        Next
        </button>
    </div>
  
}