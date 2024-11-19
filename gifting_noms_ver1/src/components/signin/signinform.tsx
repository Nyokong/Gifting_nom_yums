"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import api from '@/app/_lib/axios';


export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setPending(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(`email ${email}`);

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const data = response.data;
      setPending(false);

      if (data.errors) {
        setErrors(data.errors);
      } else {
        // Handle successful sign-in (e.g., redirect)
        // redirect.push("/");
        setSuccess('Login successful!');
      }
    } catch (error) {
      // console.error('Error logging in:', error);
      // setErrors(error);
      setPending(false);
    }
  };

  return (
    <form className="w-[300px] h-[auto] flex flex-col " onSubmit={handleSubmit}>
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}
      <Input
        name="password"
        type="password"
        placeholder="Enter your password"
        className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {errors.password && <p>{errors.password}</p>}

      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Sign In'}
      </button>
      {success && <p>{success}</p>}
    </form>
  );
}
