import React from 'react'

const AdditionalFeatures = ({type, onSelectFeature}) => {
    const landFeaturesAr = [
    "كمبوند",
    "شارع رئيسي",
    "ناصية شارع رءيسي",
    "اطلالة حديقة",
    "اطلالة ساحة فناء",
    "منطقة صناعات",
    "عداد مياه",
    "عداد كهرباء",
    "انترنت",
    "منطقة خدمات",
    ];
    const industrialFeaturesAr = [
    "كمبوند",
    "شارع رئيسي",
    "ناصية شارع رءيسي",
    "اطلالة حديقة",
    "اطلالة ساحة فناء",
    "منطقة صناعات",
    "عداد مياه",
    "عداد كهرباء",
    "انترنت",
    "منطقة خدمات",
    ];
    const commercialFeaturesAr = [
    "واجهة زجاجية",
    "دش مركزي",
    "مول تجاري",
    "مول اداري",
    "انترنت",
    "مداخل رخام",
    "بلكونة",
    "انظمة اضاءة حديثة",
    "انترنت",
    "كاميرات مراقبة",
    "اسانسير",
    "امن وحراسة",
    "جراج",
    "مبني طبي فقط",
    "منطقة صناعات",
    "اجهزة المطبخ",
    "اطلالة علي مساحات خضراء",
    "امن وحراسة",
    "ناصية شارع",
    ];
    const residentialFeaturesAr = [
    "كمبوند",
    "حمام سباحة",
    "وحدة تخزين",
    "شارع رئيسي",
    "ناصية شارع رءيسي",
    "اطلالة حديقة",
    "اطلالة ساحة واسعة",
    "منطقة صناعات",
    "واجهة كلاسيكية",
    "مداخل رخام",
    "جراج",
    "انترنت",
    "امن وحراسة",
    "كاميرات مراقبة",
    "بلكونة",
    "اسانسيبر",
    "تكييف وتدفئة",
    "جيم",
    "اجهزة المطبخ",
    "دش مركزي",
    "مساحات خضراء",
    "مسطحات مائية",
    "انظمة اضاءة حديثة",
    "منزل ذكي",
    "منطقة ؟؟؟ وترفيه",
    "؟؟؟؟ كمبوند",
    ];
    

    
  let currentFeatures = [];

  if (type === 'house' || type === 'villa' || type === 'apartment') {
    currentFeatures = residentialFeaturesAr;
  } else if (type === 'industrial') {
    currentFeatures = industrialFeaturesAr;
  } else if (type === 'commercial') {
    currentFeatures = commercialFeaturesAr;
  } else if (type === 'land') {
    currentFeatures = landFeaturesAr;
  }

  return <div className="additional-features">
    <ul>
      {currentFeatures.map((e, i)=> {
        return <li key={i}>
          <input 
          type="checkbox"
          onChange={(event) => {
            onSelectFeature(event.target, e);
          }}
          name={`feature${i+2}`}
          id={e}
          value={e}/>
          <label htmlFor={e}>{e}</label>
          </li>
      })}
    </ul>
    {/* <button>
        تطبيق
    </button> */}
    </div>
}

export default AdditionalFeatures;