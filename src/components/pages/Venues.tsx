import { useState } from 'react';
import { MapPin, Filter, Search, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
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
import { Label } from '../ui/label';
import { mockVenues, venueCategories } from '../../utils/mockData';
import { toast } from 'sonner@2.0.3';

export function Venues() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>('all');
  const [voteFilter, setVoteFilter] = useState<string>('all');
  const [selectedVenue, setSelectedVenue] = useState<typeof mockVenues[0] | null>(null);
  const [showAddVenue, setShowAddVenue] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: '',
    subcategory: '',
  });

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || venue.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || venue.category === categoryFilter;
    const matchesSubcategory = subcategoryFilter === 'all' || venue.subcategory === subcategoryFilter;
    
    let matchesVotes = true;
    if (voteFilter === 'high') {
      matchesVotes = venue.todayOpenVotes + venue.todayCloseVotes > 50;
    } else if (voteFilter === 'medium') {
      matchesVotes = venue.todayOpenVotes + venue.todayCloseVotes > 20 && venue.todayOpenVotes + venue.todayCloseVotes <= 50;
    } else if (voteFilter === 'low') {
      matchesVotes = venue.todayOpenVotes + venue.todayCloseVotes <= 20;
    }

    return matchesSearch && matchesStatus && matchesCategory && matchesSubcategory && matchesVotes;
  });

  const getCategoryName = (categoryId: string) => {
    const category = venueCategories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getSubcategoryName = (categoryId: string, subcategoryId: string) => {
    const category = venueCategories.find(c => c.id === categoryId);
    const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
    return subcategory?.name || subcategoryId;
  };

  const getAvailableSubcategories = () => {
    if (!formData.category) return [];
    const category = venueCategories.find(c => c.id === formData.category);
    return category?.subcategories || [];
  };

  const handleAddVenue = () => {
    if (!formData.name || !formData.location || !formData.category || !formData.subcategory) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Venue added successfully');
    setShowAddVenue(false);
    setFormData({ name: '', location: '', category: '', subcategory: '' });
  };

  const handleDeleteVenue = (venueId: string, venueName: string) => {
    toast.success(`Venue "${venueName}" deleted successfully`);
  };

  const handleViewLocation = (venue: typeof mockVenues[0]) => {
    setSelectedVenue(venue);
    setShowMapModal(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-2">Venues Management</h1>
          <p className="text-gray-500 text-sm md:text-base">Manage and monitor all venue locations across categories.</p>
        </div>
        <Button onClick={() => setShowAddVenue(true)} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add New Venue
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search venues by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-2 md:flex gap-2">
              <Select value={categoryFilter} onValueChange={(value) => {
                setCategoryFilter(value);
                setSubcategoryFilter('all');
              }}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {venueCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={subcategoryFilter} 
                onValueChange={setSubcategoryFilter}
                disabled={categoryFilter === 'all'}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subcategories</SelectItem>
                  {categoryFilter !== 'all' && 
                    venueCategories
                      .find(c => c.id === categoryFilter)
                      ?.subcategories.map(sub => (
                        <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={voteFilter} onValueChange={setVoteFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Votes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Votes</SelectItem>
                  <SelectItem value="high">High (50+)</SelectItem>
                  <SelectItem value="medium">Medium (20-50)</SelectItem>
                  <SelectItem value="low">Low (under 20)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-center">Total Votes</TableHead>
                  <TableHead className="text-center">Today's Votes</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVenues.map((venue) => {
                  const totalVotesCount = venue.todayOpenVotes + venue.todayCloseVotes;
                  const openPercentage = totalVotesCount > 0 
                    ? ((venue.todayOpenVotes / totalVotesCount) * 100).toFixed(0)
                    : 0;
                  const closePercentage = totalVotesCount > 0
                    ? ((venue.todayCloseVotes / totalVotesCount) * 100).toFixed(0)
                    : 0;
                  
                  return (
                    <TableRow key={venue.id}>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{venue.name}</p>
                          <p className="text-sm text-gray-500">{venue.totalVotes} all-time votes</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="w-fit">
                            {getCategoryName(venue.category)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {getSubcategoryName(venue.category, venue.subcategory)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-gray-700 truncate">{venue.location}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <div>
                          <div className="text-gray-900">{venue.totalVotes}</div>
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
                            <span className="text-xs">Open:</span> {venue.todayOpenVotes}
                          </Badge>
                          <Badge variant="secondary" className="bg-red-100 text-red-700">
                            <span className="text-xs">Close:</span> {venue.todayCloseVotes}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={venue.status === 'open' ? 'default' : 'secondary'}>
                          {venue.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewLocation(venue)}
                          >
                            <MapPin className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVenue(venue.id, venue.name)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredVenues.map((venue) => {
              const totalVotesCount = venue.todayOpenVotes + venue.todayCloseVotes;
              const openPercentage = totalVotesCount > 0 
                ? ((venue.todayOpenVotes / totalVotesCount) * 100).toFixed(0)
                : 0;
              const closePercentage = totalVotesCount > 0
                ? ((venue.todayCloseVotes / totalVotesCount) * 100).toFixed(0)
                : 0;
              
              return (
                <Card key={venue.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1">{venue.name}</h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {getCategoryName(venue.category)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {getSubcategoryName(venue.category, venue.subcategory)}
                          </span>
                        </div>
                      </div>
                      <Badge variant={venue.status === 'open' ? 'default' : 'secondary'}>
                        {venue.status}
                      </Badge>
                    </div>

                    <div className="flex items-start gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{venue.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500 text-xs">Total Votes</p>
                        <p className="text-gray-900">{venue.totalVotes}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="text-green-600">{openPercentage}% Open</span> / <span className="text-red-600">{closePercentage}% Close</span>
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <p className="text-gray-500 text-xs">Today's Votes</p>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-1">
                            {venue.todayOpenVotes}
                          </Badge>
                          <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs px-1">
                            {venue.todayCloseVotes}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewLocation(venue)}
                        className="flex-1"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        View Map
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteVenue(venue.id, venue.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredVenues.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No venues found matching your filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAddVenue} onOpenChange={setShowAddVenue}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Venue</DialogTitle>
            <DialogDescription>
              Add a new venue to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Venue Name</Label>
              <Input
                id="name"
                placeholder="Enter venue name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter full address"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: '' })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {venueCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select 
                value={formData.subcategory} 
                onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                disabled={!formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableSubcategories().map(sub => (
                    <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddVenue(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddVenue}>
                Add Venue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showMapModal} onOpenChange={setShowMapModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedVenue?.name}</DialogTitle>
            <DialogDescription>
              View location details and voting statistics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <Badge variant="outline">{selectedVenue && getCategoryName(selectedVenue.category)}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Subcategory</p>
                <p className="text-gray-900">{selectedVenue && getSubcategoryName(selectedVenue.category, selectedVenue.subcategory)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-gray-900">{selectedVenue?.location}</p>
            </div>
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+3b82f6(${selectedVenue?.lng},${selectedVenue?.lat})/${selectedVenue?.lng},${selectedVenue?.lat},14,0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                alt="Map preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
                <p className="text-xs text-gray-500">Coordinates</p>
                <p className="text-sm text-gray-900">{selectedVenue?.lat}, {selectedVenue?.lng}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Today's Open Votes</p>
                <p className="text-green-700 mt-1">{selectedVenue?.todayOpenVotes}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Today's Close Votes</p>
                <p className="text-red-700 mt-1">{selectedVenue?.todayCloseVotes}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}