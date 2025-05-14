import React, { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    
    if (!isEditing) {
      // Reset form to current user values when entering edit mode
      setName(user?.name || '');
      setEmail(user?.email || '');
      setPhone(user?.phone || '');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the user profile in the database
      setIsLoading(false);
      setIsEditing(false);
      setIsSuccess(true);
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-gray-900 dark:text-white">
        My Profile
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
                  alt={user?.name || 'User'}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{user?.email}</p>
              
              <Button
                variant="outline"
                onClick={handleEditToggle}
                fullWidth
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Details */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                {isEditing ? 'Edit Profile Information' : 'Profile Information'}
              </h2>
              
              {isSuccess && (
                <div className="bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400 p-4 rounded-md mb-4 animate-fade-in">
                  Profile updated successfully!
                </div>
              )}
              
              <form onSubmit={handleSaveProfile}>
                <div className="space-y-6">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    icon={<User size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    icon={<Mail size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    icon={<Phone size={18} className="text-gray-400" />}
                    fullWidth
                  />
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        type="submit"
                        isLoading={isLoading}
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Account Settings */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Account Settings
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Change your password
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your email notifications
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Settings
                  </Button>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h3 className="font-medium text-error-600 dark:text-error-400">Delete Account</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Permanently remove your account and data
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-error-600 dark:text-error-400">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;