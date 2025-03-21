import React from 'react';
import Link from 'next/link';

export default function Terms() {
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
        
        <h1 className="text-3xl font-bold mb-8 text-blue-400">服务条款</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">1. 接受条款</h2>
            <p>
              欢迎使用Photo Chat Pro（以下简称"服务"）。本服务条款（"条款"）是您与Photo Chat Pro之间就使用本服务达成的协议。使用我们的服务，即表示您同意本条款。如果您不同意本条款的任何部分，请勿使用本服务。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">2. 服务描述</h2>
            <p>
              Photo Chat Pro是一个基于浏览器的图片处理工具，专为优化和增强社交媒体分享的图片而设计。我们的服务使用浏览器端技术处理您的图片，提供高质量的输出结果，而无需将您的图片上传到我们的服务器。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">3. 使用条件</h2>
            <p className="mb-2">
              使用本服务需遵守以下条件：
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>您必须遵守所有适用的法律法规</li>
              <li>您不得使用本服务处理非法、淫秽、威胁、诽谤、骚扰、仇恨或其他不适当的内容</li>
              <li>您不得尝试破解、反向工程或以其他方式干扰服务的正常运行</li>
              <li>您不得使用自动化程序或脚本大量访问服务</li>
              <li>您必须尊重他人的知识产权</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">4. 用户内容</h2>
            <p>
              您通过本服务处理的图片内容仅在您的设备上处理，不会上传到我们的服务器。我们不会获取、存储或以任何方式使用您处理的图片。您对所有上传和处理的内容负有全部责任，并保证您拥有处理这些内容的合法权利。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">5. 知识产权</h2>
            <p>
              Photo Chat Pro及其所有内容、功能和特性（包括但不限于所有信息、软件、文本、显示、图像、视频和音频，以及其设计、选择和排列）均为我们或我们的许可方的财产，并受中国和国际版权、商标、专利、商业秘密和其他知识产权或专有权利法律的保护。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">6. 免责声明</h2>
            <p>
              本服务按"现状"和"可用"基础提供，不提供任何种类的明示或暗示保证。我们不保证服务将不间断、及时、安全或无错误，也不保证结果将准确或可靠。您使用本服务的风险完全由您自己承担。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">7. 责任限制</h2>
            <p>
              在任何情况下，Photo Chat Pro及其管理人员、董事、员工和代理人均不对任何间接、惩罚性、偶然、特殊、后果性或惩戒性损害负责，包括利润损失、商誉损失、数据损失或其他无形损失。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">8. 服务变更</h2>
            <p>
              我们保留在任何时候修改或终止服务（或其任何部分）的权利，无论是否事先通知。我们不对任何服务修改、价格变更、数据丢失或服务终止对您或任何第三方造成的任何损害负责。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">9. 条款变更</h2>
            <p>
              我们可能会不时修改本条款。如有重大变更，我们会在服务内或通过其他方式提供合理通知。继续使用本服务即表示您接受修改后的条款。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">10. 联系我们</h2>
            <p>
              如果您对本服务条款有任何疑问或建议，请发送电子邮件至：962900862@qq.com
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