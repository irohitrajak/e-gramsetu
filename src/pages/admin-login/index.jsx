import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Eye, EyeOff } from 'lucide-react';

/**
 * Admin Login page
 * - Firebase authentication for admin users only
 * - Verifies admin role before allowing access
 */
export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      e.email = 'Please enter your admin email address.';
    } else if (!emailRegex.test(email)) {
      e.email = 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setStatus({});
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await adminLogin(email.trim(), password);
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Admin access granted — redirecting...' });
        setTimeout(() => navigate('/admin-command-center'), 800);
      } else {
        throw new Error(result.error || 'Admin login failed');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Admin login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Admin Info */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/20">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Admin Access</h3>
          <p className="text-sm text-gray-200 text-center max-w-xs">
            Secure administrative portal for GramSetu platform management and oversight.
          </p>
          <div className="mt-6 space-y-2 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Enhanced Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span>Full System Control</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              <span>Real-time Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Admin Portal</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Authorized access only</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="admin@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />
              </div>
              {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your admin password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-3 p-1 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                disabled={loading}
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying Admin...' : 'Admin Login'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                ← Back to User Login
              </button>
            </div>

            {status.message && (
              <div className={`mt-4 p-3 rounded-xl text-sm text-center ${
                status.type === 'error' 
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' 
                  : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
              }`}>
                {status.message}
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              🔒 This is a secure admin portal. All login attempts are monitored and logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
