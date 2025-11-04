import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ContentProps = {
  scrollContainer: React.RefObject<HTMLDivElement | null>; // <-- permite null
};

export default function Content({ scrollContainer }: ContentProps) {
  const bgRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    console.log(scrollContainer.current)
    if (!scrollContainer.current || !bgRef.current) return;

    console.log('chegou')

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: bgRef.current,
        scroller: scrollContainer.current,
        start: "top top",
        end: "+=200px",
        scrub: true,
        markers: true,
      },
    });

    timeline
        .from(bgRef.current,
            { clipPath: "inset(20%)"});

    return () => timeline.scrollTrigger?.kill();
  }, [scrollContainer]);

  return (
    <div className="h-full w-full bg-black">
      <div
        className="w-full h-screen relative flex items-center justify-center mt-50"
      >
        <img
          src="arch.jpg"
          alt=""
          ref={bgRef}
          className="h-[140vh] w-full object-cover absolute"
        />
        <img
          src="man.jpg"
          alt=""
          data-scroll
          data-scroll-speed="0.8"
          className="w-[15%] z-10"
        />
        <h2
          data-scroll
          data-scroll-speed="2"
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white"
        >
          TEXTOOOOOO
        </h2>
      </div>
      <div className="w-full h-screen"></div>
    </div>
  );
}
