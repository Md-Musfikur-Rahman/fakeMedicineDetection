// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineSupplyChain {

    // Structure for a Medicine
    struct Medicine {
        string name;
        string batchNumber;
        string packageNumber;
        string genericName;
        string form;
        string dosage;
        string manufacturingDate;
        string expiringDate;
        string manufacturerCompany;
        address userID;  // Address of the user who added the medicine
        string status;
    }

    // Structure for a Participant
    struct Participant {
        string companyName;
        string status;
    }

    // Mapping for storing medicines
    mapping(string => Medicine) private medicines;
    // Mapping for storing participants
    mapping(address => Participant) private participants;
    // Mapping for storing medicine history
    mapping(string => string[]) private medicineHistory;

    // Event to be emitted when a medicine is added
    event MedicineAdded(string medicineId, string name);

    // Event to be emitted when a participant is added
    event ParticipantAdded(address participantId, string companyName);

    // Add a new medicine
    function addMedicine(
        string memory _medicineId,
        string memory _name,
        string memory _batchNumber,
        string memory _packageNumber,
        string memory _genericName,
        string memory _form,
        string memory _dosage,
        string memory _manufacturingDate,
        string memory _expiringDate,
        string memory _manufacturerCompany,
        string memory _status
    ) public {
        Medicine memory newMedicine = Medicine({
            name: _name,
            batchNumber: _batchNumber,
            packageNumber: _packageNumber,
            genericName: _genericName,
            form: _form,
            dosage: _dosage,
            manufacturingDate: _manufacturingDate,
            expiringDate: _expiringDate,
            manufacturerCompany: _manufacturerCompany,
            userID: msg.sender,  // Storing the address of the user who added the medicine
            status: _status
        });

        medicines[_medicineId] = newMedicine;
        medicineHistory[_medicineId].push("Medicine added");

        emit MedicineAdded(_medicineId, _name);
    }

    // Search for a medicine by its ID
    function searchMedicine(string memory _medicineId) public view returns (Medicine memory) {
        return medicines[_medicineId];
    }

    // Check medicine information
    function checkMedicine(string memory _medicineId) public view returns (Medicine memory) {
        return medicines[_medicineId];
    }

    // Add a new participant
    function addParticipant(address _participantId, string memory _companyName, string memory _status) public {
        Participant memory newParticipant = Participant({
            companyName: _companyName,
            status: _status
        });

        participants[_participantId] = newParticipant;

        emit ParticipantAdded(_participantId, _companyName);
    }

    // Get medicine history
    function getMedicineHistory(string memory _medicineId) public view returns (string[] memory) {
        return medicineHistory[_medicineId];
    }
}
