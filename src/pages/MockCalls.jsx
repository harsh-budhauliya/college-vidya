import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, BookOpen, Filter, GraduationCap, Banknote, ShieldCheck, ChevronRight, CheckCircle2, SlidersHorizontal, ArrowRight, Download, TrendingUp, PhoneCall, AlertCircle, X, CheckCircle, Info, Globe } from 'lucide-react';
import { universities } from '../data/universities';
import { useNavigate } from 'react-router-dom';

const expandText = (text) => {
    if (!text) return '';
    let t = text.toLowerCase();
    
    // Add abbreviations to full names
    t = t.replace(/\bartificial intelligence\b/g, 'artificial intelligence ai');
    t = t.replace(/\bmachine learning\b/g, 'machine learning ml');
    t = t.replace(/\bhuman resource(s)?\b/g, 'human resource hr');
    t = t.replace(/\binformation technology\b/g, 'information technology it');
    t = t.replace(/\bsupply chain\b/g, 'supply chain scm');
    t = t.replace(/\bjournalism\b/g, 'journalism jmc');
    t = t.replace(/\binternational business\b/g, 'international business ib');
    t = t.replace(/\bfull stack\b/g, 'full stack fs');
    
    // Add full names to abbreviations
    t = t.replace(/\bai\b/g, 'ai artificial intelligence');
    t = t.replace(/\bml\b/g, 'ml machine learning');
    t = t.replace(/\bhr\b/g, 'hr human resource');
    t = t.replace(/\bit\b/g, 'it information technology');
    t = t.replace(/\bscm\b/g, 'scm supply chain');
    t = t.replace(/\bib\b/g, 'ib international business');
    t = t.replace(/\bfs\b/g, 'fs full stack');
    
    return t;
};

