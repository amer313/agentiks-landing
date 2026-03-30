import React from "react";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS, FONT_FAMILY_MONO } from "../../fonts";

interface DashboardShellProps {
  children: React.ReactNode;
  opacity?: number;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  opacity = 1,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        opacity,
        overflow: "hidden",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          backgroundColor: COLORS.surface2,
          borderBottom: `1px solid ${COLORS.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY_SANS,
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.foreground,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Mini logo icon */}
          <svg width={20} height={20} viewBox="0 0 149 157" fill={COLORS.brand}>
            <path d="M32.2 0h84.4l12.4 12.4v34.7H19.8V12.4L32.2 0z" />
            <path d="M0 64.5l74.4-12.4 74.4 12.4v17.3L74.4 69.4 0 81.8V64.5z" />
            <path d="M17.4 94.2l57-9.9 57 9.9v14.9l-57-9.9-57 9.9V94.2z" />
          </svg>
          Agentiks Dashboard
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY_MONO,
            fontSize: 12,
            color: COLORS.mutedForeground,
          }}
        >
          Operations &gt; Agent Cluster &gt; Live
        </div>
      </div>

      {/* Sidebar area */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 56,
          width: 280,
          bottom: 0,
          backgroundColor: COLORS.surface,
          borderRight: `1px solid ${COLORS.line}`,
        }}
      />

      {/* Main area */}
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 56,
          right: 320,
          bottom: 0,
          backgroundColor: COLORS.background,
        }}
      />

      {/* Right panel */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 56,
          width: 320,
          bottom: 0,
          backgroundColor: COLORS.surface,
          borderLeft: `1px solid ${COLORS.line}`,
        }}
      />

      {/* Children overlay */}
      {children}
    </div>
  );
};
