"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFromSchema, LoginFromSchemaType } from "@/lib/schema/auth.schema";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { Spinner } from "@/components/ui";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFromSchemaType>({
    resolver: zodResolver(LoginFromSchema),
  });

  const onSubmit = async (values: LoginFromSchemaType) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
        callbackUrl: "/verify-user",
      });
      if (!res || res?.error) {
        throw new Error("Not Authorized");
      }
      if (res.url) {
        setLoading(false);
        router.push(res.url);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center flex-col gap-2 mb-8">
        <Image src="/images/cards.logo.png" alt="logo" width={36} height={36} />
        <h1 className="text-xl font-semibold text-blue-600">
          Log In to Continue
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="text-start">
        <Input
          type="text"
          label="Email"
          placeholder="Enter your email"
          className="mb-4"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your Password"
          className="mb-8"
          error={errors.password?.message}
          {...register("password")}
        />

        <button className=" bg-blue-500 text-white w-full py-2 rounded-lg mb-4">
          {loading ? <Spinner classNames="w-6 bg-white p-1" /> : "Continue"}
        </button>

        <p className="text-sm text-center text-dash_black">
          Don't have an account?
          <Link
            href="../pages/sign-up.html"
            className="text-dash_red font-bold"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
