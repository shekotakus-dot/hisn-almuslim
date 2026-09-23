import React, {useEffect, useMemo, useRef, useState} from "react";
import { createRoot } from "react-dom/client";
import {
  Sun, Moon, RotateCcw, Volume2, VolumeX, Smartphone, Settings,
  ChevronRight, ChevronLeft, BookOpen, Heart, Check, Sparkles, Compass,
  Award, Layers, ArrowRight, Maximize2, Minimize2, Share2, Info,
  Search, Home, BedDouble, HandHeart, X, Play, Pause
} from "lucide-react";
import "./index.css";

const AYA_KURSI =
"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ";

const DATA = {
  morning:{
    title:"أذكار الصباح", icon:Sun, subtitle:"ورد ثابت من الأذكار الواردة عن النبي ﷺ",
    items:[
      {id:"m1",text:AYA_KURSI,count:1,source:"القرآن الكريم — البقرة 255",note:"ورد ذكرها في أذكار الصباح والمساء في حصن المسلم."},
      {id:"m2",text:"قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",count:3,source:"أبو داود 5082، والترمذي 3575",note:"تُقرأ مع الفلق والناس ثلاث مرات صباحًا ومساءً."},
      {id:"m3",text:"قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",count:3,source:"أبو داود 5082، والترمذي 3575",note:"تُقرأ مع الإخلاص والناس ثلاث مرات صباحًا ومساءً."},
      {id:"m4",text:"قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",count:3,source:"أبو داود 5082، والترمذي 3575",note:"تُقرأ مع الإخلاص والفلق ثلاث مرات صباحًا ومساءً."},
      {id:"m5",text:"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ. رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",count:1,source:"صحيح مسلم 2723",note:"وفي المساء يُقال: أمسينا وأمسى الملك لله..."}
      ,
      {id:"m6",text:"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",count:1,source:"صحيح البخاري 6306",note:"سيد الاستغفار."},
      {id:"m7",text:"رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",count:3,source:"أبو داود 5072، الترمذي 3389",note:"ثلاث مرات صباحًا ومساءً."},
      {id:"m8",text:"اللَّهُمَّ إِنِّي أَصْبَحْتُ أُشْهِدُكَ، وَأُشْهِدُ حَمَلَةَ عَرْشِكَ، وَمَلَائِكَتَكَ وَجَمِيعَ خَلْقِكَ، أَنَّكَ أَنْتَ اللَّهُ لَا إِلَهَ إِلَّا أَنْتَ وَحْدَكَ لَا شَرِيكَ لَكَ، وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",count:4,source:"أبو داود 5069",note:"هذا الذكر له طرق، ويُدرج هنا مع التنبيه إلى أن أهل العلم اختلفوا في تصحيحه."},
      {id:"m9",text:"بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",count:3,source:"أبو داود 5088، الترمذي 3388",note:"ثلاث مرات صباحًا ومساءً؛ حسنه/صححه أهل العلم."},
      {id:"m10",text:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",count:100,source:"صحيح مسلم 2692",note:"من قالها مائة مرة في الصباح والمساء لم يأت أحد يوم القيامة بأفضل مما جاء به إلا من قال مثل ذلك أو زاد عليه."},
      {id:"m11",text:"اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ، فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",count:1,source:"أبو داود 5073",note:"وفي المساء: اللهم ما أمسى بي من نعمة..."},
      {id:"m12",text:"يَا حَيُّ يَا قَيُّومُ، بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",count:1,source:"النسائي في السنن الكبرى 10405، وحسنه عدد من أهل العلم",note:"دعاء ثابت في الجملة، مع اختلاف أهل العلم في بعض طرقه."}
    ]
  },
  evening:{
    title:"أذكار المساء", icon:Moon, subtitle:"ورد المساء مع ضبط صيغ الصباح والمساء",
    items:[]
  },
  sleep:{
    title:"أذكار النوم", icon:BedDouble, subtitle:"أذكار صحيحة قبل النوم",
    items:[
      {id:"s1",text:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",count:1,source:"صحيح البخاري 6324",note:"عند النوم."},
      {id:"s2",text:"اللَّهُمَّ أَسْلَمْتُ وَجْهِيَ إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",count:1,source:"صحيح البخاري 6313، صحيح مسلم 2710",note:"ثم إن مات من ليلته مات على الفطرة."},
      {id:"s3",text:"اجْمَعْ كَفَّيْكَ، فَانْفُثْ فِيهِمَا، فَاقْرَأْ: قُلْ هُوَ اللَّهُ أَحَدٌ، وَقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، وَقُلْ أَعُوذُ بِرَبِّ النَّاسِ، ثُمَّ امْسَحْ بِهِمَا مَا اسْتَطَعْتَ مِنْ جَسَدِكَ",count:3,source:"صحيح البخاري 5017",note:"يُقرأ كل منها ثم يُمسح بهما الجسد."},
      {id:"s4",text:AYA_KURSI,count:1,source:"البقرة 255، وأثر في فضل قراءتها عند النوم",note:"آية الكرسي قبل النوم."},
      {id:"s5",text:"سُبْحَانَ اللَّهِ",count:33,source:"صحيح البخاري 6318، صحيح مسلم 2727",note:"مع الحمد لله 33، والله أكبر 34 عند النوم."},
      {id:"s6",text:"الْحَمْدُ لِلَّهِ",count:33,source:"صحيح البخاري 6318، صحيح مسلم 2727",note:"مع التسبيح 33 والتكبير 34."},
      {id:"s7",text:"اللَّهُ أَكْبَرُ",count:34,source:"صحيح البخاري 6318، صحيح مسلم 2727",note:"المجموع 100."}
    ]
  },
  prayer:{
    title:"أذكار بعد الصلاة", icon:HandHeart, subtitle:"أذكار واردة بعد الفرائض",
    items:[
      {id:"p1",text:"أَسْتَغْفِرُ اللَّهَ",count:3,source:"صحيح مسلم 591",note:"ثلاث مرات بعد الصلاة."},
      {id:"p2",text:"اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",count:1,source:"صحيح مسلم 592",note:"بعد السلام من الصلاة."},
      {id:"p3",text:"لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",count:1,source:"صحيح البخاري 6330، صحيح مسلم 593",note:"من الأذكار الثابتة بعد الصلاة."},
      {id:"p4",text:"سُبْحَانَ اللَّهِ",count:33,source:"صحيح مسلم 597",note:"مع الحمد لله 33 والله أكبر 33، ويُختم بـ: لا إله إلا الله وحده لا شريك له..."},
      {id:"p5",text:"الْحَمْدُ لِلَّهِ",count:33,source:"صحيح مسلم 597",note:"مع التسبيح والتكبير."},
      {id:"p6",text:"اللَّهُ أَكْبَرُ",count:33,source:"صحيح مسلم 597",note:"مع التسبيح والتحميد."}
    ]
  }
};

// Build evening from morning with correct substitutions.
DATA.evening.items = DATA.morning.items.map(x=>{
  const copy={...x,id:x.id.replace("m","e")};
  if(x.id==="m5") copy.text=x.text.replaceAll("أَصْبَحْنَا","أَمْسَيْنَا").replaceAll("أَصْبَحَ","أَمْسَى").replaceAll("هَذَا الْيَوْمِ","هَذِهِ اللَّيْلَةِ").replaceAll("هَذَا الْيَوْمِ","هَذِهِ اللَّيْلَةِ");
  if(x.id==="m6") copy.note="سيد الاستغفار، ويقال في الصباح والمساء.";
  if(x.id==="m8") copy.text=x.text.replaceAll("أَصْبَحْتُ","أَمْسَيْتُ");
  if(x.id==="m11") copy.text=x.text.replaceAll("أَصْبَحَ","أَمْسَى");
  return copy;
});

const TABS=[
  ["home","الرئيسية",Home],["morning","الصباح",Sun],["evening","المساء",Moon],
  ["sleep","النوم",BedDouble],["prayer","بعد الصلاة",HandHeart]
];

function useStored(key, fallback){
  const [v,setV]=useState(()=>{
    try{const x=localStorage.getItem(key); return x?JSON.parse(x):fallback}catch{return fallback}
  });
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(v))}catch{}},[key,v]);
  return [v,setV];
}

