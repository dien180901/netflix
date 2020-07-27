import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {  Row, Container, Col } from 'react-bootstrap'
import { MDBMask, MDBView } from "mdbreact";
import Badge from 'react-bootstrap/Badge'
const apikey = "58ec1e16f6aa82d80c0564f35db2ba39";
export default function MovieCard(props) {
    const [show, setShow] = useState(false);
    let [youtubeLink, setYoutubeLink] = useState(null)
    let [runtime,setRuntime]=useState(null)
    let [homepage,setHomePage]=useState(null)
    const handleClose = () =>
        setShow(false);
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
    const callApiGetVideo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=0fe0cfcc2a26aafa851117e003638b00&language=en-US&append_to_response=videos`
        let respone = await fetch(url)
        let data = await respone.json()
        console.log('data:', data)
        if (data.videos.results.length > 0) {
            setYoutubeLink(`https://www.youtube.com/embed/${data.videos.results[0].key}`)
        }
        
       

        setRuntime(data.runtime)
        setHomePage(data.homepage)
        
    }
    useEffect(() => {
        getGenres()
        callApiGetVideo()
    }, []);
    return (

        <>
            <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-xl"
                    aria-labelledby="example-custom-modal-styling-title"
                    style={{borderRadius:"15px"}}
                >
                    <Modal.Header closeButton style={{ backgroundColor: "black", }}>
                        <Modal.Title style={{ color: "white" }} id="example-custom-modal-styling-title">
                            {props.movie.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ heigt: "600px", backgroundImage:"linear-gradient(to left, #1f2126, #171c1e, #121616, #0d0f0d, #050504)",color:"white" }}>
                        <Container>
                            <Row>
                                <Col><iframe src={youtubeLink} width="540" height="450" title="fx." ></iframe></Col>
                                <Col>
                                    <span style={{fontWeight:"bolder", fontSize:"20px", textDecoration:"underline"}}>The Synopsis:</span><br></br>
                                    <span style={{fontSize:"20px"}}>{props.movie.overview}</span><br></br>
                                    <span style={{fontWeight:"bolder", fontSize:"20px",textDecoration:"underline"}}>Release date:</span><br></br>
                                    <span style={{fontSize:"20px"}}>{props.movie.release_date}</span><br></br>
                                    <span style={{fontWeight:"bolder", fontSize:"20px",textDecoration:"underline"}}>Genres:</span><br></br>
                                    <span style={{fontWeight:"bolder",fontSize:"20px",textDecoration:"underline"}}>Run Time:</span><br></br> 
                                    <span style={{fontSize:"20px"}}>{runtime} minutes</span><br></br>
                                    <span style={{fontWeight:"bolder",fontSize:"20px",textDecoration:"underline"}}>Website:</span><br></br> 
                                    <a href={homepage} ><span>{props.movie.title}</span></a>
                                </Col>
                            </Row>
                        </Container>



                    </Modal.Body>
                </Modal><div className="MVcard" onClick={handleShow}>

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
                            <h5>Genres:{genre1.map(item => <Badge pill variant="danger">
    {item}
  </Badge>)}</h5>
                        </div>
                    </MDBMask>
                </MDBView>
            </div>
        </>
    )
}
