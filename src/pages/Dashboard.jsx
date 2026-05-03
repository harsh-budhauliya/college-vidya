import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, BookOpen, GraduationCap, CheckCircle2, Star, PhoneCall, TrendingUp, Shield, ShieldCheck, Trophy, Zap, Users, BadgeCheck, Lightbulb, Wallet, Laptop, Globe2, Target, Award, PlayCircle, MapPin, HeartHandshake, AlertTriangle, FileText, MessagesSquare, Banknote, SlidersHorizontal, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [showAllObjections, setShowAllObjections] = useState(false);
  const [activePillar, setActivePillar] = useState(1);

  const preciousObjections = [
    {
       id: 1,
       question: "Why should I use College Buddy instead of applying directly?",
       pitch: "If you go directly to a university website, their sales team will only tell you the positives to meet their targets. As an aggregator, we provide 100% unbiased comparison between 100+ universities. We show you the hidden fees, actual student reviews, and verify their UGC-DEB status. Plus, you still pay the fee directly to the university portal, but you get our lifetime post-admission support for free.",
       points: ["Unbiased vs Biased", "Transparency of hidden fees"]
    },
    {
       id: 2,
       question: "Are online degrees really valid for govt jobs and MNCs?",
       pitch: "Yes, absolutely! According to the latest UGC mandate, degrees obtained through Online and Distance learning from recognized institutions are treated as exactly equivalent to traditional regular degrees. We ensure that every single university listed on College Buddy is strictly UGC-DEB approved, making your degree 100% valid for government exams like UPSC, state PSCs, and all private sector jobs.",
       points: ["UGC Equivalency Mandate", "Our strict quality checks"]
    },
    {
       id: 3,
       question: "Is there any hidden fee or counseling charge you take from me later?",
       pitch: "College Buddy's expert counseling is 100% free for students forever. We do not charge you a single rupee. We operate on a standardized aggregator model where universities pay us a fixed partnership fee, so our counselors have zero incentive to push a specific 'expensive' college. Your fees go directly to your chosen university's secure payment gateway.",
       points: ["100% Free Counseling", "No Sales Pressure"]
    },
    {
       id: 4,
       question: "What if the university ignores me after I pay the fees?",
       pitch: "This is exactly why you need College Buddy! If you face delayed books, LMS login issues, or unresponsiveness from the university, you don't fight alone. We have a dedicated Post-Admission Support team that acts as your advocate to resolve issues directly with the university escalation matrix.",
       points: ["Dedicated Post-Admission Advocacy", "CB Community Support"]
    },
    {
       id: 5,
       question: "Online degrees don't have placement. How will I get a job?",
       pitch: "That's a myth. Many of our top partnering universities offer extensive placement assistance. Beyond that, College Buddy provides its own dedicated Job & Internship Portal exclusively for our enrolled students, connecting you with 300+ hiring partners, resume-building sessions, and interview prep.",
       points: ["CB Job Portal", "300+ Hiring Partners"]
    },
    {
       id: 6,
       question: "Can I get an education loan? My budget is very low.",
       pitch: "Absolutely. We ensure financial constraints don't stop your education. We can help you structure Zero-Cost EMIs (0% Interest) starting at very low monthly payments. Additionally, we check your eligibility for the 'CB Subsidy' which can give you up to ₹10,000 off on select approved courses.",
       points: ["Zero-Cost EMIs", "CB Subsidy (Up to 10k)"]
    },
    {
       id: 7,
       question: "A local broker promised me a guaranteed pass and backdated degree. Do you?",
       pitch: "Please beware of such scams! Backdated or guaranteed-pass degrees are 100% fake and will get you blacklisted during background verification by employers. We only deal with ethical, genuine education. You will have to give the required exams, but our community and university LMS will fully train you to pass successfully.",
       points: ["Ethical Counseling Only", "Fake Degree Awareness"]
    },
    {
       id: 8,
       question: "Can I complete this degree in 1 year instead of 3 years (Fast-Track)?",
       pitch: "The UGC explicitly forbids shortening formal degree durations unless it's a lateral entry for a previously abandoned degree. Standard degrees cannot be 'fast-tracked'. Any agent offering a full 3-year degree in 1 year is likely selling a fraudulent diploma. We guide you transparently to stay within legal UGC guidelines.",
       points: ["UGC Rules on Duration", "Lateral Entry Exceptions"]
    }
  ];

  const visibleObjections = showAllObjections ? preciousObjections : preciousObjections.slice(0, 4);

  const handleSearchClick = () => {
    navigate('/university-data');
  };

  return (
    <div className="pb-16 min-h-screen bg-[#f4f7fa]">
      {/* 1. Hero Section - Advanced Terminal Style */}
      <div className="bg-[#0f172a] text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0f172a]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-red-500/10 border border-red-500/20 mb-8"
          >
            <AlertTriangle size={14} className="text-red-400" />
            <span className="text-[11px] font-black tracking-widest text-red-400 uppercase">INTERNAL ONLY: For Employee Training & Mock Calls</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]"
          >
            Counselor <span className="text-blue-400">Terminal</span><br className="hidden md:block" /> Training Matrix
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 md:mb-12 max-w-3xl font-medium px-2 leading-relaxed"
          >
            Access the ultimate institutional database. Memorize key USPs, cross-reference 30+ parameters, and run verified mock calls to maximize enrollment conversion rates.
          </motion.p>
          
          {/* Main Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl bg-slate-800/80 p-2 rounded-xl border border-slate-700 flex flex-col sm:flex-row gap-2 shadow-2xl"
          >
            <div className="flex-1 flex items-center bg-transparent rounded-lg px-4 py-3 relative focus-within:bg-slate-800 transition-all">
              <PhoneCall size={20} className="text-slate-400" />
              <input 
                 type="text" 
                 placeholder="Query Institutions for Mock Session..." 
                 className="w-full bg-transparent border-none outline-none pl-3 text-white placeholder-slate-500 font-bold text-lg tracking-tight"
                 onFocus={handleSearchClick}
                 readOnly
              />
            </div>
            <button 
               onClick={handleSearchClick}
               className="bg-blue-600 hover:bg-blue-500 border border-blue-500 text-white font-bold py-4 sm:py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
               <PlayCircle size={18} />
               Execute Session
            </button>
          </motion.div>

          {/* Quick Start Floating Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 mt-8 z-20 relative"
          >
             <button 
                onClick={() => navigate('/student-profiler')}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-[13px]"
             >
                <Target size={16} />
                Launch Degree Matcher
             </button>
             <button 
                onClick={() => navigate('/counselor-framework')}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-[13px]"
             >
                <CheckCircle2 size={16} />
                Counselor Framework Flow
             </button>
          </motion.div>

          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-wrap justify-center gap-6 text-[12px] font-bold tracking-wide text-slate-400 mt-10 uppercase"
          >
             <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-blue-400" /> Pitch 100% Free Guidance</span>
             <span className="hidden sm:inline opacity-30">|</span>
             <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-blue-400" /> Follow UGC-DEB Mandates</span>
             <span className="hidden sm:inline opacity-30">|</span>
             <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-blue-400" /> Use Deep Data Points</span>
          </motion.div>
        </div>
      </div>

      {/* 2. Counselor Performance Widget - No Glow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-8">
        <div className="bg-white border border-slate-200 shadow-[0_2px_15px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-5 w-full lg:w-auto">
              <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                 <div className="w-10 h-10 bg-slate-900 rounded-[0.25rem] flex items-center justify-center text-white font-black text-lg">
                     C
                 </div>
              </div>
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">System Authentication</h3>
                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-widest flex items-center gap-1"><ShieldCheck size={10}/> Valid</span>
                 </div>
                 <p className="text-[13px] font-bold text-slate-500">Counselor metrics actively recording to centralized ledger.</p>
              </div>
           </div>
           
           <div className="grid grid-cols-3 gap-3 md:gap-4 w-full lg:w-auto shrink-0">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center min-w-[120px]">
                 <span className="text-2xl font-black text-slate-900 tracking-tight mb-0.5">12</span>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><PhoneCall size={10} className="text-blue-500"/> Sessions</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center min-w-[120px]">
                 <span className="text-2xl font-black text-emerald-600 tracking-tight mb-0.5">94%</span>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500"/> Win Rate</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center min-w-[120px]">
                 <span className="text-2xl font-black text-blue-600 tracking-tight mb-0.5">Top 5%</span>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><Trophy size={10} className="text-blue-500"/> Global Rank</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-12">
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest mb-4 border border-slate-200">
                        <Shield size={12}/> Core Mandates
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Absolute Directives</h2>
                </div>
                <p className="text-slate-500 font-bold md:max-w-[320px] md:text-right text-[13px] leading-relaxed">
                    Counselors must strictly adhere to these fundamental truths during all student interactions.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Platform Goal', value: 'Unbiased Partner', icon: <Target size={20} />, desc: "We are NOT an agent. We guide, we don't sell.", color: 'border-blue-200 bg-blue-50/50', iconColor: 'text-blue-600', iconBg: 'bg-white border-blue-100' },
                    { label: 'Financial Aid Given', value: 'CB Subsidy', icon: <Wallet size={20} />, desc: "Up to ₹10,000 subsidy available for eligible students.", color: 'border-emerald-200 bg-emerald-50/50', iconColor: 'text-emerald-600', iconBg: 'bg-white border-emerald-100' },
                    { label: 'Admission Process', value: 'Direct Payment', icon: <Banknote size={20} />, desc: "Students pay fees DIRECTLY on the official gateway.", color: 'border-indigo-200 bg-indigo-50/50', iconColor: 'text-indigo-600', iconBg: 'bg-white border-indigo-100' },
                    { label: 'Comparison Tool', value: '30+ Parameters', icon: <SlidersHorizontal size={20} />, desc: "Compare fees, EMI, syllabus depth, ROI, faculty.", color: 'border-rose-200 bg-rose-50/50', iconColor: 'text-rose-600', iconBg: 'bg-white border-rose-100' },
                ].map((stat, i) => (
                    <div key={i} className={`p-5 rounded-xl border ${stat.color} flex flex-col items-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 border shadow-sm ${stat.iconBg} ${stat.iconColor}`}>
                            {stat.icon}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">{stat.label}</p>
                        <h3 className="text-[17px] font-black leading-tight mb-2 text-slate-900 tracking-tight">{stat.value}</h3>
                        <p className="text-slate-600 text-[13px] font-medium leading-relaxed mt-auto">{stat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. Objection Handling & Rebuttals (Mock Call Preparation) */}
      <section className="bg-[#0f172a] py-16 md:py-24 border-y border-slate-800 relative overflow-hidden text-white">
         {/* Decorative Background Elements */}
         <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0f172a]"></div>
         </div>

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-black text-[10px] uppercase tracking-widest mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Critical Threat Scenarios
               </div>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight">Master The Objections</h2>
               <p className="text-base md:text-lg text-slate-400 font-medium max-w-2xl mx-auto">These are the highest-friction pushbacks from leads. Expand to memorize the exact verified pitch script to systematically build trust and close the deal.</p>
            </div>

            <div className="space-y-4 mb-12">
               {visibleObjections.map((obj) => (
                  <div key={obj.id} className={`bg-slate-800/80 rounded-xl border transition-all duration-200 overflow-hidden ${expandedId === obj.id ? 'border-blue-500 shadow-md' : 'border-slate-700 shadow-sm'}`}>
                     <button 
                        onClick={() => setExpandedId(expandedId === obj.id ? null : obj.id)}
                        className={`w-full text-left p-5 flex items-center justify-between group transition-colors ${expandedId === obj.id ? 'bg-slate-800' : 'hover:bg-slate-800/50'}`}
                     >
                        <div className="flex items-center gap-4">
                           <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[14px] shrink-0 transition-colors shadow-sm ${expandedId === obj.id ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 group-hover:bg-slate-600'}`}>
                              {obj.id}
                           </span>
                           <h3 className={`text-[15px] md:text-[17px] pr-4 font-bold transition-colors leading-snug tracking-tight ${expandedId === obj.id ? 'text-white' : 'text-slate-200 group-hover:text-blue-400'}`}>
                              "{obj.question}"
                           </h3>
                        </div>
                        <div className={`shrink-0 ml-2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors border shadow-sm ${expandedId === obj.id ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'bg-slate-700 border-slate-600 text-slate-400 group-hover:border-slate-500'}`}>
                           {expandedId === obj.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                     </button>
                     
                     <AnimatePresence>
                        {expandedId === obj.id && (
                           <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                           >
                              <div className="px-5 pb-5 pt-1">
                                 <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700 relative overflow-hidden">
                                     <div className="flex items-center gap-2.5 mb-4">
                                        <div className="bg-emerald-500/10 p-1.5 rounded text-emerald-400 border border-emerald-500/20 shadow-sm"><FileText size={14}/></div>
                                        <h4 className="font-black text-slate-300 text-[11px] tracking-widest uppercase">Verified Pitch Script</h4>
                                     </div>
                                     <p className="text-slate-300 font-medium text-[15px] md:text-[16px] leading-relaxed pl-4 border-l-2 border-emerald-500 mb-6">
                                         {obj.pitch}
                                     </p>
                                     <div className="flex flex-wrap gap-2.5">
                                        {obj.points.map((pt, i) => (
                                           <span key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300 bg-slate-800 border border-slate-600 px-3 py-1.5 rounded-lg shadow-sm">
                                              <CheckCircle2 size={12} className="text-blue-400"/> {pt}
                                           </span>
                                        ))}
                                     </div>
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               ))}
            </div>

            <div className="text-center">
               <button 
                  onClick={() => setShowAllObjections(!showAllObjections)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-bold rounded-lg transition-all shadow-sm text-[13px]"
               >
                  {showAllObjections ? 'Hide Scenarios' : 'Reveal All 8 Scenarios'} <ChevronDown size={16} className={showAllObjections ? 'rotate-180 transition-transform' : 'transition-transform'} />
               </button>
            </div>
         </div>
      </section>

      {/* 4. The Competition: Why We Win */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden border-b border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
               <span className="text-slate-500 font-black tracking-widest uppercase text-[10px] mb-3 block">Competitive Matrix</span>
               <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 text-slate-900 tracking-tight">Dismantle Generic Competitors</h2>
               <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-bold">Understand our exact architectural advantages over broad-market lead-gen portals.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {[
                  { title: "Niche vs Broad", desc: "Competitors dilute focus across Campus/Abroad/Coaching. We exclusively dominate the Online & Distance vertical.", icon: <Target className="text-indigo-600" size={24} />, color: 'bg-indigo-50 border-indigo-200' },
                  { title: "Data Authenticity", desc: "They use faked user-submitted data. We utilize direct university APIs cross-referenced against 30+ strict parameters.", icon: <BadgeCheck className="text-emerald-600" size={24} />, color: 'bg-emerald-50 border-emerald-200' },
                  { title: "Counseling Motive", desc: "They auction leads to the highest bidder. We algorithmically match students based on precise profile alignment.", icon: <Shield className="text-blue-600" size={24} />, color: 'bg-blue-50 border-blue-200' }
               ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl relative hover:-translate-y-1 transition-all hover:shadow-md">
                     <div className={`mb-5 w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                        {item.icon}
                     </div>
                     <h3 className="text-[18px] font-black mb-2 text-slate-900 tracking-tight">{item.title}</h3>
                     <p className="text-slate-600 text-[13px] font-medium leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Post-Admission & CB Community (Upsell / Trust Building) */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-200 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
               <div className="lg:w-[55%]">
                  <span className="inline-flex items-center gap-2 py-1 px-3 rounded bg-emerald-500/10 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-5 border border-emerald-500/20">
                     <ShieldCheck size={12} /> Post-Admission Retention
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">Pitching the "Beyond Admission" Value</h2>
                  <p className="text-base md:text-lg text-slate-600 mb-8 font-medium leading-relaxed">
                     Leads drop off due to fear of abandonment. Counselors must execute these three trust pillars to secure conversions.
                  </p>
                  <div className="space-y-3">
                     {/* Pillar 1 */}
                     <div className={`bg-white rounded-lg border transition-all duration-200 ${activePillar === 1 ? 'border-blue-400 shadow-sm' : 'border-slate-200'}`}>
                        <button 
                           onClick={() => setActivePillar(1)}
                           className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-colors ${activePillar === 1 ? 'bg-blue-50/50 rounded-t-lg' : 'hover:bg-slate-50 rounded-lg'}`}
                        >
                           <div className="flex items-center gap-3">
                              <span className={`w-8 h-8 rounded flex items-center justify-center shrink-0 transition-colors ${activePillar === 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                 <Users size={14} />
                              </span>
                              <h3 className={`text-[14px] font-black tracking-tight transition-colors ${activePillar === 1 ? 'text-slate-900' : 'text-slate-700 group-hover:text-blue-600'}`}>
                                 The CB Community
                              </h3>
                           </div>
                           <ChevronDown size={16} className={`text-slate-400 transition-transform ${activePillar === 1 ? 'rotate-180 text-blue-500' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                           {activePillar === 1 && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.15 }}
                              >
                                 <div className="px-4 pb-4 md:px-5 md:pb-5 bg-blue-50/50 rounded-b-lg border-t border-blue-100/50">
                                    <p className="text-slate-600 font-medium text-[13px] leading-relaxed mb-3 mt-1.5">Connect with 50K+ peers and alumni to instantly resolve the isolation of remote learning.</p>
                                    <div className="bg-white border-l-2 border-emerald-500 pl-3 py-2 rounded-r shadow-sm">
                                         <p className="text-[9px] font-black tracking-widest uppercase text-slate-400 mb-0.5">Mandatory Script</p>
                                         <p className="text-slate-800 font-bold text-[13px] italic leading-tight">"You will never study alone. You get access to 50,000+ peers."</p>
                                    </div>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>

                     {/* Pillar 2 */}
                     <div className={`bg-white rounded-lg border transition-all duration-200 ${activePillar === 2 ? 'border-blue-400 shadow-sm' : 'border-slate-200'}`}>
                        <button 
                           onClick={() => setActivePillar(2)}
                           className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-colors ${activePillar === 2 ? 'bg-blue-50/50 rounded-t-lg' : 'hover:bg-slate-50 rounded-lg'}`}
                        >
                           <div className="flex items-center gap-3">
                              <span className={`w-8 h-8 rounded flex items-center justify-center shrink-0 transition-colors ${activePillar === 2 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                 <Target size={14} />
                              </span>
                              <h3 className={`text-[14px] font-black tracking-tight transition-colors ${activePillar === 2 ? 'text-slate-900' : 'text-slate-700 group-hover:text-blue-600'}`}>
                                 Job & Internship Portal
                              </h3>
                           </div>
                           <ChevronDown size={16} className={`text-slate-400 transition-transform ${activePillar === 2 ? 'rotate-180 text-blue-500' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                           {activePillar === 2 && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.15 }}
                              >
                                 <div className="px-4 pb-4 md:px-5 md:pb-5 bg-blue-50/50 rounded-b-lg border-t border-blue-100/50">
                                    <p className="text-slate-600 font-medium text-[13px] leading-relaxed mb-3 mt-1.5">We offer resume building, interview prep, and direct access to 300+ hiring partners.</p>
                                    <div className="bg-white border-l-2 border-emerald-500 pl-3 py-2 rounded-r shadow-sm">
                                         <p className="text-[9px] font-black tracking-widest uppercase text-slate-400 mb-0.5">Mandatory Script</p>
                                         <p className="text-slate-800 font-bold text-[13px] italic leading-tight">"We take responsibility for your placement prep, unconditionally."</p>
                                    </div>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>

                     {/* Pillar 3 */}
                     <div className={`bg-white rounded-lg border transition-all duration-200 ${activePillar === 3 ? 'border-blue-400 shadow-sm' : 'border-slate-200'}`}>
                        <button 
                           onClick={() => setActivePillar(3)}
                           className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-colors ${activePillar === 3 ? 'bg-blue-50/50 rounded-t-lg' : 'hover:bg-slate-50 rounded-lg'}`}
                        >
                           <div className="flex items-center gap-3">
                              <span className={`w-8 h-8 rounded flex items-center justify-center shrink-0 transition-colors ${activePillar === 3 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                 <HeartHandshake size={14} />
                              </span>
                              <h3 className={`text-[14px] font-black tracking-tight transition-colors ${activePillar === 3 ? 'text-slate-900' : 'text-slate-700 group-hover:text-blue-600'}`}>
                                 Support Advocacy
                              </h3>
                           </div>
                           <ChevronDown size={16} className={`text-slate-400 transition-transform ${activePillar === 3 ? 'rotate-180 text-blue-500' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                           {activePillar === 3 && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.15 }}
                              >
                                 <div className="px-4 pb-4 md:px-5 md:pb-5 bg-blue-50/50 rounded-b-lg border-t border-blue-100/50">
                                    <p className="text-slate-600 font-medium text-[13px] leading-relaxed mb-3 mt-1.5">If the university delays books or ignores queries, CB escalates and resolves it directly.</p>
                                    <div className="bg-white border-l-2 border-emerald-500 pl-3 py-2 rounded-r shadow-sm">
                                         <p className="text-[9px] font-black tracking-widest uppercase text-slate-400 mb-0.5">Mandatory Script</p>
                                         <p className="text-slate-800 font-bold text-[13px] italic leading-tight">"If the university ignores you, we escalate it to the VCs directly."</p>
                                    </div>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>
               </div>

               {/* Right Container */}
               <div className="lg:w-[45%] relative mt-16 lg:mt-0">
                  <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
                     <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Team meeting" className="w-full h-full object-cover rounded-xl aspect-[4/5] sm:aspect-[3/4] object-center" />
                  </div>
                  
                  {/* Floating Refer & Earn Badge */}
                  <div className="absolute -bottom-6 left-4 right-4 sm:-bottom-8 sm:-left-8 sm:right-auto bg-white shadow-lg p-5 rounded-xl z-20 border border-slate-200 sm:w-[280px]">
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center border border-amber-100 text-amber-500">
                            <Star size={20} className="fill-amber-400 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Incentive Mechanism</p>
                            <p className="text-[15px] font-black text-slate-900 tracking-tight">Refer & Earn</p>
                        </div>
                     </div>
                     <div className="bg-slate-50 rounded-lg py-3 px-4 border border-slate-200 text-center">
                         <div className="text-slate-900 font-black text-2xl tracking-tight flex items-center justify-center gap-1">₹1000<span className="text-lg text-slate-400 font-black">+</span></div>
                         <div className="text-slate-500 text-[9px] font-black uppercase mt-1 tracking-widest">Bounty Per Enrollment</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Action Call to Search */}
      <section className="py-16 md:py-24 bg-white text-center border-t border-slate-200">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">Initiate Mock Session</h2>
            <p className="text-sm md:text-base text-slate-500 mb-8 font-bold max-w-xl mx-auto">Access the institutional query engine to cross-reference fees, approvals, and syllabi.</p>
            <button 
               onClick={handleSearchClick}
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-lg shadow-sm transition-all hover:-translate-y-0.5 mx-auto flex items-center gap-2 text-[14px]"
            >
               Open CRM Dashboard <ChevronRight size={16} />
            </button>
         </div>
      </section>

    </div>
  );
};

export default Dashboard;
