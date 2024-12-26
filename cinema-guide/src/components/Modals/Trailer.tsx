import { useState } from "react"
import ReactPlayer from "react-player"
import { Loader } from '../Loader/Loader'
import { useAppSelector } from "../../redux/hooks"
import { selectMovie } from "../../redux/movieSlice"

export const Trailer = () => {

  const currentMovie = useAppSelector(selectMovie)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReady = () => {
    setIsLoading(false);
  };

  return (

    <div
      className="trailer__container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading && <Loader />}
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentMovie?.trailerYouTubeId}`}
        playing={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onReady={handleReady}
        loop={false}
        controls={false}
        width='100%'
        height='100%'
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
            },
          },
        }}
        style={{ display: isLoading ? 'none' : 'block', cursor: 'pointer' }}
      />
      {!isPlaying && (
        <>
          <button
            className="trailer__pause-btn trailer__btn"
            style={{
              backgroundImage: isHovered ?? !isPlaying ? `url('/trailer-play.png')` : `url('/trailer-pause.png')`
            }}
          ></button>
          <div className="trailer__title">{currentMovie?.title}</div>
        </>
      )}
    </div>
  )

}