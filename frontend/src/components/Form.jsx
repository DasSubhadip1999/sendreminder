import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineEye } from "react-icons/hi";
import { RxEyeNone } from "react-icons/rx";
import ClipLoader from "react-spinners/ClipLoader";
import { setItemToStorage } from "@/functions/localstorage";

const Form = ({ setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    login(formData);
  };

  const login = async (formData) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        formData
      );
      setData(res.data);
      setItemToStorage("user", res.data);
      setIsLoading(false);
      setFormData({ email: "", password: "" });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setIsLoading(false);
      const msgArr = message.split(",");
      msgArr.forEach((msg) => toast.error(msg));
    }
  };

  const getCredentials = () => {
    setFormData({ email: "test@gmail.com", password: "test@123" });
  };

  const inputgroup = "my-2 relative";
  return (
    <div className="w-full grid place-items-center min-h-[30rem]">
      <div
        className="btn btn-secondary absolute right-3 top-3"
        onClick={getCredentials}
      >
        Get Credentials
      </div>
      <form className="w-[20rem]" onSubmit={onSubmit}>
        <h1 className="font-bold">Please Login</h1>
        <div className={inputgroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered input-primary w-full max-w-xs"
            value={email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div className={inputgroup}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input input-bordered input-primary w-full max-w-xs"
            value={password}
            name="password"
            onChange={onChange}
          />
          {showPassword ? (
            <RxEyeNone
              className="absolute right-2 top-[56%] cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <HiOutlineEye
              className="absolute right-2 top-[56%] cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary w-full mt-1">
          {isLoading ? <ClipLoader color="#fff" size={22} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
