import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
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
