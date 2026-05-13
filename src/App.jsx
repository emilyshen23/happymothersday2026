import { useState, useCallback } from 'react'
import CardCarousel from './components/CardCarousel'
import NavDots from './components/NavDots'
import NavArrows from './components/NavArrows'
import cards from './data/cards'
import navBarImg from './assets/images/nav-bar.png'
import backgroundImg from './assets/images/background1.png'
import './App.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = useCallback(() => {
    const next = (activeIndex + 1) % cards.length
    setDirection(1)
    setActiveIndex(next)
  }, [activeIndex])

  const goPrev = useCallback(() => {
    const prev = (activeIndex - 1 + cards.length) % cards.length
    setDirection(-1)
    setActiveIndex(prev)
  }, [activeIndex])

  return (
    <>
      <img src={backgroundImg} className="app-bg" alt="" draggable={false} />

      <div className="phone-frame">
        <img src={navBarImg} className="nav-bar" alt="" draggable={false} />

        <p className="header-text">母亲节快乐!</p>

        <NavDots
          total={cards.length}
          activeIndex={activeIndex}
          activeColor={cards[activeIndex].accent}
        />

        <CardCarousel
          cards={cards}
          activeIndex={activeIndex}
          direction={direction}
        />

        <NavArrows onPrev={goPrev} onNext={goNext} />
      </div>
    </>
  )
}

export default App
