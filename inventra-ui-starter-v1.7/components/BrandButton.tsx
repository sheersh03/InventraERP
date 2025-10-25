export function BrandButton({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="relative inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium text-white bg-brand-gradient transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B5CCFF] ring-offset-bg-app"
    >
      {children}
    </button>
  );
}
