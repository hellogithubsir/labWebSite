import type { SVGProps } from "react";

/**
 * Icons extracted verbatim from the target theme's SVG assets
 * (wp-content/themes/ibm-mit/assets/images/*.svg).
 *
 * Paths/coordinates are unchanged from source so the marks are pixel-identical.
 * Where the theme ships two color variants of the same mark (e.g. search
 * black/pink), the stroke is switched to `currentColor` so the swap is driven
 * by CSS `color` instead of a second asset.
 */

/** The lab logo: 8 horizontal magenta→blue rules over 5 vertical crimson rules. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="69"
      viewBox="0 0 40 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M40 40.1781L22.303 40.1781L22.303 39.2041L40 39.2041L40 40.1781Z" fill="#BE2FA8" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 34.5775H0V33.6035H40V34.5775Z" fill="#A03AB7" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 28.977H0V28.0029H40V28.977Z" fill="#8C41C0" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 23.3764H0V22.4023H40V23.3764Z" fill="#7748CA" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 17.7758H0V16.8018H40V17.7758Z" fill="#624FD5" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 12.1752H0V11.2012H40V12.1752Z" fill="#4F56DE" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 6.57461H0V5.60059H40V6.57461Z" fill="#3B5DE8" />
      <path fillRule="evenodd" clipRule="evenodd" d="M40 0.974026H0V0H40V0.974026Z" fill="#0062FF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M22.303 68.1823V44.8057H23.2727V68.1823H22.303Z" fill="#BE2FA8" />
      <path fillRule="evenodd" clipRule="evenodd" d="M16.7273 68.1814V39.2041H17.697V68.1814H16.7273Z" fill="#B62B86" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.1515 68.1814V39.2041H12.1212V68.1814H11.1515Z" fill="#B12870" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.57576 68.1814V39.2041H6.54546V68.1814H5.57576Z" fill="#AB2457" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 68.1814V39.2041H0.969697V68.1814H0Z" fill="#A31F34" />
    </svg>
  );
}

/** Magenta rotated X used as the menu-close mark. */
export function CloseX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line y1="-0.5" x2="55.5088" y2="-0.5" transform="matrix(0.702592 0.711593 -0.702592 0.711593 0 1)" stroke="#BE2FA8" />
      <line y1="-0.5" x2="55.5088" y2="-0.5" transform="matrix(0.702592 -0.711593 0.702592 0.711593 1 40.5)" stroke="#BE2FA8" />
    </svg>
  );
}

/** Vertical "Close" wordmark + X (open-menu toggle art). */
export function CloseToggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="85"
      viewBox="0 0 40 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M25.032 80.0763C25.032 78.2203 24.056 76.8603 22.488 76.1563L21.816 77.2283C23.032 77.6763 23.832 78.6523 23.832 80.0763C23.832 81.9963 22.44 83.1323 20.152 83.1323L18.488 83.1323C16.2 83.1323 14.68 81.9963 14.68 80.0763C14.68 78.7003 15.432 77.7723 16.584 77.3243L15.928 76.2363C14.376 76.9403 13.48 78.2203 13.48 80.0763C13.48 82.8923 15.592 84.5723 19.32 84.5723C23.048 84.5723 25.032 82.8923 25.032 80.0763Z" fill="black" />
      <path d="M24.84 71.7068L23.72 71.7068L23.72 72.9228L13 72.9228L13 74.2028L23.512 74.2028C24.28 74.2028 24.84 73.7228 24.84 72.8428L24.84 71.7068Z" fill="black" />
      <path d="M25.032 66.7234C25.032 64.5154 23.336 62.9954 20.712 62.9954C18.088 62.9954 16.392 64.5154 16.392 66.7234C16.392 68.9314 18.088 70.4514 20.712 70.4514C23.336 70.4514 25.032 68.9314 25.032 66.7234ZM23.896 66.7234C23.896 68.0994 23.048 69.0754 21.304 69.0754L20.12 69.0754C18.376 69.0754 17.528 68.0994 17.528 66.7234C17.528 65.3474 18.376 64.3714 20.12 64.3714L21.304 64.3714C23.048 64.3714 23.896 65.3474 23.896 66.7234Z" fill="black" />
      <path d="M25.032 58.4103C25.032 56.5223 24.056 55.3543 22.456 55.3543C21.208 55.3543 20.408 56.0583 20.136 57.8823L20.04 58.5223C19.88 59.5463 19.56 60.1063 18.76 60.1063C17.976 60.1063 17.48 59.5463 17.48 58.4903C17.48 57.4343 17.976 56.7303 18.488 56.3623L17.72 55.5143C16.888 56.1863 16.392 57.0663 16.392 58.3943C16.392 60.0743 17.192 61.3383 18.824 61.3383C20.36 61.3383 20.984 60.2023 21.208 58.6823L21.304 58.0263C21.464 56.9383 21.96 56.5863 22.6 56.5863C23.448 56.5863 23.944 57.2263 23.944 58.3143C23.944 59.3543 23.48 60.1223 22.68 60.7623L23.416 61.6743C24.392 60.9383 25.032 59.9303 25.032 58.4103Z" fill="black" />
      <path d="M25.032 49.9894C25.032 48.4374 24.264 47.2534 23.144 46.7254L22.488 47.6374C23.4 48.0694 23.912 48.8694 23.912 49.9094C23.912 51.4454 22.84 52.3574 21.416 52.3574L21.032 52.3574L21.032 46.4214L20.424 46.4214C18.088 46.4214 16.392 47.7814 16.392 49.9894C16.392 52.2294 18.088 53.7014 20.712 53.7014C23.336 53.7014 25.032 52.2294 25.032 49.9894ZM17.464 49.9894C17.464 48.6774 18.44 47.7974 19.896 47.7974L20.072 47.7974L20.072 52.3574L19.96 52.3574C18.52 52.3574 17.464 51.3814 17.464 49.9894Z" fill="black" />
      <line y1="-0.5" x2="55.5088" y2="-0.5" transform="matrix(0.702592 0.711593 -0.702592 0.711593 0 1)" stroke="#BE2FA8" />
      <line y1="-0.5" x2="55.5088" y2="-0.5" transform="matrix(0.702592 -0.711593 0.702592 0.711593 1 40.5)" stroke="#BE2FA8" />
    </svg>
  );
}

