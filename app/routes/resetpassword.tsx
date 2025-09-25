import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Key, Lock } from "lucide-react";
import { BASE_URL } from "../constant";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [token, setToken] = useState(resetToken || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (resetToken) {
      setToken(resetToken);
    }
  }, [resetToken]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, {
        newPassword,
      });
      setMessage(res.data.message);
      setError("");
      setToken("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 border rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center text-[#00C9FF]">Reset Password</h2>
        {message && <p className="text-green-500 text-center mt-2">{message}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleResetPassword} className="mt-4">
          <label className="block text-gray-700 font-medium flex items-center gap-2">
            <Key className="text-[#00C9FF]" size={18} /> Reset Token
          </label>
          <input
            type="text"
            placeholder="Enter the reset token"
            className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-[#00C9FF]"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
          <label className="block text-gray-700 font-medium flex items-center gap-2 mt-3">
            <Lock className="text-[#00C9FF]" size={18} /> New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-[#00C9FF]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-4 w-full bg-[#00C9FF] hover:bg-[#0099CC] text-white py-2 rounded-lg transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
