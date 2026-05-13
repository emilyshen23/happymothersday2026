export default function NavArrows({ onPrev, onNext }) {
  return (
    <div className="nav-arrows">
      <button className="arrow-btn" onClick={onPrev} aria-label="Previous card">
        <span className="arrow-icon">&lt;</span>
      </button>
      <button className="arrow-btn" onClick={onNext} aria-label="Next card">
        <span className="arrow-icon">&gt;</span>
      </button>
    </div>
  )
}
