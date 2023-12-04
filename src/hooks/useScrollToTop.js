import { useRef } from 'react';

export default function useScrollToTop() {
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    scrollRef.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { scrollRef, scrollToTop };
}
