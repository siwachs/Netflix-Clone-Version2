import React from "react";
import Banner from "../../component/Banner/Banner";
import Row from "../../component/Row/Row";
import requests from "../../utils/requests";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Banner fetchURL={requests.fetchTrending}></Banner>

      <Row
        title="Netflix Originals"
        fetchURL={requests.fetchNetflixOriginals}
        isNetflixOriginals
      ></Row>
      <Row title="Trending Now" fetchURL={requests.fetchTrending}></Row>
      <Row title="Top Rated" fetchURL={requests.fetchTopRated}></Row>
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies}></Row>
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies}></Row>
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies}></Row>
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies}></Row>
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries}></Row>
    </div>
  );
}

export default HomeScreen;
