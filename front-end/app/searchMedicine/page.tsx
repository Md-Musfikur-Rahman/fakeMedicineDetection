"use client";
import React, { useState } from "react";
import { getMedicineInfo } from "../../utils/contractInteraction";

const SearchMedicinePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [medicine, setMedicine] = useState<any>(null); // Adjust type as per your medicine data structure

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const medicineInfo = await getMedicineInfo(searchInput);
      setMedicine(medicineInfo);
    } catch (error) {
      console.error("Error fetching medicine:", error);
      setMedicine(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Search Medicine</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="searchInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Medicine ID or Name
          </label>
          <input
            type="text"
            id="searchInput"
            value={searchInput}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>
      </form>

      {medicine && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Medicine Details</h2>
          <div className="border border-gray-300 p-4 rounded">
            <p>
              <span className="font-bold">Name:</span> {medicine[0]}
            </p>
            <p>
              <span className="font-bold">Batch Number:</span> {medicine[1]}
            </p>
            <p>
              <span className="font-bold">Package Number:</span> {medicine[2]}
            </p>
            <p>
              <span className="font-bold">Generic Name:</span> {medicine[3]}
            </p>
            <p>
              <span className="font-bold">Form:</span> {medicine[4]}
            </p>
            <p>
              <span className="font-bold">Dosage:</span> {medicine[5]}
            </p>
            <p>
              <span className="font-bold">Manufacturing Date:</span>{" "}
              {medicine[6]}
            </p>
            <p>
              <span className="font-bold">Expiring Date:</span> {medicine[7]}
            </p>
            <p>
              <span className="font-bold">Manufacturer Company:</span>{" "}
              {medicine[8]}
            </p>
            <p>
              <span className="font-bold">Status:</span> {medicine[9]}
            </p>
          </div>
        </div>
      )}

      {medicine === null && (
        <div className="mt-8 text-red-500 font-bold">Medicine not found.</div>
      )}
    </div>
  );
};

export default SearchMedicinePage;
