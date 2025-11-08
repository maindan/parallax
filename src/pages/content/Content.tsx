import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

type ContentProps = {
  scrollContainer: React.RefObject<HTMLDivElement | null>;
};

export default function Content({ scrollContainer }: ContentProps) {
  const bgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);

  const photos:string[] = ["man.jpg", "window.jpg", "brut.jpg", "desert.jpg", "arch.jpg"]

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
      { clipPath: window.innerWidth < 800 ? "inset(15%)":"inset(20%)" },
      { clipPath: "inset(0%)", ease: "none" }
    );

    tl.fromTo(
      photoRef.current,
      { width: window.innerWidth < 800 ? "50%" : "15%" },
      { width: window.innerWidth < 800 ? "60%" : "20%" }
    )

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scrollContainer]);

  return (
    <div className="h-full w-full bg-black" ref={containerRef}>
      <div
        className="w-full h-[80vh] sm:h-screen relative flex items-center justify-center mt-40"
      >
        <img
          src="sky.jpg"
          alt=""
          ref={bgRef}
          className="h-[120vh] sm:h-[160vh] w-full object-cover absolute"
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
          className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-6xl text-white"
        >
          PHOTOGRAPH
        </h2>
      </div>
      <div className="w-full h-[120vh] sm:h-[140vh] pt-[20vh] sm:pt-[40vh]">
        <div className="w-full flex items-center justify-center mb-4">
          <span className="text-white text-5xl sm:text-6xl text-center">HIGHLIGHTS</span>
        </div>
        <div className="flex h-full w-full overflow-x-auto gap-4 px-10 scrollbar-hidden">
          {photos.map((photo: string, i: number) => (
            <div
              key={i}
              className="min-w-[90%] w-[90%] sm:min-w-[30%] sm:w-[30%] h-[70%] sm:h-[60%] flex items-center justify-center overflow-hidden shadow-lg bg-black hover:scale-[1.02] transition-all ease-in-out my-auto sm:m-0"
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
