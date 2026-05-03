import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Banknote, MapPin, Search, GraduationCap, TrendingUp, BookOpen, AlertCircle, Info, CheckCircle, Navigation, ShieldCheck, Trophy, Eye, Download } from 'lucide-react';
import { universities } from '../data/universities';

const UniversityDetails = () => {
   const { uniId } = useParams();
   const navigate = useNavigate();
   const [selectedGroup, setSelectedGroup] = useState('UG');
   const [selectedProgram, setSelectedProgram] = useState(null);
   

   const uni = useMemo(() => {
     return universities.find(u => u.id === uniId);
   }, [uniId]);

   if (!uni) {
     return (
       <div className="pt-24 min-h-screen text-center flex flex-col items-center justify-center p-4 md:p-6 bg-slate-50">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-inner">
             <Search size={40} className="text-slate-400" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-3">University Not Found</h1>
          <p className="text-slate-500 font-medium mb-5 md:mb-8 max-w-md">The specific program or university record you're looking for does not exist in the training database.</p>
          <button onClick={() => navigate(-1)} className="px-4 lg:px-6 py-3 bg-[#0047ad] text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(0,71,173,0.3)] hover:scale-105 transition-all">
             Go Back to Console
          </button>
       </div>
     );
   }

   return (
       <div className="min-h-screen bg-slate-50 pb-24 font-inter text-slate-800">
           {/* Top Navigation Bar - Clean & Minimal */}
           <div className="h-[60px] bg-white border-b border-slate-200 sticky top-0 z-50 flex items-center px-4 lg:px-6 lg:px-12 shadow-sm">
               <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-[#0047ad] font-bold text-sm transition-colors group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Return to Directory
               </button>
               <div className="ml-auto flex items-center gap-4">
                  {uni.url && (
                     <button onClick={() => window.open(uni.url, '_blank')} className="text-xs bg-[#0056d2] hover:bg-[#0047ad] text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition-all shadow-[#0056d2]/20">
                        <Navigation size={14} /> Official Website
                     </button>
                  )}
                  <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 hidden sm:flex">
                     <AlertCircle size={14} /> System Online
                  </span>
               </div>
           </div>

           {/* Grand Header - Advanced Education Portal Style (No Glow) */}
           <div className="bg-[#0f172a] text-white border-b border-slate-800">
               <div className="max-w-[1400px] mx-auto px-4 lg:px-6 lg:px-12 py-8 lg:py-12">
                  {/* Breadcrumb / Top Meta */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-8">
                     <span>Directory</span>
                     <span className="text-slate-600">/</span>
                     <span>{uni.type}</span>
                     <span className="text-slate-600">/</span>
                     <span className="text-slate-300">{uni.name}</span>
                  </div>

                  <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 justify-between items-start">
                      <div className="flex-[1_1_auto] max-w-4xl">
                          <div className="flex flex-wrap items-center gap-3 mb-6">
                             <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black px-3 py-1.5 rounded-md flex items-center gap-1.5 uppercase tracking-widest shadow-sm"><ShieldCheck size={14}/> Verified Profile</span>
                             <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-black px-3 py-1.5 rounded-md uppercase tracking-widest shadow-sm">{uni.type}</span>
                             <span className="text-slate-400 border border-slate-700 bg-slate-800/50 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-widest flex items-center gap-1.5 shadow-sm"><MapPin size={14}/> {uni.location}</span>
                          </div>
                          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">{uni.name}</h1>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-[12px] font-bold uppercase tracking-widest">
                             {uni.accreditation.split(',').map((acc, idx) => (
                                 <span key={idx} className="text-slate-300 bg-slate-800/80 px-3 py-2 rounded-md border border-slate-700 shadow-sm">{acc.trim()}</span>
                             ))}
                          </div>
                      </div>

                      {/* Quick Stats Grid - Data Dense */}
                      <div className="w-full xl:w-[480px] shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex flex-col justify-center">
                             <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Banknote size={14} className="text-emerald-400"/> Est. Tuition Band</span>
                             <span className="text-xl md:text-2xl font-black text-white tracking-tight">{uni.fees}</span>
                          </div>
                          <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex flex-col justify-center">
                             <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><TrendingUp size={14} className="text-blue-400"/> Placement & Support</span>
                             <span className="text-base md:text-lg font-bold text-white leading-snug">{uni.placement}</span>
                          </div>
                          <div className="sm:col-span-2 bg-blue-600/10 border border-blue-500/20 p-5 rounded-xl flex flex-col justify-center">
                             <span className="text-[10px] text-blue-300 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Trophy size={14} className="text-blue-400"/> Global Recognition Rank</span>
                             <span className="text-base md:text-lg font-bold text-blue-50 leading-snug">{uni.ranking}</span>
                          </div>
                      </div>
                  </div>
               </div>
           </div>

           {/* Console Body - Relaxed layout, no harsh 'dabe' boxes */}
           <div className="max-w-[1400px] mx-auto px-4 lg:px-6 lg:px-12 pt-6 md:pt-12">
               <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 lg:gap-10 items-start">
                  
                  {/* LEFT COLUMN: Data Layout */}
                  <div className="space-y-10">
                      
                      {/* Catalog Engine */}
                      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 sm:p-5 md:p-8">
                          <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-5 md:mb-8 pb-4 border-b border-slate-100">
                             <GraduationCap className="text-[#0047ad]" size={18}/> Program & Elective Catalog
                          </h3>
                          
                          <div>
                              {uni.extendedDetails?.programs ? (
                                 <div className="flex flex-col gap-4 md:p-6">
                                    {/* Level 1: Tab System - softer and cleaner */}
                                    <div className="flex flex-wrap border-b border-slate-200 gap-4 sm:gap-4 sm:p-5 md:p-8">
                                       <button 
                                          onClick={() => { setSelectedGroup('UG'); setSelectedProgram(null);  }}
                                          className={`py-3 text-xs sm:text-[13px] font-black uppercase tracking-widest transition-all border-b-2 mb-[-1px] ${selectedGroup === 'UG' ? 'border-[#0047ad] text-[#0047ad]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                       >Undergraduate (UG)</button>
                                       <button 
                                          onClick={() => { setSelectedGroup('PG'); setSelectedProgram(null);  }}
                                          className={`py-3 text-xs sm:text-[13px] font-black uppercase tracking-widest transition-all border-b-2 mb-[-1px] ${selectedGroup === 'PG' ? 'border-[#0047ad] text-[#0047ad]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                       >Postgraduate (PG)</button>
                                       {uni.extendedDetails.programs.some(p => p.group === 'Integrated') && (
                                       <button 
                                          onClick={() => { setSelectedGroup('Integrated'); setSelectedProgram(null);  }}
                                          className={`py-3 text-xs sm:text-[13px] font-black uppercase tracking-widest transition-all border-b-2 mb-[-1px] ${selectedGroup === 'Integrated' ? 'border-[#0047ad] text-[#0047ad]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                       >Integrated</button>
                                       )}
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-5 md:p-8 mt-2">
                                        {/* Level 2: List of Programs */}
                                        <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 flex flex-col gap-3">
                                           {uni.extendedDetails.programs.filter(p => p.group === selectedGroup).map((prog, i) => {
                                              const isProgSelected = selectedProgram?.name === prog.name;
                                              return (
                                                 <div key={i} className={`border transition-all overflow-hidden ${isProgSelected ? 'border-slate-800 rounded-xl shadow-md bg-slate-900' : 'border-slate-200 rounded-lg hover:border-slate-300 shadow-sm bg-white'}`}>
                                                    {/* Program Row */}
                                                    <button 
                                                       onClick={() => {
                                                          setSelectedProgram(isProgSelected ? null : prog);
                                                       }}
                                                       className={`w-full text-left px-4 sm:px-5 py-4 flex justify-between items-center transition-colors ${isProgSelected ? 'bg-slate-900' : 'bg-white hover:bg-slate-50'}`}
                                                    >
                                                       <div className="flex items-center gap-3 sm:gap-4 pr-2">
                                                          <div className={`flex w-10 h-10 rounded-md items-center justify-center shrink-0 border ${isProgSelected ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                                                              <BookOpen size={18} className={isProgSelected ? 'text-[#3b82f6]' : 'text-slate-400'} />
                                                          </div>
                                                          <div className="flex flex-col">
                                                             <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${isProgSelected ? 'text-[#3b82f6]' : 'text-slate-500'}`}>{prog.duration} • {prog.specializations?.length || 0} Options</span>
                                                             <span className={`text-[15px] sm:text-[17px] font-black leading-tight ${isProgSelected ? 'text-white' : 'text-slate-900'}`}>{prog.name}</span>
                                                          </div>
                                                       </div>
                                                       <div className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center transition-transform ${isProgSelected ? 'bg-slate-800 text-white shadow-sm rotate-90 border border-slate-700' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                                          <ArrowRight size={16} className={isProgSelected ? "rotate-90" : ""} />
                                                       </div>
                                                    </button>

                                                    {/* Level 3: Specializations Expanded Grid */}
                                                    {isProgSelected && prog.specializations && (
                                                       <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-700 flex flex-col gap-2">
                                                          {prog.specializations.map((spec, j) => {
                                                              return (
                                                                 <button 
                                                                    key={j}
                                                                    onClick={() => navigate(`/university-data/university/${uniId}/program/${encodeURIComponent(prog.name)}/specialization/${encodeURIComponent(spec.name)}`)}
                                                                    className="w-full text-left px-4 py-3.5 rounded-lg border border-slate-200 bg-white shadow-sm hover:border-[#0047ad] hover:shadow-md transition-all group flex items-center justify-between gap-3"
                                                                 >
                                                                    <span className="text-[13px] sm:text-[14px] font-bold text-slate-800 group-hover:text-[#0047ad] line-clamp-2 pr-2 flex-1">
                                                                        {spec.name}
                                                                    </span>
                                                                    <div className="flex items-center gap-3 shrink-0">
                                                                        {(spec.price || prog.priceRange) && (
                                                                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-md whitespace-nowrap">
                                                                                {spec.price || prog.priceRange}
                                                                            </span>
                                                                        )}
                                                                        <ArrowRight size={14} className="text-slate-300 group-hover:text-[#0047ad] transition-colors hidden sm:block" />
                                                                    </div>
                                                                 </button>
                                                              );
                                                          })}
                                                       </div>
                                                    )}
                                                 </div>
                                              )
                                           })}
                                        </div>

                                        <div className="w-full flex-1">
                                           {selectedProgram ? (
                                             <div className="h-full min-h-[300px] border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 p-4 sm:p-5 md:p-8 flex flex-col items-center justify-center text-center">
                                                <TrendingUp size={32} className="text-slate-300 mb-4" />
                                                <h4 className="text-[15px] font-black text-slate-700 mb-2">Select an Elective</h4>
                                                <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[220px]">Choose a specialization from the {selectedProgram.name} list to reveal metrics.</p>
                                             </div>
                                          ) : (
                                             <div className="h-full min-h-[300px] border border-slate-200 rounded-2xl bg-white p-4 sm:p-5 md:p-8 flex flex-col items-center justify-center text-center">
                                                <Search size={32} className="text-slate-200 mb-4" />
                                                <h4 className="text-[15px] font-black text-slate-400">No Program Selected</h4>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 <div className="flex flex-wrap gap-3 mt-4">
                                    {uni.specializations.map((spec, i) => (
                                       <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-bold rounded-lg shadow-sm">
                                          {spec}
                                       </span>
                                    ))}
                                 </div>
                              )}
                          </div>
                      </div>

                      {/* Hard Data Rows - But styled beautifully without harsh "dabe" boxes */}
                      {uni.extendedDetails && (
                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:p-5 md:p-8">
                            
                            {/* Key Propositions Box */}
                            {uni.extendedDetails.usps && uni.extendedDetails.usps.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-4 sm:p-5 md:p-8 lg:col-span-2">
                                    <h3 className="text-[13px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-5 md:mb-8 pb-4 border-b border-slate-100">
                                       <BookOpen className="text-emerald-500" size={18}/> Key Propositions & Validation
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-6">
                                       {uni.extendedDetails.usps.map((usp, i) => (
                                          <div key={i} className="flex gap-4 items-start group">
                                             <div className="mt-0.5 text-[#0047ad] bg-blue-50 p-1 rounded-md shrink-0">
                                                <CheckCircle2 size={16} />
                                             </div>
                                             <div className="text-slate-700 font-medium text-[15px] leading-relaxed">
                                                {usp}
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                </div>
                            )}

                            {/* Financial Operations Box */}
                            <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-5 md:p-8 border border-slate-200 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2 mb-6">
                                   <Banknote className="text-emerald-500" size={16}/> Financial Ledger
                                </h3>
                                <div className="flex flex-col gap-3 h-full">
                                   <div className="bg-slate-50/80 p-5 rounded-xl border border-slate-200 payment-html-wrapper text-sm font-medium text-slate-700 h-full" dangerouslySetInnerHTML={{__html: uni.extendedDetails.payment}}></div>
                                   <style dangerouslySetInnerHTML={{__html: `
                                       .payment-html-wrapper b { color: #0f172a; display: inline-block; font-weight: 800; font-size: 14px; margin-bottom: 6px; }
                                       .payment-html-wrapper br { margin-bottom: 10px; content: ""; display: block; }
                                   `}} />
                                </div>
                            </div>

                            {/* Exam Protocols Box */}
                            <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-5 md:p-8 border border-slate-200 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                                <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] flex items-center gap-2 mb-6">
                                   <CheckCircle className="text-blue-500" size={16}/> Exam Protocols
                                </h3>
                                
                                <div className="flex flex-col gap-4 mt-auto">
                                    {/* Assessment Card */}
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm shrink-0">
                                            <Trophy size={20} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                                                ASSESSMENT SPLIT
                                            </div>
                                            <div className="text-slate-800 font-bold text-sm leading-relaxed">
                                                {uni.extendedDetails.examination.split('|')[0]}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Passing Criteria Card */}
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex items-start gap-4">
                                        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm shrink-0">
                                            <ShieldCheck size={20} className="text-emerald-500" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                                                PASSING CRITERIA
                                            </div>
                                            <div className="text-slate-800 font-bold text-sm leading-relaxed">
                                                {uni.extendedDetails.examination.split('|')[1] || uni.extendedDetails.examination.split('.')[1] + '.'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                         </div>
                      )}
                  </div>

                  {/* RIGHT COLUMN: Action Pane - Strict Analytics Style */}
                  <div className="w-full">
                      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 sticky top-[100px] shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-black text-slate-900 tracking-tight">Executive Action</h3>
                              <span className="flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                              </span>
                          </div>
                          
                          <p className="text-slate-500 text-[13px] font-medium leading-relaxed mb-6">Pipeline ready for {uni.name}. System awaiting credential validation.</p>
                          
                          <div className="space-y-3">
                             <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[14px] py-3.5 rounded-lg transition-colors border border-slate-900 flex justify-center items-center gap-2">
                                 Trigger Secure Pitch <ArrowRight size={16}/>
                             </button>

                             {uni.brochure && (
                                 <div className="flex gap-2 mt-3">
                                     <button 
                                         onClick={() => window.open(uni.brochure, '_blank')}
                                         className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[13px] py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2"
                                     >
                                         <Eye size={16} /> View Brochure
                                     </button>
                                     <a 
                                         href={uni.brochure} 
                                         download
                                         className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[13px] py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2"
                                     >
                                         <Download size={16} /> Download
                                     </a>
                                 </div>
                             )}
                          </div>

                          {uni.extendedDetails?.leadLocking && (
                             <div className="mt-8 bg-amber-50/50 border border-amber-200/60 p-5 rounded-xl">
                                <span className="text-[10px] text-amber-600 font-black uppercase tracking-widest block mb-3 flex items-center gap-1.5"><AlertCircle size={14}/> Critical Directive</span>
                                <div className="text-slate-800 font-medium text-[13px] leading-relaxed payment-html-wrapper" dangerouslySetInnerHTML={{__html: uni.extendedDetails.leadLocking}}></div>
                             </div>
                          )}
                      </div>
                  </div>

               </div>
           </div>
       </div>
   );
};

export default UniversityDetails;
