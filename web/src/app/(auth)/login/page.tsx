import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-sm mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center flex-col gap-2 mb-8">
        <Image src="/images/cards.logo.png" alt="logo" width={36} height={36} />
        <h1 className="text-xl font-semibold text-blue-600">Login Here</h1>
      </div>

      <form role="form" className="text-start">
        <Input
          type="text"
          label="Email"
          name="email"
          placeholder="Enter your email"
          className="mb-4"
        />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Enter your Password"
          className="mb-8"
          error={"this is required field"}
        />

        <button
          type="button"
          className=" bg-blue-500 text-white w-full py-2 rounded-lg mb-4"
        >
          Sign in
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
