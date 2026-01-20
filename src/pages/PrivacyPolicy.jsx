import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-right">سياسة الخصوصية</h1>
      <div className="space-y-4 text-right">
        <p>
          نحن نأخذ خصوصيتك على محمل الجد. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.
        </p>
        <h2 className="text-xl font-semibold">المعلومات التي نجمعها</h2>
        <p>
          نقوم بجمع المعلومات التي تقدمها عند التسجيل، مثل اسمك وعنوان بريدك الإلكتروني. نقوم أيضًا بجمع بيانات حول استخدامك للمنصة، مثل الاختبارات التي تجريها ونتائجك.
        </p>
        <h2 className="text-xl font-semibold">كيف نستخدم معلوماتك</h2>
        <p>
          نستخدم معلوماتك لتخصيص تجربتك التعليمية، وتزويدك بالنتائج والملاحظات، وتحسين خدماتنا. نحن لا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
