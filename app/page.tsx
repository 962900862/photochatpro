"use client";

import { useState, useRef } from "react";
import { 
  ImagePlus, 
  Sparkles, 
  Share2, 
  Wand2, 
  ArrowRight, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 检查文件大小
      if (file.size > 30 * 1024 * 1024) {
        setError('图片大小不能超过 30MB');
        return;
      }
      setSelectedFile(file);
      setProcessedImage(null);
      setError(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      // 检查文件大小
      if (file.size > 30 * 1024 * 1024) {
        setError('图片大小不能超过 30MB');
        return;
      }
      setSelectedFile(file);
      setProcessedImage(null);
      setError(null);
    }
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('shortSide', '1080');

      // 模拟进度
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '图片处理失败');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImage(imageUrl);
      setProgress(100);
    } catch (error) {
      console.error('处理错误:', error);
      setError(error instanceof Error ? error.message : '图片处理失败');
      setProgress(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'processed-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CrystalLogo = () => (
    <div className="w-12 h-12 mb-4 relative">
      <div className="absolute inset-0 bg-[#4f46e5] rounded-full blur-2xl opacity-20 animate-pulse" />
      <Wand2 className="w-full h-full text-[#ec4899]" />
    </div>
  );

  return (
    <main className="min-h-screen hero-gradient text-white">
      <div className="container mx-auto px-4 py-16 max-w-[1364px]">
        <div className="flex flex-col items-center text-center mb-16">
          <CrystalLogo />
          <h1 className="text-4xl font-bold shine-text mb-4">
            朋友圈图片优化处理
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            一键修复微信压缩失真，将短边调整为1080像素，让朋友圈照片展现完美画质
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 hero-card">
            <div 
              className={`upload-zone rounded-xl p-8 flex flex-col items-center justify-center min-h-[350px] relative group ${
                isDragging ? 'dragging' : ''
              }`}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleFileSelect}
              />
              {selectedFile ? (
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">{selectedFile.name}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <Button
                    className="mt-4 bg-transparent border border-white/20 hover:border-[#4f46e5] hover:bg-[#4f46e5]/10"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    重新选择
                  </Button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#4f46e5] rounded-full blur-2xl opacity-20 animate-pulse" />
                    <ImagePlus className={`w-16 h-16 mb-4 transition-all duration-300 ${
                      isDragging ? 'text-[#ec4899]' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className={`text-lg font-medium transition-all duration-300 ${
                    isDragging ? 'text-[#ec4899]' : 'text-gray-300'
                  }`}>
                    拖入微信压缩图片或点击上传
                  </p>
                  <p className="text-sm text-gray-400 mt-2">支持 JPG、PNG 格式，大小不超过30MB</p>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6 hero-card">
            <div className="min-h-[350px] flex flex-col">
              <h3 className="text-xl font-semibold mb-6 shine-text">
                图片优化信息
              </h3>
              
              <div className="mb-8 space-y-3">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                  <p className="text-gray-300">短边将调整为1080像素，长边保持比例</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                  <p className="text-gray-300">高分辨率输出 (300 DPI)</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                  <p className="text-gray-300">防止微信二次压缩</p>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-base text-gray-300 mb-2 block">
                  处理进度
                </label>
                <Progress value={progress} className="w-full h-2 rounded-full progress-bar">
                  <div 
                    className="h-full progress-fill rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }} 
                  />
                </Progress>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}

              <div className="mt-auto space-y-3">
                <Button 
                  className="w-full h-12 text-base button-primary rounded-xl"
                  onClick={processImage}
                  disabled={!selectedFile || isProcessing}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isProcessing ? '处理中...' : '开始处理'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button  
                  className="w-full h-10 bg-transparent border border-white/20 hover:border-[#4f46e5] hover:bg-[#4f46e5]/10 transition-all duration-300 text-white" 
                  onClick={downloadImage}
                  disabled={!processedImage}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  下载处理后的图片
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "短边1080像素",
              description: "确保图片不会被微信二次压缩，保持最佳画质",
              icon: Wand2,
            },
            {
              title: "高清输出",
              description: "高分辨率处理，完美还原每一个精彩瞬间",
              icon: ImagePlus,
            },
            {
              title: "一键处理",
              description: "简单快捷，无需复杂设置，让图片处理更轻松",
              icon: Share2,
            },
          ].map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 feature-card"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#4f46e5] rounded-full blur-xl opacity-20" />
                <feature.icon className="w-12 h-12 text-[#ec4899] relative z-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 shine-text">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}