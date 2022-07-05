import { useState } from "react";
import { Redirect } from "react-router";

import { UserName } from "@/domain/user";

function Auth() {
  const [name, setName] = useState<UserName>("");
  const [email, setEmail] = useState<Email>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    // authenticate logic here

    setLoading(false);
  };

  const user = {};

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
