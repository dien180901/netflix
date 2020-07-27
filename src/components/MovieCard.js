import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBMask, MDBView } from "mdbreact";
const apikey = "58ec1e16f6aa82d80c0564f35db2ba39";
export default function MovieCard(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [genre1, setgenre] = useState([]);

    const getGenres = async () => {
        let genre = [];
        let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
        let result = await fetch(url);
        let data = await result.json();
        for (let i = 0; i < props.movie.genre_ids.length; i++) {
            let a = props.movie.genre_ids[i];
            for (let j = 0; j < data.genres.length; j++) {
                if (props.movie.genre_ids[i] == data.genres[j].id) {
                    genre.push(data.genres[j].name);
                    break;
                }
            }

        }
        setgenre(genre);
    }
    useEffect(() => {
        getGenres()
    }, []);
    return (


        <div className="MVcard" onClick={handleShow}>
            <MDBView hover zoom>
                <Card style={{ width: '130px' }} className="dien-card" >
                    <Card.Img variant="top" style={{ height: "200px" }} src={`https://image.tmdb.org/t/p/w220_and_h330_face${props.movie.poster_path}`} />
                </Card>
                <MDBMask className="flex-center" overlay="stylish-slight">
                    <div className="card-background" >
                        <p>{props.movie.title}</p>
                        <h5>Language:{props.movie.original_language}</h5>
                        <h5>Rating:{props.movie.vote_average}</h5>
                        <h5 className="popularity">Popularity:{props.movie.popularity}</h5>
                        <h5>Genres:{genre1.map(item => item + " ")}</h5>
                    </div>
                </MDBMask>
            </MDBView>
            <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
        </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    )
}
