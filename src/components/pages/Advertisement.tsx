import { useState } from 'react';
import { Plus, Play, Square, Edit, Trash2, Calendar, Upload, X } from 'lucide-react';
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
import { mockAds, mockBars } from '../../utils/mockData';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Advertisement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAd, setEditingAd] = useState<typeof mockAds[0] | null>(null);
  const [deletingAd, setDeletingAd] = useState<typeof mockAds[0] | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editUploadedImage, setEditUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEdit) {
          setEditUploadedImage(reader.result as string);
        } else {
          setUploadedImage(reader.result as string);
        }
        toast.success('Image uploaded successfully');
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
    setUploadedImage(null);
  };

  const handleUpdateAd = () => {
    toast.success('Advertisement updated successfully');
    setEditingAd(null);
    setEditUploadedImage(null);
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
          <p className="text-gray-500">Create and manage promotional ads for bars.</p>
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
                <TableHead>Bar</TableHead>
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
                    <p className="text-gray-700">{ad.barName}</p>
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
              Create a new promotional ad for a bar.
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
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" placeholder="https://example.com/image.jpg" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="uploadImage">Or Upload Image</Label>
              <div className="space-y-2">
                <Input
                  id="uploadImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, false)}
                  className="cursor-pointer"
                />
                {uploadedImage && (
                  <div className="relative inline-block">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setUploadedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bar">Select Bar</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a bar" />
                </SelectTrigger>
                <SelectContent>
                  {mockBars.map((bar) => (
                    <SelectItem key={bar.id} value={bar.id}>
                      {bar.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Label htmlFor="editImage">Image URL</Label>
              <Input id="editImage" defaultValue={editingAd?.image} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editUploadImage">Or Upload Image</Label>
              <div className="space-y-2">
                <Input
                  id="editUploadImage"
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event, true)}
                  className="cursor-pointer"
                />
                {editUploadedImage && (
                  <div className="relative inline-block">
                    <img
                      src={editUploadedImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setEditUploadedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editBar">Select Bar</Label>
              <Select defaultValue={editingAd?.barId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockBars.map((bar) => (
                    <SelectItem key={bar.id} value={bar.id}>
                      {bar.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <p className="text-sm text-gray-600 mt-1">{deletingAd?.barName}</p>
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