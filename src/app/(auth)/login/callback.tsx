"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { fetcher } from '@/lib/fetcher';

export default function GoogleCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const credential = params.get('credential');

    if (credential) {
      const decoded = jwtDecode(credential);
      console.log("Decoded Google Token:", decoded);

      // Fazer fetch pro backend
      fetcher('/login/google', {
        method: 'POST',
        body: JSON.stringify({ token: credential }),
      }).then(() => {
        toast.success("Login Google bem-sucedido!");
        router.push('/dashboard');
      }).catch(() => {
        toast.error("Erro no login Google");
      });
    }
  }, [router]);

  return <p>Processando login...</p>;
}
