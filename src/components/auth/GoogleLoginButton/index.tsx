"use client";

import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

type ResponsiveGoogleLoginButtonProps = {
  onSuccess: (credentialResponse: any) => void;
};

export default function GoogleLoginButton({
  onSuccess,
}: ResponsiveGoogleLoginButtonProps) {
  const [width, setWidth] = useState(284);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setWidth(240);
      } else {
        setWidth(284);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GoogleLogin
      width={width}
      shape="circle"
      theme="outline"
      size="large"
      onSuccess={onSuccess}
      onError={() => {
        toast.error("Erro no login");
      }}
    />
  );
}
