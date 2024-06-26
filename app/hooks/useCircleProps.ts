import { useEffect, useRef, useState } from "react";

type CircleProps = {
  percentage: number;
  strokePercentage: number;
  numCircles: number;
  maxRadius: number;
  centerX: number;
  centerY: number;
  triggerAnimation?: boolean;
};

type CircleReturnedProps = {
  percentageLabel: number;
  centerX: number;
  centerY: number;
  angleStep: number;
  radius: number;
  extraSpace: number;
  stroke: {
    radius: number;
    circumference: number;
    dashoffset: number | null;
    color: string;
    width: number;
  };
};

export const useCircleProps = ({
  percentage,
  strokePercentage,
  numCircles,
  maxRadius,
  centerX,
  centerY,
  triggerAnimation,
}: CircleProps): CircleReturnedProps => {
  const [strokeDashoffset, setStrokeDashoffset] = useState<number | null>(null);
  const [percentageLabel, setPercentageLabel] = useState<number>(0);
  const startRef = useRef<number | null>(null);
  const extraSpace = 5;
  const angleStep = (2 * Math.PI) / numCircles;
  // const angleStep =
  //   numCircles < 6 ? (2 * Math.PI) / 8 : (2 * Math.PI) / numCircles;
  const circleRadius = Math.abs(
    (maxRadius * Math.sin(angleStep / 2)) / (1 + Math.sin(angleStep / 2)) -
      extraSpace
  );
  const minCircleRadius = 20;
  const maxCircleRadius = 60;
  const radius =
    circleRadius < minCircleRadius || circleRadius > maxCircleRadius
      ? maxCircleRadius
      : circleRadius;
  const strokeRadius = maxRadius - radius - extraSpace;

  const strokeWidth = radius * 2 + 10;
  const strokeColor = "#22c55e";
  const strokeCircumference = 2 * Math.PI * strokeRadius;
  const strokeOffset =
    strokeCircumference - strokePercentage * strokeCircumference;
  const duration = 1000;
  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) {
        startRef.current = timestamp;
      }
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * percentage * 100);
      setPercentageLabel(current);
      const easedProgress = easeInOutQuad(progress);
      const currentOffset =
        strokeCircumference -
        easedProgress * (strokeCircumference - strokeOffset);
      setStrokeDashoffset(currentOffset);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    if (triggerAnimation) {
      startRef.current = null;
      requestAnimationFrame(animate);
    }
  }, [percentage, strokeCircumference, strokeOffset, triggerAnimation]);

  return {
    percentageLabel,
    centerX,
    centerY,
    angleStep,
    radius,
    extraSpace,
    stroke: {
      radius: strokeRadius,
      circumference: strokeCircumference,
      dashoffset: strokeDashoffset,
      color: strokeColor,
      width: strokeWidth,
    },
  };
};
