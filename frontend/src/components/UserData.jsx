import { removeItemFromStorage } from "@/functions/localstorage";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const UserData = ({ data, setData }) => {
  const tableHead = Object.keys(data);

  if (data) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[30rem]">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                {tableHead.map((item) => (
                  <th key={uuidv4()}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableHead.map((item) => (
                  <td key={uuidv4()}>{data[item]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-accent w-[15rem] mt-2"
          onClick={() => {
            removeItemFromStorage("user");
            setData(null);
          }}
        >
          Logout
        </button>
      </div>
    );
  }
};

export default UserData;
