import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: { key: process.env.REACT_APP_YOUTUBE_API },
});

export default instance;
