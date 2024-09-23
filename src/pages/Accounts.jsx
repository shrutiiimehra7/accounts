import { useState } from "react";
import { accountsData } from "../data/accounts"; // Assuming the JSON data is stored here

function Accounts() {
  const [data, setData] = useState(accountsData);

  const handleFileUpload = (e, index, field) => {
    const file = e.target.files[0];
    if (file) {
      const newData = [...data];
      newData[index][field] = file.name; // Update the data with the file name
      setData(newData);
    }
  };

  return (
    <div className="p-6 bg-blue-50 w-full">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="py-3 px-6">Client Name</th>
            <th className="py-3 px-6">Purchase Order</th>
            <th className="py-3 px-6">Invoice</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Fee Status</th>
            <th className="py-3 px-6">Fee Overdue Duration (Days)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-gray-700">
              <td className="py-4 px-6">{item.client_name}</td>
              <td className="py-4 px-6">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  id={`purchaseOrder-${index}`}
                  onChange={(e) => handleFileUpload(e, index, "purchase_order")}
                />
                <label
                  htmlFor={`purchaseOrder-${index}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  {item.purchase_order ? "Uploaded" : "Upload"}
                </label>
              </td>
              <td className="py-4 px-6">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  id={`invoice-${index}`}
                  onChange={(e) => handleFileUpload(e, index, "invoice")}
                />
                <label
                  htmlFor={`invoice-${index}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                >
                  {item.invoice ? "Uploaded" : "Upload"}
                </label>
              </td>
              <td className="py-4 px-6">{item.date}</td>
              <td
                className={`py-4 px-6 font-semibold ${
                  item.fee_status === "Paid" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.fee_status}
              </td>
              <td className="py-4 px-6">{item.fee_overdue_duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Accounts;
