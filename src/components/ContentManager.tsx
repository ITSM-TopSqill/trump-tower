import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Download, Trash2, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_type: string;
  category: string;
  thumbnail_path?: string;
  duration?: string;
  is_featured: boolean;
  file_size?: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface Brochure {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_size?: number;
  download_count: number;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface PDF {
  id: string;
  title: string;
  description: string;
  file_path: string;
  file_size?: number;
  download_count: number;
  is_featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const ContentManager = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryItems();
    fetchBrochures();
    fetchPdfs();
  }, []);

  const fetchGalleryItems = async () => {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching gallery items:', error);
    } else {
      setGalleryItems(data || []);
    }
  };

  const fetchBrochures = async () => {
    const { data, error } = await supabase
      .from('brochures')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching brochures:', error);
    } else {
      setBrochures(data || []);
    }
  };

  const fetchPdfs = async () => {
    const { data, error } = await supabase
      .from('pdfs')
      .select('*')
      .order('display_order');
    
    if (error) {
      console.error('Error fetching PDFs:', error);
    } else {
      setPdfs(data || []);
    }
  };

  const uploadFile = async (file: File, bucket: string, category?: string) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create database record
      if (bucket === 'gallery-images' || bucket === 'videos') {
        const { error: dbError } = await supabase
          .from('gallery_items')
          .insert({
            title: file.name.replace(/\.[^/.]+$/, ""),
            file_path: filePath,
            file_type: bucket === 'videos' ? 'video' : 'image',
            category: category || 'general',
            file_size: file.size
          });

        if (dbError) throw dbError;
        fetchGalleryItems();
      } else if (bucket === 'brochures') {
        const { error: dbError } = await supabase
          .from('brochures')
          .insert({
            title: file.name.replace(/\.[^/.]+$/, ""),
            file_path: filePath,
            file_size: file.size
          });

        if (dbError) throw dbError;
        fetchBrochures();
      } else if (bucket === 'pdfs') {
        const { error: dbError } = await supabase
          .from('pdfs')
          .insert({
            title: file.name.replace(/\.[^/.]+$/, ""),
            file_path: filePath,
            file_size: file.size
          });

        if (dbError) throw dbError;
        fetchPdfs();
      }

      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading the file.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteItem = async (id: string, filePath: string, bucket: string, table: string) => {
    try {
      // Delete from storage
      await supabase.storage.from(bucket).remove([filePath]);
      
      // Delete from database
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);

      if (error) throw error;

      if (table === 'gallery_items') {
        fetchGalleryItems();
      } else if (table === 'brochures') {
        fetchBrochures();
      } else if (table === 'pdfs') {
        fetchPdfs();
      }

      toast({
        title: "Deleted successfully",
        description: "Item has been removed."
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting the item.",
        variant: "destructive"
      });
    }
  };

  const getFileUrl = (bucket: string, path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Management</h1>
        <p className="text-muted-foreground">
          Manage your gallery images, videos, and downloadable brochures
        </p>
      </div>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gallery">Gallery Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="brochures">Brochures</TabsTrigger>
          <TabsTrigger value="pdfs">PDFs</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Gallery Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => uploadFile(file, 'gallery-images'));
                  }}
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.filter(item => item.file_type === 'image').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <img
                    src={getFileUrl('gallery-images', item.file_path)}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getFileUrl('gallery-images', item.file_path), '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteItem(item.id, item.file_path, 'gallery-images', 'gallery_items')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => uploadFile(file, 'videos'));
                  }}
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.filter(item => item.file_type === 'video').map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <video
                    src={getFileUrl('videos', item.file_path)}
                    className="w-full h-48 object-cover rounded mb-2"
                    controls
                  />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getFileUrl('videos', item.file_path), '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteItem(item.id, item.file_path, 'videos', 'gallery_items')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="brochures" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Brochures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => uploadFile(file, 'brochures'));
                  }}
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brochures.map((brochure) => (
              <Card key={brochure.id}>
                <CardContent className="p-4">
                  <div className="h-32 bg-muted rounded mb-2 flex items-center justify-center">
                    <Download className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">{brochure.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{brochure.description}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Downloads: {brochure.download_count}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const url = getFileUrl('brochures', brochure.file_path);
                        window.open(url, '_blank');
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteItem(brochure.id, brochure.file_path, 'brochures', 'brochures')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pdfs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload PDFs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach(file => uploadFile(file, 'pdfs'));
                  }}
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pdfs.map((pdf) => (
              <Card key={pdf.id}>
                <CardContent className="p-4">
                  <div className="h-32 bg-muted rounded mb-2 flex items-center justify-center">
                    <Download className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">{pdf.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{pdf.description}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Downloads: {pdf.download_count}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const url = getFileUrl('pdfs', pdf.file_path);
                        window.open(url, '_blank');
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteItem(pdf.id, pdf.file_path, 'pdfs', 'pdfs')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;