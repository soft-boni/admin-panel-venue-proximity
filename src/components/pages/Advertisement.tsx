import { useState } from 'react';
import { Plus, Play, Square, Edit, Trash2, Calendar, Upload, X, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { mockAds } from '../../utils/mockData';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Advertisement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState<typeof mockAds[0] | null>(null);
  const [deletingAd, setDeletingAd] = useState<typeof mockAds[0] | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [editUploadedFile, setEditUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditUploadedFile(reader.result as string);
        } else {
          setUploadedFile(reader.result as string);
        }
        const fileType = file.type.startsWith('video') ? 'Video' : 'Image';
        toast.success(`${fileType} uploaded successfully`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAd = (runImmediately: boolean = false) => {
    const message = runImmediately 
      ? 'Advertisement created and running successfully' 
      : 'Advertisement saved successfully';
    toast.success(message);
    setShowCreateModal(false);
    setUploadedFile(null);
  };

  const handleUpdateAd = () => {
    toast.success('Advertisement updated successfully');
    setEditingAd(null);
    setEditUploadedFile(null);
  };

  const handleDeleteAd = () => {
    toast.success('Advertisement deleted successfully');
    setDeletingAd(null);
  };

  const handleToggleAdStatus = (adId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'running' ? 'stopped' : 'running';
    toast.success(`Advertisement ${newStatus === 'running' ? 'started' : 'stopped'} successfully`);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Advertisement Management</h1>
          <p className="text-gray-500">Create and manage location-based promotional ads with proximity targeting.</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Advertisements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Advertisement</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Radius</TableHead>
                <TableHead>Runtime</TableHead>
                <TableHead className="text-center">Impressions</TableHead>
                <TableHead className="text-center">Clicks</TableHead>
                <TableHead className="text-center">CTR</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAds.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={ad.image}
                        alt={ad.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-gray-900">{ad.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{ad.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-sm">{ad.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{ad.radius} miles</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(ad.startDate).toLocaleDateString()} -{' '}
                        {new Date(ad.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-gray-900">{ad.impressions.toLocaleString()}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="text-gray-900">{ad.clicks.toLocaleString()}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100">
                      {ad.ctr}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={ad.status === 'running' ? 'default' : 'secondary'}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAdStatus(ad.id, ad.status)}
                        className={ad.status === 'running' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                      >
                        {ad.status === 'running' ? (
                          <Square className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingAd(ad)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => setDeletingAd(ad)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Ad Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Advertisement</DialogTitle>
            <DialogDescription>
              Create a new location-based promotional ad with proximity targeting.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter ad title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter ad description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uploadFile">Upload Media (Image or Video)</Label>
              <div className="space-y-2">
                <Input
                  id="uploadFile"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(event) => handleFileUpload(event, false)}
                  className="cursor-pointer"
                />
                {uploadedFile && (
                  <div className="relative inline-block w-full">
                    <img
                      src={uploadedFile}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setUploadedFile(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location Address</Label>
              <Input 
                id="location" 
                placeholder="Enter full address (e.g., 123 Main St, New York, NY 10001)"
              />
              <p className="text-xs text-gray-500">This ad will be shown to users near this location</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Proximity Radius (miles)</Label>
              <Input 
                id="radius" 
                type="number"
                placeholder="Enter radius in miles"
                min="1"
              />
              <p className="text-xs text-gray-500">Users within this radius will see the ad</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleCreateAd(false)}>Save Ad</Button>
            <Button onClick={() => handleCreateAd(true)}>Create and Run Ad</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Ad Modal */}
      <Dialog open={!!editingAd} onOpenChange={() => setEditingAd(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Advertisement</DialogTitle>
            <DialogDescription>
              Update the advertisement details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editTitle">Title</Label>
              <Input id="editTitle" defaultValue={editingAd?.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                defaultValue={editingAd?.description}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editUploadFile">Upload Media (Image or Video)</Label>
              <div className="space-y-2">
                <Input
                  id="editUploadFile"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(event) => handleFileUpload(event, true)}
                  className="cursor-pointer"
                />
                {editUploadedFile && (
                  <div className="relative inline-block w-full">
                    <img
                      src={editUploadedFile}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setEditUploadedFile(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editLocation">Location Address</Label>
              <Input 
                id="editLocation" 
                defaultValue={editingAd?.location}
                placeholder="Enter full address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editRadius">Proximity Radius (miles)</Label>
              <Input 
                id="editRadius" 
                type="number"
                defaultValue={editingAd?.radius}
                placeholder="Enter radius in miles"
                min="1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editStartDate">Start Date</Label>
                <Input id="editStartDate" type="date" defaultValue={editingAd?.startDate} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEndDate">End Date</Label>
                <Input id="editEndDate" type="date" defaultValue={editingAd?.endDate} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAd(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAd}>Update Ad</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Ad Modal */}
      <Dialog open={!!deletingAd} onOpenChange={() => setDeletingAd(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Advertisement</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this advertisement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-gray-900">{deletingAd?.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-3 h-3 text-gray-500" />
              <p className="text-sm text-gray-600">{deletingAd?.location}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Radius: {deletingAd?.radius} miles</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeletingAd(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAd}>
              Delete Ad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}