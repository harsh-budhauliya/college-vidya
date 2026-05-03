import React, { useState } from 'react';
import { Target, Clock, AlertCircle, HelpCircle, BrainCircuit, Wallet, Award, CheckCircle2, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { motion } from 'framer-motion';

const CounselorFlow = () => {
  const [completedPhases, setCompletedPhases] = useState([]);

  const togglePhase = (phase) => {
    setCompletedPhases(prev => 
      prev.includes(phase) ? prev.filter(p => p !== phase) : [...prev, phase]
    );
  };

  const progress = (completedPhases.length / 5) * 100;

  return (
    <div className="min-h-screen bg-[#f4f7fa] pt-[72px] pb-20">
      {/* Sticky Progress Tracker */}
      <div className="sticky top-[72px] z-40 glass-nav p-4 shadow-sm mb-8 relative">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4">
           <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-sm font-black text-slate-700 uppercase tracking-widest">Mock Call Framework Progress</span>
                 <span className="text-sm font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">{completedPhases.length} / 5 Phases</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner flex">
                 <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary-400 to-primary-600 w-full"
                 />
              </div>
           </div>
           {progress === 100 && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-2 rounded-xl text-sm font-black flex items-center gap-2 whitespace-nowrap shadow-sm"
             >
                <Award size={18} /> Ready to Pitch!
             </motion.div>
           )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-black uppercase tracking-widest mb-4">
            <Target size={12} /> Internal Protocol
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4 uppercase">
            Counseling <br/>
            <span className="text-blue-600">Execution Framework</span>
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-bold max-w-2xl mx-auto">
            Execute this framework sequentially during live calls. Strict adherence required for lead conversion.
          </p>
        </div>

        {/* Phase 1 */}
        <div className={`glass-card-premium rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden transition-all duration-300 ${completedPhases.includes(1) ? 'ring-2 ring-primary-400 bg-primary-50/20' : ''}`}>
          <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${completedPhases.includes(1) ? 'bg-primary-500' : 'bg-slate-300'}`}></div>
          <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary-600 flex items-center justify-center border border-blue-100">
                  <Clock size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Phase 1: Professional Opening & Baseline</h2>
                  <p className="text-sm font-bold text-slate-500">Goal: Establish authority and gather academic history instantly</p>
                </div>
              </div>
              <button onClick={() => togglePhase(1)} className={`shrink-0 p-2 rounded-xl transition-all ${completedPhases.includes(1) ? 'text-primary-600 bg-primary-100 hover:bg-primary-200' : 'text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600'}`}>
                 {completedPhases.includes(1) ? <CheckSquare size={24} className="fill-primary-100" /> : <Square size={24} />}
              </button>
          </div>
          <div className="bg-white/80 p-5 rounded-xl border border-slate-100 mb-4 shadow-sm">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2"><HelpCircle size={16} className="text-primary-500" /> The Script:</h3>
            <div className="space-y-4 font-medium text-slate-700 italic border-l-[3px] border-primary-300 pl-4">
              <p>"Hello! Meri baat [Student Name] se ho rahi hai? Main College Vidya se [Your Name] baat kar raha/rahi hu. Aapne recently ek online degree program [BBA/MBA/MCA] ko explore karne ke liye inquiry ki thi. Kya ye sahi samay hai 2 minute baat karne ka?"</p>
              <p>"Sabse pehle, main aapka academic record janna chahunga taaki main universities ki eligibility check kar saku. Aapne apni last qualification [e.g., 12th ya Graduation] kis year me aur kitne percentage se clear ki thi?"</p>
            </div>
          </div>
          <div className="flex gap-3 text-sm text-slate-700 bg-amber-50/80 p-4 rounded-xl border border-amber-200 shadow-sm">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="leading-relaxed"><b>Logic:</b> Professional intro se trust banta hai. Turant graduation marks puchna proves aap call time-pass ke liye nahi kar rahe, profile evaluate kar rahe ho. Less than 50% means strict filtering needed.</p>
          </div>
        </div>

        {/* Phase 2 */}
        <div className={`glass-card-premium rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden transition-all duration-300 ${completedPhases.includes(2) ? 'ring-2 ring-accent-400 bg-orange-50/20' : ''}`}>
          <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${completedPhases.includes(2) ? 'bg-accent-500' : 'bg-slate-300'}`}></div>
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-orange-50 text-accent-500 flex items-center justify-center border border-orange-100">
                 <BrainCircuit size={24} />
               </div>
               <div>
                 <h2 className="text-xl font-black text-slate-900">Phase 2: Intent & Pain Point Discovery</h2>
                 <p className="text-sm font-bold text-slate-500">Goal: Find the "Why" behind their admission</p>
               </div>
             </div>
             <button onClick={() => togglePhase(2)} className={`shrink-0 p-2 rounded-xl transition-all ${completedPhases.includes(2) ? 'text-accent-600 bg-orange-100 hover:bg-orange-200' : 'text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600'}`}>
                 {completedPhases.includes(2) ? <CheckSquare size={24} className="fill-accent-500" /> : <Square size={24} />}
              </button>
          </div>
          <div className="bg-white/80 p-5 rounded-xl border border-slate-100 mb-4 shadow-sm">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2"><HelpCircle size={16} className="text-accent-500" /> The Script:</h3>
            <div className="space-y-4 font-medium text-slate-700 italic border-l-[3px] border-accent-300 pl-4">
              <p>"Dekhiye, India me 100+ universities online degree de rahi hain. Par aapke liye konsi best hai, wo ispe depend karega ki aap ye degree kyu karna chahte ho. Aap abhi permanently working ho ya fresher ho?"</p>
              <p>"<b className="text-slate-900">(Wait for reply)</b>... Okay great. Toh ye degree aap primary level par apni current company me promotion/increment pane ke liye karna chahte ho, career switch (IT/Management) karne ke liye, ya kisi Government Job examination me apply karne ke liye?"</p>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className={`glass-card-premium rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden transition-all duration-300 ${completedPhases.includes(3) ? 'ring-2 ring-emerald-400 bg-emerald-50/20' : ''}`}>
          <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${completedPhases.includes(3) ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                 <Target size={24} />
               </div>
               <div>
                 <h2 className="text-xl font-black text-slate-900">Phase 3: The Framework Validation</h2>
                 <p className="text-sm font-bold text-slate-500">Goal: Finalize specialization & secure time/budget commitment</p>
               </div>
             </div>
             <button onClick={() => togglePhase(3)} className={`shrink-0 p-2 rounded-xl transition-all ${completedPhases.includes(3) ? 'text-emerald-600 bg-emerald-100 hover:bg-emerald-200' : 'text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600'}`}>
                 {completedPhases.includes(3) ? <CheckSquare size={24} className="fill-emerald-500" /> : <Square size={24} />}
              </button>
          </div>
          <div className="bg-white/80 p-5 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2"><HelpCircle size={16} className="text-emerald-600" /> The Script:</h3>
            <div className="space-y-4 font-medium text-slate-700 italic border-l-[3px] border-emerald-300 pl-4">
              <p>"Agar aap [Industry] me grow karna chahte ho toh aapko general degree ki jagah [Exact Specialization like Data Science/HR] ki taraf jana chahiye, isme competition kam hai aur hike zyada."</p>
              <p>"Online education flexible zarur hai, but assignment & exams aapko dene padenge. Kya aap hafte me 2 se 3 average hours self-study ke liye nikal sakte ho bina apna routine distrub kiye?"</p>
              <p>"Aur aakhiri cheez, quality education ek investment hoti hai. Ek aachi UGC/NAAC A+ university ki fees usually poore course ki 1 se 3 Lakh ke beech hoti hai. Aap single payment prefer karte ho ya monthly EMI me aaram se padhna prefer karoge?"</p>
            </div>
          </div>
        </div>

        {/* Phase 4 & 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className={`glass-card-premium rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 ${completedPhases.includes(4) ? 'ring-2 ring-purple-400 bg-purple-50/20' : ''}`}>
               <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${completedPhases.includes(4) ? 'bg-purple-500' : 'bg-slate-300'}`}></div>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                       <Award className="text-purple-600 shrink-0" size={24} />
                       <h2 className="text-lg font-black text-slate-900 leading-tight">Phase 4: The Solution Pitch<br/><span className="text-sm font-bold text-slate-500">Action: Pitch maximum 2 universities</span></h2>
                   </div>
                   <button onClick={() => togglePhase(4)} className={`shrink-0 p-1.5 rounded-lg transition-all ${completedPhases.includes(4) ? 'text-purple-600 bg-purple-100 hover:bg-purple-200' : 'text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600'}`}>
                      {completedPhases.includes(4) ? <CheckSquare size={20} className="fill-purple-500" /> : <Square size={20} />}
                   </button>
                </div>
                <div className="font-medium text-[15px] text-slate-700 bg-white/80 p-5 rounded-xl border border-slate-100 shadow-sm leading-relaxed italic border-l-[3px] border-purple-300 pl-4">
                    <p>"Aapki profile match karne ke baad result ye hai ki aapko 10 universities ki taraf dekhne ki zaroorat nahi hai. Maine 2 best options filter kiye hain:"</p>
                    <p className="mt-3">"Option A: <b>[Premium Uni Name like Manipal]</b>. Ye tier-1 brand hai, inki placement support service number 1 hai, aur faculty world class hai. Total fee is around ₹[X]."</p>
                    <p className="mt-3">"Option B: <b>[Value Uni Name like LPU/Jain]</b>. Ye un students ke liye fit hai jinki priority flexibility and budget hai. Degree ki value Govt format me strictly recognized hai. Iski total fees sirf ₹[Y] hai."</p>
                </div>
            </div>
            
            <div className={`glass-card-premium rounded-2xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 ${completedPhases.includes(5) ? 'ring-2 ring-red-400 bg-red-50/20' : ''}`}>
                <div className={`absolute top-0 left-0 w-2 h-full transition-colors ${completedPhases.includes(5) ? 'bg-red-500' : 'bg-slate-300'}`}></div>
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-3">
                       <Wallet className="text-red-500 shrink-0" size={24} />
                       <h2 className="text-lg font-black text-slate-900 leading-tight">Phase 5: The Urgent Close<br/><span className="text-sm font-bold text-slate-500">Action: Lead Locking & Conclusion</span></h2>
                   </div>
                   <button onClick={() => togglePhase(5)} className={`shrink-0 p-1.5 rounded-lg transition-all ${completedPhases.includes(5) ? 'text-red-600 bg-red-100 hover:bg-red-200' : 'text-slate-400 bg-slate-100 hover:bg-slate-200 hover:text-slate-600'}`}>
                      {completedPhases.includes(5) ? <CheckSquare size={20} className="fill-red-500" /> : <Square size={20} />}
                   </button>
                </div>
                <div className="font-medium text-[15px] text-slate-800 bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-200 shadow-sm leading-relaxed italic border-l-[3px] border-red-400 pl-4">
                    <p>"Aapko honestly kya zyada suit kar raha hai? Brand value ya budget?"</p>
                    <p className="mt-4">"Great choice. But dekhiye, jo abhi batch form ho raha hai, uski seats nearly over book ho chuki hain. In fact, admissions closing par hain. Main abhi turant aapko is [University Name] ka detail prospectus WhatsApp aur email par drop kar raha hu."</p>
                    <p className="mt-4 font-bold text-red-900 border-t border-red-200 pt-3">"Aap file aache se review kar lijiye. Main aapko registration portal ka link bhej deta hu taaki aap aaj hi ₹500 fee de kar apna enrollment portal securely block/reserve kar sako without missing the session. Kaisa rahega?"</p>
                </div>
            </div>
        </div>

        {/* Rules */}
        <div className="bg-slate-900 text-white rounded-xl p-6 md:p-8 shadow-md relative overflow-hidden shrink-0 border border-slate-700">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10"><AlertCircle size={20} className="text-red-500"/> Absolute Directives</h2>
            <div className="space-y-4 relative z-10">
                <div className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={20} />
                    <p className="text-[13px] font-medium text-slate-300 leading-relaxed"><b className="text-white">Zero Sales Pitch.</b> Operate exclusively as an unbiased academic mentor. Map university USPs directly to identified pain points.</p>
                </div>
                <div className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={20} />
                    <p className="text-[13px] font-medium text-slate-300 leading-relaxed"><b className="text-white">70/30 Ratio Enforcement.</b> The prospect must speak 70% of the time. Your 30% should be targeted questions and precise solutions.</p>
                </div>
                <div className="flex items-start gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <CheckCircle2 className="text-blue-400 shrink-0 mt-0.5" size={20} />
                    <p className="text-[13px] font-medium text-slate-300 leading-relaxed"><b className="text-white">Intent Alignment.</b> If the prospect hesitates, pivot immediately back to the 'Why' discovered in Phase 2. Career outcomes drive conversions.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CounselorFlow;
