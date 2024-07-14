import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4 text-center">Medicine Details</h2>

        <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:gap-5">
          <div className="border border-gray-300 p-4 rounded mb-4 md:mb-0 md:w-1/2">
            <p className="mb-2">
              <span className="font-bold">Name : </span> Napa
            </p>
            <p className="mb-2">
              <span className="font-bold">Batch Number : </span> 202
            </p>
            <p className="mb-2">
              <span className="font-bold">Package Number : </span> 1234
            </p>
            <p className="mb-2">
              <span className="font-bold">Generic Name : </span> Paracetamol
            </p>
            <p className="mb-2">
              <span className="font-bold">Form : </span> Tab
            </p>
            <p className="mb-2">
              <span className="font-bold">Dosage : </span> 500 mg
            </p>
            <p className="mb-2">
              <span className="font-bold">Manufacturing Date : </span>{" "}
              2024-06-01
            </p>
            <p className="mb-2">
              <span className="font-bold">Expiring Date : </span> 2024-07-12
            </p>
            <p className="mb-2">
              <span className="font-bold">Manufacturer Company : </span> Beximco
            </p>
            <p className="mb-2">
              <span className="font-bold">User ID : </span>{" "}
              0x1437a5Dc8c8e6130ceEb1BE4D7f9Aa5987F85C1b
            </p>
            <p className="mb-2">
              <span className="font-bold">Status : </span> not
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="flex justify-center">
              <Image src="/napa.webp" alt="napa" height={100} width={250} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
