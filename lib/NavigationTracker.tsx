"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Base44 equivalent hook point
    console.log("Navigated to:", pathname);
  }, [pathname]);

  return null;
}
