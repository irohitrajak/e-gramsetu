import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Registration page
 * - Firebase user registration
 * - Creates new user accounts
 */
export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.displayName.trim()) {
      e.displayName = 'Please enter your full name.';
    }
    
    if (!formData.email.trim()) {
      e.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email)) {
      e.email = 'Please enter a valid email address.';
    }
    
    if (!formData.password || formData.password.length < 6) {
      e.password = 'Password must be at least 6 characters.';
    }
    
    if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = 'Passwords do not match.';
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setStatus({});
    if (!validate()) return;
    setLoading(true);
    
    try {
      const result = await register(
        formData.email.trim(),
        formData.password,
        formData.displayName.trim(),
        'user' // default role
      );
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Account created successfully — redirecting...' });
        setTimeout(() => navigate('/rural-dashboard'), 800);
      } else {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f6fbf9] dark:bg-[#071012]">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl bg-white/60 dark:bg-[#071219]/60 backdrop-blur-md shadow-lg">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Join GramSetu</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs">
            Create your account to access rural opportunities, government schemes, and employment services.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-[#071219]/60 backdrop-blur-md shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Create Account</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Full Name
              </label>
              <input
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071219] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
              {errors.displayName && <p className="mt-1 text-xs text-red-600">{errors.displayName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071219] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071219] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-2 top-2.5 p-2 rounded-md text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071219] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(s => !s)}
                  className="absolute right-2 top-2.5 p-2 rounded-md text-gray-600 dark:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            {status.message && (
              <p className={`mt-2 text-sm text-center ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
