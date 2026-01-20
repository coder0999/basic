import React from 'react';
import AnimatedPage from '../components/AnimatedPage';

const AboutUs = () => {
  return (
    <AnimatedPage>
      <div className="p-4 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-right">من نحن</h1>
        <div className="space-y-4 text-right">
          <p>
            مرحبًا بكم في منصتنا. نحن فريق من المطورين والمعلمين المتحمسين الذين يهدفون إلى توفير أفضل الأدوات التعليمية للطلاب والمعلمين.
          </p>
          <p>
            مهمتنا هي جعل التعليم متاحًا وجذابًا للجميع. نحن نؤمن بقوة التكنولوجيا في تحويل عملية التعلم ومساعدة الطلاب على تحقيق إمكاناتهم الكاملة.
          </p>
          <p>
            تم تصميم منصتنا لتكون سهلة الاستخدام وتفاعلية، مع مجموعة واسعة من الاختبارات والمواد التعليمية التي تغطي مختلف المواد والمستويات.
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default AboutUs;
