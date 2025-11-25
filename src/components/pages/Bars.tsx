import { useState } from 'react';
import { MapPin, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { mockBars } from '../../utils/mockData';

export function Bars() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [voteFilter, setVoteFilter] = useState<string>('all');
  const [selectedBar, setSelectedBar] = useState<typeof mockBars[0] | null>(null);

  const filteredBars = mockBars.filter((bar) => {
    const matchesSearch =
      bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bar.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || bar.status === statusFilter;
    
    let matchesVotes = true;
    if (voteFilter === 'high') {
      matchesVotes = bar.todayOpenVotes + bar.todayCloseVotes > 50;
    } else if (voteFilter === 'medium') {
      matchesVotes = bar.todayOpenVotes + bar.todayCloseVotes > 20 && bar.todayOpenVotes + bar.todayCloseVotes <= 50;
    } else if (voteFilter === 'low') {
      matchesVotes = bar.todayOpenVotes + bar.todayCloseVotes <= 20;
    }

    return matchesSearch && matchesStatus && matchesVotes;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Bars Management</h1>
        <p className="text-gray-500">Manage and monitor all venue locations.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search bars by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={voteFilter} onValueChange={setVoteFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Votes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Votes</SelectItem>
                  <SelectItem value="high">High (&gt;50)</SelectItem>
                  <SelectItem value="medium">Medium (20-50)</SelectItem>
                  <SelectItem value="low">Low (&lt;20)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Total Votes</TableHead>
                <TableHead className="text-center">Today's Votes</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBars.map((bar) => {
                const totalVotesCount = bar.todayOpenVotes + bar.todayCloseVotes;
                const openPercentage = totalVotesCount > 0 
                  ? ((bar.todayOpenVotes / totalVotesCount) * 100).toFixed(0)
                  : 0;
                const closePercentage = totalVotesCount > 0
                  ? ((bar.todayCloseVotes / totalVotesCount) * 100).toFixed(0)
                  : 0;
                
                return (
                  <TableRow key={bar.id}>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{bar.name}</p>
                        <p className="text-sm text-gray-500">{bar.totalVotes} all-time votes</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-gray-700 truncate">{bar.location}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div>
                        <div className="text-gray-900">{bar.totalVotes}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="text-green-600">{openPercentage}% Open</span>
                          {' / '}
                          <span className="text-red-600">{closePercentage}% Close</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                          <span className="text-xs">Open:</span> {bar.todayOpenVotes}
                        </Badge>
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          <span className="text-xs">Close:</span> {bar.todayCloseVotes}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={bar.status === 'open' ? 'default' : 'secondary'}>
                        {bar.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBar(bar)}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        View Location
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredBars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No bars found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Map Modal */}
      <Dialog open={!!selectedBar} onOpenChange={() => setSelectedBar(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBar?.name}</DialogTitle>
            <DialogDescription>
              View location details and voting statistics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-gray-900">{selectedBar?.location}</p>
            </div>
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Static map preview using OpenStreetMap tile */}
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+3b82f6(${selectedBar?.lng},${selectedBar?.lat})/${selectedBar?.lng},${selectedBar?.lat},14,0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                alt="Map preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
                <p className="text-xs text-gray-500">Coordinates</p>
                <p className="text-sm text-gray-900">{selectedBar?.lat}, {selectedBar?.lng}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Today's Open Votes</p>
                <p className="text-green-700 mt-1">{selectedBar?.todayOpenVotes}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Today's Close Votes</p>
                <p className="text-red-700 mt-1">{selectedBar?.todayCloseVotes}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}