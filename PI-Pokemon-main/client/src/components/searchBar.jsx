import { useState } from 'react';
import { searchPokemon } from '../redux/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    let [ search, setSearch ] = useState('');
    let dispatch = useDispatch();
    function onSubmit(e){
        e.preventDefault();
        dispatch(searchPokemon(search))
    };
    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search} />
            <input type="submit" value="Buscar" />
        </form>
    </div>
}