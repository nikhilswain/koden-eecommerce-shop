import React, { useState }  from "react";

export default function Login() {
  const [username, setUsername] = useState("");
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
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    const data = await res.json();
    if (res.ok === true) {
        window.location.href = "/profile";
    }
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
    <div className="max-w-md mx-auto bg-white shadow-xl rounded my-8 mt-48">
      <div className="bg-gray-200 pt-8 pb-16 ">
        <form onSubmit={handleSubmit} className="w-4/5 mx-auto" >
          <div className="flex items-center bg-white rounded shadow-md mb-4">
          <span class="px-3">
                  <img src="/user.svg" alt="username" className="w-6 h-6 "/>
                </span>
            <input type="text" className="w-full h-12 focus:outline-none" id="name"  placeholder="Enter name" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="flex items-center bg-white rounded shadow-md mb-4">
          <span class="px-3">
                  <img src="/email.svg" alt="email" className="w-4 h-4 "/>
                </span>
            <input type="email" className="w-full h-12 focus:outline-none" id="email"  placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="flex items-center bg-white rounded shadow-md mb-4">
          <span class="px-3">
                  <img src="/password.svg" alt="password" className="w-4 h-4 "/>
                </span>
            <input type="password" className="w-full h-12 focus:outline-none" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" onClick={handleSubmit} className="bg-indigo-600 block mx-auto text-white text-sm uppercase rounded shadow-md px-6 py-2">signup</button>
          {loading && <p>Loading...</p>}
          {success && <p className="text-2xl text-green-500 font-semibold">{successMessage}</p>}
          {error && <p className="text-2xl text-red-500 font-semibold">{errorMessage}</p>}
        </form>
      </div>
    </div>
  )
}