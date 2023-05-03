import { useState } from "react";
import { getItemFromStorage } from "./functions/localstorage";
import UserData from "./components/UserData";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [data, setData] = useState(getItemFromStorage("user") || null);

  return (
    <>
      <Navbar />
      {data ? (
        <UserData data={data} setData={setData} />
      ) : (
        <Form setData={setData} />
      )}
      <ToastContainer />
    </>
  );
}

export default App;
