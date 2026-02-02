import { useState } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { notify } from '@/shared/notifications/toast';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await signUp(email, password);
    } catch (error) {
      notify.error('Error al crear la cuenta');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
