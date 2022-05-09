import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemos } from '../actions';
import '../css/SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNamePokemos(name))
    }

 

    return (
        <div>
            <input
            type='text'
            placeholder='Buscar...'
            onChange={e => handleInputChange(e)}  
            className='input'          
            />
            <button onClick={e => handleSubmit(e)} type='submit' className='boton1'> BUSCAR🔎</button>
        </div>
    )
}