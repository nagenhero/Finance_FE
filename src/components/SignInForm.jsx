import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const initialState = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const { setUser } = useUser();
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const fields = [
    {
      label: "Email",
      placeholder: "John@email.com",
      required: true,
      type: "email",
      name: "email",
      value: form.email,
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
      value: form.password,
    },
  ];

  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOnPassChange = (e) => {
    setPass(e.target.value);
  };

  const handleOnChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnSubmit = async (e) => {
    //prevent default
    e.preventDefault();
    try {
      //call login axios
      const response = await axios.post(
        "http://localhost:9001/api/v1/users/login",
        form
      );
      toast.success("LOGIN SUCCESSFULL", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      //update user context
      setUser(response.data.user);

      //navigate to dashboard
      navigate("/dashboard");
      console.log("hell", response.data);
    } catch (error) {
      toast(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  return (
    <div className=" signin_Form border rounded p-4">
      <h4 className="mb-5">Sign In now!</h4>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
