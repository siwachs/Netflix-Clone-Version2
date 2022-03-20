import "./Banner.css";
import React, { useState, useEffect, Fragment } from "react";
import URLs from "../../utils/BaseURL";
import AxiosTMDB from "../../utils/AxiosTMDB";
import { useYoutubePlay } from "../../Custom Hooks/useYoutubePlay";
import YouTube from "react-youtube";
import Modal from "../../Modals/Modal";

function Banner({ fetchURL }) {
  const [movie, setMovie] = useState([]);
  const { PlayOrTurnOffTrailer, setURL, YTURL, setIsModelOpen, isModelOpen } =
    useYoutubePlay();
  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request_trending = await AxiosTMDB.get(fetchURL);
      setMovie(
        request_trending.data.results[
          Math.floor(Math.random() * request_trending.data.results.length - 1)
        ]
      );
      return request_trending;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <Fragment>
      <Modal
        isOpen={isModelOpen}
        close={() => setIsModelOpen(false)}
        setURL={setURL}
      >
        <div>
          <YouTube videoId={YTURL} opts={opts}></YouTube>
        </div>
      </Modal>
      <header
        className="banner"
        style={{
          backgroundImage: `url(${URLs.imageURL}/original${movie?.backdrop_path})`,
        }}
      >
        <div className="content">
          <div className="movie_title">
            <h1>{movie?.title || movie?.name || movie?.original_title}</h1>
          </div>
          <div className="movie_desc">
            <h1>{movie?.overview}</h1>
          </div>
          <div className="banner-btn">
            <button
              onClick={() => PlayOrTurnOffTrailer(movie)}
              className="play-btn"
            >
              Play
            </button>
            <button className="moreInfo-btn">More info</button>
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default Banner;
