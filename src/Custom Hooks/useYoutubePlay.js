import { useState } from "react";
import AxiosYoutube from "../utils/AxiosYoutube";

export const useYoutubePlay = () => {
  const [YTURL, setURL] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const PlayOrTurnOffTrailer = async (movie) => {
    let request = await AxiosYoutube("/search", {
      params: {
        part: "snippet",
        maxResults: 1,
        q: `${movie?.original_title || movie?.title || movie?.name}`,
        type: "video",
      },
    });
    if (YTURL) {
      setURL("");
      setIsModelOpen(false);
    } else {
      setURL(request.data.items[0].id.videoId);
      setIsModelOpen(true);
    }
  };
  return { PlayOrTurnOffTrailer, setURL, YTURL, setIsModelOpen, isModelOpen };
};