function App(){
  const [tab,setTab]=useState("home");
  const [dark,setDark]=useStored("dark",false);
  const [sound,setSound]=useStored("sound",true);
  const [vibrate,setVibrate]=useStored("vibrate",true);
  const [favorites,setFavorites]=useStored("favorites",[]);
  const [progress,setProgress]=useStored("progress",{});
  const [search,setSearch]=useState("");
  const [full,setFull]=useState(false);
  const [showSettings,setShowSettings]=useState(false);
  const [showInfo,setShowInfo]=useState(false);
  const [font,setFont]=useStored("font","normal");

  useEffect(()=>{document.documentElement.classList.toggle("dark",dark)},[dark]);

  const speak=(text)=>{
    if(!sound || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="ar-SA"; u.rate=.82; u.pitch=1;
    window.speechSynthesis.speak(u);
  };

  const tap=(item)=>{
    const current=progress[item.id]||0;
    const next=current+1;
    const capped=Math.min(next,item.count);
    setProgress({...progress,[item.id]:capped});
    if(vibrate && navigator.vibrate) navigator.vibrate(capped===item.count?[30,40,60]:20);
    speak(item.text);
  };

  const resetItem=(id)=>setProgress({...progress,[id]:0});
  const toggleFav=(id)=>setFavorites(favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id]);

  const totalDone=Object.values(progress).reduce((a,b)=>a+b,0);
  const current=DATA[tab];

  const filteredItems=useMemo(()=>{
    if(!current?.items)return [];
    const q=search.trim();
    return q?current.items.filter(x=>(x.text+x.source+x.note).includes(q)):current.items;
  },[current,search]);

  const share=async(item)=>{
    const txt=`${item.text}\n\nالمصدر: ${item.source}`;
    if(navigator.share){try{await navigator.share({title:"ذكر من السنة",text:txt})}catch{}}
    else {await navigator.clipboard?.writeText(txt); alert("تم نسخ الذكر.");}
  };

  return <div className={`app font-${font} ${full?"fullscreen":""}`}>
    <header className="topbar">
      <div className="brand" onClick={()=>setTab("home")}>
        <div className="brandIcon"><Sparkles size={20}/></div>
        <div><b>حصن المسلم</b><small>أذكار من السنة</small></div>
      </div>
      <div className="topActions">
        <button onClick={()=>setSound(!sound)} title="الصوت">{sound?<Volume2/>:<VolumeX/>}</button>
        <button onClick={()=>setDark(!dark)} title="الوضع الليلي">{dark?<Sun/>:<Moon/>}</button>
        <button onClick={()=>setFull(!full)} title="ملء الشاشة">{full?<Minimize2/>:<Maximize2/>}</button>
        <button onClick={()=>setShowSettings(true)} title="الإعدادات"><Settings/></button>
      </div>
    </header>

    <main>
      {tab==="home" ? <HomeView setTab={setTab} totalDone={totalDone} progress={progress}/> :
       <DhikrView tab={tab} data={current} items={filteredItems} search={search} setSearch={setSearch}
         progress={progress} tap={tap} resetItem={resetItem} favorites={favorites}
         toggleFav={toggleFav} share={share}/>}
    </main>

    <nav className="bottomNav">
      {TABS.map(([id,label,Icon])=><button key={id} className={tab===id?"active":""} onClick={()=>{setTab(id);setSearch("")}}>
        <Icon/><span>{label}</span>
      </button>)}
    </nav>

    {showSettings && <Modal title="الإعدادات" close={()=>setShowSettings(false)}>
      <SettingRow icon={<Volume2/>} title="النطق الصوتي" desc="نطق الذكر عند الضغط">
        <Toggle on={sound} set={setSound}/>
      </SettingRow>
      <SettingRow icon={<Smartphone/>} title="الاهتزاز" desc="اهتزاز خفيف مع العداد">
        <Toggle on={vibrate} set={setVibrate}/>
      </SettingRow>
      <SettingRow icon={dark?<Sun/>:<Moon/>} title="الوضع الليلي" desc="مظهر مريح للعين">
        <Toggle on={dark} set={setDark}/>
      </SettingRow>
      <div className="fontPicker"><b>حجم الخط</b><div>
        {["small","normal","large"].map(x=><button className={font===x?"selected":""} onClick={()=>setFont(x)} key={x}>{x==="small"?"صغير":x==="normal"?"متوسط":"كبير"}</button>)}
      </div></div>
      <button className="aboutBtn" onClick={()=>{setShowSettings(false);setShowInfo(true)}}><Info/> حول التطبيق</button>
    </Modal>}

    {showInfo && <Modal title="حول التطبيق" close={()=>setShowInfo(false)}>
      <div className="infoText">
        <h3>حصن المسلم</h3>
        <p>تطبيق بسيط للذكر، صُمم ليعمل على الهاتف والويب، مع حفظ التقدم والمفضلة محليًا على جهازك.</p>
        <p><b>تنبيه علمي:</b> عبارات الأذكار ليست كلها في درجة واحدة من التصحيح؛ لذلك يظهر مصدر كل ذكر، وبعض الأذكار يُشار صراحةً إلى وجود خلاف في تصحيح طرقها.</p>
        <p>هذا التطبيق ليس فتوى، ويُنصح بالرجوع إلى أهل العلم عند الحاجة.</p>
      </div>
    </Modal>}
  </div>
}

