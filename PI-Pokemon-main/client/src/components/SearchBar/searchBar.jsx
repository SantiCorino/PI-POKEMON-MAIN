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
    return <div>
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onInputChange} value={search} />
            <input type="submit" value="Buscar" />
        </form>
    </div>
};