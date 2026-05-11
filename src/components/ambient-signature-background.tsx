"use client";

import { motion, useReducedMotion } from "framer-motion";

const drawEase = [0.33, 1, 0.68, 1] as const;

const ambientStrokes = [
  {
    d: "M358.165 69.42C368.57 61.7502 373.089 56.989 376.665 46.92C378.715 38.1098 379.289 33.2312 376.665 24.92C370.932 17.6813 364.09 13.501 354 11.483C341.5 8.98303 331.5 9.98301 316.5 11.9831C302.594 13.8372 298.961 14.8746 285.165 17.42C271.419 19.9563 263.693 21.3987 250.165 24.92C230.266 30.0997 219.412 34.1851 200.165 41.42C180.509 48.8085 169.803 53.7775 150.665 62.42C150.665 62.42 128.478 72.2826 114.665 79.42C98.8936 87.5697 89.8622 91.9622 75.1652 101.92C61.5826 111.123 50.9721 119.833 42.1652 127.92C33.3582 136.007 26.3975 142.706 28.6652 153.92C30.007 160.555 32.5303 163.796 38.1652 168.42C45.1082 171.469 49.1235 172.946 57.1652 173.92C67.4963 175.761 73.2962 176.335 83.6652 176.42L154.165 173.92L187.165 171.42H213.165H232.665L251.165 172.92C251.165 172.92 262.887 173.736 269.665 176.42C275.054 178.554 278.717 179.761 282.165 184.42C284.776 187.947 286.866 190.588 286.165 194.92C285.414 199.562 282.657 201.77 279.165 204.92C272.476 210.955 260 216.92 260 216.92L242 223.483L212 233.483L178 243.483L151 249.983L111 256.483L74 259.983C74 259.983 56.4347 261.983 45.5 261.983C37.6895 261.983 26 259.983 26 259.983C26 259.983 15.6685 256.427 14.1652 253.92C12.6619 251.413 12.5621 249.993 14.1652 247.42C15.7682 244.847 21 240.92 21 240.92L36 232.42L51.1652 225.42L69.1652 216.42L105.165 200.92L135.165 189.42L152.665 183.42L174.665 176.42L222.665 161.92L251.165 153.42L268.665 148.92L304.665 140.92L329.665 136.42L348.165 133.92C348.165 133.92 356.094 132.968 358.165 136.42C359.672 138.932 358.165 143.92 358.165 143.92C358.165 143.92 355.001 149.825 352.665 153.42C349.324 158.561 343.165 165.92 343.165 165.92L334.165 179.42L324.165 195.92C324.165 195.92 318.287 208.42 317.665 210.92C317.044 213.42 318.665 216.92 318.665 216.92C318.665 216.92 320.976 218.478 322.665 218.92C324.743 219.464 326.13 219.778 328.165 218.92C330.201 218.062 330.918 217.723 332.665 216.92C353.679 207.266 382.165 184.42 382.165 184.42L433.665 146.42",
    opacity: 0.075,
    strokeWidth: 9,
    duration: 2.2,
    delay: 0,
  },
  {
    d: "M433.665 146.42L432.5 152.483L431.5 157.983L430 162.983L428.665 173.42C428.665 173.42 427.732 178.735 428.665 181.92C429.655 185.298 431.216 186.892 433.665 189.42C434.918 190.713 438 191.983 438 191.983C438 191.983 442.346 193.334 445.665 193.92H456.165L497.165 189.42L619.165 172.42L700.165 164.42L791.665 157.42L911.665 153.92",
    opacity: 0.085,
    strokeWidth: 7,
    duration: 1.55,
    delay: 0.65,
  },
] as const;

const placements = [
  {
    className: "right-[-10rem] top-[7rem] w-[64rem] -rotate-[8deg]",
    opacity: 1,
  },
  {
    className: "left-[-23rem] bottom-[-2rem] w-[46rem] rotate-[7deg]",
    opacity: 0.38,
  },
  {
    className: "right-[-20rem] bottom-[5rem] w-[48rem] rotate-[172deg]",
    opacity: 0.26,
  },
] as const;

export function AmbientSignatureBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden text-black dark:text-white lg:block motion-reduce:opacity-60"
    >
      {placements.map((placement, placementIndex) => (
        <motion.svg
          key={placement.className}
          viewBox="0 0 925 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute h-auto max-w-none overflow-visible ${placement.className}`}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: placement.opacity }}
          transition={{ duration: 0.7, delay: placementIndex * 0.12 }}
        >
          {ambientStrokes.map((stroke, strokeIndex) => (
            <motion.path
              key={`${placement.className}-${stroke.d}`}
              d={stroke.d}
              stroke="currentColor"
              strokeWidth={stroke.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                shouldReduceMotion
                  ? { opacity: stroke.opacity, pathLength: 1 }
                  : { opacity: 0, pathLength: 0 }
              }
              animate={{ opacity: stroke.opacity, pathLength: 1 }}
              transition={{
                pathLength: {
                  delay: stroke.delay + placementIndex * 0.14 + strokeIndex * 0.08,
                  duration: stroke.duration,
                  ease: drawEase,
                },
                opacity: {
                  delay: stroke.delay + placementIndex * 0.14,
                  duration: 0.45,
                },
              }}
            />
          ))}
        </motion.svg>
      ))}
    </div>
  );
}
