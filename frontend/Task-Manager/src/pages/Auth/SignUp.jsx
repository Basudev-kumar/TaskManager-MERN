// pages/Auth/SignUp.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Key, ArrowRight, CheckCircle, X, Camera } from "lucide-react";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import { useContext } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminInviteToken: ""
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const removeImage = () => {
    setProfilePic(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setError(null);
      setStep(2);
    }
  };

  const handleSkipToken = () => {
    handleSignUp();
  };

  const handleSignUp = async () => {
    setLoading(true);

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profileImageUrl,
        adminInviteToken: formData.adminInviteToken || undefined
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-36 h-36 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-white/5 rounded-full blur-lg animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-44 h-44 bg-white/5 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.8s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="max-w-lg text-center text-white">
            <div className="mb-8 p-8">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm mb-6">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                {step === 1 ? "Create Your Account" : "Admin Access"}
              </h3>
              <p className="text-purple-100 text-lg leading-relaxed">
                {step === 1 
                  ? "Join us to start managing your tasks efficiently."
                  : "Enter admin token if you have one, or skip to continue."}
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= 1 ? 'bg-white text-indigo-600' : 'bg-white/20 text-white'
              }`}>
                1
              </div>
              <div className={`h-0.5 w-8 transition-all duration-300 ${
                step >= 2 ? 'bg-white' : 'bg-white/20'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                step >= 2 ? 'bg-white text-indigo-600' : 'bg-white/20 text-white'
              }`}>
                2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-white font-bold text-xl">TM</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {step === 1 ? "Sign Up" : "Admin Verification"}
            </h2>
            <p className="text-gray-600 text-sm">
              {step === 1 
                ? "Enter your basic information to get started"
                : "Provide admin token if available"}
            </p>
          </div>

          {/* Form Content */}
          <div className="mt-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-in slide-in-from-top-1 duration-300">
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            {step === 1 ? (
              /* STEP 1: Basic Information */
              <>
                {/* Profile Picture */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">
                    Profile Picture
                  </label>
                  <div className="flex justify-center">
                    <div className="relative">
                      {!previewUrl ? (
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center cursor-pointer hover:from-indigo-200 hover:to-purple-200 transition-all duration-200">
                          <Camera className="w-8 h-8 text-indigo-600" />
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                          />
                        </div>
                      ) : (
                        <div className="relative w-24 h-24">
                          <img
                            src={previewUrl}
                            alt="Profile preview"
                            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'name' ? 'text-indigo-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 hover:border-gray-300"
                      placeholder="abc@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`w-5 h-5 transition-colors duration-200 ${
                        focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 hover:border-gray-300"
                      placeholder="Min 8 Characters"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              </>
            ) : (
              /* STEP 2: Admin Token (Optional) */
              <>
                <div className="space-y-4">
                  <div className="text-center">
                    <Key className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800">Admin Access</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      If you have an admin invite token, enter it below
                    </p>
                  </div>

                  {/* Admin Token Input */}
                  <div className="space-y-2">
                    <label htmlFor="adminInviteToken" className="text-sm font-medium text-gray-700 block">
                      Admin Invite Token (Optional)
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Key className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        id="adminInviteToken"
                        name="adminInviteToken"
                        type="text"
                        value={formData.adminInviteToken}
                        onChange={(e) => handleInputChange('adminInviteToken', e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 placeholder-gray-400"
                        placeholder="6-digit code"
                        maxLength="6"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 px-4 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSkipToken}
                    disabled={loading}
                    className="flex-1 py-3.5 px-4 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="loader mr-2"></span>
                        Creating...
                      </span>
                    ) : (
                      "Skip & Create Account"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleSignUp}
                    disabled={loading}
                    className="flex-1 py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="loader mr-2"></span>
                        Creating...
                      </span>
                    ) : (
                      "Submit Token"
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

