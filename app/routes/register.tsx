import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
// import clogo from "../../assets/clogo.png";
import { Eye, EyeOff } from "lucide-react";
import { BASE_URL } from "../constant";

const Register = () => {
  const [formData, setFormData] = useState({
    salutation: "Mr",
    firstName: "",
    lastName: "",
    email: "",
    mobilePhone: "",
    dateOfBirth: "",
    password: "",
    otp: "",
    consent: false,
    streetNumber: "",
    streetName: "",
    locality: "",
    postcode: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpMessage, setOtpMessage] = useState("");
  const [otpMessageColor, setOtpMessageColor] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", isSuccess: false });
  const [otpSent, setOtpSent] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [otpLimitReached, setOtpLimitReached] = useState(false);
  const navigate = useNavigate();
  const MAX_OTP_ATTEMPTS = 5;

  const validateMobile = (mobile) => /^04\d{8}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "mobilePhone" && !validateMobile(value)) {
      setErrors({
        ...errors,
        mobilePhone: "Invalid Australian mobile number. Must start with 04 and be 10 digits.",
      });
    } else {
      setErrors({ ...errors, mobilePhone: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    let validationErrors = {};
    if (!validateMobile(formData.mobilePhone)) validationErrors.mobilePhone = "Invalid Australian mobile number.";
    if (!formData.dateOfBirth) validationErrors.dateOfBirth = "Date of Birth is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (!formData.consent) validationErrors.consent = "You must agree to the privacy policy.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const addressPayload = {
      streetNumber: formData.streetNumber,
      streetName: formData.streetName,
      locality: formData.locality,
      postcode: formData.postcode,
    };

    const { streetNumber, streetName, locality, postcode, ...mainFields } = formData;

    const finalPayload = {
      ...mainFields,
      orderItemAddress: addressPayload,
    };

    try {
      const response = await axios.post(`${BASE_URL}/register`, finalPayload);
      setModal({
        show: true,
        message: response.data.message || "Registration Successful!",
        isSuccess: true,
      });

      setTimeout(() => {
        setModal({ show: false });
        navigate("/login");
      }, 1500);
    } catch (error) {
      let errorMessage = "Registration Failed! Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = "Invalid request. Please check your inputs.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      setModal({ show: true, message: errorMessage, isSuccess: false });
    }

    setLoading(false);
  };

  const sendOtp = async () => {
    if (otpAttempts >= MAX_OTP_ATTEMPTS) {
      setOtpMessage("You've reached your daily OTP limit.");
      setOtpMessageColor("text-red-600");
      setOtpLimitReached(true);
      return;
    }

    setLoadingOtp(true);
    setOtpMessage("");
    setOtpLimitReached(false);

    try {
      await axios.post(`${BASE_URL}/send-otp`, { email: formData.email });
      setOtpMessage("OTP sent to your email");
      setOtpMessageColor("text-green-600");
      setOtpSent(true);
      setOtpAttempts((prev) => prev + 1);
    } catch (error) {
      let msg = "Failed to send OTP. Please try again.";
      if (error.response?.status === 429) {
        msg = "Too many requests. Please wait and try again.";
      } else if (error.response?.data?.message) {
        msg = error.response.data.message;
      }
      setOtpMessage(msg);
      setOtpMessageColor("text-red-600");
    } finally {
      setLoadingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setLoadingOtp(true);
    setOtpMessage("");
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, {
        email: formData.email,
        otp: formData.otp,
      });

      if (response.data.message?.toLowerCase().includes("success")) {
        setOtpVerified(true);
        setOtpMessage("✅ OTP verified successfully.");
        setOtpMessageColor("text-green-600");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      let msg = "OTP verification failed.";
      if (error.response?.data?.message) {
        msg = error.response.data.message;
      }
      setOtpVerified(false);
      setOtpMessage(msg);
      setOtpMessageColor("text-red-600");
    } finally {
      setLoadingOtp(false);
    }
  };

  return (
    <div className="flex flex-col  md:flex-row items-center justify-center min-h-screen p-6 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="w-full md:w-3/4 lg:w-2/3  p-8 bg-white/90 backdrop-blur rounded-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <img src="pathways.png"  alt="Logo" className="w-16 mb-3" />
          <h2 className="text-3xl font-bold text-blue-900">Join Pathways Academy</h2>
          <p className="text-gray-600 mt-1 text-center">
            Register now to access courses, resources, and exclusive academic support.
          </p>
        </div>

        {/* Info Note */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 shadow-sm">
          <strong className="block mb-1">Note:</strong>
          Please use your correct details when creating your account. This ensures proper enrollment and access to all Pathways Academy learning resources.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="salutation"
              value={formData.salutation}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900"
            >
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
              <option>Dr</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          <input type="text" name="firstName" placeholder="First name *" value={formData.firstName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" required />
          <input type="text" name="lastName" placeholder="Last name *" value={formData.lastName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" required />
          <input type="tel" name="mobilePhone" placeholder="04XXXXXXXX *" value={formData.mobilePhone} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" required />
          {errors.mobilePhone && <p className="text-red-600 text-sm">{errors.mobilePhone}</p>}

          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" required />

          {/* Password */}
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password *" value={formData.password} onChange={handleChange} className="p-3 border rounded-lg w-full pr-10 focus:ring-2 focus:ring-blue-900" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Address Info */}
          <h3 className="text-2xl font-semibold text-gray-800 text-center mt-8 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 p-4 rounded-lg bg-gray-50">
            <input type="text" name="streetNumber" required placeholder="Street Number*" value={formData.streetNumber} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" />
            <input type="text" name="streetName" required placeholder="Street Name*" value={formData.streetName} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" />
            <input type="text" name="locality" required placeholder="City / Suburb*" value={formData.locality} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" />
            <input type="text" name="postcode" required placeholder="Postcode*" value={formData.postcode} onChange={handleChange} className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-900" />
          </div>

          {/* OTP */}
          <div className="flex flex-col">
            <div className="relative">
              <input type="text" name="otp" required placeholder="Enter OTP" value={formData.otp} onChange={handleChange} className="p-3 border rounded-lg w-full pr-24 focus:ring-2 focus:ring-blue-900" disabled={otpVerified} />
              {!otpSent ? (
                <button type="button" onClick={sendOtp} disabled={loadingOtp || otpLimitReached} className={`absolute inset-y-0 right-0 w-1/3 rounded-lg ${otpLimitReached ? "bg-gray-400" : "bg-blue-900 text-white hover:bg-blue-800"}`}>
                  {loadingOtp ? "Sending..." : "Send OTP"}
                </button>
              ) : !otpVerified ? (
                <button type="button" onClick={verifyOtp} disabled={loadingOtp} className="absolute inset-y-0 right-0 w-1/3 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                  {loadingOtp ? "Verifying..." : "Verify OTP"}
                </button>
              ) : (
                <button type="button" disabled className="absolute inset-y-0 right-0 w-1/3 bg-green-700 text-white rounded-lg">
                  Verified ✅
                </button>
              )}
            </div>
            {otpMessage && <p className={`${otpMessageColor} text-sm mt-2`}>{otpMessage}</p>}
            {otpLimitReached && <p className="text-red-600 text-sm mt-1">You've reached the max OTP attempts for today.</p>}
          </div>

          {/* Consent */}
          <div className="flex items-start space-x-2">
            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1" required />
            <label className="text-sm text-gray-700">
              By registering, I agree to the{" "}
              <a href="/privacy" className="text-blue-900 font-medium hover:underline">
                Pathways Academy Privacy Policy
              </a>{" "}
              and terms of use.
            </label>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading || !otpVerified} className={`w-full mt-5 p-3 text-white font-semibold rounded-lg transition-all duration-300 ${loading || !otpVerified ? "bg-gray-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"}`}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm border border-gray-200">
            <img src={clogo} alt="Pathways Academy" className="w-16 mx-auto mb-4" />
            <p className={`text-lg ${modal.isSuccess ? "text-green-600" : "text-red-600"}`}>{modal.message}</p>
            <button onClick={() => setModal({ show: false })} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
