import React from 'react';
import './styles.css';

function Card({pokemon}) {
    return(
        <div>  
            <div>
            <div className="card" key={pokemon.id}>
                <div className="cardImage">
                    <img className="pokePhoto" src={pokemon.sprites.front_default} alt="pokemonImage"></img>
                </div>
                <div className="cardName">
                    {pokemon.name}
                </div>
                <div className="cardTypes">
                    {pokemon.types.map(types => {
                        return(
                            <div className="cardDetailTypes">
                                {types.type.name}
                            </div>
                        )
                    })}
                </div>
                <div className="cardInfo">
                    <div className="card_data">
                        <p className="title">Weight</p>
                        <p className="card_weight">{pokemon.weight}</p>
                    </div>
                    <div className="card_data">
                        <p className="title">Height</p>
                        <p className="card_weight">{pokemon.height}</p>
                    </div>
                    <div className="card_data">
                        <p className="title">Abilities</p>
                        {pokemon.abilities.map(abilities => {
                        return(
                            <div className="card_data">
                                {abilities.ability.name}
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Card;