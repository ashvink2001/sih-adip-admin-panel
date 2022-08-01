import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AUTH_TOKEN } from "redux/constants/Auth";

export default function Home() {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
    router.push("/login");
  }, []);

  return (
    <div>
      <Head>
        <title>E-Help Admin Panel</title>
        <meta name="description" content="admin panel for e-help platform " />
      </Head>
    </div>
  );
}
