import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI超清处理_朋友圈图片优化工具_一键修复微信压缩画质',
  description: '专为精致女性设计的AI朋友圈图片超清处理器，采用浏览器端神经网络技术，3秒修复微信压缩失真，支持4K高清输出与智能模板美化',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>{children}</body>
    </html>
  );
}