"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function RedirectInner({ to }: { to: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    router.replace(query ? `${to}?${query}` : to);
  }, [router, searchParams, to]);

  return null;
}

export function RedirectTo({ to }: { to: string }) {
  return (
    <Suspense fallback={null}>
      <RedirectInner to={to} />
    </Suspense>
  );
}
