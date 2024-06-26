"use client";
import { addMedicine } from "@/utils/contractInteraction";
import React, { useState } from "react";

const AddMedicinePage: React.FC = () => {
  const [medicineData, setMedicineData] = useState({
    medicineId: "",
    name: "",
    batchNumber: "",
    packageNumber: "",
    genericName: "",
    form: "",
    dosage: "",
    manufacturingDate: "",
    expiringDate: "",
    manufacturerCompany: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addMedicine(medicineData);
    if (success) {
      // Clear form or navigate to another page
      console.log("Medicine added successfully!");
      setMedicineData({
        medicineId: "",
        name: "",
        batchNumber: "",
        packageNumber: "",
        genericName: "",
        form: "",
        dosage: "",
        manufacturingDate: "",
        expiringDate: "",
        manufacturerCompany: "",
        status: "",
      });
    } else {
      console.error("Failed to add medicine.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4 col-span-2">
          <label
            htmlFor="medicineId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Medicine ID
          </label>
          <input
            type="text"
            id="medicineId"
            name="medicineId"
            value={medicineData.medicineId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={medicineData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="batchNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Batch Number
          </label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            value={medicineData.batchNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="packageNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Package Number
          </label>
          <input
            type="text"
            id="packageNumber"
            name="packageNumber"
            value={medicineData.packageNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="genericName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Generic Name
          </label>
          <input
            type="text"
            id="genericName"
            name="genericName"
            value={medicineData.genericName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="form"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Form
          </label>
          <input
            type="text"
            id="form"
            name="form"
            value={medicineData.form}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dosage"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Dosage
          </label>
          <input
            type="text"
            id="dosage"
            name="dosage"
            value={medicineData.dosage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>{" "}
        <div className="mb-4">
          <label
            htmlFor="manufacturingDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Manufacturing Date
          </label>
          <input
            type="date"
            id="manufacturingDate"
            name="manufacturingDate"
            value={medicineData.manufacturingDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="expiringDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Expiring Date
          </label>
          <input
            type="date"
            id="expiringDate"
            name="expiringDate"
            value={medicineData.expiringDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 col-span-2">
          <label
            htmlFor="manufacturerCompany"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Manufacturer Company
          </label>
          <input
            type="text"
            id="manufacturerCompany"
            name="manufacturerCompany"
            value={medicineData.manufacturerCompany}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4 col-span-2">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={medicineData.status}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddMedicinePage;
