import React from 'react'
import Card from 'react-bootstrap/Card'

export default function MovieCard(props) {
    return (
        
            <Card style={{ width: '130px' }} className="card">
                <Card.Img variant="top" style={{ height: "200px" }} src={`https://image.tmdb.org/t/p/w220_and_h330_face/${props.movie.poster_path}`} />
            </Card>
            

       
    )
}
