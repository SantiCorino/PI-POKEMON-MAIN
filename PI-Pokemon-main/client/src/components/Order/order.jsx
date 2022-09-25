import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { attackSort, getTypes, nameSort, originFilter, typeFilter } from "../../redux/actions";

export default function Order(){
    const types = useSelector((state)=>state.types)
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTypes())
    }, [dispatch])

    function onSelectNameChange(e){
        e.preventDefault();
        dispatch(nameSort(e.target.value));
        e.target.value="default";
    }
    function onSelectAttackChange(e){
        e.preventDefault();
        dispatch(attackSort(e.target.value));
        e.target.value="default";
    }
    function onSelectTypeChange(e){
        e.preventDefault();
        dispatch(typeFilter(e.target.value));
        e.target.value="default";
    }
    function onSelectOriginChange(e){
        e.preventDefault();
        dispatch(originFilter(e.target.value));
        e.target.value="default";
    }

    return <div>
        <select name="select" onChange={onSelectNameChange}>
            <option value={"default"} hidden>Nombre</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
        </select>
        <select name="select" onChange={onSelectAttackChange}>
            <option value={"default"} hidden>Ataque</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
        </select>
        <select name="select" onChange={onSelectTypeChange}>
            <option value={"default"} hidden>Tipo</option>
            <option value="all">Todos</option>
            {
                types?.map((e)=>(
                    <option value={e.name}>{e.name}</option>

                ))
            }
        </select>
        <select name="select" onChange={onSelectOriginChange}>
            <option value={"default"} hidden>Origen</option>
            <option value="all">Todos</option>
            <option value="API">Original</option>
            <option value="created">Creado</option>
        </select>
    </div>
}