/** Mobile hamburger: five blue→violet rules. */
export function Hamburger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="29"
      height="21"
      viewBox="0 0 29 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line y1="0.5" x2="29" y2="0.5" stroke="#0062FF" />
      <line y1="5.5" x2="29" y2="5.5" stroke="#3B5DE8" />
      <line y1="10.5" x2="29" y2="10.5" stroke="#4F56DE" />
      <line y1="15.5" x2="29" y2="15.5" stroke="#624FD5" />
      <line y1="20.5" x2="29" y2="20.5" stroke="#7748CA" />
    </svg>
  );
}

/** Centered mobile logo mark (horizontal rules over vertical crimson rules). */
export function MobileLogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="30"
      height="59"
      viewBox="0 0 30 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line y1="25.5" x2="29" y2="25.5" stroke="#8C41C0" />
      <line y1="30.5" x2="29" y2="30.5" stroke="#A03AB7" />
      <line x1="19" y1="35.5" x2="29.028" y2="35.5" stroke="#BE2FA8" />
      <line x1="14.75" y1="35" x2="14.75" y2="59" stroke="#B62B86" />
      <line x1="19.5" y1="40" x2="19.5" y2="59" stroke="#BE2FA8" />
      <line x1="10" y1="35" x2="10" y2="59" stroke="#B12870" />
      <line x1="5.25" y1="35" x2="5.25" y2="59" stroke="#AB2457" />
      <line x1="0.5" y1="35" x2="0.5" y2="59" stroke="#A31F34" />
    </svg>
  );
}

/** Search glyph. Stroke follows `currentColor` (black default, magenta on hover). */
export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="6.5" cy="6.5" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10.5303" y1="10.4697" x2="15.5303" y2="15.4697" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Carbon menu down-arrow. Fill follows `currentColor`. */
export function DownArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      aria-hidden="true"
      {...props}
    >
      <path fill="currentColor" d="M5 6L0 1 .7.3 5 4.6 9.3.3l.7.7z" />
    </svg>
  );
}

/** Grid-view toggle (four squares). */
export function GridViewToggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="6" height="6" stroke="currentColor" />
      <rect x="0.5" y="10.5" width="6" height="6" stroke="currentColor" />
      <rect x="10.5" y="0.5" width="6" height="6" stroke="currentColor" />
      <rect x="10.5" y="10.5" width="6" height="6" stroke="currentColor" />
    </svg>
  );
}

/** List-view toggle (three rules). */
export function ListViewToggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line y1="0.5" x2="17" y2="0.5" stroke="currentColor" />
      <line y1="7.5" x2="17" y2="7.5" stroke="currentColor" />
      <line y1="14.5" x2="17" y2="14.5" stroke="currentColor" />
    </svg>
  );
}
