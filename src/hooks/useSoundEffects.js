export default function useSoundEffects() {
  const getCtx = () => {
    if (!window._audioCtx) {
      window._audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    }
    return window._audioCtx
  }

  const playCardSwipe = () => {
    const ctx = getCtx()
    const bufferSize = ctx.sampleRate * 0.08
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1)
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 2200
    filter.Q.value = 0.8

    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0.07, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    source.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)
    source.start()
  }

  const playPlayTap = () => {
    const ctx = getCtx()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(520, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.12)

    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    oscillator.start()
    oscillator.stop(ctx.currentTime + 0.13)
  }

  return { playCardSwipe, playPlayTap }
}
