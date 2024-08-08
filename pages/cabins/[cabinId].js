import CabinView from "@/components/CabinView";
import { getCabin } from "@/lib/data-service";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

// dynamically generated (SSR)
export async function getServerSideProps({ params }) {
  const cabin = await getCabin(params.cabinId);

  return { props: { cabin } }; //revalidate: 3600  // that's how we do ISR in pages router
}

// we can statically generate dynamic route if dynamic segment of url is known,
// if we have few cabin ids by using getStaticPaths

function Cabin({ cabin }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Cabin {cabin.name} / The Wild Oasis</title>
      </Head>{" "}
      <div className="max-w-6xl mx-auto mt-8">
        <CabinView cabin={cabin} />
      </div>
    </>
  );
}

export default Cabin;
