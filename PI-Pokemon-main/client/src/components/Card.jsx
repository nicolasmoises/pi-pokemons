import React from 'react';
import '../css/Card.css'

export default function Card ({name,types,image }) {
    // console.log(types)
    return (
        <div className='cards_item'>

        <div className='card'>
            <h2 className='name'>{name}</h2>
            <h3 >Tipos: {types?.map((t,i)=> <div key={i} > {t}</div>)}</h3>
            <img  className='image' src={image} alt="imagen not found" />
            
        </div>

        </div>
    )

}