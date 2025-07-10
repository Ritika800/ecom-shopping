
import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, RotateCcw, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PhotoCaptureProps {
  onPhotoCapture: (photo: string) => void;
  onClose: () => void;
}

const PhotoCapture = ({ onPhotoCapture, onClose }: PhotoCaptureProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [mode, setMode] = useState<'choose' | 'camera' | 'upload'>('choose');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setMode('camera');
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedPhoto(photoDataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedPhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmPhoto = () => {
    const photo = capturedPhoto || uploadedPhoto;
    if (photo) {
      onPhotoCapture(photo);
    }
  };

  const resetCapture = () => {
    setCapturedPhoto(null);
    setUploadedPhoto(null);
    setMode('choose');
    stopCamera();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 bg-white dark:bg-slate-900">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Take or Upload Your Photo
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {mode === 'choose' && (
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Choose how you'd like to add your photo for virtual try-on
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={startCamera}
                  className="h-32 flex-col gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Camera className="h-8 w-8" />
                  <span className="text-lg">Take Photo</span>
                  <span className="text-sm opacity-80">Use your camera</span>
                </Button>
                <Button
                  onClick={() => {
                    setMode('upload');
                    fileInputRef.current?.click();
                  }}
                  variant="outline"
                  className="h-32 flex-col gap-3 border-2 border-dashed"
                >
                  <Upload className="h-8 w-8" />
                  <span className="text-lg">Upload Photo</span>
                  <span className="text-sm opacity-70">Choose from gallery</span>
                </Button>
              </div>
            </div>
          )}

          {mode === 'camera' && !capturedPhoto && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 border-4 border-white/30 rounded-lg pointer-events-none" />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={capturePhoto}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Capture Photo
                </Button>
                <Button onClick={resetCapture} variant="outline">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          )}

          {(capturedPhoto || uploadedPhoto) && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={capturedPhoto || uploadedPhoto || ''}
                  alt="Captured"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={confirmPhoto}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Use This Photo
                </Button>
                <Button onClick={resetCapture} variant="outline">
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Try Again
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoCapture;
