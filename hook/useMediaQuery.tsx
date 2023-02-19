import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export default function useMediaQuery(
  query: number,
  element: MutableRefObject<HTMLDivElement | null>,
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>
): boolean {
  const media = window.matchMedia(`(max-width:${query}px)`);

  const handleChange = () => setVisible(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (media.matches) {
        handleChange();
        if (!visible) return;

        const handleClick = (e: any) => {
          if (element.current && !element.current.contains(e.target)) {
            setVisible(false);
          }
        };
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
      }
    }
  }, [query]);

  return visible;
}
