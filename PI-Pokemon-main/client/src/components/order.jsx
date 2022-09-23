import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { attackSort, getTypes, nameSort, originFilter, typeFilter } from "../redux/actions";

export default function Order(){
    const types = useSelector((state)=>state.types)
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTypes())
    }, [])

    function onSelectNameChange(e){
        dispatch(nameSort(e.target.value))
    }
    function onSelectAttackChange(e){
        dispatch(attackSort(e.target.value))
    }
    function onSelectTypeChange(e){
        e.preventDefault();
        dispatch(typeFilter(e.target.value))
    }
    function onSelectOriginChange(e){
        e.preventDefault();
        dispatch(originFilter(e.target.value))
    }

    return <div>
        <h5>Nombre</h5>
        <select name="select" onChange={onSelectNameChange}>
            <option value={"default"} hidden>Orden</option>
            <option value="ascendente">A-Z</option>
            <option value="descendente">Z-A</option>
        </select>
        <h5>Ataque</h5>
        <select name="select" onChange={onSelectAttackChange}>
            <option value={"default"} hidden>Orden</option>
            <option value="ascendente">Ascendente</option>
            <option value="descendente">Descendente</option>
        </select>
        <h5>Tipo</h5>
        <select name="select" onChange={onSelectTypeChange}>
            <option value={"default"} hidden>Selecciona</option>
            <option value="all">Todos</option>
            {
                types?.map((e)=>(
                    <option value={e.name}>{e.name}</option>

                ))
            }
        </select>
        <h5>Origen</h5>
        <select name="select" onChange={onSelectOriginChange}>
            <option value={"default"} hidden>Selecciona</option>
            <option value="API">Original</option>
            <option value="created">Creado</option>
        </select>
    </div>
}