import React from 'react';
import {Link} from 'react-router-dom';
import '../css/LandingPage.css'

export default function LandingPage () {
    return (
        <div className='fondo'>
            <h1 className='frase'>Pokemons </h1>
            <Link to='/home'>
                <div >
                    <button className='boton'>¡Te elijo a ti..</button>
                </div>
            </Link>
        </div>
    )
}