function HomeView({setTab,totalDone,progress}){
  return <div className="home">
    <section className="hero">
      <div className="heroGlow"></div>
      <div className="heroContent">
        <span className="badge"><Sparkles size={14}/> وردك اليومي</span>
        <h1>اذكر الله…<br/><span>تطمئن القلوب</span></h1>
        <p>أذكار وأدعية مأثورة مع عدّاد ذكي، مصادر الحديث، والمفضلة.</p>
        <button className="primary" onClick={()=>setTab("morning")}><Sun/> ابدأ أذكار الصباح <ArrowRight/></button>
      </div>
      <div className="heroOrb"><Heart fill="currentColor"/></div>
    </section>

    <div className="stats">
      <div><Award/><b>{totalDone}</b><span>تسبيحات اليوم</span></div>
      <div><Layers/><b>{Object.keys(progress).length}</b><span>أذكار بدأت بها</span></div>
      <div><Check/><b>✓</b><span>احفظ تقدمك تلقائيًا</span></div>
    </div>

    <h2>الأوراد</h2>
    <div className="cards">
      <HomeCard icon={<Sun/>} title="أذكار الصباح" desc="بداية يومك بذكر الله" onClick={()=>setTab("morning")} />
      <HomeCard icon={<Moon/>} title="أذكار المساء" desc="سكينة وحفظ في المساء" onClick={()=>setTab("evening")} />
      <HomeCard icon={<BedDouble/>} title="أذكار النوم" desc="اختم يومك بالسنة" onClick={()=>setTab("sleep")} />
      <HomeCard icon={<HandHeart/>} title="بعد الصلاة" desc="أذكار ثابتة بعد الفرائض" onClick={()=>setTab("prayer")} />
    </div>

    <div className="tip"><BookOpen/><div><b>معلومة</b><p>يمكنك الضغط على الذكر لزيادة العداد، والضغط على القلب لحفظه في المفضلة.</p></div></div>
  </div>
}

