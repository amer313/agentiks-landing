import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { FPS } from "../../brand";

interface CursorWaypoint {
  x: number;
  y: number;
  frame: number;
}

interface MouseCursorProps {
  path: CursorWaypoint[];
  clickFrame?: number;
}

export const MouseCursor: React.FC<MouseCursorProps> = ({
  path,
  clickFrame,
}) => {
  const frame = useCurrentFrame();

  if (path.length === 0) return null;

  // Find current position by interpolating between waypoints
  let x = path[0].x;
  let y = path[0].y;

  for (let i = 0; i < path.length - 1; i++) {
    const p0 = path[i];
    const p1 = path[i + 1];
    if (frame >= p0.frame && frame <= p1.frame) {
      x = interpolate(frame, [p0.frame, p1.frame], [p0.x, p1.x], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      y = interpolate(frame, [p0.frame, p1.frame], [p0.y, p1.y], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      break;
    }
    if (frame > p1.frame) {
      x = p1.x;
      y = p1.y;
    }
  }

  // Click animation
  const isClicking = clickFrame !== undefined && frame >= clickFrame;
  const clickSpring = isClicking
    ? spring({
        frame: frame - clickFrame,
        fps: FPS,
        config: { damping: 8, stiffness: 300 },
      })
    : 0;

  const cursorScale = isClicking
    ? interpolate(clickSpring, [0, 0.5, 1], [1, 0.8, 1])
    : 1;

  // Ripple effect
  const rippleFrame =
    clickFrame !== undefined ? frame - clickFrame : -1;
  const rippleRadius =
    rippleFrame >= 0 && rippleFrame < 15
      ? interpolate(rippleFrame, [0, 15], [12, 40])
      : 0;
  const rippleOpacity =
    rippleFrame >= 0 && rippleFrame < 15
      ? interpolate(rippleFrame, [0, 15], [0.6, 0])
      : 0;

  // Trail positions (past frames)
  const trailSizes = [8, 6, 4];
  const trailOpacities = [0.4, 0.25, 0.15];
  const trailOffsets = [3, 6, 9]; // frames behind

  // Only show cursor if we're within the path's frame range
  const firstFrame = path[0].frame;
  const lastFrame = path[path.length - 1].frame + 30;
  if (frame < firstFrame || frame > lastFrame) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {/* Trail circles */}
      {trailSizes.map((size, i) => {
        const trailFrame = frame - trailOffsets[i];
        let tx = x;
        let ty = y;

        for (let j = 0; j < path.length - 1; j++) {
          const p0 = path[j];
          const p1 = path[j + 1];
          if (trailFrame >= p0.frame && trailFrame <= p1.frame) {
            tx = interpolate(
              trailFrame,
              [p0.frame, p1.frame],
              [p0.x, p1.x],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            ty = interpolate(
              trailFrame,
              [p0.frame, p1.frame],
              [p0.y, p1.y],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            break;
          }
        }

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: tx - size / 2,
              top: ty - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              opacity: trailOpacities[i],
            }}
          />
        );
      })}

      {/* Ripple ring */}
      {rippleRadius > 0 && (
        <div
          style={{
            position: "absolute",
            left: x - rippleRadius,
            top: y - rippleRadius,
            width: rippleRadius * 2,
            height: rippleRadius * 2,
            borderRadius: "50%",
            border: "2px solid #FFFFFF",
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* Main cursor */}
      <div
        style={{
          position: "absolute",
          left: x - 6,
          top: y - 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#FFFFFF",
          transform: `scale(${cursorScale})`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
};
