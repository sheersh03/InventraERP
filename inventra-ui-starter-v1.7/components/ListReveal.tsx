'use client';
import { useEffect, useState } from 'react';

export function ListReveal({ items, render, delay=60 }: { items: any[]; render: (item:any, i:number)=>React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    let i = 0;
    setVisible(0);
    const t = setInterval(() => {
      i++; setVisible(i);
      if (i >= items.length) clearInterval(t);
    }, delay);
    return () => clearInterval(t);
  }, [items, delay]);
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className={`transition-all duration-300 ${i < visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          {render(it, i)}
        </div>
      ))}
    </div>
  );
}
