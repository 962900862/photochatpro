import { NextRequest, NextResponse } from 'next/server';
import { ImageProcessor, ImageProcessingOptions } from '@/lib/imageProcessor';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: '未找到上传的图片' },
        { status: 400 }
      );
    }

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支持图片文件' },
        { status: 400 }
      );
    }

    // 检查文件大小（限制为 30MB）
    if (file.size > 40 * 1024 * 1024) {
      return NextResponse.json(
        { error: '图片大小不能超过 30MB' },
        { status: 400 }
      );
    }

    console.log('开始处理图片:', file.name);

    // 读取文件内容
    const buffer = Buffer.from(await file.arrayBuffer());

    // 获取处理选项
    const options: ImageProcessingOptions = {
      shortSide: Number(formData.get('shortSide')) || undefined,
      resolution: Number(formData.get('resolution')) || undefined
    };

    console.log('处理选项:', options);

    // 处理图片
    const processedBuffer = await ImageProcessor.processImage(buffer, options);

    console.log('图片处理完成');

    // 返回处理后的图片
    return new NextResponse(processedBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="processed-image.jpg"'
      }
    });
  } catch (error) {
    console.error('图片处理错误:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '图片处理失败' },
      { status: 500 }
    );
  }
} 