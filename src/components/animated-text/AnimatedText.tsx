import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import type { ContentProps } from '../../pages/content/Content';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedText({ scrollContainer }: ContentProps) {
  const phrases = [
    'danlimadev@gmail.com',
    'github.com/maindan',
    'linkedin.com/danlimadev',
  ];

  return (
    <div className="relative uppercase text-2xl text-white ml-6">
      {phrases.map((phrase, index) => (
        <AnimatedTextBehavior
          key={index}
          scrollContainer={scrollContainer}
        >
          {phrase}
        </AnimatedTextBehavior>
      ))}
    </div>
  );
}

type AnimatedTextBehaviorProps = {
  children: React.ReactNode;
  scrollContainer: React.RefObject<HTMLElement | null>;
};

function AnimatedTextBehavior({
  children,
  scrollContainer,
}: AnimatedTextBehaviorProps) {
  const textRef = useRef<HTMLAnchorElement | null>(null);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          scroller: scrollContainer.current || undefined,
          start: '0px bottom',
          end: 'bottom +=400px bottom',
          scrub: true,
          markers: true,
        },
        x: -200,
        opacity: 0,
        // ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, [scrollContainer]);

  return (
    <a
      ref={textRef}
      href={String(children)}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:underline"
    >
      {children}
    </a>
  );
}
