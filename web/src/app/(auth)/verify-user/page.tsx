"use client";

import { Spinner } from "@/components/ui";
import { UserType } from "@/interfaces/user.interface";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const redirectPaths = {
  [UserType.ADMIN]: "/admin",
  [UserType.EMPLOYEE]: "/internal",
  [UserType.CUSTOMER]: "/dashboard",
};

const verifyUserTypePage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    router.replace(redirectPaths[session.data?.user.userType as string]);
  }, [session]);

  return (
    <div className="h-screen grid place-items-center">
      <div>
        <Spinner classNames="mb-2 w-12  h-12 p-1 bg-blue-500" />
        <p>Setting up you dashboard</p>
      </div>
    </div>
  );
};

export default verifyUserTypePage;
