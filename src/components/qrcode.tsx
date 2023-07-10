"use client";

import { parseColor } from "@/styles/colors";
import * as qrcode from "@bitjson/qr-code";
import { type QRCodeAnimation } from "@bitjson/qr-code/dist/types/components/qr-code/animations";
import React from "react";

if (typeof window !== "undefined") {
  qrcode.defineCustomElements(window);
}

export type QRCodeProps = {
  contents: string;
  moduleColor?: string;
  positionRingColor?: string;
  positionCenterColor?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLQrCodeElement>;

export const fadeIn: QRCodeAnimation = (targets, _x, _y, _count, entity) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  targets,
  from: entity === "module" ? Math.random() * 200 : 200,
  duration: 500,
  easing: "cubic-bezier(.5,0,1,1)",
  web: { opacity: [0, 1], scale: [0.5, 1.1, 1] },
});

export const fadeOut: QRCodeAnimation = (targets, _x, _y, _count, entity) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  targets,
  from: entity === "module" ? Math.random() * 200 : 200,
  duration: 500,
  easing: "cubic-bezier(.5,0,1,1)",
  web: { opacity: [1, 0], scale: [1, 1.1, 0.5] },
});

export const QRCode = React.forwardRef<HTMLQrCodeElement, QRCodeProps>(
  function QRCode(props, ref) {
    const { contents } = props;

    const moduleColor = parseColor(props.moduleColor ?? "primary");
    const positionRingColor = parseColor(props.positionRingColor ?? "accent");
    const positionCenterColor = parseColor(
      props.positionCenterColor ?? "secondary"
    );

    return (
      <qr-code
        ref={ref}
        contents={contents}
        module-color={moduleColor}
        position-ring-color={positionRingColor}
        position-center-color={positionCenterColor}
      >
        <div slot="icon">{props.children}</div>
      </qr-code>
    );
  }
);
