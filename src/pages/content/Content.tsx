import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

type ContentProps = {
  scrollContainer: React.RefObject<HTMLDivElement | null>;
};

export default function Content({ scrollContainer }: ContentProps) {
  const bgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null)

  useLayoutEffect(() => {
    if (!scrollContainer.current || !bgRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bgRef.current,
        scroller: scrollContainer.current,
        start: "top top",
        end: "+=400px",
        scrub: true,
      },
    });

    tl.fromTo(
      bgRef.current,
      { clipPath: "inset(20%)" },
      { clipPath: "inset(0%)", ease: "none" }
    );

    tl.fromTo(
      photoRef.current,
      { width: "40%" },
      { width: "50%" }
    )

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scrollContainer]);

  return (
    <div className="h-full w-full bg-black" ref={containerRef}>
      <div
        className="w-full h-screen relative flex items-center justify-center mt-40"
      >
        <img
          src="sky.jpg"
          alt=""
          ref={bgRef}
          className="h-[160vh] w-full object-cover absolute"
        />
        <img
          src="woman.jpg"
          alt=""
          data-scroll
          data-scroll-speed="0.1"
          className="w-[15%] z-10"
          ref={photoRef}
        />
        <h2
          data-scroll
          data-scroll-speed="2"
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white"
        >
          PHOTOGRAPH
        </h2>
      </div>
      <div className="w-full h-[140vh] pt-[40vh]">
        <span className="text-white">Rabbit Hole</span>
      </div>
    </div>
  );
}