const MockCalls = () => {
  const navigate = useNavigate();
  const [specSearch, setSpecSearch] = useState(() => sessionStorage.getItem('cvSearch') || '');
  const [levelFilter, setLevelFilter] = useState(() => sessionStorage.getItem('cvLevel') || 'All');
  const [budgetFilter, setBudgetFilter] = useState(() => sessionStorage.getItem('cvBudget') || 'All');

  React.useEffect(() => {
    sessionStorage.setItem('cvSearch', specSearch);
    sessionStorage.setItem('cvLevel', levelFilter);
    sessionStorage.setItem('cvBudget', budgetFilter);
  }, [specSearch, levelFilter, budgetFilter]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const quickSuggestions = ['MCA in AI', 'MBA Dual', 'BCA', 'Data Science', 'Zero EMI'];

  const filteredUniversities = useMemo(() => {
      const extractPrice = (priceStr) => {
          if (!priceStr) return 0;
          const match = priceStr.toString().match(/₹?([\d,]+)/);
          return match ? parseInt(match[1].replace(/,/g, ''), 10) : 0;
      };

      const checkBudget = (priceVal) => {
          if (budgetFilter === 'All') return true;
          if (!priceVal) return false;
          if (budgetFilter === '< ₹1L') return priceVal < 100000;
          if (budgetFilter === '< ₹1.5L') return priceVal <= 150000;
          if (budgetFilter === '< ₹2L') return priceVal <= 200000;
          if (budgetFilter === '₹1L - ₹2L') return priceVal >= 100000 && priceVal <= 200000;
          if (budgetFilter === '> ₹2L') return priceVal > 200000;
          return true;
      };

    return universities.filter(uni => {
      // Basic Filters
      if (levelFilter !== 'All') {
        if (levelFilter === 'Dual') {
            let hasDual = false;
            if (uni.extendedDetails?.programs) {
                hasDual = uni.extendedDetails.programs.some(prog => 
                    prog.name.toLowerCase().includes('dual') || 
                    (prog.specializations && prog.specializations.some(s => s.name.toLowerCase().includes('dual')))
                );
            } else if (uni.specializations) {
                hasDual = uni.specializations.some(s => s.toLowerCase().includes('dual'));
            }
            if (!hasDual && uni.name.toLowerCase().includes('dual')) hasDual = true;
            
            if (!hasDual) return false;
        } else {
            if (!uni.level.includes(levelFilter)) return false;
        }
      }

      if (budgetFilter !== 'All') {
          let hasAnyBudgetMatch = false;
          if (uni.extendedDetails?.programs) {
              for (const prog of uni.extendedDetails.programs) {
                  if (prog.specializations) {
                      if (prog.specializations.some(s => checkBudget(extractPrice(s.price)))) {
                          hasAnyBudgetMatch = true;
                          break;
                      }
                  } else if (prog.priceRange) {
                      if (checkBudget(extractPrice(prog.priceRange))) {
                          hasAnyBudgetMatch = true;
                          break;
                      }
                  }
              }
          } else {
             hasAnyBudgetMatch = checkBudget(uni.budget);
          }
          if (!hasAnyBudgetMatch) return false;
      }
      // Advanced Contextual Search Logic
      if (specSearch.trim()) {
        const stopWords = ['in', 'and', 'with', 'for', 'of', '&', 'a', 'the', '-'];
        const queryWords = specSearch.toLowerCase().split(/\s+/).filter(w => w && !stopWords.includes(w));
        
        let hasValidProgramMatch = false;
        const uniBaseText = expandText(`${uni.name} ${uni.location} ${uni.type} ${uni.ranking} ${uni.accreditation}`);

        if (uni.extendedDetails?.programs) {
            const validPrograms = uni.extendedDetails.programs.filter(prog => {
                if (levelFilter === 'All') return true;
                if (levelFilter === 'Dual') {
                    return prog.name.toLowerCase().includes('dual') || (prog.specializations && prog.specializations.some(s => s.name.toLowerCase().includes('dual')));
                }
                return prog.group === levelFilter;
            });
            
            if (validPrograms.length === 0 && queryWords.length > 0) return false;
            
            hasValidProgramMatch = validPrograms.some(prog => {
                if (prog.specializations) {
                    return prog.specializations.some(s => {
                        const sText = expandText(`${uniBaseText} ${prog.name} ${prog.name.replace(/\./g, '')} ${prog.group} ${s.name}`);
                        const textMatch = queryWords.every(w => sText.includes(w));
                        const budgetMatch = checkBudget(extractPrice(s.price));
                        return textMatch && budgetMatch;
                    });
                } else {
                    const progText = expandText(`${uniBaseText} ${prog.name} ${prog.name.replace(/\./g, '')} ${prog.group}`);
                    return queryWords.every(w => progText.includes(w)) && checkBudget(extractPrice(prog.priceRange));
                }
            });
        } else {
            const tagsText = expandText(uni.specializations.join(' '));
            hasValidProgramMatch = queryWords.every(w => uniBaseText.includes(w) || tagsText.includes(w)) && checkBudget(uni.budget);
        }

        if (!hasValidProgramMatch) return false;
      }
      return true;
    }).map(uni => {
       // Advanced UI Highlights
       let allAvailableTags = [];
       let minRelevantPrice = Infinity;
       
       const stopWords = ['in', 'and', 'with', 'for', 'of', '&', 'a', 'the', '-'];
       const queryWords = specSearch.trim().toLowerCase().split(/\s+/).filter(w => w && !stopWords.includes(w));
       const uniBaseText = expandText(`${uni.name} ${uni.location} ${uni.type} ${uni.ranking} ${uni.accreditation}`);
       
       if (uni.extendedDetails?.programs) {
           const validPrograms = uni.extendedDetails.programs.filter(prog => {
               if (levelFilter === 'All') return true;
               if (levelFilter === 'Dual') {
                   return prog.name.toLowerCase().includes('dual') || (prog.specializations && prog.specializations.some(s => s.name.toLowerCase().includes('dual')));
               }
               return prog.group === levelFilter;
           });
           validPrograms.forEach(prog => {
               if (prog.specializations) {
                   prog.specializations.forEach(s => {
                       const pVal = extractPrice(s.price);
                       if (checkBudget(pVal)) {
                           allAvailableTags.push(`${prog.name} in ${s.name}`);
                           
                           const sText = expandText(`${uniBaseText} ${prog.name} ${prog.name.replace(/\./g, '')} ${prog.group} ${s.name}`);
                           if (queryWords.length > 0) {
                               if (queryWords.every(w => sText.includes(w))) {
                                   if (pVal < minRelevantPrice && pVal > 0) minRelevantPrice = pVal;
                               }
                           } else {
                               if (pVal < minRelevantPrice && pVal > 0) minRelevantPrice = pVal;
                           }
                       }
                   });
               } else {
                   const pVal = extractPrice(prog.priceRange);
                   if (checkBudget(pVal)) {
                       allAvailableTags.push(prog.name);
                       const progText = expandText(`${uniBaseText} ${prog.name} ${prog.name.replace(/\./g, '')} ${prog.group}`);
                       if (queryWords.length > 0) {
                           if (queryWords.every(w => progText.includes(w))) {
                               if (pVal < minRelevantPrice && pVal > 0) minRelevantPrice = pVal;
                           }
                       } else {
                           if (pVal < minRelevantPrice && pVal > 0) minRelevantPrice = pVal;
                       }
                   }
               }
           });
       } else {
           allAvailableTags = [...uni.specializations];
           minRelevantPrice = typeof uni.budget === 'number' ? uni.budget : extractPrice(uni.budget) || Infinity;
       }
       
       if (minRelevantPrice === Infinity) {
           minRelevantPrice = typeof uni.budget === 'number' ? uni.budget : extractPrice(uni.budget) || 0;
       }
       
       let matchedSpecs = [];
       if (queryWords.length > 0) {
         const specRequiredWords = queryWords.filter(w => !uniBaseText.includes(w));
         
         if (specRequiredWords.length > 0) {
             matchedSpecs = allAvailableTags.filter(spec => 
                 specRequiredWords.every(w => expandText(spec).includes(w))
             );
         } else {
             matchedSpecs = allAvailableTags.filter(spec => 
                 queryWords.every(w => expandText(spec).includes(w) || uniBaseText.includes(w))
             );
         }
       }
       return { ...uni, matchedSpecs, displayTags: allAvailableTags, minRelevantPrice };
    }).sort((a, b) => a.minRelevantPrice - b.minRelevantPrice);
  }, [specSearch, levelFilter, budgetFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Immersive Search Console Hero - Advanced Terminal Style */}
      <div className="bg-[#0f172a] pt-32 pb-36 relative z-20 border-b border-slate-800 overflow-hidden">
         {/* Background Decorators */}
         <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0f172a]"></div>
         </div>

         <div className="bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-black text-center py-2 px-4 rounded flex items-center justify-center gap-2 tracking-widest uppercase relative z-10 mb-8 max-w-max mx-auto">
            <AlertCircle size={14} /> Live Training Console — Internal Use Only
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center mb-10">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                  Global <span className="text-blue-400">Program</span> Directory
               </h1>
               <p className="text-lg font-medium text-slate-400 mt-6 max-w-2xl leading-relaxed">
                  Query across <span className="text-slate-200 font-bold">{universities.length}+ institution databases</span> to construct highly accurate, unbiased pitches in real-time.
               </p>
            </div>

            {/* Giant Omni Search Bar */}
            <div className="max-w-3xl mx-auto relative group">
               <div className="relative bg-slate-800/80 rounded-xl flex flex-col sm:flex-row items-center p-2 shadow-2xl border border-slate-700 transition-all focus-within:border-blue-500 focus-within:bg-slate-800 z-20">
                  <div className="w-full flex items-center relative">
                     <div className="pl-4 pr-3">
                        <Search className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
                     </div>
                     <input
                        type="text"
                        placeholder="Search 'MCA in AI', 'Delhi'..."
                        value={specSearch}
                        onChange={(e) => setSpecSearch(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        className="w-full py-3 text-lg text-white font-bold bg-transparent outline-none placeholder:text-slate-500 tracking-tight"
                        autoFocus
                     />
                     <div className="hidden sm:flex pr-4 items-center gap-2">
                        <span className="px-2 py-1 bg-slate-700 rounded text-[10px] font-bold text-slate-400 border border-slate-600">Ctrl</span>
                        <span className="text-slate-500 font-bold text-xs">+</span>
                        <span className="px-2 py-1 bg-slate-700 rounded text-[10px] font-bold text-slate-400 border border-slate-600">K</span>
                     </div>
                  </div>
                  <button className="w-full sm:w-auto mt-2 sm:mt-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all mr-0 sm:mr-1 whitespace-nowrap border border-blue-500">
                     Execute Query
                  </button>
               </div>

               {/* Autocomplete Suggestions */}
               <AnimatePresence>
                 {isSearchFocused && !specSearch && (
                   <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 right-0 mt-3 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 z-50 text-left"
                   >
                      <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-3 pl-2 flex items-center gap-2"><TrendingUp size={12}/> Top Queries</p>
                      <div className="flex flex-wrap gap-2">
                        {quickSuggestions.map((s, i) => (
                           <button 
                             key={i} 
                             onMouseDown={(e) => { e.preventDefault(); setSpecSearch(s); setIsSearchFocused(false); }}
                             className="px-4 py-2 bg-slate-700/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-400 font-bold text-sm rounded-lg border border-slate-600 hover:border-blue-500/50 transition-colors"
                           >
                             {s}
                           </button>
                        ))}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-40 sticky top-[72px] mt-4">
        {/* Quick Filters Row - Clean and Professional */}
        <div className="bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] rounded-xl p-3 mb-8 flex flex-col md:flex-row items-center justify-center gap-6">
           {/* Filters */}
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
               <div className="flex items-center justify-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Level</span>
                  <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
                     {['All', 'UG', 'PG', 'Integrated', 'Dual'].map((lvl) => (
                        <button
                           key={lvl}
                           onClick={() => setLevelFilter(lvl)}
                           className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all duration-300 ${levelFilter === lvl ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900 border border-transparent'}`}
                        >
                           {lvl === 'All' ? 'Any' : lvl}
                        </button>
                     ))}
                  </div>
               </div>
               
               <div className="hidden sm:block w-px h-6 bg-slate-200"></div>

               <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2 shrink-0">Budget</span>
                  <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-200">
                     {['All', '< ₹1L', '< ₹1.5L', '< ₹2L', '> ₹2L'].map((bdg) => (
                        <button
                           key={bdg}
                           onClick={() => setBudgetFilter(bdg)}
                           className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all duration-300 ${budgetFilter === bdg ? 'bg-white text-blue-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-900 border border-transparent'}`}
                        >
                           {bdg === 'All' ? 'Any' : bdg}
                        </button>
                     ))}
                  </div>
               </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
           <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <CheckCircle2 className="text-blue-500" size={24} />
              {filteredUniversities.length} Validated Institutional Profiles
           </h2>
           {(specSearch || levelFilter !== 'All' || budgetFilter !== 'All') && (
              <button 
                 onClick={() => { setSpecSearch(''); setLevelFilter('All'); setBudgetFilter('All'); }}
                 className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2"
              >
                 <Filter size={14} /> Reset Query
              </button>
           )}
        </div>

        {/* Results Grid - High Density Vertical Cards (No Glow) */}
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
           {filteredUniversities.length > 0 ? (
              <motion.div 
                 key="grid"
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                    {filteredUniversities.map((uni, index) => (
                       <motion.div
                          key={uni.id}
                          layout
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          onClick={() => navigate(`/university-data/university/${uni.id}`)}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col group cursor-pointer"
                       >
                           {/* Premium Profile Card */}
                           <div className="flex flex-col relative h-full p-5 sm:p-6">
                              
                                {/* Header Section with Uniform Height */}
                                <div className="h-[140px] flex flex-col mb-4">
                                   {/* Top Info Tags */}
                                   <div className="flex items-center gap-2 mb-4 shrink-0">
                                      <div className="bg-emerald-500/10 text-emerald-600 text-[9px] font-black px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1">
                                         <ShieldCheck size={12}/> Verified
                                      </div>
                                      <div className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-slate-200">
                                         {uni.type}
                                      </div>
                                   </div>

                                   {/* Logo & Headline */}
                                   <div className="flex items-start gap-3">
                                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white shrink-0 rounded-xl p-1.5 border border-slate-200 shadow-sm flex items-center justify-center">
                                          <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                                      </div>
                                      <div className="flex flex-col min-w-0 flex-1">
                                         <h3 className="text-[16px] font-black text-slate-900 leading-snug mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2 break-words tracking-tight">
                                            {uni.name}
                                         </h3>
                                         <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold">
                                            <MapPin size={12} className="text-slate-400 shrink-0" /> <span className="truncate">{uni.location}</span>
                                         </div>
                                      </div>
                                   </div>
                                </div>

                                 {/* Clean Data Box Matrix */}
                                 <div className="grid grid-cols-2 gap-2 mb-5 shrink-0 h-[64px]">
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-center min-w-0">
                                       <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1 shrink-0"><Banknote size={12} className="text-blue-500"/> Est. Tuition</span>
                                       <span className="text-[13px] font-black text-slate-900 leading-tight line-clamp-1 break-words" title={uni.fees}>{uni.budget ? `Starting ₹${Number(uni.budget).toLocaleString('en-IN')}` : uni.fees}</span>
                                    </div>
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-center min-w-0">
                                       <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1 shrink-0"><TrendingUp size={12} className="text-blue-500"/> Max Package</span>
                                       <span className="text-[13px] font-black text-slate-900 leading-tight line-clamp-2 break-words" title={uni.placement}>{uni.placement.split('|')[1]?.trim() || uni.placement.split('|')[0]?.trim()}</span>
                                    </div>
                                 </div>

                                 {/* Specs Section Container */}
                                 <div className="flex-1 flex flex-col min-h-0 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1 shrink-0"><CheckCircle2 size={12}/> Query Matches</span>
                                    <div className="flex flex-col gap-2 overflow-hidden">
                                       {(() => {
                                          const matched = uni.matchedSpecs || [];
                                          const others = (uni.displayTags || uni.specializations).filter(s => !matched.includes(s));
                                          const displaySpecs = [...matched, ...others];
                                          return displaySpecs.slice(0, 3).map((spec, i) => {
                                             const isMatch = matched.includes(spec);
                                             return (
                                                 <span key={i} className={`text-[11px] font-semibold flex items-center gap-2 max-w-full truncate ${isMatch ? 'text-blue-700' : 'text-slate-600'}`}>
                                                     <div className={`w-1 h-1 rounded-full shrink-0 ${isMatch ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                                                     <span className="truncate">{spec}</span>
                                                 </span>
                                             );
                                          });
                                       })()}

                                    </div>
                                 </div>

                              {/* Bottom CTAs */}
                              <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-[auto_auto_1fr] gap-3">
                                  <button title="View Syllabus" onClick={(e) => e.stopPropagation()} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                                      <BookOpen size={16} />
                                  </button>
                                  {uni.url && (
                                     <button title="Official Website" onClick={(e) => { e.stopPropagation(); window.open(uni.url, '_blank'); }} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm">
                                         <Globe size={16} />
                                     </button>
                                  )}
                                  <button onClick={(e) => e.stopPropagation()} className="h-10 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[13px] rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm w-full">
                                      Terminal Access <ChevronRight size={16} />
                                  </button>
                              </div>
                           </div>
                       </motion.div>
                     ))}
                  </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="w-full py-32 rounded-3xl border-2 border-dashed border-slate-200 bg-white text-center flex flex-col items-center justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-[#f4f7fa] border border-slate-100 flex items-center justify-center mb-6">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">No Profiles Found</h3>
                <p className="text-slate-500 font-medium max-w-md text-center text-lg leading-relaxed">Relax the mock student's budget constraints or broaden the specialization search to find university matches.</p>
                <button 
                  onClick={() => {
                    setSpecSearch('');
                    setLevelFilter('All');
                    setBudgetFilter('All');
                  }}
                  className="mt-8 px-8 py-3.5 bg-primary-50 hover:bg-primary-100 text-primary-700 font-bold rounded-xl transition-colors shadow-sm ring-1 ring-primary-200"
                 >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default MockCalls;
