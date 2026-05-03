import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, Briefcase, GraduationCap, Star, BookOpen, Clock, ShieldCheck, CheckCircle2, Navigation, Award, Eye, Download } from 'lucide-react';
import { universities } from '../data/universities';

const SpecializationDetails = () => {
    const { uniId, programName, specName } = useParams();
    const navigate = useNavigate();
    
    // State for dual pricing toggle (defaults to multi-cert if available)
    const [activeCertTrack, setActiveCertTrack] = useState('multi');

    const decodedProgName = decodeURIComponent(programName);
    const decodedSpecName = decodeURIComponent(specName);

    const uni = universities.find(u => u.id === uniId);
    
    if (!uni) {
        return <div className="p-8 text-center text-slate-500 font-bold min-h-screen flex items-center justify-center bg-[#f4f7fa]">University Not Found.</div>;
    }

    const prog = uni.extendedDetails?.programs?.find(p => p.name === decodedProgName);
    if (!prog) {
        return <div className="p-8 text-center text-slate-500 font-bold min-h-screen flex items-center justify-center bg-[#f4f7fa]">Program Not Found.</div>;
    }

    const spec = prog.specializations?.find(s => s.name === decodedSpecName) || { name: decodedSpecName, details: "Specialization details currently being updated.", price: prog.fee || "As per plan", duration: prog.duration };
    const brochureLink = spec?.brochure || prog?.brochure || uni?.brochure;

    return (
        <div className="min-h-screen bg-[#f4f7fa] text-slate-800 font-inter pb-24">
            
            {/* Strict Solid Header Navigation */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-slate-200 px-4 xl:px-8 h-[60px] flex items-center shadow-sm">
                <button 
                   onClick={() => navigate(-1)} 
                   className="flex items-center gap-2 text-slate-500 hover:text-[#0047ad] font-bold text-sm transition-colors"
                >
                   <ArrowLeft size={18} />
                   Directory
                </button>
                <div className="mx-auto flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-widest hidden sm:flex">
                    <span className="text-[#0047ad]">{uni.name}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-[#0047ad]">{prog.name}</span>
                    <span className="text-slate-300">/</span>
                    <span>{spec.name}</span>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-4 xl:px-8 py-8 md:py-10">
                
                {/* Professional Data Header */}
                <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-20 h-20 bg-white rounded-lg p-2 shrink-0 border border-slate-200 flex items-center justify-center">
                        <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="px-2.5 py-1 bg-[#0047ad]/10 rounded text-[11px] font-bold uppercase tracking-widest text-[#0047ad] flex items-center gap-1.5">
                                <GraduationCap size={14} /> {prog.name}
                            </span>
                            <span className="px-2.5 py-1 bg-[#ff6b00]/10 rounded text-[11px] font-bold uppercase tracking-widest text-[#ff6b00]">
                                Specialization
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{spec.name}</h1>
                        <div 
                            className="text-slate-600 font-medium text-base md:text-lg leading-relaxed max-w-3xl border-l-4 border-[#0047ad] pl-4 rendering-html"
                            dangerouslySetInnerHTML={{__html: spec.details}}
                        />
                    </div>
                </div>
                
                {/* Strict Two-Column CRM Ledger Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
                    
                    {/* LEFT COLUMN: Data Payload */}
                    <div className="space-y-6">
                        
                        {/* Quick Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#f4f7fa] flex items-center justify-center shrink-0 border border-slate-100">
                                    <Clock size={22} className="text-[#0047ad]" />
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Total Duration</span>
                                    <div className="text-xl font-black text-slate-800">{spec.duration || prog.duration}</div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#ff6b00]/5 flex items-center justify-center shrink-0 border border-[#ff6b00]/10">
                                    <Banknote size={22} className="text-[#ff6b00]" />
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Total Investment</span>
                                    <div className="text-[17px] font-black text-slate-800 tracking-tight">
                                        {spec.price1Cert ? (activeCertTrack === '1cert' ? spec.price1Cert : (spec.price3Cert || spec.price2Cert)) : spec.price}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(spec.eligibility || prog.eligibility || uni.eligibility) && (
                            <div className="bg-blue-50 border border-[#0047ad]/20 rounded-xl p-5 shadow-sm flex items-start gap-4">
                                <div className="mt-0.5 w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#0047ad]/10 shadow-sm">
                                    <CheckCircle2 size={20} className="text-[#0047ad]" />
                                </div>
                                <div>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-[#0047ad] block mb-1">Minimum Eligibility Requirement</span>
                                    <div className="text-[14px] font-bold text-slate-800 leading-relaxed">{spec.eligibility || prog.eligibility || uni.eligibility}</div>
                                </div>
                            </div>
                        )}

                        {/* Why & What Section */}
                        {(spec.about || prog.about || spec.careerScope || prog.careerScope) && (
                            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                                <div className="bg-[#f4f7fa] border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-[#0047ad]" />
                                    <h5 className="text-[13px] font-black uppercase tracking-widest text-[#0047ad]">Pitch Strategy: Overview & Market</h5>
                                </div>
                                <div className="p-6 md:p-8 space-y-6">
                                    {(spec.about || prog.about) && (
                                        <div>
                                            <strong className="text-slate-800 text-sm font-black uppercase tracking-wider block mb-2">Program Overview</strong>
                                            <p className="text-slate-600 text-[14px] leading-relaxed">{spec.about || prog.about}</p>
                                        </div>
                                    )}
                                    {(spec.careerScope || prog.careerScope) && (
                                        <div className="bg-white border border-slate-100 rounded-lg p-5 border-l-4 border-l-[#ff6b00]">
                                            <strong className="text-slate-800 text-sm font-black block mb-2 flex items-center gap-2">
                                                <Briefcase size={16} className="text-[#ff6b00]" /> Career Opportunities & Demand
                                            </strong>
                                            <p className="text-slate-600 text-[14px] leading-relaxed mb-4">{spec.careerScope || prog.careerScope}</p>
                                            
                                            {spec.jobRoles && spec.jobRoles.length > 0 && (
                                                <div className="pt-4 border-t border-slate-100">
                                                    <strong className="text-slate-800 text-[11px] font-black uppercase tracking-widest block mb-3">Top Target Roles</strong>
                                                    <div className="flex flex-wrap gap-2">
                                                        {spec.jobRoles.map((role, idx) => (
                                                            <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[12px] font-bold rounded shadow-sm">
                                                                {role}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* USPs & Certifications */}
                        {(spec.usps || prog.usps || uni.extendedDetails?.usps || spec.certifications || prog.certifications) && (
                            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                                <div className="bg-[#f4f7fa] border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                                    <Star size={18} className="text-[#0047ad]" />
                                    <h5 className="text-[13px] font-black uppercase tracking-widest text-[#0047ad]">Key Selling Points</h5>
                                </div>
                                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {(spec.usps || prog.usps || uni.extendedDetails?.usps) && (
                                        <div>
                                            <strong className="text-slate-800 text-sm font-black uppercase tracking-wider block mb-4">Official USPs</strong>
                                            <ul className="space-y-3">
                                                {(spec.usps || prog.usps || uni.extendedDetails?.usps).slice(0, 6).map((usp, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <CheckCircle2 size={16} className="text-[#0047ad] shrink-0 mt-0.5" />
                                                        <span className="text-slate-600 text-[13px] leading-relaxed">{usp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {(spec.certifications || prog.certifications) && (
                                        <div>
                                            <strong className="text-slate-800 text-sm font-black uppercase tracking-wider block mb-4">Embedded Certifications</strong>
                                            <div className="bg-white border border-slate-100 rounded-lg p-4 border-l-4 border-l-[#0047ad]">
                                                <p className="text-slate-600 text-[13px] leading-relaxed">{spec.certifications || prog.certifications}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Standardized Syllabus Table-like Structure */}
                        {(spec.syllabus || prog.syllabus) && (
                            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                                <div className="bg-[#0047ad] px-6 py-4 flex items-center gap-2">
                                    <BookOpen size={18} className="text-white" />
                                    <h5 className="text-[13px] font-black uppercase tracking-widest text-white">Syllabus Details</h5>
                                </div>
                                <div className={Array.isArray(spec.syllabus || prog.syllabus) ? "grid grid-cols-1 sm:grid-cols-2" : ""}>
                                    {Array.isArray(spec.syllabus || prog.syllabus) ? (
                                        (spec.syllabus || prog.syllabus).map((sem, i) => (
                                            <div key={i} className={`p-6 border-slate-100 ${i % 2 === 0 ? 'border-r' : ''} ${i < (spec.syllabus || prog.syllabus).length - 2 ? 'border-b' : ''} hover:bg-slate-50 transition-colors`}>
                                                <strong className="text-[#0047ad] text-xs font-black uppercase tracking-widest block mb-4">{sem.semester}</strong>
                                                <ul className="text-slate-600 text-[13px] leading-relaxed space-y-2">
                                                    {sem.subjects.map((sub, j) => (
                                                        <li key={j} className="flex items-start gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-[#ff6b00] shrink-0 mt-2"></div>
                                                            {sub}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6">
                                            <p className="text-slate-600 text-[14px] leading-relaxed font-medium">{spec.syllabus || prog.syllabus}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                    </div>

                    {/* RIGHT COLUMN: Ledger Checkout Terminal */}
                    <div className="sticky top-[150px] space-y-4">
                        {/* Primary Investment Card */}
                        {(spec.paymentDetails || prog.paymentDetails || uni.extendedDetails?.payment) ? (
                            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                                
                                {/* Dual Pricing Logic & Slashed Price */}
                                {spec.originalPrice && spec.price1Cert && (spec.price3Cert || spec.price2Cert) ? (
                                    <div className="bg-[#f4f7fa] border-b border-slate-200 p-1 flex flex-col">
                                        <div className="flex w-full bg-slate-200/50 p-1 rounded-lg mb-4">
                                            <button 
                                                onClick={() => setActiveCertTrack('1cert')}
                                                className={`flex-1 py-2 text-[11px] font-black uppercase tracking-widest rounded-md transition-all ${activeCertTrack === '1cert' ? 'bg-white text-[#0047ad] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                1 Certification
                                            </button>
                                            <button 
                                                onClick={() => setActiveCertTrack('multi')}
                                                className={`flex-1 py-2 text-[11px] font-black uppercase tracking-widest rounded-md transition-all ${activeCertTrack === 'multi' ? 'bg-[#0047ad] text-white shadow-sm border border-[#00388a]' : 'text-slate-500 hover:text-slate-700'}`}
                                            >
                                                {spec.price3Cert ? '3 Certifications' : '2 Certifications'}
                                            </button>
                                        </div>
                                        <div className="text-center pb-3">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <del className="text-slate-400 font-semibold text-sm">{spec.originalPrice}</del>
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-black uppercase tracking-widest border border-green-200">Early Bird Discount</span>
                                            </div>
                                            <div className="text-2xl font-black text-slate-900 tracking-tight">
                                                {activeCertTrack === '1cert' ? spec.price1Cert : (spec.price3Cert || spec.price2Cert)}
                                            </div>
                                        </div>
                                    </div>
                                ) : spec.originalPrice ? (
                                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex flex-col items-center justify-center text-center">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Course Fee</h5>
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <del className="text-slate-400 font-semibold text-sm">{spec.originalPrice}</del>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-black uppercase tracking-widest border border-green-200">Discount Applied</span>
                                        </div>
                                        <div className="text-[18px] md:text-2xl font-black text-slate-900 tracking-tight leading-snug">{spec.price}</div>
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col items-center justify-center text-center">
                                        <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Course Fee</h5>
                                        <div className="text-[18px] md:text-xl font-black text-slate-900 tracking-tight leading-snug">{spec.price}</div>
                                    </div>
                                )}
                                
                                <div className="p-6 space-y-6">
                                    <div>
                                        <strong className="text-[11px] font-black uppercase tracking-[0.15em] text-[#0047ad] block mb-3 text-center border-b border-slate-100 pb-2">Fee Ledger Details</strong>
                                        
                                        <div className="text-slate-700 text-[14px] leading-relaxed space-y-3 payment-html-wrapper" dangerouslySetInnerHTML={{__html: (activeCertTrack === '1cert' && spec.paymentDetails1Cert) ? spec.paymentDetails1Cert : (activeCertTrack === 'multi' ? (spec.paymentDetails3Cert || spec.paymentDetails2Cert || spec.paymentDetails) : (spec.paymentDetails || prog.paymentDetails || uni.extendedDetails?.payment)) }}></div>
                                        <style dangerouslySetInnerHTML={{__html: `
                                            .payment-html-wrapper b { color: #1e293b; display: inline-block; font-weight: 800; font-size: 13px; }
                                            .payment-html-wrapper strike { color: #94a3b8; font-size: 12px; margin-right: 6px; }
                                            .payment-html-wrapper i { color: #64748b; font-size: 11px; display: block; margin-top: 12px; padding-top: 12px; border-top: 1px dashed #e2e8f0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; font-style: normal; }
                                        `}} />
                                    </div>

                                    <div className="pt-2">
                                        <button 
                                            onClick={() => window.open(uni.applicationLink || uni.url, '_blank')}
                                            className="w-full bg-[#ff6b00] hover:bg-[#e05e00] text-white font-black py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span>Send Application Link</span>
                                            <Navigation size={16} />
                                        </button>
                                        
                                        {brochureLink && (
                                            <div className="flex gap-2 mt-3">
                                                <button 
                                                    onClick={() => window.open(brochureLink, '_blank')}
                                                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[13px] py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Eye size={16} /> View Brochure
                                                </button>
                                                <a 
                                                    href={brochureLink} 
                                                    download
                                                    className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[13px] py-3.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Download size={16} /> Download
                                                </a>
                                            </div>
                                        )}
                                        <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-widest font-bold">Auto-Locks LSQ Profile to {uni.name.substring(0, 10)}...</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-200 rounded-xl p-8 text-slate-400 text-center shadow-sm">
                                <Banknote size={40} className="mx-auto mb-4 text-slate-200" />
                                <h5 className="text-[12px] font-black uppercase tracking-widest mb-2 text-slate-500">Fee Ledger</h5>
                                <p className="text-[13px]">Standard fee structures apply. Consult master catalog.</p>
                            </div>
                        )}
                        
                        {/* Assurances */}
                        <div className="bg-[#f4f7fa] border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                             <div className="inline-flex w-10 h-10 bg-white rounded-full items-center justify-center text-[#0047ad] mb-3 shadow-sm border border-slate-100">
                                 <ShieldCheck size={20} />
                             </div>
                             <h6 className="text-xs font-black uppercase tracking-widest text-[#0047ad] mb-1">100% Verified Data</h6>
                             <p className="text-[11px] text-slate-500 font-medium leading-relaxed">This ledger uses exact university endpoints. Do not commit amounts off-script.</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default SpecializationDetails;
