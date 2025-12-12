import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  PartyPopper, 
  Target, 
  Utensils, 
  Mic2, 
  Gamepad2, 
  Gift, 
  Bus, 
  Wallet,
  FileText,
  Menu,
  X,
  Clock,
  Edit,
  Save,
  Plus,
  Video,
  Upload
} from 'lucide-react';
import { Section } from './components/Section';
import { TimelineEvent } from './components/TimelineEvent';
import { EditableField } from './components/EditableField';

interface ScheduleEvent {
  time: string;
  title: string;
  desc: string;
  image?: string;
  imageCaption?: string;
}

// Default Initial Data
const INITIAL_DATA = {
  hero: {
    title1: "2025年度人工智能与大数据学院",
    title2: "年终总结及团建活动策划书",
    badge: "Internal Document",
    subtitle1: "聚力同行 · 共创未来",
    subtitle2: "乘风破浪 · 龙腾2026"
  },
  overview: {
    time: "2025年12月19日（周五）\n- 12月20日（周六）",
    count: "约 150 人",
    countSub: "全院教职工",
    format: "年终总结大会晚宴 + 别墅群轰趴 \n+ 烧烤互动 + 休闲团建",
    location1: "周边高端别墅度假村",
    location2: "温泉度假庄园"
  },
  venue: {
    hotelLinkText: "酒店宴厅安排",
    hotelLinkUrl: "https://www.google.com/search?q=150人多功能宴会厅+酒店",
    hotelDesc: "需能容纳 150人以上 的多功能宴会厅，用于举办年终总结大会及晚宴。需具备良好的音响、投影设备及舞台区域。",
    hotelVideoUrl: "https://pan.baidu.com/pfile/video?from=home&path=%2F%E5%BE%AE%E4%BF%A1%E8%A7%86%E9%A2%912025-12-12_091149_147.mp4",
    villaLinkText: "住宿分布（别墅群）",
    villaLinkUrl: "https://www.jianpian.cn/a/11ylxi9w?sd=2&a_uid=&s_uid=24215703&package_type=&sc=groupmessage",
    villaDesc: "租下 6-8栋 相邻的大型独栋别墅，或者包下一个小型的民宿村。",
    villaNote: "间距确认： 别墅之间必须步行可达（3-5分钟内），最好有内部道路相连，方便各部门串门和统一集合。"
  },
  schedule: {
    day1: {
      title: "总结复盘 & 狂欢之夜（12月19日 周五）",
      events: [
        { time: "14:00 - 14:30", title: "集合出发", desc: "第一波下午无课人员：大巴统一前往目的地别墅。" },
        { time: "15:30 - 17:30", title: "办理入住 & 自由参观", desc: "先准备好晚上烧烤/活动游乐等事先事宜！" },
        { time: "17:30 - 18:00", title: "第二波出发", desc: "校内&别墅区第二波出发：大巴出发到晚宴酒店。" },
        { time: "18:30 - 19:00", title: "晚宴酒店会场签到 & 暖场", desc: "拍摄大合照。" },
        { 
          time: "19:00 - 19:30", 
          title: "2025年度年终总结大会（核心环节）", 
          desc: "领导致辞。\n各教研室主任汇报：简短精炼（PPT展示）。\n 领导总结2026年目标期望。",
          image: "https://picsum.photos/800/400?random=1",
          imageCaption: "[配图示意：宽敞明亮的会议厅，前方投影幕布，下方整齐排列120个座位]"
        },
        { 
          time: "19:30 - 21:00", 
          title: "年终晚宴 & 互动游戏（高潮环节）", 
          desc: "形式：宴会厅圆桌餐。\n内容：穿插抽奖、小游戏、部门才艺表演（详见第四部分）。"
        },
        { 
          time: "21:00 - 24:00", 
          title: "别墅自由轰趴", 
          desc: "回到各栋别墅。\nA栋：KTV争霸 + 自动麻将机\nB栋：狼人杀 / 掼蛋扑克 / 剧本杀局\nC栋：深夜食堂（烧烤、啤酒、聊天）",
          image: "https://picsum.photos/800/400?random=2",
          imageCaption: "[配图示意：别墅庭院夜景，灯光温馨，同事们举杯畅饮]"
        },
      ] as ScheduleEvent[]
    },
    day2: {
      title: "团队融合 & 休闲返程（12月20日 周六）",
      events: [
        { time: "08:30 - 09:30", title: "早餐", desc: "别墅送餐。" },
        { time: "09:30 - 11:30", title: "户外趣味轻团建（草坪/广场）", desc: "目的：醒脑、活跃气氛、增进跨部门交流。\n项目：飞盘嘉年华、旱地冰壶 或 简单的拔河比赛。" },
        { time: "12:00", title: "返程", desc: "大巴返回公司，活动圆满结束。" }
      ] as ScheduleEvent[]
    }
  },
  games: [
    { title: "暖场破冰：手机号码大乐透", timing: "会议中场 / 晚宴开场", rule: "大屏幕滚动数字，领导喊停。显示的手机号即为中奖者。", pros: "简单粗暴，全员参与，无需离开座位。" },
    { title: "团队游戏：疯狂抖抖乐", timing: "晚宴进行时", rule: "选几名代表，腰上绑一个装满乒乓球的盒子（盒子有孔），随着音乐疯狂抖动身体，谁先抖完谁获胜。", pros: "视觉效果极度滑稽，能瞬间引爆全场笑点。", image: "https://picsum.photos/800/400?random=3", imageCaption: "[配图示意：晚宴现场，员工在台上进行趣味游戏，台下哄堂大笑]" },
    { title: "互动游戏：你划我猜", rule: "题目设置为我们上课的课程名字。", pros: "结合学院课程文化，更有共鸣。" }
  ],
  prizes: {
    grand: { title: "特等奖 (1名)", item: "养生壶" },
    first: { title: "一等奖 (3名)", item: "电动牙刷" },
    second: { title: "二等奖 (10名)", item: "漱口水" },
    third: { title: "三等奖 (20名)", item: "牙线/零食" },
    sunshine: { title: "阳光普照奖", item: "工会礼品（回校领取）" }
  },
  logistics: {
    materials: [
      { cat: "会务类", items: "横幅（主题）、席卡、签到笔、PPT翻页笔、投影设备调试。" },
      { cat: "氛围类", items: "气球、手举牌（“我在学院很想你”、“上课要紧”等）、荧光棒。" },
      { cat: "食品类", items: "别墅内的酒水饮料、零食、水果盘（需提前采购运送）。" },
      { cat: "奖品类", items: "提前采购并包装好。" }
    ],
    budget: [
      { item: "交通", detail: "大巴车3辆（往返）" },
      { item: "住宿", detail: "包栋费用（含会议室租金）" },
      { item: "餐饮", detail: "1正1早（含晚宴酒水）" },
      { item: "团建", detail: "教练费、道具费、保险费" },
      { item: "奖品", detail: "约占总预算 20%-30%" },
      { item: "杂费", detail: "备用金" }
    ]
  }
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Content State
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(INITIAL_DATA);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem('event_plan_data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Deep merge for nested objects to allow schema updates
        setData({ 
          ...INITIAL_DATA, 
          ...parsed,
          venue: { ...INITIAL_DATA.venue, ...(parsed.venue || {}) },
          hero: { ...INITIAL_DATA.hero, ...(parsed.hero || {}) },
          overview: { ...INITIAL_DATA.overview, ...(parsed.overview || {}) },
        });
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const saveData = () => {
    localStorage.setItem('event_plan_data', JSON.stringify(data));
    setIsEditing(false);
  };

  const updateData = (section: keyof typeof INITIAL_DATA, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addEvent = (day: 'day1' | 'day2') => {
    const newEvent: ScheduleEvent = {
      time: "00:00 - 00:00",
      title: "New Event",
      desc: "Description here..."
    };
    setData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          events: [...prev.schedule[day].events, newEvent]
        }
      }
    }));
  };

  const deleteEvent = (day: 'day1' | 'day2', index: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setData(prev => {
        const newEvents = [...prev.schedule[day].events];
        newEvents.splice(index, 1);
        return {
          ...prev,
          schedule: {
            ...prev.schedule,
            [day]: {
              ...prev.schedule[day],
              events: newEvents
            }
          }
        };
      });
    }
  };

  const navItems = [
    { id: 'overview', label: '活动概况' },
    { id: 'venue', label: '场地选址' },
    { id: 'schedule', label: '行程安排' },
    { id: 'games', label: '晚宴互动' },
    { id: 'logistics', label: '物料预算' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(item.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Floating Edit Button */}
      <button 
        onClick={() => isEditing ? saveData() : setIsEditing(true)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center gap-2 ${
          isEditing ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-bold`}
        title={isEditing ? "Save Changes" : "Edit Content"}
      >
        {isEditing ? (
          <>
            <Save size={24} />
            <span className="hidden md:inline">Save Changes</span>
          </>
        ) : (
          <>
            <Edit size={24} />
            <span className="hidden md:inline">Edit Plan</span>
          </>
        )}
      </button>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <FileText className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 text-lg hidden md:block">人工智能与大数据学院</span>
              <span className="font-bold text-slate-800 text-lg md:hidden">AI & Big Data</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSection === item.id 
                      ? 'bg-blue-100 text-blue-700 shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-2 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-6 py-3 text-sm font-medium ${
                  activeSection === item.id 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-4 text-center bg-gradient-to-b from-slate-900 to-indigo-900 text-white mb-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto z-10">
          <div className="inline-block bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-1.5 mb-6">
             <EditableField 
               value={data.hero.badge} 
               isEditing={isEditing} 
               onSave={(val) => updateData('hero', 'badge', val)} 
               className="text-blue-200 font-semibold tracking-wider text-xs uppercase bg-transparent text-center border-blue-300/50"
             />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
             <EditableField 
               value={data.hero.title1} 
               isEditing={isEditing} 
               onSave={(val) => updateData('hero', 'title1', val)} 
               className="bg-transparent text-center border-white/30"
             />
             <div className="h-2"></div>
             <EditableField 
               value={data.hero.title2} 
               isEditing={isEditing} 
               onSave={(val) => updateData('hero', 'title2', val)} 
               className="bg-transparent text-center border-white/30"
             />
          </h1>
          <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <Target className="text-amber-400" />
              <span className="font-semibold text-lg">
                <EditableField 
                  value={data.hero.subtitle1} 
                  isEditing={isEditing} 
                  onSave={(val) => updateData('hero', 'subtitle1', val)} 
                  className="bg-transparent border-white/30"
                />
              </span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <PartyPopper className="text-amber-400" />
              <span className="font-semibold text-lg">
                <EditableField 
                  value={data.hero.subtitle2} 
                  isEditing={isEditing} 
                  onSave={(val) => updateData('hero', 'subtitle2', val)} 
                  className="bg-transparent border-white/30"
                />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4">

        {/* Section 1: Overview */}
        <Section id="overview" title="一、 活动概况" icon={<CalendarDays />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <CalendarDays />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">活动时间</h3>
              <div className="text-sm text-slate-600 w-full">
                <EditableField 
                  value={data.overview.time} 
                  isEditing={isEditing} 
                  onSave={(val) => updateData('overview', 'time', val)}
                  multiline={true}
                  className="text-center"
                />
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                <Users />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">活动人数</h3>
              <div className="text-sm text-slate-600 w-full">
                 <EditableField 
                    value={data.overview.count} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('overview', 'count', val)}
                    className="text-center"
                  />
              </div>
              <div className="text-xs text-slate-400 mt-1 w-full">
                 <EditableField 
                    value={data.overview.countSub} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('overview', 'countSub', val)}
                    className="text-center"
                  />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                <PartyPopper />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">活动形式</h3>
              <div className="text-xs text-slate-600 leading-tight mt-1 w-full">
                <EditableField 
                  value={data.overview.format} 
                  isEditing={isEditing} 
                  onSave={(val) => updateData('overview', 'format', val)}
                  multiline={true}
                  className="text-center"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
                <MapPin />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">活动地点</h3>
              <div className="text-sm text-slate-600 w-full">
                 <EditableField 
                    value={data.overview.location1} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('overview', 'location1', val)}
                    className="text-center"
                  />
                 <EditableField 
                    value={data.overview.location2} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('overview', 'location2', val)}
                    className="text-center"
                  />
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: Venue Criteria */}
        <Section id="venue" title="二、 场地选址标准" icon={<MapPin />}>
          <div className="space-y-6">
            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
              <div className="mt-1 min-w-[24px]">
                <Utensils className="text-blue-600" size={24} />
              </div>
              <div className="w-full">
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                      <EditableField 
                        value={data.venue.hotelLinkText} 
                        isEditing={isEditing} 
                        onSave={(val) => updateData('venue', 'hotelLinkText', val)}
                        placeholder="Link Text"
                      />
                      <input 
                         value={data.venue.hotelLinkUrl} 
                         onChange={(e) => updateData('venue', 'hotelLinkUrl', e.target.value)}
                         className="text-xs p-2 border border-blue-300 rounded text-slate-500 w-full" 
                         placeholder="Link URL"
                      />
                    </div>
                  ) : (
                    <a href={data.venue.hotelLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline decoration-blue-300 decoration-2 underline-offset-4">
                      {data.venue.hotelLinkText}
                    </a>
                  )}
                </h3>
                <div className="text-slate-600">
                  <EditableField 
                    value={data.venue.hotelDesc} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('venue', 'hotelDesc', val)}
                    multiline={true}
                  />
                </div>

                {/* Video Section */}
                <div className="mt-4">
                  {isEditing ? (
                    <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2">
                          <Video size={14} /> Video URL
                        </div>
                        <input 
                           value={data.venue.hotelVideoUrl || ''}
                           onChange={(e) => updateData('venue', 'hotelVideoUrl', e.target.value)}
                           className="w-full text-xs p-2 border border-blue-300 rounded text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-blue-500" 
                           placeholder="Paste video URL here (e.g. .mp4 link)..."
                        />
                      </div>
                      
                      <div className="relative">
                         <div className="flex items-center gap-2 text-xs font-bold text-blue-600 mb-2">
                           <Upload size={14} /> Or upload local video
                         </div>
                         <input 
                            type="file" 
                            accept="video/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const url = URL.createObjectURL(file);
                                updateData('venue', 'hotelVideoUrl', url);
                              }
                            }}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                         />
                         <p className="text-[10px] text-slate-400 mt-1 italic">* Local uploads work for this session only.</p>
                      </div>
                    </div>
                  ) : data.venue.hotelVideoUrl ? (
                    <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 mt-2 bg-slate-900">
                       <video controls className="w-full aspect-video object-cover" key={data.venue.hotelVideoUrl}>
                          <source src={data.venue.hotelVideoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                       </video>
                    </div>
                  ) : null}
                 </div>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-lg border-l-4 border-indigo-500">
              <div className="mt-1 min-w-[24px]">
                <div className="bg-indigo-100 p-1 rounded">
                   <Users className="text-indigo-600" size={16} />
                </div>
              </div>
              <div className="w-full">
                <h3 className="font-bold text-lg text-slate-800 mb-2">
                   {isEditing ? (
                    <div className="flex flex-col gap-2">
                      <EditableField 
                        value={data.venue.villaLinkText} 
                        isEditing={isEditing} 
                        onSave={(val) => updateData('venue', 'villaLinkText', val)}
                        placeholder="Link Text"
                      />
                      <input 
                         value={data.venue.villaLinkUrl} 
                         onChange={(e) => updateData('venue', 'villaLinkUrl', e.target.value)}
                         className="text-xs p-2 border border-blue-300 rounded text-slate-500 w-full" 
                         placeholder="Link URL"
                      />
                    </div>
                  ) : (
                    <a href={data.venue.villaLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4">
                      {data.venue.villaLinkText}
                    </a>
                  )}
                </h3>
                <div className="text-slate-600 mb-3">
                  <EditableField 
                    value={data.venue.villaDesc} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('venue', 'villaDesc', val)}
                    multiline={true}
                  />
                </div>
                <div className="bg-white p-3 rounded border border-slate-200 text-sm text-slate-500">
                  <EditableField 
                    value={data.venue.villaNote} 
                    isEditing={isEditing} 
                    onSave={(val) => updateData('venue', 'villaNote', val)}
                    multiline={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 3: Schedule */}
        <Section id="schedule" title="三、 行程安排（两天一夜）" icon={<Clock />}>
          
          {/* Day 1 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow-md">
                第一天
              </div>
              <h3 className="text-xl font-bold text-slate-700 w-full">
                <EditableField 
                  value={data.schedule.day1.title} 
                  isEditing={isEditing} 
                  onSave={(val) => setData(prev => ({...prev, schedule: {...prev.schedule, day1: {...prev.schedule.day1, title: val}}}))}
                />
              </h3>
            </div>

            <div className="relative">
              {data.schedule.day1.events.map((event, index) => (
                <TimelineEvent 
                  key={index}
                  time={event.time}
                  title={event.title}
                  description={event.desc}
                  image={event.image}
                  imageCaption={event.imageCaption}
                  isLast={index === data.schedule.day1.events.length - 1}
                  isEditing={isEditing}
                  onUpdate={(field, val) => {
                     const newEvents = [...data.schedule.day1.events];
                     newEvents[index] = { ...newEvents[index], [field === 'description' ? 'desc' : field]: val };
                     setData(prev => ({...prev, schedule: {...prev.schedule, day1: {...prev.schedule.day1, events: newEvents}}}));
                  }}
                  onDelete={() => deleteEvent('day1', index)}
                />
              ))}
              {isEditing && (
                <button 
                  onClick={() => addEvent('day1')}
                  className="ml-8 md:ml-32 mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors border-2 border-dashed border-blue-200 hover:border-blue-400"
                >
                  <Plus size={20} /> Add Event
                </button>
              )}
            </div>
          </div>

          {/* Day 2 */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg shadow-md">
                第二天
              </div>
              <h3 className="text-xl font-bold text-slate-700 w-full">
                <EditableField 
                  value={data.schedule.day2.title} 
                  isEditing={isEditing} 
                  onSave={(val) => setData(prev => ({...prev, schedule: {...prev.schedule, day2: {...prev.schedule.day2, title: val}}}))}
                />
              </h3>
            </div>

            <div className="relative">
              {data.schedule.day2.events.map((event, index) => (
                <TimelineEvent 
                  key={index}
                  time={event.time}
                  title={event.title}
                  description={event.desc}
                  image={event.image}
                  imageCaption={event.imageCaption}
                  isLast={index === data.schedule.day2.events.length - 1}
                  isEditing={isEditing}
                  onUpdate={(field, val) => {
                     const newEvents = [...data.schedule.day2.events];
                     newEvents[index] = { ...newEvents[index], [field === 'description' ? 'desc' : field]: val };
                     setData(prev => ({...prev, schedule: {...prev.schedule, day2: {...prev.schedule.day2, events: newEvents}}}));
                  }}
                  onDelete={() => deleteEvent('day2', index)}
                />
              ))}
              {isEditing && (
                <button 
                  onClick={() => addEvent('day2')}
                  className="ml-8 md:ml-32 mt-4 flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors border-2 border-dashed border-emerald-200 hover:border-emerald-400"
                >
                  <Plus size={20} /> Add Event
                </button>
              )}
            </div>
          </div>
        </Section>

        {/* Section 4: Games */}
        <Section id="games" title="四、 晚宴互动及游戏方案" icon={<Gamepad2 />}>
          <p className="text-slate-600 mb-6 italic">为了避免枯燥，建议在总结大会中场休息及晚宴时穿插以下游戏：</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Game 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">01</div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Mic2 className="text-blue-500" size={20} />
                <EditableField 
                  value={data.games[0].title}
                  isEditing={isEditing}
                  onSave={(val) => {
                     const newGames = [...data.games];
                     newGames[0].title = val;
                     updateData('games', '', newGames);
                  }}
                />
              </h3>
              <div className="text-sm text-slate-600 space-y-2">
                <div>
                   <span className="font-semibold text-slate-900">时机：</span> 
                   <EditableField value={data.games[0].timing || ''} isEditing={isEditing} onSave={(val) => {const n = [...data.games]; n[0].timing = val; setData(p => ({...p, games: n}))}} />
                </div>
                <div>
                   <span className="font-semibold text-slate-900">规则：</span> 
                   <EditableField value={data.games[0].rule || ''} isEditing={isEditing} multiline onSave={(val) => {const n = [...data.games]; n[0].rule = val; setData(p => ({...p, games: n}))}} />
                </div>
                 <div>
                   <span className="font-semibold text-emerald-600">优点：</span> 
                   <EditableField value={data.games[0].pros || ''} isEditing={isEditing} multiline onSave={(val) => {const n = [...data.games]; n[0].pros = val; setData(p => ({...p, games: n}))}} />
                </div>
              </div>
            </div>

             {/* Game 2 */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group md:col-span-2">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">02</div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Users className="text-pink-500" size={20} />
                <EditableField 
                  value={data.games[1].title}
                  isEditing={isEditing}
                  onSave={(val) => {
                     const newGames = [...data.games];
                     newGames[1].title = val;
                     updateData('games', '', newGames);
                  }}
                />
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-sm text-slate-600 space-y-2">
                  <div>
                    <span className="font-semibold text-slate-900">时机：</span>
                    <EditableField value={data.games[1].timing || ''} isEditing={isEditing} onSave={(val) => {const n = [...data.games]; n[1].timing = val; setData(p => ({...p, games: n}))}} />
                  </div>
                   <div>
                    <span className="font-semibold text-slate-900">规则：</span>
                    <EditableField value={data.games[1].rule || ''} isEditing={isEditing} multiline onSave={(val) => {const n = [...data.games]; n[1].rule = val; setData(p => ({...p, games: n}))}} />
                  </div>
                   <div>
                    <span className="font-semibold text-emerald-600">优点：</span>
                    <EditableField value={data.games[1].pros || ''} isEditing={isEditing} multiline onSave={(val) => {const n = [...data.games]; n[1].pros = val; setData(p => ({...p, games: n}))}} />
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden h-40 md:h-auto relative bg-slate-100">
                  {isEditing && (
                     <div className="absolute top-2 left-2 right-2 z-10">
                        <input 
                           value={data.games[1].image || ''}
                           onChange={(e) => {const n = [...data.games]; n[1].image = e.target.value; setData(p => ({...p, games: n}))}}
                           className="w-full text-xs p-1 border rounded opacity-90"
                           placeholder="Game Image URL"
                        />
                     </div>
                  )}
                   <img src={data.games[1].image} alt="Game" className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center">
                       <EditableField value={data.games[1].imageCaption || ''} isEditing={isEditing} onSave={(val) => {const n = [...data.games]; n[1].imageCaption = val; setData(p => ({...p, games: n}))}} />
                   </div>
                </div>
              </div>
            </div>

             {/* Game 3 */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">03</div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Menu className="text-indigo-500" size={20} />
                <EditableField 
                  value={data.games[2].title}
                  isEditing={isEditing}
                  onSave={(val) => {
                     const newGames = [...data.games];
                     newGames[2].title = val;
                     updateData('games', '', newGames);
                  }}
                />
              </h3>
              <div className="text-sm text-slate-600 space-y-2">
                 <div>
                    <span className="font-semibold text-slate-900">规则：</span>
                    <EditableField value={data.games[2].rule || ''} isEditing={isEditing} multiline onSave={(val) => {const n = [...data.games]; n[2].rule = val; setData(p => ({...p, games: n}))}} />
                  </div>
                   <div>
                    <span className="font-semibold text-emerald-600">优点：</span>
                    <EditableField value={data.games[2].pros || ''} isEditing={isEditing} multiline onSave={(val) => {const n = [...data.games]; n[2].pros = val; setData(p => ({...p, games: n}))}} />
                  </div>
              </div>
            </div>

            {/* Game 4: Prizes */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-200 p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 rounded-bl-lg font-bold">04</div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Gift className="text-amber-500" size={20} />
                抽奖环节（最期待部分）
              </h3>
              <p className="text-xs text-slate-500 mb-3">形式：建议分为三轮（三等奖、二等奖、一等奖、特等奖）。</p>
              
              <div className="space-y-2 text-sm">
                {Object.entries(data.prizes).map(([key, prize]) => (
                   <div key={key} className="flex justify-between items-center border-b border-amber-200/50 pb-1 last:border-0 last:pt-1">
                      <span className="font-bold text-slate-700 w-1/3">
                         <EditableField 
                           value={prize.title} 
                           isEditing={isEditing} 
                           onSave={(val) => setData(p => ({...p, prizes: {...p.prizes, [key]: {...p.prizes[key as keyof typeof data.prizes], title: val}}}))}
                         />
                      </span>
                      <span className="text-slate-600 w-2/3 text-right">
                         <EditableField 
                           value={prize.item} 
                           isEditing={isEditing} 
                           onSave={(val) => setData(p => ({...p, prizes: {...p.prizes, [key]: {...p.prizes[key as keyof typeof data.prizes], item: val}}}))}
                           className="text-right"
                         />
                      </span>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Section 5: Logistics & Budget */}
        <Section id="logistics" title="五、 物料及预算概览" icon={<Wallet />}>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Materials */}
            <div>
              <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2 border-b pb-2">
                <FileText size={20} className="text-blue-500" />
                需准备物料
              </h3>
              <ul className="space-y-3">
                {data.logistics.materials.map((item, index) => {
                   const colors = ["bg-blue-400", "bg-pink-400", "bg-green-400", "bg-amber-400"];
                   return (
                    <li key={index} className="flex gap-3">
                      <span className={`flex-shrink-0 w-2 h-2 rounded-full ${colors[index % colors.length]} mt-2`}></span>
                      <div className="w-full">
                          <span className="font-bold text-slate-700">
                             <EditableField 
                               value={item.cat} 
                               isEditing={isEditing} 
                               onSave={(val) => {
                                 const n = [...data.logistics.materials];
                                 n[index].cat = val;
                                 setData(p => ({...p, logistics: {...p.logistics, materials: n}}));
                               }}
                             />：
                          </span>
                          <span className="text-slate-600">
                             <EditableField 
                               value={item.items} 
                               isEditing={isEditing} 
                               multiline
                               onSave={(val) => {
                                 const n = [...data.logistics.materials];
                                 n[index].items = val;
                                 setData(p => ({...p, logistics: {...p.logistics, materials: n}}));
                               }}
                             />
                          </span>
                      </div>
                    </li>
                   );
                })}
              </ul>
            </div>

            {/* Budget */}
            <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300">
               <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                <Wallet size={20} className="text-emerald-500" />
                预算预估项
                <span className="text-xs font-normal text-slate-500 ml-auto bg-white px-2 py-1 rounded border">按120人核算</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                 {data.logistics.budget.map((item, index) => {
                    const icons = [Bus, MapPin, Utensils, Users, Gift, Wallet]; // Crude mapping
                    const Icon = icons[index % icons.length] || Wallet;
                    return (
                       <div key={index} className={`flex items-center justify-between p-2 bg-white rounded shadow-sm ${item.item === '奖品' ? 'border-l-4 border-amber-400' : ''}`}>
                          <div className="flex items-center gap-2 text-slate-700 font-medium">
                            <Icon size={16} /> 
                            <EditableField 
                               value={item.item} 
                               isEditing={isEditing} 
                               onSave={(val) => {
                                 const n = [...data.logistics.budget];
                                 n[index].item = val;
                                 setData(p => ({...p, logistics: {...p.logistics, budget: n}}));
                               }}
                             />
                          </div>
                          <span className="text-slate-500 text-sm w-1/2 text-right">
                             <EditableField 
                               value={item.detail} 
                               isEditing={isEditing} 
                               onSave={(val) => {
                                 const n = [...data.logistics.budget];
                                 n[index].detail = val;
                                 setData(p => ({...p, logistics: {...p.logistics, budget: n}}));
                               }}
                               className="text-right"
                             />
                          </span>
                       </div>
                    );
                 })}
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-bold text-white mb-2">人工智能与大数据学院行政部 策划</p>
          <p className="text-sm">Copyright © 2025 AI & Big Data School. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
