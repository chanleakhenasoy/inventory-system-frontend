"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setIsAuth(true);
    }

    setChecking(false);
  }, [router]);

  if (checking) return <div className="p-6">Checking authentication...</div>;

  return isAuth ? <>{children}</> : null;
};

export default ProtectedRoute;
