import React from 'react';
import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto py-12 px-4 max-w-4xl text-gray-300">
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            返回首页
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8 text-blue-400">隐私政策（朋友圈照片高清工具版）</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">1. 简介</h2>
            <p>
              「朋友圈照片高清工具」专注于通过智能算法提升照片画质。我们深知隐私的重要性，承诺以最简数据原则保障用户体验。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">2. 我们不收集的信息</h2>
            <p className="mb-2">
              为减少隐私风险，我们拒绝以下行为：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>强制用户注册或绑定账号</li>
              <li>存储用户上传的原图或优化后的高清照片</li>
              <li>获取姓名、手机号等个人身份信息</li>
              <li>使用跟踪型Cookies（仅基础功能Cookies）</li>
              <li>向第三方分享、出售任何用户数据</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">3. 我们处理的数据</h2>
            <p className="mb-2">
              仅以下数据会在服务过程中临时处理：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>照片内容：上传需优化的图片（临时内存缓存）</li>
              <li>设备基础信息：设备型号、系统版本（用于优化处理效果）</li>
              <li>匿名使用统计：如功能使用频率、崩溃日志（无法关联到个人）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">4. 数据使用目的</h2>
            <p className="mb-2">
              所有数据仅用于：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>执行照片高清化、去模糊、画质修复等核心功能</li>
              <li>改进AI算法精度（如人脸细节优化、背景降噪）</li>
              <li>防范恶意攻击与系统滥用（如高频请求拦截）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">5. 数据保留政策</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>照片数据：处理完成后立即删除原图与高清结果，服务器不存副本</li>
              <li>日志信息：匿名统计数据保留≤30天，到期自动清除</li>
              <li>零数据库原则：不建立任何用户内容数据库</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">6. 安全防护</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>传输加密：使用SSL/TLS加密照片上传与下载通道</li>
              <li>临时存储隔离：处理中照片仅存于独立安全沙箱</li>
              <li>定期审计：每月进行系统漏洞扫描与渗透测试</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">7. 儿童隐私</h2>
            <p>
              本工具禁止13周岁以下儿童独立使用。若监护人发现误用，请联系我们强制删除相关数据。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">8. 政策更新</h2>
            <p>
              重大变更将通过应用内弹窗或官网公告告知，历史版本可在此页面底部查阅。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">9. 用户权利</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>实时控制权：处理过程中可随时终止并删除任务</li>
              <li>数据追溯：可通过962900862@qq.com申请核查30天内匿名日志</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">10. 联系我们</h2>
            <p>
              隐私疑问或紧急申诉，请邮件至：962900862@qq.com（48小时内响应）
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">11. 法律依据</h2>
            <p>
              数据处理遵循《网络安全法》《个人信息保护法》，基于履行服务合同与改进产品必要性的合法前提。
            </p>
          </section>
        </div>
        
        <footer className="py-6 text-center text-gray-400 text-sm bg-gray-900">
          <div className="container mx-auto">
            <p>最后更新日期：2025年1月1日</p>
          </div>
        </footer>
      </div>
    </div>
  );
} 