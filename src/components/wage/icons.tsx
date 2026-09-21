import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.8 4.3c.3-.9-.6-1.7-1.5-1.3L2.7 10.2c-.9.4-.8 1.7.1 2l4.4 1.3 1.7 5.3c.3.9 1.4 1.1 2 .4l2.4-2.6 4.5 3.3c.8.6 1.9.1 2.1-.9l2-14.7Z" />
      <path
        d="M9.3 13.4 17 8.2c.3-.2.6.2.4.5l-5.4 6.2-.4 3.1c0 .3-.5.3-.6 0l-1.7-5.6Z"
        fill="var(--color-accent-fg)"
      />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.3 5.2A17.4 17.4 0 0 0 15.2 4l-.4.7a16 16 0 0 1 3.1 1.1 14.7 14.7 0 0 0-12 0A16 16 0 0 1 9.1 4.7L8.8 4a17.4 17.4 0 0 0-4.1 1.2C2.4 8.4 1.7 11.5 1.9 14.5A17.6 17.6 0 0 0 7.3 16.8l.8-1.1a11.4 11.4 0 0 1-1.8-.8l.4-.3a12.6 12.6 0 0 0 10.6 0l.4.3a11.4 11.4 0 0 1-1.8.8l.8 1.1a17.6 17.6 0 0 0 5.4-2.3c.4-3.4-.4-6.5-1.8-9.3ZM8.7 13.4c-.8 0-1.5-.7-1.5-1.6s.7-1.6 1.5-1.6 1.5.7 1.5 1.6-.7 1.6-1.5 1.6Zm6.6 0c-.8 0-1.5-.7-1.5-1.6s.7-1.6 1.5-1.6 1.5.7 1.5 1.6-.7 1.6-1.5 1.6Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.6 3H20.4L14.1 10.2 21.7 21h-6.5l-4.3-6.4L5.5 21H2.7l6.8-7.8L2 3h6.6l3.9 5.9L17.6 3Zm-1.1 16.2h1.5L7.6 4.7H6L16.5 19.2Z" />
    </svg>
  );
}

export function DexscreenerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M4 16.5 8.2 11l3.1 3.4L16 8.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8.5h3.2V12" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="3" width="18" height="18" rx="4" />
    </svg>
  );
}
