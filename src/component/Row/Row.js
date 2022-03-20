import { React, useState, useEffect, Fragment } from "react";
import "./Row.css";
import URLs from "../../utils/BaseURL";
import AxiosTMDB from "../../utils/AxiosTMDB";
import YouTube from "react-youtube";
import Modal from "../../Modals/Modal";
import { useYoutubePlay } from "../../Custom Hooks/useYoutubePlay";

function Row({ title, fetchURL, isNetflixOriginals }) {
  const [movies, setMovies] = useState([]);
  const { PlayOrTurnOffTrailer, YTURL, setURL, isModelOpen, setIsModelOpen } =
    useYoutubePlay();
  const opts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await AxiosTMDB.get(fetchURL);
      setMovies(request.data.results);

      return request;
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
      <div className="content_row">
        <h1 className="title">{title}</h1>
        <div className="backdrop">
          {movies.map((movie) => {
            return (
              <img
                onClick={() => PlayOrTurnOffTrailer(movie)}
                className={isNetflixOriginals ? "poster_img" : "backdrop_img"}
                key={movie?.id}
                src={`${URLs.imageURL}/w780${
                  isNetflixOriginals ? movie?.poster_path : movie?.backdrop_path
                }`}
                alt={movie?.title || movie?.name || movie?.original_title}
              ></img>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default Row;
