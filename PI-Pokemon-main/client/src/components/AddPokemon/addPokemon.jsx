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
            types: [
                ...pokemon.types,
                e.target.value.toLowerCase()
            ],
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
    console.log(pokemon.types.length)
    console.log(selectionError);
    return <div className={s.containerAdd}>
        <div className={s.addForm}>
            <div>
                <img src="https://fontmeme.com/permalink/220928/c84ccf0bf2082acb1a06d51297987613.png" alt="" className={s.addTitle} />
            </div>
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
                </div>
                <div className={s.addErrorContainer}>                        
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
                        placeholder="1 - 160" 
                        value={pokemon.hp} 
                        className={s.addInput}
                    /><br/>
                </div>
                <div className={s.addErrorContainer}>                    
                    {error.hp && <em className={s.addError}>{error.hp}</em>}
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
                        placeholder="1 - 110" 
                        value={pokemon.attack} 
                        className={s.addInput}
                    /><br/>
                </div>
                <div className={s.addErrorContainer}>                    
                    {error.attack && <em className={s.addError}>{error.attack}</em>}
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
                        placeholder="1 - 100" 
                        value={pokemon.defense} 
                        className={s.addInput}
                    /><br/>
                </div>
                <div className={s.addErrorContainer}>                    
                    {error.defense && <em className={s.addError}>{error.defense}</em>}
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
                        placeholder="1 - 130" 
                        value={pokemon.speed}
                        className={s.addInput} 
                    /><br/>
                </div>
                <div className={s.addErrorContainer}>                    
                    {error.speed && <em className={s.addError}>{error.speed}</em>}
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
                        placeholder="1 - 50" 
                        value={pokemon.height} 
                        className={s.addInput}
                    /><br/>
                </div>
                <div className={s.addErrorContainer}>
                    {error.height && <em className={s.addError}>{error.height}</em>}
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
                        placeholder="1 - 4600" 
                        value={pokemon.weight} 
                        className={s.addInput}
                    /><br/>
                </div>
                <div className={s.addErrorContainer}>                    
                    {error.weight && <em className={s.addError}>{error.weight}</em>}
                </div>
                <br/>
                <div className={s.addItem}>                    
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
                    </select>:null}<br/>                    
                </div>
                <div className={s.addErrorContainer}>                    
                    {selectionError.errorSelection && <em className={s.addError}>{selectionError.errorSelection}</em>}
                </div>
                <br/>
                <div className={s.addDeleteItem}>
                    {pokemon.types.map((t) => (                    
                        <button
                        type="button"
                        value={t}
                        onClick={onDeletionTypes}
                        className={s.addDeleteInput}
                        >
                        {t[0].toUpperCase()+t.slice(1)}
                        </button>                    
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
                </div>
                <div className={s.addErrorContainer}>                    
                    {error.image && <em className={s.addError}>{error.image}</em>}
                </div>
                <br/>
                <div className={s.addButtonContainer}>                    
                    <input type="submit" value="Enviar al laboratorio" disabled={disabled} className={s.addButtons} />
                    <input type="reset" value="Borrar datos"  className={s.addButtons} />
                </div>
            </form>
        </div>
        <div className={s.addImg}>
            <img src="https://www.pinpng.com/pngs/b/222-2229682_professor-oak-png.png" alt="" />
        </div>
    </div> 
}