import { useEffect } from 'react';

/**
 * Hook con lo scopo di ottimizzarer il valore LCP (Largest Contentful Paint).
 * @param url L'URL proxato dell'immagine che è l'LCP.
 */
export const useLcpPreloader = (url: string | null | undefined) => {
  useEffect(() => {
    // esco se url non stringa o invalido
    if (!url || typeof url !== 'string' || url.length === 0) {
      return;
    }

    // controlla se il link è gia stato messo tra i prioritari
    if (document.head.querySelector(`link[href="${url}"]`)) {
      return;
    }

    // Crea il link e gli da la priorità
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.setAttribute('fetchpriority', 'high'); 

 
    
    return () => {
      link.remove(); 
    };
  }, [url]); 
};
