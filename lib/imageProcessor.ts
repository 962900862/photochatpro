import sharp from 'sharp';

export interface ImageProcessingOptions {
  shortSide?: number; // 短边像素大小
  resolution?: number; // 分辨率 (DPI)
}

export class ImageProcessor {
  private static readonly DEFAULT_SHORT_SIDE = 1080;
  private static readonly DEFAULT_RESOLUTION = 300;

  /**
   * 处理图片使其适合朋友圈发布
   * @param inputBuffer 输入图片buffer
   * @param options 处理选项
   * @returns 处理后的图片buffer
   */
  static async processImage(
    inputBuffer: Buffer,
    options: ImageProcessingOptions = {}
  ): Promise<Buffer> {
    const {
      shortSide = this.DEFAULT_SHORT_SIDE,
      resolution = this.DEFAULT_RESOLUTION
    } = options;

    let image = sharp(inputBuffer);

    // 获取图片元数据
    const metadata = await image.metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error('无法获取图片尺寸信息');
    }

    // 计算目标尺寸
    let targetWidth = width;
    let targetHeight = height;

    // 确定短边和长边
    const isWidthShorter = width < height;
    const shortDimension = isWidthShorter ? width : height;
    const longDimension = isWidthShorter ? height : width;

    // 计算缩放比例
    const scale = shortSide / shortDimension;

    // 设置目标尺寸
    if (isWidthShorter) {
      targetWidth = shortSide;
      targetHeight = Math.round(longDimension * scale);
    } else {
      targetHeight = shortSide;
      targetWidth = Math.round(longDimension * scale);
    }

    // 应用图片处理
    image = image
      .resize(targetWidth, targetHeight, {
        fit: 'fill',
        withoutEnlargement: true
      });

    // 设置DPI
    image = image.withMetadata({
      density: resolution
    });

    // 输出处理后的图片
    return image.toBuffer();
  }
} 