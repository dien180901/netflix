import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import MovieBoard from './components/MovieBoard';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import './App.css';

let n = 1;
let clone = [];
const apikey = process.env.REACT_APP_APIKEY;
function App() {
  let [movieList, setMovieList] = useState([]);
  let [loading, setLoading] = useState(false);
  const loadMore = async () => {
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
    console.log("default", movieList);

  }
  const handleScroll = () => {
    if (loading) return;
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      loadMore();
    };
  };

  const search = async () => {
    let d = document.getElementById("input").value;
    if (d !== "") {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&page=1&include_adult=false&query=${d}`;

      console.log(url);
      let result = await fetch(url);
      let data = await result.json();
      console.log(data.results);
      setMovieList(data.results);
    }
  }
  useEffect(() => {
    callMovie()
    window.addEventListener('scroll', () => handleScroll());
  }, []);
  useEffect(() => {
    clone = movieList;
  }, [movieList]);
  const SortLeastToMost = () => {
    clone = movieList.slice();

    for (let i = 0; i < clone.length - 1; i++) {
      for (let j = i + 1; j < clone.length; j++) {
        if (clone[i].popularity > clone[j].popularity) {
          let c = clone[i];
          clone[i] = clone[j];
          clone[j] = c;
        }
      }


    }
    movieList = clone;
    setMovieList(clone);
    console.log("sort", movieList);
  };
  const SortMostToLeast = () => {
    clone = movieList.slice();
    for (let i = 0; i < clone.length - 1; i++) {
      for (let j = i + 1; j < clone.length; j++) {
        if (clone[i].popularity < clone[j].popularity) {
          let c = clone[i];
          clone[i] = clone[j];
          clone[j] = c;
        }
      }
    }
    // movieList=clone;
    setMovieList(clone);
    // console.log(movieList);
  }
  const FilterTrending = async () => {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
    console.log(url);
    let result = await fetch(url);
    let data = await result.json();
    console.log(data.results);
    setMovieList(data.results);
  }
  if (movieList == null) {
    return (<div>
      <h2>loading</h2>;
    </div>);
  }
  return (
    <div className="css-scroll-class" >
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand href="#home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Sort" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1" onClick={SortLeastToMost}>Least Popular To Most Popular  </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" onClick={SortMostToLeast}>Most Popular To Least Popular</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" onClick={FilterTrending}>Trending</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>

            </Nav>
            <form>
              <label>
                <input type="text" name="name" id="input" className="input-search" />
              </label>
              <Button variant="dark" onClick={search} className="btn-search">Search</Button>

            </form>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <MovieBoard movieList={movieList} />
    </div>
  );
}

export default App;
