import Form from "@/components/Form";
import UserData from "@/components/UserData";
import { getItemFromStorage } from "@/functions/localstorage";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(getItemFromStorage("user") || null);

  return (
    <>
      {data ? (
        <UserData data={data} setData={setData} />
      ) : (
        <Form setData={setData} />
      )}
    </>
  );
}
