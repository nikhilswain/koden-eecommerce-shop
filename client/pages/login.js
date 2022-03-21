import React, {useState}  from "react";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setSuccessMessage("");
    setErrorMessage("");
    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setErrorMessage(data.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setSuccessMessage(data.message);
      setLoading(false);
    }
  }

  return (
    
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        {loading && <p>Loading...</p>}
        {success && <p>{successMessage}</p>}
        {error && <p>{errorMessage}</p>}
      </form>

  )
  }