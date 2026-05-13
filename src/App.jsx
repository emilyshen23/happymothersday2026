import { useState, useCallback } from 'react'
import CardCarousel from './components/CardCarousel'
import NavDots from './components/NavDots'
import NavArrows from './components/NavArrows'
import cards from './data/cards'
import navBarImg from './assets/images/nav-bar.png'
import backgroundImg from './assets/images/background1.png'
import useSoundEffects from './hooks/useSoundEffects'
import './App.css'

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const { playCardSwipe } = useSoundEffects()

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

  const goNextWithSound = useCallback(() => {
    playCardSwipe()
    goNext()
  }, [playCardSwipe, goNext])

  const goPrevWithSound = useCallback(() => {
    playCardSwipe()
    goPrev()
  }, [playCardSwipe, goPrev])

  return (
    <>
      <img src={backgroundImg} className="app-bg" alt="" draggable={false} />

      <div className="phone-frame">
        <img src={navBarImg} className="nav-bar" alt="" draggable={false} />

        <p className="header-text">母亲节快乐!</p>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(86,55,25,0.2)', flexShrink: 0 }} />

        <NavDots
          total={cards.length}
          activeIndex={activeIndex}
        />

        <CardCarousel
          cards={cards}
          activeIndex={activeIndex}
          direction={direction}
          onNext={goNextWithSound}
          onPrev={goPrevWithSound}
        />

        <NavArrows onPrev={goPrevWithSound} onNext={goNextWithSound} />
      </div>
    </>
  )
}

export default App