function HomeCard({icon,title,desc,onClick}){return <button className="homeCard" onClick={onClick}><div className="cardIcon">{icon}</div><div><b>{title}</b><span>{desc}</span></div><ChevronLeft/></button>}

function DhikrView({data,items,search,setSearch,progress,tap,resetItem,favorites,toggleFav,share}){
  const Icon=data.icon;
  const done=items.filter(i=>(progress[i.id]||0)>=i.count).length;
  return <div className="dhikrPage">
    <section className="pageHead">
      <div className="pageIcon"><Icon/></div>
      <div><span className="eyebrow">ورد اليوم</span><h1>{data.title}</h1><p>{data.subtitle}</p></div>
      <div className="completion"><b>{done}/{items.length}</b><span>مكتمل</span></div>
    </section>

    <div className="toolbar">
      <div className="search"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="ابحث داخل الأذكار..."/></div>
      <button className="toolBtn" onClick={()=>{setSearch("")}}><RotateCcw/> إعادة البحث</button>
    </div>

    <div className="cardsList">
      {items.map(item=><DhikrCard key={item.id} item={item} value={progress[item.id]||0}
        tap={tap} reset={resetItem} favorite={favorites.includes(item.id)} toggleFav={toggleFav} share={share}/>)}
    </div>
  </div>
}

function DhikrCard({item,value,tap,reset,favorite,toggleFav,share}){
  const done=value>=item.count;
  return <article className={`dhikrCard ${done?"done":""}`}>
    <div className="cardTop"><span className="countLabel">{item.count} مرة</span>
      <div className="actions"><button onClick={()=>toggleFav(item.id)} className={favorite?"fav active":"fav"}><Heart fill={favorite?"currentColor":"none"}/></button><button onClick={()=>share(item)}><Share2/></button></div>
    </div>
    <p className="dhikrText">{item.text}</p>
    <div className="source"><BookOpen/><span>{item.source}</span></div>
    {item.note&&<div className="note"><Info/><span>{item.note}</span></div>}
    <div className="counterRow">
      <button className="counter" onClick={()=>tap(item)} disabled={done}>
        {done?<><Check/> تمّ الذكر</>:<><span className="number">{value}</span><span>/ {item.count}</span><span className="tapHint">اضغط للتسبيح</span></>}
      </button>
      <button className="reset" onClick={()=>reset(item.id)} title="تصفير"><RotateCcw/></button>
    </div>
    <div className="bar"><i style={{width:`${Math.min(100,value/item.count*100)}%`}}/></div>
  </article>
}

function SettingRow({icon,title,desc,children}){return <div className="settingRow"><div className="setIcon">{icon}</div><div className="setText"><b>{title}</b><span>{desc}</span></div>{children}</div>}
function Toggle({on,set}){return <button className={`toggle ${on?"on":""}`} onClick={()=>set(!on)}><i/></button>}
function Modal({title,close,children}){return <div className="overlay" onMouseDown={close}><div className="modal" onMouseDown={e=>e.stopPropagation()}><div className="modalHead"><h2>{title}</h2><button onClick={close}><X/></button></div>{children}</div></div>}

createRoot(document.getElementById("root")).render(<App/>);
