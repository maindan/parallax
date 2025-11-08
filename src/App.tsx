import { useEffect, useRef, useState } from 'react'
import Content from './pages/content/Content'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!scrollRef.current) return
    let locoScroll: any

    ;(async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      locoScroll = new LocomotiveScroll({
        el: scrollRef.current!,
        smooth: true,
        lerp: 0.07,
      })

      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          if (arguments.length) locoScroll.scrollTo(value, { duration: 0 })
          return locoScroll.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }
        },
        pinType: scrollRef.current!.style.transform ? 'transform' : 'fixed',
      })

      locoScroll.on('scroll', ScrollTrigger.update)
      ScrollTrigger.addEventListener('refresh', () => locoScroll.update())

      // Marca que o scroll está pronto
      setIsReady(true)

      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 500)
    })()

    return () => locoScroll?.destroy()
  }, [])

  return (
    <div data-scroll-container ref={scrollRef}>
      {isReady && <Content scrollContainer={scrollRef} />}
    </div>
  )
}
