import './rating.css'

export const Rating = ({ rating, position }) => {

  const formattedRating = rating.toFixed(1)
  let colorByRating

  const ranges = [
    { range: [0, 6], color: '#C82020' },
    { range: [6, 7], color: '#777777' },
    { range: [7, 8], color: '#308E21' },
    { range: [8, 10], color: '#A59400' }
  ];

  for (const { range, color } of ranges) {
    if (rating >= range[0] && rating < range[1]) {
      colorByRating = color
    }
  }

  return (
    <div className={`rating--${position} rating`} style={{ backgroundColor: colorByRating }}>
      <img className={`rating__img--${position}`} src="/star.svg" alt="Иконка звезды" />
      <span className={`rating__number--${position}`}>{formattedRating}</span>
    </div>
  )

}