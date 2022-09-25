import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { clearPokemons, getAllPokemons, getTypes } from "../../redux/actions";
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
        return ()=>{
            dispatch(clearPokemons())
        }
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

        if(JSON.stringify(validationError) === "{}" && JSON.stringify(validationTypesError) === "{}") {
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
                e.target.value.toLowerCase()
            ])],
        });
        e.target.value="default"
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
        console.log(pokemon)
        axios.post('http://localhost:3001/api/pokemons/', pokemon)
        .then(()=>{
            alert(`${pokemon.name} se creó correctamente`)
        })
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

    return <form onSubmit={onSubmit} onReset={onReset}>
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
        <div>
            <label htmlFor="">HP</label><br/>
            <input 
                onChange={onInputChange} 
                type="number" 
                autoComplete="off"
                name="hp" 
                placeholder="1 - 150" 
                value={pokemon.hp} 
            /><br/>
            {error.hp && <em>{error.hp}</em>}
        </div>
        <br/>
        <div>
            <label htmlFor="">Ataque</label><br/>
            <input 
                onChange={onInputChange} 
                type="number" 
                // min="1"
                // max="130"
                autoComplete="off" 
                name="attack" 
                placeholder="1 - 130" 
                value={pokemon.attack} 
            /><br/>
            {error.attack && <em>{error.attack}</em>}
        </div>
        <br/>
        <div>
            <label htmlFor="">Defensa</label><br/>
            <input 
                onChange={onInputChange} 
                type="number" 
                autoComplete="off"
                name="defense" 
                placeholder="1 - 150" 
                value={pokemon.defense} 
            /><br/>
            {error.defense && <em>{error.defense}</em>}
        </div>
        <br/>
        <div>
            <label htmlFor="">Velocidad</label><br/>
            <input 
                onChange={onInputChange} 
                type="number" 
                autoComplete="off"
                name="speed" 
                placeholder="1 - 150" 
                value={pokemon.speed} 
            /><br/>
            {error.speed && <em>{error.speed}</em>}
        </div>
        <br/>
        <div>
            <label htmlFor="">Altura</label><br/>
            <input 
                onChange={onInputChange} 
                type="number" 
                autoComplete="off"
                name="height" 
                placeholder="1 - 150" 
                value={pokemon.height} 
            /><br/>
            {error.height && <em>{error.height}</em>}
        </div>
        <br/>
        <div>
            <label htmlFor="">Peso</label><br/>
            <input 
                onChange={onInputChange} 
                type="number" 
                autoComplete="off"
                name="weight" 
                placeholder="1 - 150" 
                value={pokemon.weight} 
            /><br/>
            {error.weight && <em>{error.weight}</em>}
        </div>
        <br/>
        
        <div>
            <div>
              <label htmlFor="">Tipos</label><br/>
              {pokemon.types.length<3?
              <select 
                onChange={onSelectionTypes} 
                defaultValue="default" >
                <option value="default" hidden>Elige hasta 3 tipos</option>
                {pokemon.types.length<3?
                allTypes && allTypes.map((t) => (<option value={t.name}>{t.name}</option>))
                : null
                }
              </select>:null}
            </div>
            {selectionError.errorSelection && <p>{selectionError.errorSelection}</p>}
          </div>
            <br/>
          <div>
            {pokemon.types.map((t) => (
              <div>
                <button
                  type="button"
                  value={t}
                  onClick={onDeletionTypes}
                >
                  {t[0].toUpperCase()+t.slice(1)}
                </button>
              </div>
            ))}
          </div>        
        <div>
            <label htmlFor="">Imagen</label><br/>
            <input 
                onChange={onInputChange} 
                type="text" 
                name="image" 
                placeholder="Ingresa una URL" 
                value={pokemon.image}
            /><br/>
            {error.image && <em>{error.image}</em>}
        </div>
        <br/>
        <input type="submit" value="Enviar al laboratorio" disabled={disabled}/>
        <input type="reset" value="Borrar datos" />
    </form>
}