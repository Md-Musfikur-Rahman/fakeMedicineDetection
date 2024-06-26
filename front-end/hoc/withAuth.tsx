"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useWallet } from "../context/WalletContext";

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { userAccount } = useWallet();

    useEffect(() => {
      if (!userAccount) {
        router.push("/");
      }
    }, [userAccount, router]);

    return userAccount ? <WrappedComponent {...props} /> : null;
  };

  return ComponentWithAuth;
};

export default withAuth;
