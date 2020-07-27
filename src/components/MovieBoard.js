import React from 'react'
import MovieCard from './MovieCard'

export default function MovieBoard(props) {
    let rows = [];
    
    for (let i=0;i<props.movieList.length/5;i++){
        rows.push(props.movieList.slice(i*5,i*5+5));
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="cardgroup ">
                {props.movieList.map(item=><MovieCard movie={item}/>)}
            </div>
        </div>
    )
}
