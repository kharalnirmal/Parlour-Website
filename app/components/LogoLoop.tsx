"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import "./LogoLoop.css";

const ANIMATION_CONFIG = { smoothTau: 0.25, minCopies: 2, copyHeadroom: 2 };

export type LogoLoopDirection = "left" | "right" | "up" | "down";

export type LogoLoopImageItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

export type LogoLoopNodeItem = {
  node: ReactNode;
  ariaLabel?: string;
  href?: string;
  title?: string;
};

export type LogoLoopItem = LogoLoopImageItem | LogoLoopNodeItem;

export type LogoLoopProps = {
  logos: readonly LogoLoopItem[];
  speed?: number;
  direction?: LogoLoopDirection;
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoLoopItem, index: number) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

type LogoLoopStyle = CSSProperties & {
  "--logoloop-gap"?: string;
  "--logoloop-logo-height"?: string;
  "--logoloop-fade-color"?: string;
};

function toCssLength(value: number | string | undefined) {
  return typeof value === "number" ? `${value}px` : value;
}

function isNodeItem(item: LogoLoopItem): item is LogoLoopNodeItem {
  return "node" in item;
}

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const [sequenceSize, setSequenceSize] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.minCopies);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isVertical = direction === "up" || direction === "down";
  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    return pauseOnHover === false ? undefined : 0;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const directionMultiplier = isVertical
      ? direction === "up"
        ? 1
        : -1
      : direction === "left"
        ? 1
        : -1;
    return Math.abs(speed) * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [direction, isVertical, speed]);

  const updateDimensions = useCallback(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;

    const sequenceRect = sequence.getBoundingClientRect();
    const measuredSize = isVertical ? sequenceRect.height : sequenceRect.width;
    const viewportSize = isVertical ? container.clientHeight : container.clientWidth;
    if (measuredSize <= 0) return;

    const roundedSize = Math.ceil(measuredSize);
    setSequenceSize((currentSize) =>
      currentSize === roundedSize ? currentSize : roundedSize,
    );

    const copiesNeeded = Math.ceil(viewportSize / measuredSize) + ANIMATION_CONFIG.copyHeadroom;
    const nextCopyCount = Math.max(ANIMATION_CONFIG.minCopies, copiesNeeded);
    setCopyCount((currentCount) =>
      currentCount === nextCopyCount ? currentCount : nextCopyCount,
    );
  }, [isVertical]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sequence = sequenceRef.current;
    if (!container || !sequence) return;

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();
      return () => window.removeEventListener("resize", updateDimensions);
    }

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);
    observer.observe(sequence);
    updateDimensions();
    return () => observer.disconnect();
  }, [copyCount, logos, updateDimensions]);

  useEffect(() => {
    const images = sequenceRef.current?.querySelectorAll<HTMLImageElement>("img");
    if (!images?.length) {
      updateDimensions();
      return;
    }

    let remainingImages = images.length;
    const handleImageSettled = () => {
      remainingImages -= 1;
      if (remainingImages === 0) updateDimensions();
    };

    images.forEach((image) => {
      if (image.complete) {
        handleImageSettled();
      } else {
        image.addEventListener("load", handleImageSettled, { once: true });
        image.addEventListener("error", handleImageSettled, { once: true });
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleImageSettled);
        image.removeEventListener("error", handleImageSettled);
      });
    };
  }, [logos, logoHeight, gap, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion) {
      track?.style.removeProperty("transform");
      return;
    }

    if (sequenceSize > 0) {
      offsetRef.current = ((offsetRef.current % sequenceSize) + sequenceSize) % sequenceSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.smoothTau);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (sequenceSize > 0) {
        offsetRef.current = (offsetRef.current + velocityRef.current * deltaTime) % sequenceSize;
        if (offsetRef.current < 0) offsetRef.current += sequenceSize;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [effectiveHoverSpeed, isHovered, isVertical, prefersReducedMotion, sequenceSize, targetVelocity]);

  const containerStyle = useMemo<LogoLoopStyle>(
    () => ({
      width: isVertical && width === "100%" ? undefined : toCssLength(width),
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logo-height": `${logoHeight}px`,
      ...(fadeOutColor ? { "--logoloop-fade-color": fadeOutColor } : {}),
      ...style,
    }),
    [fadeOutColor, gap, isVertical, logoHeight, style, width],
  );

  const rootClassName = [
    "logoloop",
    isVertical ? "logoloop--vertical" : "logoloop--horizontal",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderLogoItem = useCallback(
    (item: LogoLoopItem, index: number, isDuplicate: boolean) => {
      const content = renderItem ? (
        renderItem(item, index)
      ) : isNodeItem(item) ? (
        <span className="logoloop__node">{item.node}</span>
      ) : (
        // LogoLoop supports arbitrary remote image sources, which Next Image cannot infer safely.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
      const itemLabel = isNodeItem(item)
        ? item.ariaLabel ?? item.title
        : item.alt ?? item.title;
      const itemContent = item.href ? (
        <a
          className="logoloop__link"
          href={item.href}
          aria-label={itemLabel || "Logo link"}
          target="_blank"
          rel="noreferrer noopener"
          tabIndex={isDuplicate ? -1 : undefined}
        >
          {content}
        </a>
      ) : (
        content
      );

      return <li className="logoloop__item" key={index}>{itemContent}</li>;
    },
    [renderItem],
  );

  return (
    <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div
        ref={trackRef}
        className="logoloop__track"
        onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
        onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}
      >
        {Array.from({ length: copyCount }, (_, copyIndex) => {
          const isDuplicate = copyIndex > 0;
          return (
            <ul
              className="logoloop__list"
              key={`copy-${copyIndex}`}
              ref={copyIndex === 0 ? sequenceRef : undefined}
              aria-hidden={isDuplicate || undefined}
              inert={isDuplicate || undefined}
            >
              {logos.map((item, itemIndex) => renderLogoItem(item, itemIndex, isDuplicate))}
            </ul>
          );
        })}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
