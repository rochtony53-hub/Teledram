import type { SVGProps } from "react";

const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const IconPlay = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" /></svg>
);

export const IconPause = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z" fill="currentColor" stroke="none" /></svg>
);

export const IconHome = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" /></svg>
);

export const IconSearch = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);

export const IconHeart = (p: SVGProps<SVGSVGElement> & { filled?: boolean }) => {
  const { filled, ...rest } = p;
  return (
    <svg {...base(rest)} fill={filled ? "currentColor" : "none"}>
      <path d="M12 20.5S3.5 15.5 3.5 9.3A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.5 2.7c0 6.2-8.5 11.2-8.5 11.2Z" />
    </svg>
  );
};

export const IconClock = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);

export const IconStar = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L12 3.5Z" fill="currentColor" stroke="none" /></svg>
);

export const IconBack = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></svg>
);

export const IconClose = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const IconFullscreen = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);

export const IconVolume = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" /><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" /></svg>
);

export const IconMute = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 9.5v5h3.5L13 19V5L7.5 9.5H4Z" /><path d="m16 9 6 6M22 9l-6 6" /></svg>
);

export const IconNext = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6 5.5v13l9-6.5-9-6.5Z" fill="currentColor" stroke="none" /><path d="M18 5v14" /></svg>
);

export const IconEye = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></svg>
);

export const IconFlame = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3s5.5 4.5 5.5 10a5.5 5.5 0 0 1-11 0C6.5 9 9 7 9.5 4.5c1 1.5 1.8 2.3 2.5 2.3C12.7 5.2 12 4 12 3Z" /></svg>
);

export const IconSparkle = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="M19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z" /></svg>
);

export const IconTrash = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13" /><path d="M10 11v5M14 11v5" /></svg>
);

export const IconChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m9 5 7 7-7 7" /></svg>
);

export const IconLogo = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="286 256 452 512" aria-hidden="true" {...p}><defs><linearGradient id="tlgtop" gradientUnits="userSpaceOnUse" x1="290" y1="207" x2="443" y2="512"><stop offset="0" stopColor="#FFF3C4"/><stop offset="1" stopColor="#F0C558"/></linearGradient><linearGradient id="tlgleft" gradientUnits="userSpaceOnUse" x1="290" y1="207" x2="290" y2="817"><stop offset="0" stopColor="#F0C459"/><stop offset="1" stopColor="#BF851C"/></linearGradient><linearGradient id="tlgright" gradientUnits="userSpaceOnUse" x1="443" y1="512" x2="800" y2="512"><stop offset="0" stopColor="#FBDB7F"/><stop offset="1" stopColor="#DDA436"/></linearGradient><linearGradient id="tlgbottom" gradientUnits="userSpaceOnUse" x1="443" y1="512" x2="290" y2="817"><stop offset="0" stopColor="#D9A031"/><stop offset="1" stopColor="#8F6012"/></linearGradient><clipPath id="tlc"><path d="M 290.0 330.0 L 290.0 694.0 A 70 70 0 0 0 396.0 754.1 L 700.0 572.1 A 70 70 0 0 0 700.0 451.9 L 396.0 269.9 A 70 70 0 0 0 290.0 330.0 Z"/></clipPath><filter id="tlb" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="26"/></filter></defs><g transform="translate(512 512) scale(1) translate(-512 -512)"><g clipPath="url(#tlc)"><polygon fill="url(#tlgtop)" points="290.0 206.5 443.1 512.0 606.4 395.9"/><polygon fill="url(#tlgleft)" points="290.0 206.5 290.0 817.5 443.1 512.0"/><polygon fill="url(#tlgright)" points="443.1 512.0 606.4 395.9 800.3 512.0 606.4 628.1"/><polygon fill="url(#tlgbottom)" points="290.0 817.5 443.1 512.0 606.4 628.1"/><line x1="290" y1="207" x2="443" y2="512" stroke="#FFF3C8" strokeOpacity=".55" strokeWidth="3"/><line x1="290" y1="817" x2="443" y2="512" stroke="#FFF3C8" strokeOpacity=".55" strokeWidth="3"/><line x1="443" y1="512" x2="606" y2="396" stroke="#FFF3C8" strokeOpacity=".55" strokeWidth="3"/><line x1="443" y1="512" x2="606" y2="628" stroke="#FFF3C8" strokeOpacity=".55" strokeWidth="3"/><path d="M 290.0 330.0 L 290.0 694.0 A 70 70 0 0 0 396.0 754.1 L 700.0 572.1 A 70 70 0 0 0 700.0 451.9 L 396.0 269.9 A 70 70 0 0 0 290.0 330.0 Z" fill="none" stroke="#FFF3C8" strokeOpacity=".5" strokeWidth="7"/></g></g></svg>
);
