export function QrCodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-1a2 2 0 0 0-2 2v1" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
      <path d="M20 12h.01" />
      <path d="M12 16h.01" />
      <path d="M12 20h.01" />
    </svg>
  );
}