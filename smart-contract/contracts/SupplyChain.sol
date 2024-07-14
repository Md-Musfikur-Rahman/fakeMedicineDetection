// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {

    struct Medicine {
        string name;
        string batchNumber;
        address manufacturer;
        address seller;
        uint256 manufactureDate;
        uint256 receivedDate;
    }

    mapping(uint256 => Medicine) public medicines;
    uint256 public medicineCount;

    event MedicineAdded(uint256 indexed medicineId, string name, string batchNumber, address indexed manufacturer);
    event MedicineReceived(uint256 indexed medicineId, address indexed seller, uint256 receivedDate);

    function addMedicine(string memory _name, string memory _batchNumber) public {
        medicineCount++;
        medicines[medicineCount] = Medicine(_name, _batchNumber, msg.sender, address(0), block.timestamp, 0);
        emit MedicineAdded(medicineCount, _name, _batchNumber, msg.sender);
    }

    function receiveMedicine(uint256 _medicineId) public {
        require(medicines[_medicineId].manufacturer != address(0), "Medicine does not exist");
        require(medicines[_medicineId].seller == address(0), "Medicine already received by a seller");
        medicines[_medicineId].seller = msg.sender;
        medicines[_medicineId].receivedDate = block.timestamp;
        emit MedicineReceived(_medicineId, msg.sender, block.timestamp);
    }

    function getMedicineInfo(uint256 _medicineId) public view returns (string memory, string memory, address, address, uint256, uint256) {
        Medicine memory med = medicines[_medicineId];
        return (med.name, med.batchNumber, med.manufacturer, med.seller, med.manufactureDate, med.receivedDate);
    }
}