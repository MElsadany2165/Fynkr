import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileImage, Palette, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export default function LogoDownload() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const downloadSVG = async (filename: string, displayName: string) => {
    setDownloading(filename);
    
    try {
      // Fetch the SVG file
      const response = await fetch(`/${filename}`);
      const svgContent = await response.text();
      
      // Create a blob and download link
      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`${displayName} downloaded successfully!`);
    } catch (error) {
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const convertToPNG = async (svgFilename: string, pngFilename: string, displayName: string, size: number = 512) => {
    setDownloading(pngFilename);
    
    try {
      // Fetch SVG content
      const response = await fetch(`/${svgFilename}`);
      const svgContent = await response.text();
      
      // Create canvas and convert to PNG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      canvas.width = size;
      canvas.height = size;
      
      // Create blob URL for the SVG
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        // Fill white background
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, size, size);
          ctx.drawImage(img, 0, 0, size, size);
        }
        
        // Convert to PNG and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = pngFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success(`${displayName} downloaded successfully!`);
          }
        }, 'image/png');
        
        URL.revokeObjectURL(svgUrl);
        setDownloading(null);
      };
      
      img.onerror = () => {
        toast.error('PNG conversion failed. Please try again.');
        setDownloading(null);
      };
      
      img.src = svgUrl;
    } catch (error) {
      toast.error('PNG conversion failed. Please try again.');
      setDownloading(null);
    }
  };

  const logoVariants = [
    {
      title: "Main Logo",
      description: "Square logo with company name and tagline",
      filename: "fynkr-logo.svg",
      pngFilename: "fynkr-logo.png",
      icon: <Palette className="w-5 h-5" />,
      preview: "/fynkr-logo.svg"
    },
    {
      title: "Horizontal Logo", 
      description: "Horizontal layout for headers and banners",
      filename: "fynkr-logo-horizontal.svg",
      pngFilename: "fynkr-logo-horizontal.png", 
      icon: <FileImage className="w-5 h-5" />,
      preview: "/fynkr-logo-horizontal.svg"
    },
    {
      title: "Favicon",
      description: "Small icon for browser tabs and apps",
      filename: "fynkr-favicon.svg",
      pngFilename: "fynkr-favicon.png",
      icon: <Smartphone className="w-5 h-5" />,
      preview: "/fynkr-favicon.svg"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          Fynkr Logo Downloads
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Download the official Fynkr logos in various formats and sizes. All logos are available in SVG and PNG formats.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {logoVariants.map((variant) => (
          <Card key={variant.filename} className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                {variant.icon}
              </div>
              <CardTitle className="text-lg font-semibold">{variant.title}</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                {variant.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Logo Preview */}
              <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-center min-h-[120px]">
                <img 
                  src={variant.preview} 
                  alt={variant.title}
                  className="max-w-full max-h-[100px] object-contain"
                />
              </div>
              
              {/* Download Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={() => downloadSVG(variant.filename, `${variant.title} (SVG)`)}
                  disabled={downloading === variant.filename}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloading === variant.filename ? 'Downloading...' : 'Download SVG'}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => convertToPNG(variant.filename, variant.pngFilename, `${variant.title} (PNG)`)}
                  disabled={downloading === variant.pngFilename}
                  className="w-full border-slate-300 hover:bg-slate-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloading === variant.pngFilename ? 'Converting...' : 'Download PNG'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Usage Guidelines</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>• <strong>SVG Format:</strong> Best for web use, scalable without quality loss</p>
            <p>• <strong>PNG Format:</strong> Best for print materials and presentations</p>
            <p>• <strong>Main Logo:</strong> Use for primary branding and marketing materials</p>
            <p>• <strong>Horizontal Logo:</strong> Perfect for website headers and business cards</p>
            <p>• <strong>Favicon:</strong> Use for browser tabs, app icons, and social media profiles</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}