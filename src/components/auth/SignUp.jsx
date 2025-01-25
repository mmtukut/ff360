import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, Mail, Phone, Lock, Eye, EyeOff, 
  CheckCircle2, ArrowRight, Home, Building, Briefcase
} from 'lucide-react';
import logo from '../../assets/images/logo.png'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    accountType: ''
  });

  const accountTypes = [
    {
      id: 'personal',
      title: 'Home Seeker',
      description: 'Looking to buy, rent, or invest in properties',
      icon: Home,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'agent',
      title: 'Real Estate Agent',
      description: 'Professional real estate agent or property manager',
      icon: Building,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'developer',
      title: 'Property Developer',
      description: 'Property development and construction company',
      icon: Briefcase,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  const progressSteps = [
    { title: 'Account Type', completed: step > 1 },
    { title: 'Personal Info', completed: step > 2 },
    { title: 'Verification', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#1c5bde]/5 flex items-center justify-center py-2 px-4 pt-24">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Column - Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-[#1c5bde]/10 border border-[#1c5bde]/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link to="/" className="inline-block mb-6">
              <img 
                src={logo}
                alt="FastFind360 Logo" 
                className="h-8 w-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              Create Your Account
            </h1>
            <p className="text-neutral-600">Join Nigeria's leading property platform</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 text-xs sm:text-sm">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full 
                  ${step.completed ? 'bg-[#1c5bde] text-white' : 'bg-[#1c5bde]/10 text-[#1c5bde]'}`}>
                  {step.completed ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : index + 1}
                </div>
                <span className="ml-2 font-medium text-neutral-600 whitespace-nowrap">{step.title}</span>
                {index < progressSteps.length - 1 && (
                  <div className={`w-full h-0.5 mx-2 ${step.completed ? 'bg-[#1c5bde]' : 'bg-[#1c5bde]/10'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Multi-step Form */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {accountTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setFormData({ ...formData, accountType: type.id });
                        setStep(2);
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all border group
                        ${formData.accountType === type.id
                          ? 'border-[#1c5bde] bg-[#1c5bde]/5'
                          : 'border-[#1c5bde]/10 hover:border-[#1c5bde]/20 hover:bg-[#1c5bde]/5'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${type.color}`}>
                          <type.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-800 mb-1 flex items-center justify-between">
                            {type.title}
                            <ArrowRight className={`h-5 w-5 transition-colors
                              ${formData.accountType === type.id ? 'text-[#1c5bde]' : 'text-neutral-400 group-hover:text-[#1c5bde]'}`}
                            />
                          </h3>
                          <p className="text-sm text-neutral-600">{type.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Social Sign Up */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1c5bde]/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-neutral-500">or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#1c5bde]/10 
                             hover:border-[#1c5bde]/20 hover:bg-[#1c5bde]/5 transition-all"
                  >
                    <GoogleIcon />
                    <span className="font-medium">Google</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-[#1c5bde]/10 
                             hover:border-[#1c5bde]/20 hover:bg-[#1c5bde]/5 transition-all"
                  >
                    <AppleIcon />
                    <span className="font-medium">Apple</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-[#1c5bde]/10 rounded-xl focus:outline-none focus:border-[#1c5bde]"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 border border-[#1c5bde]/10 rounded-xl focus:outline-none focus:border-[#1c5bde]"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full pl-10 pr-12 py-2 border border-[#1c5bde]/10 rounded-xl focus:outline-none focus:border-[#1c5bde]"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-neutral-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-neutral-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setStep(1)}
                    className="flex-1 py-2 rounded-xl border border-[#1c5bde]/10 hover:bg-[#1c5bde]/5"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setStep(3)}
                    className="flex-1 py-2 rounded-xl bg-[#1c5bde] text-white hover:bg-[#1c5bde]/90"
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1c5bde]/10">
                    <Mail className="h-8 w-8 text-[#1c5bde]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Verify Your Email</h3>
                  <p className="text-neutral-600">
                    We've sent a verification code to<br />
                    <span className="font-medium text-neutral-800">{formData.email}</span>
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  {[1, 2, 3, 4].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-lg font-semibold border border-[#1c5bde]/10 rounded-xl focus:outline-none focus:border-[#1c5bde]"
                    />
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setStep(2)}
                    className="flex-1 py-2 rounded-xl border border-[#1c5bde]/10 hover:bg-[#1c5bde]/5"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 py-2 rounded-xl bg-[#1c5bde] text-white hover:bg-[#1c5bde]/90"
                  >
                    Verify Email
                  </motion.button>
                </div>

                <p className="text-center text-sm text-neutral-600">
                  Didn't receive the code?{' '}
                  <button className="font-semibold text-[#1c5bde] hover:text-[#1c5bde]/80">
                    Resend
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-neutral-600">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-[#1c5bde] hover:text-[#1c5bde]/80 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Column - Features */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1c5bde]/5 rounded-2xl p-8 border border-[#1c5bde]/10"
          >
            <h2 className="text-xl font-bold mb-6 text-neutral-800">Why Choose FastFind360?</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Smart Property Search",
                  description: "Find your perfect property with our AI-powered search"
                },
                {
                  title: "Verified Listings",
                  description: "All properties are verified for authenticity"
                },
                {
                  title: "Investment Opportunities",
                  description: "Access exclusive property investment deals"
                },
                {
                  title: "Community Development",
                  description: "Be part of shaping infrastructure development"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="mt-1">
                    <CheckCircle2 className="h-5 w-5 text-[#1c5bde]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;