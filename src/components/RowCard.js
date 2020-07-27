import MovieCard from './MovieCard'
import React from 'react'

export default function RowCard(props) {
    return (
        <div>
            <div className="card-row">
            {props.item.map(item=><MovieCard movie={item} />)}
            </div>
        </div>
    )
}
