import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI超清处理_朋友圈高清照片优化工具_一键修复微信压缩画质',
  description: '专为精致人群设计的AI朋友圈图片超清处理器，采用浏览器端神经网络技术，3秒修复微信压缩失真，支持4K高清输出与智能模板美化',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        <footer className="py-6 text-center text-gray-400 text-sm bg-gray-900">
          <div className="container mx-auto">
            <div className="flex justify-center space-x-4">
              <Link href="/privacy" className="hover:text-gray-200 transition-colors">隐私政策</Link>
              <Link href="/terms" className="hover:text-gray-200 transition-colors">服务条款</Link>
            </div>
            <p className="mt-2">© 2025 • Photo Chat Pro 保留所有权利。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}