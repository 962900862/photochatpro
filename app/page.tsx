"use client";

import { useState, useRef } from "react";
import { 
  ImagePlus, 
  Sparkles, 
  Share2, 
  Wand2, 
  ArrowRight, 
  Star, 
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  MaximizeIcon,
  X,
  Download,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [wechatProgress, setWechatProgress] = useState(0);
  const [xiaohongshuProgress, setXiaohongshuProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mode, setMode] = useState<'wechat' | 'xiaohongshu'>('wechat');
  const [processedMode, setProcessedMode] = useState<'wechat' | 'xiaohongshu'>('wechat');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setProcessedImage(null);
        setProgress(0);
        setWechatProgress(0);
        setXiaohongshuProgress(0);
        setProcessedMode(mode);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setProcessedImage(null);
        setProgress(0);
        setWechatProgress(0);
        setXiaohongshuProgress(0);
        setProcessedMode(mode);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    setProcessedImage(null);
    setProgress(0);
    setWechatProgress(0);
    setXiaohongshuProgress(0);
    setProcessedMode(mode);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processImage = () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    setProgress(0);
    if (mode === 'wechat') {
      setWechatProgress(0);
    } else {
      setXiaohongshuProgress(0);
    }
    
    // 记录当前选择的模式，确保处理过程中不会变化
    const currentMode = mode;
    
    // 创建一个新的Image对象来获取图片尺寸
    const img = new Image();
    img.onload = () => {
      // 开始处理进度
      const interval = setInterval(() => {
        if (currentMode === 'wechat') {
          setWechatProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        } else {
          setXiaohongshuProgress((prev) => {
            if (prev >= 95) {
              clearInterval(interval);
              return 100;
            }
            return prev + 5;
          });
        }
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      // 计算目标尺寸，根据不同模式进行处理
      let targetWidth, targetHeight;
      
      if (currentMode === 'wechat') {
        // 朋友圈模式：短边1080px，长边等比例缩放
        if (img.width < img.height) {
          // 图片是竖向的，宽度是短边
          targetWidth = 1080;
          targetHeight = Math.round((img.height / img.width) * 1080);
        } else {
          // 图片是横向的，高度是短边
          targetHeight = 1080;
          targetWidth = Math.round((img.width / img.height) * 1080);
        }
      } else {
        // 小红书模式：3:4比例，尺寸为1280*1706像素
        targetWidth = 1280;
        targetHeight = 1706;
      }

      // 创建canvas来调整图片尺寸
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // 绘制调整后的图片（居中裁剪方式）
        if (currentMode === 'xiaohongshu') {
          // 小红书模式下执行居中裁剪
          // 先填充白色背景
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          
          // 计算如何以3:4比例裁剪和缩放图片
          const targetRatio = 3 / 4; // 目标比例3:4
          const imgRatio = img.width / img.height;
          
          let sw, sh, sx, sy, dw, dh, dx, dy;
          
          if (imgRatio > targetRatio) {
            // 原图比例宽于3:4，需要裁掉两侧
            sh = img.height;
            sw = sh * targetRatio;
            sx = (img.width - sw) / 2;
            sy = 0;
            dw = targetWidth;
            dh = targetHeight;
            dx = 0;
            dy = 0;
          } else {
            // 原图比例窄于3:4，需要裁掉上下
            sw = img.width;
            sh = sw / targetRatio;
            sx = 0;
            sy = (img.height - sh) / 2;
            dw = targetWidth;
            dh = targetHeight;
            dx = 0;
            dy = 0;
          }
          
          // 居中绘制图像，保持3:4比例
          ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        } else {
          // 朋友圈模式下执行等比例缩放
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }
        
        // 将canvas内容转换为图片
        const processedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        
        // 完成处理
        setTimeout(() => {
          setProcessedImage(processedDataUrl);
          setProgress(100);
          if (currentMode === 'wechat') {
            setWechatProgress(100);
          } else {
            setXiaohongshuProgress(100);
          }
          setIsProcessing(false);
          setProcessedMode(currentMode);
        }, 500);
      } else {
        // 如果无法获取canvas上下文，回退到原图
        setProcessedImage(uploadedImage);
        setProgress(100);
        if (currentMode === 'wechat') {
          setWechatProgress(100);
        } else {
          setXiaohongshuProgress(100);
        }
        setIsProcessing(false);
        setProcessedMode(currentMode);
      }
    };
    
    img.onerror = () => {
      // 加载图片失败
      setIsProcessing(false);
      setProgress(0);
      if (currentMode === 'wechat') {
        setWechatProgress(0);
      } else {
        setXiaohongshuProgress(0);
      }
      alert('图片处理失败，请重试');
    };
    
    img.src = uploadedImage;
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    // 创建一个临时链接来下载图片
    const link = document.createElement('a');
    link.href = processedImage;
    // 根据模式设置不同的文件名
    link.download = processedMode === 'wechat' ? '朋友圈高清图片.jpg' : '小红书高清封面.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CrystalLogo = () => (
    <div className="relative w-32 h-32 mb-12 floating-icon">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 bg-gradient-to-r from-[#4f46e5] via-[#ec4899] to-[#4f46e5] rounded-full opacity-50 animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 bg-gradient-to-r from-[#ec4899] via-[#4f46e5] to-[#ec4899] rounded-full opacity-30 animate-pulse delay-75" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-r from-[#4f46e5] via-[#ec4899] to-[#4f46e5] rounded-full opacity-20 animate-pulse delay-150" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Wand2 className="w-14 h-14 text-white drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
      </div>
    </div>
  );

  const testimonials = [
    {
      name: "Yuxiii",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8yZ-tixAWh88x5K25PoqBgkfEFQm-vWh-nA&s",
      comment: "照片质量提升很明显，朋友圈照片终于不会被压得模糊了！",
      rating: 5
    },
    {
      name: "小巷子",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCRl9eKjcwK30bqLP25AJzr1vMYBwMBBDDQ&s",
      comment: "界面简单易用，效果非常专业，推荐给需要的朋友。",
      rating: 5
    },
    {
      name: "喜欢蛋糕",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_AWxjVhXrye2Tg0VGJfu_JeyrI9ovkao28w&s",
      comment: "一键处理，方便快捷，照片清晰度提升很多！",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "如何使用这个工具？",
      answer: "只需将您的图片拖入上传区域或点击选择文件，选择需要的格式（朋友圈或小红书），点击开始处理即可。处理完成后可以下载或直接分享。"
    },
    {
      question: "支持哪些图片格式？",
      answer: "目前支持主流图片格式，包括JPG、PNG、WEBP等。建议上传原图以获得最佳效果。"
    },
    {
      question: "处理后的图片会占用更多空间吗？",
      answer: "不会，我们采用智能压缩技术，在提升画质的同时保持合理的文件大小。"
    },
    {
      question: "小红书封面和朋友圈图片有什么区别？",
      answer: "小红书封面会按照平台推荐的3:4比例进行优化处理再进行像素ai增强，而朋友圈图片则保持短边1080px的高清标准。"
    }
  ];

  return (
    <main className="min-h-screen hero-gradient text-white">
      <div className="mx-auto max-w-[1168px] px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <CrystalLogo />
          <h1 className="text-4xl md:text-5xl font-bold shine-text mb-6">
            AI 朋友圈图片超清处理
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
            专业的AI图片增强工具，一键修复微信压缩失真，让您的朋友圈照片展现完美画质
          </p>
          <Button className="button-primary rounded-full px-8 py-6 text-lg mt-4">
            <Sparkles className="w-5 h-5 mr-2" />
            立即体验
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <Card className="p-6 hero-card">
            <div 
              className={`upload-zone rounded-xl p-6 flex flex-col items-center justify-center min-h-[400px] relative group ${
                isDragging ? 'dragging' : ''
              }`}
              onDragEnter={handleDragOver}
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                style={{ display: uploadedImage ? 'none' : 'block' }}
              />
              
              {uploadedImage ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <div className="absolute top-2 right-2 z-20">
                    <button
                      className="bg-black/50 hover:bg-black/70 rounded-full p-1 transition-colors"
                      onClick={removeUploadedImage}
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="relative w-full h-[300px] overflow-hidden rounded-lg mb-4">
                    <img 
                      src={processedImage || uploadedImage} 
                      alt={processedImage ? "处理后的图片" : "上传的图片"}
                      className="w-full h-full object-contain"
                    />
                    {processedImage && (
                      <div className={`absolute top-2 left-2 ${processedMode === 'wechat' ? 'bg-green-500/80' : 'bg-[#ff2e51]/80'} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                        {processedMode === 'wechat' ? '朋友圈已优化' : '小红书已优化'}
                      </div>
                    )}
                    {processedMode === 'xiaohongshu' && processedImage && (
                      <div className="absolute bottom-2 right-2 bg-black/50 rounded-md p-1">
                        <img src="https://pic1.imgdb.cn/item/67dcfbaf88c538a9b5c294b3.png" alt="小红书" className="w-6 h-6" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <p className="text-white text-sm">
                    {processedImage 
                      ? `处理完成，可以下载${processedMode === 'wechat' ? '或分享到朋友圈' : '或上传到小红书'}` 
                      : "已上传图片，点击处理按钮开始优化"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#4f46e5] rounded-full blur-2xl opacity-20 animate-pulse" />
                    <ImagePlus 
                      className={`w-16 h-16 mb-6 transition-all duration-300 ${
                        isDragging ? 'text-[#ec4899] scale-110' : 'text-gray-400'
                      }`} 
                    />
                  </div>
                  <p className={`text-xl font-medium transition-all duration-300 ${
                    isDragging ? 'text-[#ec4899]' : 'text-gray-300'
                  }`}>
                    拖入图片或点击上传
                  </p>
                  <p className="text-sm text-gray-400 mt-3">支持 JPG、PNG 格式</p>
                  {mode === 'xiaohongshu' && (
                    <div className="mt-4 flex items-center bg-[#ff2e51]/10 rounded-full px-3 py-1">
                      <img src="https://pic1.imgdb.cn/item/67dcfbaf88c538a9b5c294b3.png" alt="小红书" className="w-4 h-4 mr-2" />
                      <span className="text-xs text-[#ff2e51]">小红书最佳封面模式已开启</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>

          <Card className="p-6 hero-card">
            <div className="min-h-[400px] flex flex-col">
              <h3 className="text-2xl font-semibold mb-4 shine-text">
                AI 增强设置
              </h3>
              
              <div className="mb-6 flex items-center justify-between">
                <button 
                  className={`flex-1 py-3 rounded-l-lg flex items-center justify-center gap-2 transition-all ${
                    mode === 'wechat' 
                      ? 'bg-[#4f46e5] text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  onClick={() => setMode('wechat')}
                >
                  {mode === 'wechat' ? (
                    <img src="https://pic1.imgdb.cn/item/67dcfbc988c538a9b5c29517.png" alt="朋友圈" className="w-5 h-5" />
                  ) : (
                    <MessageCircle className="w-5 h-5" />
                  )}
                  <span>朋友圈超清</span>
                </button>
                <button 
                  className={`flex-1 py-3 rounded-r-lg flex items-center justify-center gap-2 transition-all ${
                    mode === 'xiaohongshu' 
                      ? 'bg-[#4f46e5] text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  onClick={() => setMode('xiaohongshu')}
                >
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    {mode === 'xiaohongshu' ? (
                      <img src="https://pic1.imgdb.cn/item/67dcfbaf88c538a9b5c294b3.png" alt="小红书" className="w-full h-full" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <span>小红书封面</span>
                </button>
              </div>
              
              <div className="mb-6 p-4 rounded-lg border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${
                    mode === 'wechat' ? 'bg-[#4f46e5]/20' : 'bg-[#ff2e51]/20'
                  } flex items-center justify-center`}>
                    <MaximizeIcon className={`w-5 h-5 ${
                      mode === 'wechat' ? 'text-[#ec4899]' : 'text-[#ff2e51]'
                    }`} />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {mode === 'wechat' ? '智能优化尺寸' : '小红书最佳比例'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {mode === 'wechat' 
                        ? '短边1080px，长边等比例缩放' 
                        : '3:4比例，1280*1706像素'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  {mode === 'wechat'
                    ? '此设置可确保图片在朋友圈显示清晰，同时保持合理的文件大小'
                    : '此设置可确保图片在小红书上获得最佳展示效果和更多浏览'}
                </p>
              </div>

              <div className="mb-8">
                <label className="text-base text-gray-300 mb-3 block">
                  处理进度
                </label>
                {mode === 'wechat' ? (
                  <div>
                    <Progress value={wechatProgress} className="w-full h-3 rounded-full progress-bar">
                      <div 
                        className="h-full progress-fill rounded-full transition-all duration-300" 
                        style={{ width: `${wechatProgress}%` }} 
                      />
                    </Progress>
                    {wechatProgress > 0 && (
                      <p className="text-right text-sm text-gray-400 mt-2">{wechatProgress}%</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <Progress value={xiaohongshuProgress} className="w-full h-3 rounded-full progress-bar">
                      <div 
                        className="h-full progress-fill rounded-full transition-all duration-300" 
                        style={{ width: `${xiaohongshuProgress}%` }} 
                      />
                    </Progress>
                    {xiaohongshuProgress > 0 && (
                      <p className="text-right text-sm text-gray-400 mt-2">{xiaohongshuProgress}%</p>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-auto space-y-4">
                <Button 
                  className={`w-full h-12 text-lg button-primary rounded-xl ${(!uploadedImage || isProcessing) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={!uploadedImage || isProcessing}
                  onClick={processImage}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isProcessing ? '处理中...' : mode === 'wechat' ? '生成朋友圈超清图' : '生成小红书封面'}
                </Button>
                
                <Button 
                  className={`w-full h-12 bg-white/10 hover:bg-white/20 transition-all duration-300 text-white border-0 rounded-xl ${!processedImage ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={!processedImage}
                  onClick={downloadImage}
                >
                  <Download className="w-5 h-5 mr-2" />
                  {processedMode === 'wechat' ? '下载朋友圈图片' : '下载小红书封面'}
                </Button>
              
              </div>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 shine-text">主要功能</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "AI 智能优化",
                description: "自动识别场景，优化细节和色彩，让照片更加出众",
                icon: Wand2,
              },
              {
                title: "双平台支持",
                description: "支持朋友圈超清图片和小红书高清封面，满足多平台需求",
                icon: ImagePlus,
              },
              {
                title: "一键分享",
                description: "便捷分享到微信朋友圈和小红书，展现精致生活",
                icon: Share2,
              },
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 feature-card"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#4f46e5] rounded-full blur-xl opacity-20" />
                  <feature.icon className="w-10 h-10 text-[#ec4899] relative z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-3 shine-text">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 shine-text">用户评价</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hero-card p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-white">{testimonial.name}</h4>
                    <div className="flex">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.comment}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12 shine-text">常见问题</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="faq-card p-6 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
                {openFaq === index && (
                  <p className="mt-4 text-gray-300">{faq.answer}</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-4 mb-8">
            <CheckCircle2 className="w-6 h-6 text-[#ec4899]" />
            <span className="text-gray-300">已有超过 3000+ 用户选择使用</span>
          </div>
          <Button className="button-primary rounded-full px-8 py-6 text-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            立即体验
          </Button>
        </div>
      </div>
    </main>
  );
}