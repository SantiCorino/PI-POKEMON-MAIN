import s from "./addPokemon.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { clearPokemons, createPokemon, getAllPokemons, getTypes } from "../../redux/actions";
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
        dispatch(createPokemon(pokemon))
        alert(`${pokemon.name[0].toUpperCase()+pokemon.name.slice(1)} se creó correctamente`)
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
        history.push('/home');
    };

    return <div className={s.containerAdd}>
        <div className={s.addForm}>
            <form onSubmit={onSubmit} onReset={onReset}>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Nombre</label>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="text" 
                        autoComplete="off"
                        name="name"
                        placeholder="Ingresa un nombre" 
                        value={pokemon.name}
                        className={s.addInput}
                        /><br/>
                        {error.name && <em className={s.addError}>{error.name}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">HP</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="number" 
                        autoComplete="off"
                        name="hp" 
                        placeholder="1 - 150" 
                        value={pokemon.hp} 
                        className={s.addInput}
                    /><br/>
                    {error.hp && <em>{error.hp}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Ataque</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="number" 
                        // min="1"
                        // max="130"
                        autoComplete="off" 
                        name="attack" 
                        placeholder="1 - 130" 
                        value={pokemon.attack} 
                        className={s.addInput}
                    /><br/>
                    {error.attack && <em>{error.attack}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Defensa</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="number" 
                        autoComplete="off"
                        name="defense" 
                        placeholder="1 - 150" 
                        value={pokemon.defense} 
                        className={s.addInput}
                    /><br/>
                    {error.defense && <em>{error.defense}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Velocidad</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="number" 
                        autoComplete="off"
                        name="speed" 
                        placeholder="1 - 150" 
                        value={pokemon.speed}
                        className={s.addInput} 
                    /><br/>
                    {error.speed && <em>{error.speed}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Altura</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="number" 
                        autoComplete="off"
                        name="height" 
                        placeholder="1 - 150" 
                        value={pokemon.height} 
                        className={s.addInput}
                    /><br/>
                    {error.height && <em>{error.height}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Peso</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="number" 
                        autoComplete="off"
                        name="weight" 
                        placeholder="1 - 150" 
                        value={pokemon.weight} 
                        className={s.addInput}
                    /><br/>
                    {error.weight && <em>{error.weight}</em>}
                </div>
                <br/>
                <div className={s.addItem}>
                    <div>
                    <div className={s.addLabel}>
                        <label htmlFor="">Tipos</label><br/>
                    </div>    
                    {pokemon.types.length<2?
                    <select 
                        onChange={onSelectionTypes} 
                        defaultValue="default"
                        className={s.addInput} >
                        <option value="default" hidden>Elige hasta 2 tipos</option>
                        {pokemon.types.length<2?
                        allTypes && allTypes.map((t) => (<option value={t.name}>{t.name}</option>))
                        : null
                        }
                    </select>:null}
                    </div>
                    {selectionError.errorSelection && <p>{selectionError.errorSelection}</p>}
                </div>
                <br/>
                <div className={s.addItem}>
                    {pokemon.types.map((t) => (
                    <div>
                        <button
                        type="button"
                        value={t}
                        onClick={onDeletionTypes}
                        className={s.addInput}
                        >
                        {t[0].toUpperCase()+t.slice(1)}
                        </button>
                    </div>
                    ))}
                </div>        
                <div className={s.addItem}>
                    <div className={s.addLabel}>                        
                        <label htmlFor="">Imagen</label><br/>
                    </div>
                    <input 
                        onChange={onInputChange} 
                        type="text" 
                        name="image" 
                        placeholder="Ingresa una URL" 
                        value={pokemon.image}
                        className={s.addInput}
                    /><br/>
                    {error.image && <em>{error.image}</em>}
                </div>
                <br/>
                <div>                    
                    <input type="submit" value="Enviar al laboratorio" disabled={disabled}/>
                    <input type="reset" value="Borrar datos" />
                </div>
            </form>
        </div>
        <div className={s.addImg}>
            <img src="https://www.pinpng.com/pngs/b/222-2229682_professor-oak-png.png" alt="" />
        </div>
    </div> 
}