import { useState } from 'react'
import backImg from '../assets/images/Back.png'
import nextHoverImg from '../assets/images/Next-Hover.png'

export default function NavArrows({ onPrev, onNext }) {
  const [prevHovered, setPrevHovered] = useState(false)
  const [nextHovered, setNextHovered] = useState(false)

  return (
    <div className="nav-arrows">
      <button
        className="arrow-btn"
        onClick={onPrev}
        onMouseEnter={() => setPrevHovered(true)}
        onMouseLeave={() => setPrevHovered(false)}
        aria-label="Previous card"
      >
        <img
          src={prevHovered ? nextHoverImg : backImg}
          alt=""
          draggable={false}
          style={prevHovered ? { transform: 'scaleX(-1)' } : undefined}
        />
      </button>
      <button
        className="arrow-btn"
        onClick={onNext}
        onMouseEnter={() => setNextHovered(true)}
        onMouseLeave={() => setNextHovered(false)}
        aria-label="Next card"
      >
        <img
          src={nextHovered ? nextHoverImg : backImg}
          alt=""
          draggable={false}
          style={nextHovered ? undefined : { transform: 'scaleX(-1)' }}
        />
      </button>
    </div>
  )
}
