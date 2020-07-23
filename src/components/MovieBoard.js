import React from 'react'
import RowCard from './RowCard'

export default function MovieBoard(props) {
    let rows = [];
    // Initilize rows: rows[0] = slice(0, 5)
    for (let i=0;i<props.movieList.length/5;i++){
        rows.push(props.movieList.slice(i*5,i*5+5));
    }
    // Map




    return (
        <div className="cardgroup">
            {rows.map(item=><RowCard item={item}/>)}

        </div>

    )
}
