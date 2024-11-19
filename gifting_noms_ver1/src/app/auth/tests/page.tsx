'use client';

import api from '@/app/_lib/axios';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

export default function page() {
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');

  // useEffect(() => {
  //   setPending(false);
  //   // setEmail('');
  // }, []);

  const handleGet = async (e: any) => {
    // e.preventDefault();
    setPending(true);
    try {
      const response = await api.get('/api/tests');

      console.log(response.data);

      if (response.data) {
        setPending(false);
      }
    } catch (error) {
      // console.error(onmessage: 'error')
      setPending(false);
      console.log('error', error);
    }
  };

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    setPending(true);
    try {
      const response = await api.post('/api/tests', {
        email,
      });

      console.log(response.data);

      if (response.data) {
        setPending(false);
      }
    } catch (error) {
      // console.error(onmessage: 'error')
      setPending(false);
      console.log('error', error);
    }
  };
  return (
    <div>
      {/* <button onClick={handleSubmit}>click</button> */}
      <button onClick={handleGet} disabled={pending}>
        {pending ? 'Processing...' : 'Click'}
      </button>

      <form
        className="w-[300px] h-[auto] flex flex-col "
        onSubmit={handleSubmit}
      >
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="m-2 p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit" disabled={pending}>
          {pending ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
