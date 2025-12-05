import { useState } from 'react';
import { Lock, Shield, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

export function Settings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully');
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(
      twoFactorEnabled
        ? 'Two-factor authentication disabled'
        : 'Two-factor authentication enabled'
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500 text-sm md:text-base">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="preferences" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preferences" className="text-xs md:text-sm">Preferences</TabsTrigger>
          <TabsTrigger value="password" className="text-xs md:text-sm">Password</TabsTrigger>
          <TabsTrigger value="security" className="text-xs md:text-sm">Security</TabsTrigger>
        </TabsList>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription className="text-sm">
                Manage how you receive notifications about app activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5 flex-1">
                  <Label>Push Notifications</Label>
                  <p className="text-xs md:text-sm text-gray-500">
                    Receive push notifications for important updates
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    defaultValue="admin@venueproximity.com"
                    disabled
                    className="bg-gray-50 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Name</Label>
                  <Input id="adminName" defaultValue="Admin User" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSavePreferences} className="w-full md:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Change Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription className="text-sm">
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
                  <p className="text-sm text-blue-900">Password Requirements:</p>
                  <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc list-inside">
                    <li>At least 8 characters long</li>
                    <li>Contains at least one uppercase letter</li>
                    <li>Contains at least one number</li>
                    <li>Contains at least one special character</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="w-full md:w-auto">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription className="text-sm">
                Add an extra layer of security to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between gap-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 md:gap-4 flex-1">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm md:text-base text-gray-900">Two-Factor Authentication</p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {twoFactorEnabled ? 'Currently enabled' : 'Currently disabled'}
                    </p>
                  </div>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={handleToggleTwoFactor} />
              </div>

              {twoFactorEnabled && (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-2">
                    <Label>Recovery Codes</Label>
                    <p className="text-xs md:text-sm text-gray-500">
                      Store these codes in a safe place. You can use them to access your account
                      if you lose access to your authentication device.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <code className="text-xs md:text-sm">ABCD-1234-EFGH</code>
                      <code className="text-xs md:text-sm">IJKL-5678-MNOP</code>
                      <code className="text-xs md:text-sm">QRST-9012-UVWX</code>
                      <code className="text-xs md:text-sm">YZAB-3456-CDEF</code>
                    </div>
                    <Button variant="outline" className="w-full">
                      Generate New Recovery Codes
                    </Button>
                  </div>
                </div>
              )}

              <Separator />

              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <p className="text-xs md:text-sm text-gray-500 mb-4">
                  Manage devices where you're currently logged in.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">Current Session</p>
                      <p className="text-xs text-gray-500 truncate">Chrome on macOS • New York, USA</p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">Mobile Device</p>
                      <p className="text-xs text-gray-500 truncate">iOS App • Last active 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}