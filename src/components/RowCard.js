import MovieCard from './MovieCard'
import React from 'react'

export default function RowCard(props) {
    return (
        <div>
            <div className="card-row">
            <MovieCard movie={props.item[0]} />
            <MovieCard movie={props.item[1]} />
            <MovieCard movie={props.item[2]} />
            <MovieCard movie={props.item[3]} />
            <MovieCard movie={props.item[4]} />
            </div>
        </div>
    )
}
