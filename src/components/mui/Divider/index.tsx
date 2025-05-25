"use client";
import Divider, { DividerProps } from "@mui/material/Divider";
import React from "react";

interface MuiDividerProps extends DividerProps {
  colorHex: string;
}

export default function MuiDivider({ colorHex, ...rest }: MuiDividerProps) {
  return (
    <div className="w-full my-3">
      <Divider
        sx={{
          "&::before, &::after": {
            borderColor: colorHex,
          },
          color: colorHex,
        }}
        variant="middle"
        {...rest}
      >
        ou
      </Divider>
    </div>
  );
}
