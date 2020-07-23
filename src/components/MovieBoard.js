import React from 'react'
import MovieCard from './MovieCard'

export default function MovieBoard(props) {
    return (
        <>
            {props.movieList.map(item=>{return(<MovieCard movie={item} />)})}
            
        </>
    )
}
