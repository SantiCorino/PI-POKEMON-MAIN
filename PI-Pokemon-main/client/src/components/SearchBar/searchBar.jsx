import s from "./searchBar.module.css";
import { useState } from 'react';
import { searchPokemon } from '../../redux/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const [ search, setSearch ] = useState('');
    const dispatch = useDispatch();
    function onSubmit(e){
        e.preventDefault();
        dispatch(searchPokemon(search))
    };
    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }
    return <div className={s.searchCont}>
        <form onSubmit={onSubmit} className={s.searchForm}>
            <div className={s.searchButton}>
                <input type="submit" value="" className={s.searchSubmit} />
            </div>
            <input type="text" placeholder="Ingresa un nombre..." onChange={onInputChange} value={search} className={s.searchInput}/>
        </form>
    </div>
};
/*                 
 */