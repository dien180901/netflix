import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MovieBoard from './components/MovieBoard';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'

let n = 1;
let clone = [];
const apikey = process.env.REACT_APP_APIKEY;
function App() {
  let [movieList, setMovieList] = useState([]);
  let [loading, setLoading] = useState(false);
  const loadMore = async (movieList) => {
    setLoading(true);
    n++;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${n}`;

    let result = await fetch(url);
    let data = await result.json();

    clone = clone.concat(data.results);
    setMovieList(clone)
    setLoading(false);
  }

  const callMovie = async () => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    let result = await fetch(url);
    let data = await result.json();
    setMovieList(data.results);
  }
  const handleScroll = (e) => {
    if (loading) return;
    // const that = this
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadMore(movieList);
    };
    // window.scroll(function () {
    //   if (window.scrollTop() + window.height() == document.height()) {
    //       loadMore()
    //   }
    // });
  };

  const search=(event)=> {
    event.preventDefault();
    console.log(document.getElementById("input").value);
    let d = document.getElementById("input").value;

    console.log(d);
  };
  useEffect(() => {
    callMovie()
    window.addEventListener('scroll', () => handleScroll(movieList));
  }, []);
  useEffect(() => {
    console.log(movieList)
    clone = movieList;
  }, [movieList])
  if (movieList == null) {
    return (<div>
      <h2>loading</h2>;
    </div>);
  }
  return (
    <div className="css-scroll-class" >
      {/* <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Popular</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <input type="submit" value="Submit" onClick={this.search.bind(this)} />
          </Navbar.Collapse>
        </Navbar>
      </div> */}
      <MovieBoard movieList={movieList} />
    </div>
  );
}

export default App;
