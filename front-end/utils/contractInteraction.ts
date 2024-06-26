import Web3 from "web3";
import MedicineContractABI from "../../smart-contract/build/contracts/SupplyChain.json"; // Replace with your ABI path

let web3: Web3 | undefined;
let contractInstance: Web3.eth.Contract | undefined;

// Initialize Web3 instance
export const initWeb3 = async (): Promise<Web3> => {
  if (!web3) {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        console.error("User denied account access:", error);
        throw new Error("User denied account access");
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      const provider = new Web3.providers.HttpProvider("http://localhost:7545"); // Fallback to local provider
      web3 = new Web3(provider);
    }
  }
  return web3;
};

// Initialize smart contract instance
export const initContract = async (): Promise<Web3.eth.Contract> => {
  if (!contractInstance) {
    const web3Instance = await initWeb3();
    const networkId = await web3Instance.eth.net.getId();
    const deployedNetwork = MedicineContractABI.networks[networkId];
    if (!deployedNetwork) {
      throw new Error("Contract not deployed on the current network");
    }
    contractInstance = new web3Instance.eth.Contract(
      MedicineContractABI.abi as Web3.AbiItem[],
      deployedNetwork.address
    );
  }
  return contractInstance;
};

// Add medicine function
export const addMedicine = async (medicineData: any): Promise<boolean> => {
  try {
    const contract = await initContract();
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .addMedicine(
        medicineData.name,
        medicineData.batchNumber,
        medicineData.packageNumber,
        medicineData.genericName,
        medicineData.form,
        medicineData.dosage,
        medicineData.manufacturingDate,
        medicineData.expiringDate,
        medicineData.manufacturerCompany,
        medicineData.status
      )
      .send({ from: accounts[0] });

    console.log("Medicine added successfully.");
    return true;
  } catch (error) {
    console.error("Error adding medicine:", error);
    return false;
  }
};

// Get medicine information by ID
export const getMedicineInfo = async (medicineId: string): Promise<any> => {
  try {
    const contract = await initContract();
    const medicineInfo = await contract.methods
      .getMedicineInfo(medicineId)
      .call();
    return medicineInfo;
  } catch (error) {
    console.error("Error fetching medicine info:", error);
    throw error;
  }
};
