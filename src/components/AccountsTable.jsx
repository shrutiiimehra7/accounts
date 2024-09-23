import React, { useState } from "react";
import { accountsData } from "../data/accounts"; // Adjust the path if necessary

function AccountsTable() {
  const [data, setData] = useState(accountsData);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filterStatus, setFilterStatus] = useState(""); // For filtering by fee status
  const [searchTerm, setSearchTerm] = useState(""); // For searching by client name or date

  // Sorting function
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  // Filtering function by fee status
  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);

    if (status === "") {
      setData(accountsData); // Reset to the original data if no filter
    } else {
      const filteredData = accountsData.filter((item) => item.fee_status === status);
      setData(filteredData);
    }
  };

  // Handle file upload (for purchase orders or invoices)
  const handleFileUpload = (e, index, field) => {
    const file = e.target.files[0];
    if (file) {
      const newData = [...data];
      newData[index][field] = file.name; // Update the data with the file name
      setData(newData);
    }
  };

  // Handle search term input (for both client name and date)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the data based on the search term (client name or date) and status filter
  const filteredData = data.filter((item) => {
    const matchesStatus = filterStatus === "" || item.fee_status === filterStatus;
    const matchesSearch =
      item.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase()); // Match search term with date as well
    return matchesStatus && matchesSearch;
  });

  return (
    <div className=" mt-[90px] p-6 bg-blue-50 ml-[225px]">
      {/* Sorting, Filtering, and Search Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-600 rounded-md hover:bg-blue-400"
            onClick={() => sortData("client_name")}
          >
            Sort by Client Name
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-400"
            onClick={() => sortData("date")}
          >
            Sort by Date
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Fee Status Filter */}
          <select
            className="px-4 py-2 text-white bg-blue-600 rounded-md"
            value={filterStatus}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          {/* Search by Client Name or Date */}
          <input
            type="text"
            placeholder="Search by client name or date..."
            className="px-4 py-2 border-gray-300 rounded-md"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="text-white bg-blue-600">
            <th className="px-6 py-3">Client Name</th>
            <th className="px-6 py-3">Purchase Order</th>
            <th className="px-6 py-3">Invoice</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Fee Status</th>
            <th className="px-6 py-3">Fee Overdue Duration (Days)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="text-gray-700">
              <td className="px-6 py-4">{item.client_name}</td>
              <td className="px-6 py-4">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  id={`purchaseOrder-${index}`}
                  onChange={(e) => handleFileUpload(e, index, "purchase_order")}
                />
                <label
                  htmlFor={`purchaseOrder-${index}`}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  {item.purchase_order ? "Uploaded" : "Upload"}
                </label>
              </td>
              <td className="px-6 py-4">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  id={`invoice-${index}`}
                  onChange={(e) => handleFileUpload(e, index, "invoice")}
                />
                <label
                  htmlFor={`invoice-${index}`}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  {item.invoice ? "Uploaded" : "Upload"}
                </label>
              </td>
              <td className="px-6 py-4">{item.date}</td>
              <td
                className={`py-4 px-6 font-semibold ${
                  item.fee_status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.fee_status}
              </td>
              <td className="px-6 py-4">{item.fee_overdue_duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountsTable;
