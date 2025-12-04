import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Building2, Users, TrendingUp, MapPin, Activity } from 'lucide-react';
import { mockVenues, mockUsers, mockRecentActivities, mockRecentLocations, venueCategories } from '../../utils/mockData';
import { Badge } from '../ui/badge';

export function Dashboard() {
  const totalVenues = mockVenues.length;
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.active).length;
  const totalVotes = mockUsers.reduce((sum, user) => sum + user.totalVotes, 0);
  const averageVotesPerUser = (totalVotes / totalUsers).toFixed(1);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your app.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Total Venues</CardTitle>
            <Building2 className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{totalVenues}</div>
            <p className="text-xs text-gray-500 mt-1">Across {venueCategories.length} categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Total Users</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{totalUsers}</div>
            <p className="text-xs text-gray-500 mt-1">{activeUsers} active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Avg Votes Per User</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{averageVotesPerUser}</div>
            <p className="text-xs text-gray-500 mt-1">Open/Close votes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-500">Total Votes</CardTitle>
            <Activity className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{totalVotes}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent New Locations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <CardTitle>Recent New Venues</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentLocations.map((location) => (
                <div key={location.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 truncate">{location.venueName}</p>
                      <Badge variant="outline" className="text-xs">{location.subcategory}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{location.location}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Added by {location.addedBy} • {location.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              <CardTitle>Recent Activities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.action === 'voted open' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <Activity className={`w-5 h-5 ${
                      activity.action === 'voted open' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900">
                      <span>{activity.userName}</span>{' '}
                      <Badge variant={activity.action === 'voted open' ? 'default' : 'secondary'} className="text-xs">
                        {activity.action}
                      </Badge>
                    </p>
                    <p className="text-sm text-gray-500 truncate">{activity.venueName}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
