import { useState } from "react";
import { Redirect } from "react-router";

import { UserName } from "@/domain/user";
import { useAuthenticate } from "@/application/authenticate";

function Auth() {
  const [name, setName] = useState<UserName>("");
  const [email, setEmail] = useState<Email>("");
  const [loading, setLoading] = useState(false);

  const { user, authenticate } = useAuthenticate();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    await authenticate(name, email);

    setLoading(false);
  };

  if (!!user) return <Redirect to='/' />;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <button type='submit' disabled={loading}>
        {loading ? "Trying to login..." : "Login"}
      </button>
    </form>
  );
}

export default Auth;
