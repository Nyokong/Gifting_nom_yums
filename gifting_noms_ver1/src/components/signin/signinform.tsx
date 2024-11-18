"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.target);
    console.log(formData);

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      const data = response.data;
      setPending(false);

      if (data.errors) {
        setErrors(data.errors);
      } else {
        // Handle successful sign-in (e.g., redirect)
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // setErrors(error);
      setPending(false);
    }
  };

  return (
    <div>
      <form
        className="w-[300px] h-[auto] flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p>{errors.email}</p>}
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
