import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    try {
      await signup(email, password, name);
      navigate('/');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Left Section (Image) - Hidden on mobile */}
      <div className="hidden md:block md:w-1/2 bg-primary-600 relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <img
          src="https://images.pexels.com/photos/3755747/pexels-photo-3755747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Café ambiance"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <Coffee size={48} className="mb-4" />
          <h1 className="text-4xl font-serif font-bold mb-4">Feastly</h1>
          <p className="text-xl max-w-md text-center">
            Join thousands of café lovers and discover new experiences
          </p>
        </div>
      </div>
      
      {/* Right Section (Signup Form) */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <Coffee size={40} className="text-primary-600 dark:text-primary-400 mb-2" />
            <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Feastly
            </h1>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Create an Account
            </h2>
            
            {error && (
              <div className="bg-error-50 dark:bg-error-900/30 text-error-600 dark:text-error-400 p-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                icon={<User size={18} className="text-gray-400" />}
                required
                fullWidth
              />
              
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                icon={<Mail size={18} className="text-gray-400" />}
                required
                fullWidth
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock size={18} className="text-gray-400" />}
                error={passwordError && password === confirmPassword ? passwordError : ''}
                required
                fullWidth
              />
              
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock size={18} className="text-gray-400" />}
                error={passwordError && password !== confirmPassword ? passwordError : ''}
                required
                fullWidth
              />
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  I agree to the{' '}
                  <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:underline dark:text-primary-400">
                    Privacy Policy
                  </a>
                </label>
              </div>
              
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading || !!passwordError}
              >
                Sign Up
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
                >
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

export default SignupPage;