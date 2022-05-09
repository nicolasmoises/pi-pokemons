import React from 'react';
import '../css/Paginado.css'

export default function Paginado ({pokemonsPerPage, allPokemons, paginado}) {
    const pageNumber = []

    for (let i=1 ; i<= Math.ceil(allPokemons/pokemonsPerPage); i++ ) {
        pageNumber.push(i)
    }

    return (
        <nav className='ul'>
            <ul>

            {
                pageNumber?.map(number => (
                    <li className='paginado' key={number}>
                        <button className='botonPaginado' onClick= {() => paginado(number)}> {number}</button>
                    </li>
                ))
            }
            </ul>
        </nav>
    )
}