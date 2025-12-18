import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once
gsap.registerPlugin(ScrollTrigger);

// Configure GSAP for better performance
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

// Set default ease for smoother animations
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
});

// Batch ScrollTrigger for better performance
ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger };

// Optimized animation presets using transform (GPU accelerated)
export const fadeInUp = (element: Element | string, options: gsap.TweenVars = {}) => {
  return gsap.fromTo(element,
    { 
      opacity: 0, 
      yPercent: 20,
      willChange: 'transform, opacity',
    },
    { 
      opacity: 1, 
      yPercent: 0,
      clearProps: 'willChange',
      ...options,
    }
  );
};

export const fadeInLeft = (element: Element | string, options: gsap.TweenVars = {}) => {
  return gsap.fromTo(element,
    { 
      opacity: 0, 
      xPercent: -10,
      willChange: 'transform, opacity',
    },
    { 
      opacity: 1, 
      xPercent: 0,
      clearProps: 'willChange',
      ...options,
    }
  );
};

export const fadeInRight = (element: Element | string, options: gsap.TweenVars = {}) => {
  return gsap.fromTo(element,
    { 
      opacity: 0, 
      xPercent: 10,
      willChange: 'transform, opacity',
    },
    { 
      opacity: 1, 
      xPercent: 0,
      clearProps: 'willChange',
      ...options,
    }
  );
};

export const scaleIn = (element: Element | string, options: gsap.TweenVars = {}) => {
  return gsap.fromTo(element,
    { 
      opacity: 0, 
      scale: 0.9,
      willChange: 'transform, opacity',
    },
    { 
      opacity: 1, 
      scale: 1,
      clearProps: 'willChange',
      ...options,
    }
  );
};

// Batch animation for multiple elements (more performant)
export const batchFadeInUp = (selector: string, options: {
  stagger?: number;
  scrollTrigger?: ScrollTrigger.Vars;
} = {}) => {
  const elements = gsap.utils.toArray(selector);
  if (elements.length === 0) return;

  return gsap.fromTo(elements,
    { 
      opacity: 0, 
      yPercent: 15,
    },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      stagger: options.stagger || 0.1,
      ease: 'power2.out',
      scrollTrigger: options.scrollTrigger ? {
        trigger: elements[0] as Element,
        start: 'top 85%',
        ...options.scrollTrigger,
      } : undefined,
    }
  );
};

// Create optimized scroll animation
export const createScrollAnimation = (
  selector: string,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  scrollOptions: ScrollTrigger.Vars = {}
) => {
  const elements = gsap.utils.toArray(selector);
  if (elements.length === 0) return;

  // Use a single ScrollTrigger for batch
  return gsap.fromTo(elements, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger: elements[0] as Element,
      start: 'top 85%',
      toggleActions: 'play none none none',
      ...scrollOptions,
    },
  });
};

// Animate skill bars with single ScrollTrigger
export const animateSkillBars = () => {
  const bars = gsap.utils.toArray('.skill-bar') as HTMLElement[];
  if (bars.length === 0) return;

  // Create one ScrollTrigger for all bars
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 70%',
    onEnter: () => {
      bars.forEach((bar, i) => {
        const level = bar.dataset.level || '0';
        gsap.to(bar, {
          width: `${level}%`,
          duration: 1,
          delay: i * 0.05,
          ease: 'power2.out',
        });
      });
    },
    once: true,
  });
};

// Cleanup function for page transitions
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.killTweensOf('*');
};
