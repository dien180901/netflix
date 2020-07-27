import React from 'react'
import Card from 'react-bootstrap/Card'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBMask, MDBView } from "mdbreact";

export default function MovieCard(props) {
    return (


        <div className="MVcard">
        <MDBView hover zoom>
            <Card style={{ width: '130px' }} className="card">
                <Card.Img variant="top" style={{ height: "200px" }} src={`https://image.tmdb.org/t/p/w220_and_h330_face${props.movie.poster_path}`} />
            </Card>
            <MDBMask className="flex-center" overlay="stylish-slight">
                <div className="card-background" >
                    <p>{props.movie.title}</p>
                    <h5>Language:{props.movie.original_language}</h5>
                    <h5>Rating:{props.movie.vote_average}</h5>
                    <h5 className="popularity">Popularity:{props.movie.popularity}</h5>
                </div>
            </MDBMask>
        </MDBView>
        </div>
    )
}
