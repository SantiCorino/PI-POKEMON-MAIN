import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { getAllPokemons, getTypes } from "../../redux/actions";
import { validateFields, validateSelection } from "../../utils/validator";

export default function AddPokemon(){
    const { pokemons } = useSelector((state)=>state);
    const allTypes = useSelector((state)=>state.types);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [ pokemon, setPokemon ] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        types: [],
        image: ''
    });
    const [ error, setError ] = useState({});
    const [ selectionError, setSelectionError ] = useState({});
    const [ disabled, setDisabled ] = useState(true);
    
    useEffect(()=>{
        dispatch(getTypes());
        dispatch(getAllPokemons());
    }, [dispatch]);

    function onInputChange(e){
        e.preventDefault();
        
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value,
        });
        
        const validationError = validateFields({
            ...pokemon,
            [e.target.name]: e.target.value,
        }, pokemons);
        setError(validationError);
        
        const validationTypesError = validateSelection(pokemon);
        //const catchedErrors = {...validationError, ...validationTypesError};
        setSelectionError(validationTypesError);

        if(JSON.stringify(validationError) === "{}" && JSON.stringify(validationError) === "{}") {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    };

    function onSelectionTypes(e){
        setPokemon({
            ...pokemon,
            types: [...new Set([
                ...pokemon.types,
                e.target.value
            ])],
        })
    };

    function onDeletionTypes(e){
        const newTypes = pokemon.types.filter((t) => t !== e.target.value);
        setPokemon({
            ...pokemon,
            types: newTypes,
        });
    };

    function onReset(){
        setPokemon({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            types: [],
            image: ''
        })
    }

    function onSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/api/pokemons/', pokemon)
        .then(()=>{
            setPokemon({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                types: [],
                image: ''
            })
        })
        .then(()=>{
            history.push('/home')
        })
        .catch((err)=>{
            console.log(err);
        })
    };

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="">Nombre</label><br/>
            <input 
                onChange={onInputChange} 
                type="text" 
                autoComplete="off"
                name="name"
                placeholder="Ingresa un nombre" 
                value={pokemon.name}
                /><br/>
                {error.name && <em>{error.name}</em>}
        </div>
        <br/>
        <label htmlFor="">HP</label><br/>
        <input 
            onChange={onInputChange} 
            type="number" 
            autoComplete="off"
            name="hp" 
            placeholder="1 - 150" 
            value={pokemon.hp} 
        /><br/>
        <label htmlFor="">Ataque</label><br/>
        <input 
            onChange={onInputChange} 
            type="number" 
            autoComplete="off" 
            name="attack" 
            placeholder="1 - 150" 
            value={pokemon.attack} 
        /><br/>
        <label htmlFor="">Defensa</label><br/>
        <input 
            onChange={onInputChange} 
            type="number" 
            autoComplete="off"
            name="defense" 
            placeholder="1 - 150" 
            value={pokemon.defense} 
        /><br/>
        <label htmlFor="">Velocidad</label><br/>
        <input 
            onChange={onInputChange} 
            type="number" 
            autoComplete="off"
            name="speed" 
            placeholder="1 - 150" 
            value={pokemon.speed} 
        /><br/>
        <label htmlFor="">Altura</label><br/>
        <input 
            onChange={onInputChange} 
            type="number" 
            autoComplete="off"
            name="height" 
            placeholder="1 - 150" 
            value={pokemon.height} 
        /><br/>
        <label htmlFor="">Peso</label><br/>
        <input 
            onChange={onInputChange} 
            type="number" 
            autoComplete="off"
            name="weight" 
            placeholder="1 - 150" 
            value={pokemon.weight} 
        /><br/>
        <label htmlFor="">Tipos</label><br/>
        <input 
            onChange={onInputChange} 
            type="text" 
            name="types" 
            placeholder="Ingresa un tipo" 
            value={pokemon.types} 
        /><br/>
        <label htmlFor="">Imagen</label><br/>
        <input 
            onChange={onInputChange} 
            type="text" 
            name="image" 
            placeholder="Ingresa una imagen" 
            value={pokemon.image}
        /><br/>
        <input type="submit" name="SoySubmit" />
    </form>
}