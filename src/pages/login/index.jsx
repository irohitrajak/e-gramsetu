import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Login page
 * - Tailwind-based responsive login form
 * - Firebase authentication for regular users
 * - Client-side validation, show/hide password
 */
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
      e.email = 'Please enter your email address.';
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
      const result = await login(email.trim(), password);
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Logged in successfully — redirecting...' });
        setTimeout(() => navigate('/rural-dashboard'), 800);
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f6fbf9] dark:bg-[#071012]">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl bg-white/60 dark:bg-[#071219]/60 backdrop-blur-md shadow-lg">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Welcome to GramSetu</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-xs">A modern gateway to rural opportunities — sign in to access dashboards, schemes and jobs.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-[#071219]/60 backdrop-blur-md shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sign in to GramSetu</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Use your account credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email Address</label>
              <div className="relative">
                <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  type="email" placeholder="name@example.com" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071219] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow" />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
              <div className="relative">
                <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'} placeholder="Enter your password" required minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#071219] text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow pr-12" />
                <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-2.5 p-2 rounded-md text-gray-600 dark:text-gray-300">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a14.86 14.86 0 012.223-3.9M6.1 6.1A10.05 10.05 0 0112 5c4.478 0 8.269 2.943 9.543 7a14.9 14.9 0 01-2.106 3.69M3 3l18 18" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button disabled={loading} type="submit" className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold shadow hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-60">{loading ? 'Signing in...' : 'Login'}</button>
              <button type="button" onClick={() => navigate('/forgot')} className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Forgot?</button>
            </div>

            <div className="text-center text-xs text-gray-400 my-2">or</div>

            <div>
              <button type="button" onClick={() => navigate('/register')} className="w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#072127] transition">Create account</button>
            </div>

            {status.message && (
              <p className={`mt-2 text-sm text-center ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{status.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
