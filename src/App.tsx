import { useEffect, useRef } from 'react'
import Content from './pages/content/Content'
import 'locomotive-scroll/dist/locomotive-scroll.css'

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let locomotive: any

    if (!scrollRef.current) return

    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default
      locomotive = new LocomotiveScroll({
        el: scrollRef.current!,
        smooth: true,
        lerp: 0.07,
      })
    })()

    return () => {
      if (locomotive) locomotive.destroy()
    }
  }, [])

  return (
    <div data-scroll-container ref={scrollRef}>
      {/* Passa a referência do pai como prop */}
      {scrollRef.current && <Content scrollContainer={scrollRef} />}
    </div>
  )
}
