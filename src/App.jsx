import React, { useState, useEffect } from 'react';
import { Moon, Coffee, Utensils, Battery, Clock, Calendar, Droplets, Info, X, ChevronUp, ChevronDown, Beaker, Zap, Sparkles, Brain, Flame, Armchair, Activity, Pill, Hourglass } from 'lucide-react';

const BioRhythmApp = () => {
  // 状态管理
  const [wakeTime, setWakeTime] = useState('07:30');
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [sleepLatency, setSleepLatency] = useState(30);
  
  // 5+2 计划状态
  const [weeklyPlan, setWeeklyPlan] = useState([
    { id: 0, day: '周一', mode: 'normal', label: '16:8 均衡' },
    { id: 1, day: '周二', mode: 'challenge', label: '23:1 自噬' },
    { id: 2, day: '周三', mode: 'normal', label: '16:8 均衡' },
    { id: 3, day: '周四', mode: 'normal', label: '16:8 均衡' },
    { id: 4, day: '周五', mode: 'challenge', label: '23:1 自噬' },
    { id: 5, day: '周六', mode: 'normal', label: '16:8 均衡' },
    { id: 6, day: '周日', mode: 'normal', label: '16:8 均衡' },
  ]);

  // 时间计算辅助函数
  const addMinutes = (timeStr, minutes) => {
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins + minutes);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const subtractMinutes = (timeStr, minutes) => {
    const [hours, mins] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, mins - minutes);
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  const toggleDayMode = (index) => {
    const newPlan = [...weeklyPlan];
    if (newPlan[index].mode === 'normal') {
      newPlan[index].mode = 'challenge';
      newPlan[index].label = '23:1 自噬';
    } else {
      newPlan[index].mode = 'normal';
      newPlan[index].label = '16:8 均衡';
    }
    setWeeklyPlan(newPlan);
  };

  // 定制的高级时间选择器组件
  const CustomTimePicker = () => {
    const [hours, minutes] = wakeTime.split(':').map(Number);
    
    const adjustTime = (type, delta) => {
      let newH = hours;
      let newM = minutes;
      
      if (type === 'hour') {
        newH = (hours + delta + 24) % 24;
      } else {
        newM = (minutes + delta + 60) % 60;
        if (delta !== 0) {
            newM = Math.round(newM / 5) * 5; 
            if (newM === 60) newM = 0;
        }
      }
      
      const hStr = newH.toString().padStart(2, '0');
      const mStr = newM.toString().padStart(2, '0');
      setWakeTime(`${hStr}:${mStr}`);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700 p-8 rounded-[2rem] shadow-2xl w-full max-w-sm relative">
           <button 
             onClick={() => setShowTimePicker(false)}
             className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors"
           >
             <X className="w-6 h-6" />
           </button>
           
           <h3 className="text-center text-slate-400 font-bold uppercase tracking-wider mb-8 text-sm">设定起床时间</h3>
           
           <div className="flex justify-center items-center gap-6">
              <div className="flex flex-col items-center gap-4">
                 <button onClick={() => adjustTime('hour', 1)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-emerald-400 transition-all"><ChevronUp className="w-8 h-8" /></button>
                 <div className="text-6xl font-bold text-slate-100 font-mono w-24 text-center select-none bg-slate-950/50 rounded-xl py-2 border border-slate-800">{hours.toString().padStart(2, '0')}</div>
                 <button onClick={() => adjustTime('hour', -1)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-emerald-400 transition-all"><ChevronDown className="w-8 h-8" /></button>
                 <span className="text-xs font-bold text-slate-500 uppercase">Hour</span>
              </div>
              
              <div className="text-4xl font-bold text-slate-600 mb-6">:</div>

              <div className="flex flex-col items-center gap-4">
                 <button onClick={() => adjustTime('minute', 5)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-emerald-400 transition-all"><ChevronUp className="w-8 h-8" /></button>
                 <div className="text-6xl font-bold text-slate-100 font-mono w-24 text-center select-none bg-slate-950/50 rounded-xl py-2 border border-slate-800">{minutes.toString().padStart(2, '0')}</div>
                 <button onClick={() => adjustTime('minute', -5)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-emerald-400 transition-all"><ChevronDown className="w-8 h-8" /></button>
                 <span className="text-xs font-bold text-slate-500 uppercase">Min</span>
              </div>
           </div>

           <button 
             onClick={() => setShowTimePicker(false)}
             className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95"
           >
             确认设定
           </button>
        </div>
      </div>
    );
  };

  const sleepCycles = [
    { cycles: 6, hours: 9.0, title: '全面恢复 (9小时)', desc: '深度修复,适合大病初愈或极度疲劳', color: 'bg-blue-900/20 border-blue-500/30 text-blue-100', highlight: 'text-blue-400' },
    { cycles: 5, hours: 7.5, title: '黄金标准 (7.5小时)', desc: '精力最充沛,修复效率最高的平衡点', color: 'bg-emerald-900/20 border-emerald-500/30 text-emerald-100', highlight: 'text-emerald-400' },
    { cycles: 4, hours: 6.0, title: '保底方案 (6小时)', desc: '避免起床气,但午后建议小睡回血', color: 'bg-yellow-900/20 border-yellow-500/30 text-yellow-100', highlight: 'text-yellow-400' },
    { cycles: 3, hours: 4.5, title: '极限操作 (4.5小时)', desc: '错过窗口后的最后防线,需咖啡续命', color: 'bg-rose-900/20 border-rose-500/30 text-rose-100', highlight: 'text-rose-400' },
  ];

  const currentMode = weeklyPlan[selectedDay].mode;

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300 p-6 md:p-12 flex flex-col justify-center">
      {showTimePicker && <CustomTimePicker />}
      
      <div className="max-w-[1400px] mx-auto w-full space-y-8">
        
        {/* New Premium Header (Floating Command Bar) - 英文版 */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-3xl border border-slate-800 p-6 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          {/* Brand Left */}
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-3.5 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
               <Activity className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
               <h1 className="text-2xl font-bold text-white tracking-wide leading-none mb-1">
                 BioRhythm<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Master</span>
               </h1>
               <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                 <span>Sync</span>
                 <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                 <span>Optimize</span>
                 <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                 <span>Thrive</span>
               </div>
            </div>
          </div>

          {/* Right Status Modules - 恢复英文 */}
          <div className="flex gap-3 relative z-10">
             <div className="px-4 py-2 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                <div className="relative">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                   <div className="absolute inset-0 w-2 h-2 rounded-full bg-indigo-500 blur-sm"></div>
                </div>
                <span className="text-xs font-bold text-indigo-300">R90 Sleep</span>
             </div>
             <div className="px-4 py-2 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                <div className="relative">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-500 blur-sm"></div>
                </div>
                <span className="text-xs font-bold text-blue-300">Euthyrox</span>
             </div>
             <div className="px-4 py-2 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2">
                <div className="relative">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 blur-sm"></div>
                </div>
                <span className="text-xs font-bold text-emerald-300">Autophagy</span>
             </div>
          </div>
        </div>

        {/* 主体 Grid：左右双塔布局 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-stretch">
          
          {/* ================= 左塔：规划控制台 ================= */}
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] border border-slate-800 flex flex-col h-full shadow-2xl shadow-black/20">
            
            {/* 1. 顶部：设定锚点 */}
            <div className="p-8 border-b border-slate-800/50">
               <label className="text-base font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5" />
                  设定起床锚点 (Wake Up)
               </label>
               <div 
                 onClick={() => setShowTimePicker(true)}
                 className="flex items-center justify-center py-8 bg-slate-950/30 rounded-[2rem] border border-slate-800/50 cursor-pointer group hover:border-indigo-500/50 hover:bg-slate-900/50 transition-all"
               >
                  <span className="text-8xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors tracking-tight font-mono select-none">
                    {wakeTime}
                  </span>
               </div>
               
               {/* 入睡难度调节 */}
               <div className="mt-8">
                  <div className="flex justify-between items-center mb-3">
                     <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                        <Hourglass className="w-3.5 h-3.5" /> 预留入睡时间
                     </label>
                     <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">{sleepLatency} min</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                     {[15, 30, 45, 60].map(min => (
                        <button
                           key={min}
                           onClick={() => setSleepLatency(min)}
                           className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                              sleepLatency === min 
                              ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' 
                              : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-slate-600'
                           }`}
                        >
                           {min}分
                        </button>
                     ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 text-center">
                     *根据你平时的"翻来覆去"时间选择,工具会自动提前计算上床时间。
                  </p>
               </div>
            </div>

            {/* 2. 中部：睡眠窗口 (人性化版) */}
            <div className="p-8 flex-1 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-8 px-1">
                  <Moon className="w-6 h-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-slate-200">选择入睡窗口</h2>
               </div>
               
               <div className="space-y-6"> 
                  {sleepCycles.map((cycle, idx) => {
                    const targetSleepTime = subtractMinutes(wakeTime, cycle.hours * 60);
                    const bedTime = subtractMinutes(targetSleepTime, sleepLatency);

                    return (
                      <div key={idx} className={`relative overflow-hidden group py-6 px-8 rounded-[2rem] border ${cycle.color} transition-all duration-300 hover:bg-slate-800/40 hover:scale-[1.01]`}>
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <span className={`text-sm font-black uppercase tracking-wider ${cycle.highlight}`}>{cycle.title}</span>
                            <div className="flex items-baseline gap-3 mt-1">
                              <span className="text-5xl font-bold text-white tracking-tighter">{bedTime}</span>
                              <span className="text-base text-slate-400 font-bold">上床躺平</span>
                            </div>
                          </div>
                          <div className="text-right pl-4">
                            <span className="text-sm font-mono text-slate-300 bg-black/30 px-3 py-1.5 rounded-xl block mb-2 font-bold whitespace-nowrap">
                              {cycle.hours}h / {cycle.cycles}周期
                            </span>
                            <span className="text-sm text-slate-400 opacity-80 leading-snug block max-w-[140px] ml-auto">{cycle.desc}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* 3. 底部：睡眠教练面板 (Expanded Footer) */}
            <div className="p-8 bg-slate-900/60 border-t border-slate-800/50 rounded-b-[2.5rem] space-y-6">
               
               {/* R90 Mindset */}
               <div className="flex gap-4 items-start">
                   <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0 border border-indigo-500/20">
                      <Brain className="w-5 h-5 text-indigo-400" />
                   </div>
                   <div>
                      <h4 className="text-indigo-300 font-bold mb-1 text-sm">不必追求"机器般完美"</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                         中途醒来是正常的周期切换（通常在90分钟节点）。只要不看手机、不焦虑,翻个身继续睡,这依然算作一个有效的修复周期。
                      </p>
                   </div>
               </div>

               {/* Napping Guide (Filler) */}
               <div className="flex gap-4 items-start pt-6 border-t border-slate-800/50">
                   <div className="p-2 bg-blue-500/10 rounded-lg shrink-0 border border-blue-500/20">
                      <Armchair className="w-5 h-5 text-blue-400" />
                   </div>
                   <div>
                      <h4 className="text-blue-300 font-bold mb-1 text-sm">科学补觉策略 (防困)</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                         <span className="text-slate-200 font-bold">黄金午睡：</span> 13:00 - 15:00 之间。<br/>
                         <span className="text-slate-200 font-bold">时长控制：</span> 严格限制 <span className="text-white">20 分钟</span> (防止进入深睡醒来头痛) 或 <span className="text-white">90 分钟</span> (完整周期)。
                      </p>
                   </div>
               </div>
            </div>
          </div>

          {/* ================= 右塔：日程执行台 ================= */}
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] border border-slate-800 flex flex-col h-full shadow-2xl shadow-black/20">
            
            {/* 1. 顶部：日程规划 */}
            <div className="p-8 border-b border-slate-800/50">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-orange-400" />
                    <h2 className="text-base font-bold text-slate-200 uppercase tracking-wider">日程规划</h2>
                  </div>
                  <div className="flex gap-6 text-xs font-bold uppercase tracking-wider">
                     <span className="flex items-center gap-2 text-slate-400"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>16:8 均衡</span>
                     <span className="flex items-center gap-2 text-slate-400"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>23:1 自噬</span>
                  </div>
               </div>
               
               <div className="grid grid-cols-7 gap-3">
                {weeklyPlan.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className={`flex flex-col items-center justify-center py-5 rounded-2xl transition-all border ${
                      selectedDay === idx 
                        ? 'bg-slate-800 text-white border-slate-600 shadow-xl ring-1 ring-slate-500/50 transform scale-105' 
                        : 'bg-slate-900/30 text-slate-500 hover:bg-slate-800/50 border-slate-800'
                    }`}
                  >
                    <span className="text-base font-bold mb-2">{day.day}</span>
                    <div className={`w-2.5 h-2.5 rounded-full ${day.mode === 'normal' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 主体：时间轴 */}
            <div className="p-8 flex-1 flex flex-col justify-center">
              
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="font-bold text-2xl text-slate-200 mb-1">{weeklyPlan[selectedDay].day}安排</h3>
                  <p className="text-slate-500 text-sm">R90 周期 & 饮食指引</p>
                </div>
                <button
                  onClick={() => toggleDayMode(selectedDay)}
                  className="text-xs font-bold text-slate-400 hover:text-white border border-slate-700 bg-slate-800/50 px-5 py-2.5 rounded-xl transition-all hover:bg-slate-700"
                >
                  切换模式
                </button>
              </div>

              {/* HUD 卡片 */}
              <div className="grid grid-cols-2 gap-5 mb-12">
                <div className={`p-5 rounded-3xl border flex items-center gap-4 transition-colors ${
                  currentMode === 'normal' 
                    ? 'bg-emerald-900/10 border-emerald-500/20' 
                    : 'bg-orange-900/10 border-orange-500/20'
                }`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    currentMode === 'normal' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">当前模式</div>
                    <div className={`text-lg font-bold ${
                      currentMode === 'normal' ? 'text-emerald-400' : 'text-orange-400'
                    }`}>
                      {weeklyPlan[selectedDay].label}
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-3xl border border-cyan-500/20 bg-cyan-900/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-400">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">全天饮水目标</div>
                    <div className="text-lg font-bold text-cyan-400 flex items-baseline gap-1">
                      2500ml+ <span className="text-xs opacity-60 font-medium">/ 8杯</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 时间轴 */}
              <div className="space-y-12 relative pl-2">
                
                <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-800/60"></div>
                
                {/* Item 1: 起床 */}
                <div className="relative z-10">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                     <Clock className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="pl-20">
                     <div className="flex items-center justify-between h-12">
                        <span className="text-3xl font-bold text-slate-200">{wakeTime}</span>
                        <span className="text-base font-bold text-indigo-300 bg-indigo-500/10 px-4 py-1.5 rounded-lg border border-indigo-500/20">
                           吃药 & 喝水
                        </span>
                     </div>
                     <p className="mt-2 text-sm text-slate-500 pl-1 font-medium">
                        早起第一杯：300ml 温水 (送服优甲乐)
                     </p>
                  </div>
                </div>

                {/* Item 2: 咖啡 */}
                <div className="relative z-10">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-amber-600 flex items-center justify-center">
                     <Coffee className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="pl-20">
                     <div className="flex items-center justify-between h-12">
                        <span className="text-3xl font-bold text-slate-400">{addMinutes(wakeTime, 90)}</span>
                        <span className="text-lg font-bold text-amber-500/90">最佳咖啡时间</span>
                     </div>
                     
                     <div className="mt-4 bg-slate-950/40 rounded-2xl p-4 border border-slate-800 flex gap-4 items-center">
                        <div className="p-3 bg-amber-900/20 rounded-xl shrink-0">
                            <Beaker className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-amber-200 mb-1 uppercase tracking-wide">摩可纳黑咖配方</div>
                            <div className="text-sm text-slate-300 font-medium">
                                1茶匙 (2g) 粉 + 220ml 水
                            </div>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Item 3: 第一餐 */}
                <div className="relative z-10">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-emerald-500 flex items-center justify-center">
                     <Utensils className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div className="pl-20">
                     <div className="flex items-center justify-between h-12">
                        <span className="text-3xl font-bold text-slate-300">{addMinutes(wakeTime, 240)}</span>
                        <span className="text-lg font-bold text-emerald-400/90">
                            {currentMode === 'normal' ? '营养早午餐' : 'OMAD 唯一餐'}
                        </span>
                     </div>
                     
                     {/* 进食知识卡片 */}
                     <div className="mt-4 bg-slate-950/40 rounded-2xl p-4 border border-slate-800">
                        <p className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
                           <Brain className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                           <span>
                              <strong className="text-emerald-400">防困技巧：</strong>
                              先吃肉/蔬菜,最后吃碳水。这能平抑餐后血糖峰值,防止下午"昏睡崩溃"。
                           </span>
                        </p>
                        {currentMode === 'challenge' && (
                           <p className="flex items-start gap-2 text-sm text-orange-400/80 mt-3 pt-3 border-t border-slate-800">
                              <Flame className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                              <span>
                                 <strong>能量警告：</strong> 
                                 必须吃够全天热量。严禁只吃一碗面,请多吃肉类和蔬菜。
                              </span>
                           </p>
                        )}
                     </div>
                  </div>
                </div>

                {/* Item 4: 断食开始 */}
                <div className="relative z-10">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-600 flex items-center justify-center">
                     <Droplets className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="pl-20">
                     <div className="flex items-center justify-between h-12">
                        <span className="text-3xl font-bold text-slate-500">
                           {currentMode === 'normal' 
                              ? addMinutes(wakeTime, 240 + 360 + 60) 
                              : addMinutes(wakeTime, 240 + 60) 
                           }
                        </span>
                        <span className="text-lg font-bold text-slate-500">进入自噬模式</span>
                     </div>
                     
                     {/* 自噬红利卡片 */}
                     <div className="mt-4 bg-slate-950/40 rounded-2xl p-5 border border-slate-800">
                        <div className="flex items-center gap-2 mb-3 text-emerald-400/90">
                           <Sparkles className="w-4 h-4" />
                           <span className="text-xs font-bold uppercase tracking-wider">细胞自噬红利</span>
                        </div>
                        <ul className="space-y-3">
                           <li className="flex items-start gap-3 text-sm text-slate-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                              <span><strong className="text-slate-300">深度清理：</strong>回收受损蛋白质,清理衰老细胞。</span>
                           </li>
                           <li className="flex items-start gap-3 text-sm text-slate-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                              <span><strong className="text-slate-300">抗炎修复：</strong>降低全身慢性炎症,提升免疫力与精力。</span>
                           </li>
                           <li className="flex items-start gap-3 text-sm text-slate-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                              <span><strong className="text-slate-300">代谢重置：</strong>提高胰岛素敏感性,让身体燃烧顽固脂肪。</span>
                           </li>
                        </ul>
                        {currentMode === 'challenge' && (
                           <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-orange-400/70 font-medium">
                              ⚠️ 深度清理期间,如感到心慌无力,请立即补充电解质水。
                           </div>
                        )}
                     </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部留白 */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioRhythmApp;
