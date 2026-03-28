import React from "react";
import { COLORS } from "../../brand";
import { FONT_FAMILY_SANS } from "../../fonts";

interface CTAButtonProps {
  text?: string;
  showArrow?: boolean;
  width?: number;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text = "Book a Strategy Call",
  showArrow = true,
  width = 320,
}) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        backgroundColor: COLORS.brand,
        color: COLORS.foreground,
        fontFamily: FONT_FAMILY_SANS,
        fontSize: 18,
        fontWeight: 600,
        padding: "16px 32px",
        borderRadius: 12,
        width,
        boxShadow: `0 0 30px ${COLORS.brand}40, 0 4px 20px rgba(0,0,0,0.4)`,
      }}
    >
      {text}
      {showArrow && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );
};
