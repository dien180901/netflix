import React from 'react'
import RowCard from './RowCard'
import MovieCard from './MovieCard'

export default function MovieBoard(props) {
    let rows = [];
    for (let i=0;i<props.movieList.length/5;i++){
        rows.push(props.movieList.slice(i*5,i*5+5));
    }
    return (
        <div className="cardgroup">
            {props.movieList.map(item=><MovieCard movie={item}/>)}
        </div>
    )
}
