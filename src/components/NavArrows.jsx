import backImg from '../assets/images/Back.png'
import nextHoverImg from '../assets/images/Next-Hover.png'

export default function NavArrows({ onPrev, onNext }) {
  return (
    <div className="nav-arrows">
      <button className="arrow-btn" onClick={onPrev} aria-label="Previous card">
        <img src={backImg} alt="" draggable={false} className="arrow-default" />
        <img src={nextHoverImg} alt="" draggable={false} className="arrow-hover" style={{ transform: 'scaleX(-1)' }} />
      </button>
      <button className="arrow-btn" onClick={onNext} aria-label="Next card">
        <img src={backImg} alt="" draggable={false} className="arrow-default" style={{ transform: 'scaleX(-1)' }} />
        <img src={nextHoverImg} alt="" draggable={false} className="arrow-hover" />
      </button>
    </div>
  )
}
