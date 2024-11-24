import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { JSX, useEffect } from "react";

const withAuth = (Component: JSX.ElementType) => {
  return function WithAuth(props: JSX.IntrinsicAttributes) {
    const router = useRouter();
    const {session, loading} = useAuth();

    const checkIfUserIsLoggedIn = async () => {
      if (!loading && !session) {
        router.push("/");
      }
    };

    useEffect(() => {
      checkIfUserIsLoggedIn();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session]);

    return <Component {...props} />;
  };
};

export default withAuth;
