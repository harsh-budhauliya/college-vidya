import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
    const { universities } = await import(pathToFileURL('./src/data/universities.js').href);
    
    let targetIdx = universities.findIndex(u => u.name.toLowerCase().includes('chandigarh') || u.id === 'cu' || u.id === 'cu-online');
    
    function formatMoney(amount) {
        if (typeof amount === 'string') return amount;
        return '₹' + amount.toLocaleString('en-IN');
    }

    function generateTable(totalFeeBlock, durationMonths, examFeeYear = 2500, registrationFee = 1000) {
        let totalFee = typeof totalFeeBlock === 'number' ? totalFeeBlock : parseInt(totalFeeBlock.toString().replace(/[^0-9]/g, '')) || 0;
        let semesters = durationMonths / 6;
        let semFee = totalFee > 0 && semesters > 0 ? Math.round(totalFee / semesters) : null;
        let annualFee = semFee ? semFee * 2 : null;
        
        let semline = semFee ? `<tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Per Semester Tuition Fee</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(semFee)}</td>
      </tr>` : "";
      
        let annualLine = annualFee ? `<tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Annual Tuition Fee</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(annualFee)}</td>
      </tr>` : "";

        return `<div style="font-family: 'Inter', sans-serif; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
  <div style="background: #f1f5f9; color: #475569; font-weight: 600; padding: 8px 12px; border-radius: 6px; display: inline-block; margin-bottom: 16px; font-size: 13px; border: 1px solid #cbd5e1;">
    Standard Institutional Fee Structure
  </div>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <thead>
      <tr style="border-bottom: 2px solid #e2e8f0; text-align: left; color: #475569;">
        <th style="padding: 10px 8px; font-weight: 600;">Fee Structure Component</th>
        <th style="padding: 10px 8px; font-weight: 600;">Investment Matrix</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Registration Fee</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(registrationFee)} <span style="font-size:11px; color:#64748b;">(One-Time)</span></td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Examination Fee</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(examFeeYear)} / Year</td>
      </tr>
      ${semline}
      ${annualLine}
      <tr>
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Total Course Lumpsum <br/><span style="font-size: 11px; color: #64748b;">(Includes base tuition)</span></td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 700; font-size: 16px;">${formatMoney(totalFee)}</td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top: 12px; font-size: 11px; color: #ef4444; font-weight: 600;">* Early Bird Scholarships (up to 20-25%) may apply based on intake.</div>
</div>`;
    }

    const cuData = {
        id: "cu",
        name: "Chandigarh University (CU) Online",
        logo: "https://ui-avatars.com/api/?name=Chandigarh+University&background=000&color=fff&size=150",
        location: "Chandigarh, Punjab",
        type: "Private University",
        level: ["UG", "PG"],
        budget: 156000,
        specializations: ["MBA", "MCA", "M.Sc", "MA", "BBA", "BCA", "BAJMC", "MAJMC"],
        accreditation: "NAAC A+ | NIRF Top Ranked | QS World Ranking #1",
        fees: "Semester / Annual Options",
        placement: "Dedicated Placement Support",
        eligibility: "UG: 10+2 | PG: Graduation",
        ranking: "QS World #1 (Among Private Indian Universities)",
        exams: "Blended 70:30 Evaluation Model",
        extendedDetails: {
            examination: "30% Continuous Assessment and 70% Proctored Online Exams. Passing Criteria natively maintained actively at 40%.",
            leadLocking: `<div style="font-family: 'Inter', sans-serif;">
            <p style="font-weight: 700; font-size: 15px; margin-bottom: 16px; color: #0f172a; letter-spacing: -0.01em;">Chandigarh University Highlights:</p>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">1. QS World Ranking #1 (Private)</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Explicitly ranked as the #1 Private University natively by QS World Rankings guaranteeing absolute peak corporate recognition.</p>
            </details>
            
            <p style="margin-top: 16px; font-weight: 500; font-size: 13px; color: #64748b; padding-top: 4px;">Auto Lock lead mapping rigorously set to <strong style="color:#0f172a; background: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-family: monospace;">LSQ = CU</strong></p>
            </div>`,
            payment: "Registration effectively at exactly INR 1,000 continuously. Exam schedules stand fundamentally scaled at precisely INR 2,500/Year.",
            programs: [
                {
                    group: "UG", name: "BA Journalism & Mass Comm.", duration: "36", priceRange: "₹1,02,000",
                    specializations: [
                        { name: "Digital Media", priceVal: 102000, career: "Digital Media Exec", desc: "Duration: 3 years. Eligibility: 10+2." },
                        { name: "Public Relations", priceVal: 102000, career: "PR Executive", desc: "Duration: 3 years. Eligibility: 10+2." },
                        { name: "Advertising", priceVal: 102000, career: "Ad Executive", desc: "Duration: 3 years. Eligibility: 10+2." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Comprehensive media curriculum.", "Up to 25% Early Bird discount."],
                        duration: "36 Months", eligibility: "10+2 or Equivalent", paymentDetails: generateTable(s.priceVal, 36),
                        brochure: "/brochures/cu-ba-jmc.pdf"
                    }))
                },
                {
                    group: "UG", name: "BBA", duration: "36", priceRange: "₹1,56,000",
                    specializations: [
                        { name: "Marketing", priceVal: 156000, career: "Marketing Executive" },
                        { name: "Finance", priceVal: 156000, career: "Financial Analyst" },
                        { name: "Human Resource Management", priceVal: 156000, career: "HR Executive" },
                        { name: "International Business", priceVal: 156000, career: "IB Executive" },
                        { name: "General Management", priceVal: 156000, career: "Management Trainee" },
                        { name: "Digital Marketing", priceVal: 156000, career: "Digital Marketer" },
                        { name: "Business Analytics", priceVal: 156000, career: "Business Analyst" },
                        { name: "FinTech", priceVal: 156000, career: "Fintech Professional" },
                        { name: "Retail and E-Commerce", priceVal: 156000, career: "Retail Executive" },
                        { name: "Brand Management", priceVal: 156000, career: "Brand Executive" },
                        { name: "Artificial Intelligence", priceVal: 156000, career: "AI Project Coordinator" },
                        { name: "Information Technology", priceVal: 156000, career: "IT Executive" },
                        { name: "Logistics and Supply Chain Management", priceVal: 156000, career: "Supply Chain Executive" },
                        { name: "Operations Management", priceVal: 156000, career: "Operations Executive" },
                        { name: "Banking and Finance", priceVal: 156000, career: "Banking Officer" },
                        { name: "Foreign Exchange Management", priceVal: 156000, career: "Forex Analyst" },
                        { name: "Travel and Tourism Management", priceVal: 156000, career: "Tourism Executive" },
                        { name: "Airlines and Airport Management", priceVal: 156000, career: "Airport Executive" },
                        { name: "Healthcare Management", priceVal: 156000, career: "Healthcare Executive" },
                        { name: "Event Management", priceVal: 156000, career: "Event Coordinator" },
                        { name: "Entertainment and Media", priceVal: 156000, career: "Media Executive" },
                        { name: "Entrepreneurship", priceVal: 156000, career: "Entrepreneur" },
                        { name: "Family Business", priceVal: 156000, career: "Business Manager" },
                        { name: "International Relations", priceVal: 156000, career: "Relations Executive" },
                        { name: "Disaster Management", priceVal: 156000, career: "Disaster Management Officer" }
                    ].map(s => ({
                        name: s.name, 
                        price: formatMoney(131250), 
                        originalPrice: formatMoney(175000), 
                        price1Cert: formatMoney(131250),
                        price2Cert: formatMoney(140000),
                        careerPath: s.career, 
                        syllabus: "Duration: 3 years. Eligibility: 10+2.",
                        usps: ["Industry-aligned management skills.", "Up to 25% Early Bird Scholarship."],
                        duration: "36 Months", 
                        eligibility: "10+2 or Equivalent", 
                        paymentDetails: generateTable(131250, 36),
                        paymentDetails1Cert: generateTable(131250, 36),
                        paymentDetails2Cert: generateTable(140000, 36),
                        brochure: "/brochures/cu-bba.pdf"
                    }))
                },
                {
                    group: "UG", name: "BCA", duration: "36", priceRange: "₹1,41,600",
                    specializations: [
                        { name: "General IT", priceVal: 141600, career: "Software Developer", desc: "Duration: 3 years. Eligibility: 10+2." }
                    ].map(s => ({
                        name: s.name, 
                        price: formatMoney(132750), 
                        originalPrice: formatMoney(177000), 
                        price1Cert: formatMoney(132750),
                        price3Cert: formatMoney(141600),
                        careerPath: s.career, 
                        syllabus: s.desc,
                        usps: ["Modern IT curriculum.", "Up to 25% Early Bird Scholarship."],
                        duration: "36 Months", 
                        eligibility: "10+2 or Equivalent", 
                        paymentDetails: generateTable(132750, 36),
                        paymentDetails1Cert: generateTable(132750, 36),
                        paymentDetails3Cert: generateTable(141600, 36),
                        brochure: "/brochures/cu-bca.pdf"
                    }))
                },
                {
                    group: "PG", name: "Master of Arts", duration: "24", priceRange: "₹1,00,000 - ₹1,45,000",
                    specializations: [
                        { name: "Journalism and Mass Communication (MAJMC)", priceVal: 145000, career: "Senior Journalist", desc: "Duration: 2 years. Eligibility: Bachelor Degree." },
                        { name: "English", priceVal: 100000, career: "Editor, Content Manager", desc: "Duration: 2 years. Eligibility: Bachelor Degree." },
                        { name: "Economics", priceVal: 100000, career: "Economist", desc: "Duration: 2 years. Eligibility: Bachelor Degree." }
                    ].map(s => ({
                        name: s.name, 
                        price: formatMoney(s.priceVal * 0.75), 
                        originalPrice: formatMoney(s.priceVal), 
                        careerPath: s.career, 
                        syllabus: s.desc,
                        usps: ["Advanced studies with experienced faculty.", "Up to 25% Early Bird Scholarship."],
                        duration: "24 Months", 
                        eligibility: "Bachelor Degree", 
                        paymentDetails: generateTable(s.priceVal * 0.75, 24),
                        brochure: s.name === "Economics" ? "/brochures/cu-ma-economics.pdf" : (s.name.includes("Journalism") ? "/brochures/cu-ma-jmc.pdf" : null)
                    }))
                },
                {
                    group: "PG", name: "MBA", duration: "24", priceRange: "₹2,20,000",
                    specializations: [
                        { name: "Airlines & Airport Management", priceVal: 220000, career: "Airport Manager" },
                        { name: "Banking & Insurance", priceVal: 220000, career: "Bank Manager" },
                        { name: "Brand Management", priceVal: 220000, career: "Brand Manager" },
                        { name: "Business Analytics", priceVal: 220000, career: "Analytics Head" },
                        { name: "Data Science & Artificial Intelligence", priceVal: 220000, career: "Data Scientist" },
                        { name: "Digital Marketing", priceVal: 220000, career: "Digital Head" },
                        { name: "Disaster Management", priceVal: 220000, career: "Disaster Management Head" },
                        { name: "Entrepreneurship", priceVal: 220000, career: "Entrepreneur" },
                        { name: "Event Management", priceVal: 220000, career: "Event Manager" },
                        { name: "Finance", priceVal: 220000, career: "Finance Manager" },
                        { name: "FinTech", priceVal: 220000, career: "Fintech Lead" },
                        { name: "General Management", priceVal: 220000, career: "General Manager" },
                        { name: "Hospital Management", priceVal: 220000, career: "Hospital Administrator" },
                        { name: "Human Resource Management (HRM)", priceVal: 220000, career: "HR Head" },
                        { name: "Information Technology (IT)", priceVal: 220000, career: "IT Head" },
                        { name: "International Business (IB)", priceVal: 220000, career: "IB Head" },
                        { name: "International Relations", priceVal: 220000, career: "International Relations Officer" },
                        { name: "Logistics and Supply Chain Management", priceVal: 220000, career: "Supply Chain Manager" },
                        { name: "Marketing", priceVal: 220000, career: "Marketing Head" },
                        { name: "Media Management", priceVal: 220000, career: "Media Manager" },
                        { name: "Operation Management", priceVal: 220000, career: "Operations Head" },
                        { name: "Retail Management", priceVal: 220000, career: "Retail Manager" },
                        { name: "Travel and Tourism Management", priceVal: 220000, career: "Tourism Manager" }
                    ].map(s => ({
                        name: s.name, 
                        price: formatMoney(165000), 
                        originalPrice: formatMoney(s.priceVal),
                        price1Cert: formatMoney(165000),
                        price3Cert: formatMoney(180400),
                        careerPath: s.career, 
                        syllabus: "Duration: 2 years. Eligibility: Bachelor Degree.",
                        usps: ["Strategic leadership skills.", "Up to 25% Early Bird Scholarship."],
                        duration: "24 Months", 
                        eligibility: "Bachelor Degree", 
                        paymentDetails: generateTable(165000, 24),
                        paymentDetails1Cert: generateTable(165000, 24),
                        paymentDetails3Cert: generateTable(180400, 24),
                        brochure: "/brochures/cu-mba.pdf"
                    }))
                },
                {
                    group: "PG", name: "M.Sc", duration: "24", priceRange: "₹80,000 - ₹1,20,000",
                    specializations: [
                        { name: "Data Science", priceVal: 146668, career: "Data Scientist", desc: "Duration: 2 years. Eligibility: Bachelor Degree." },
                        { name: "Mathematics", priceVal: 100000, career: "Mathematician", desc: "Duration: 2 years. Eligibility: Bachelor Degree." }
                    ].map(s => ({
                        name: s.name, 
                        price: formatMoney(s.priceVal * 0.75), 
                        originalPrice: formatMoney(s.priceVal), 
                        careerPath: s.career, 
                        syllabus: s.desc,
                        usps: ["Rigorous scientific curriculum.", "Up to 25% Early Bird Scholarship."],
                        duration: "24 Months", 
                        eligibility: "Bachelor Degree", 
                        paymentDetails: generateTable(s.priceVal * 0.75, 24),
                        brochure: s.name === "Mathematics" ? "/brochures/cu-msc-math.pdf" : (s.name === "Data Science" ? "/brochures/cu-msc-ds.pdf" : null)
                    }))
                },
                {
                    group: "PG", name: "MCA", duration: "24", priceRange: "₹1,55,000",
                    specializations: [
                        { name: "Cloud Computing", priceVal: 155000, career: "Cloud Architect" },
                        { name: "Full Stack Development", priceVal: 155000, career: "Full Stack Developer" },
                        { name: "Data Analytics", priceVal: 155000, career: "Data Analyst" },
                        { name: "Artificial Intelligence and Machine Learning", priceVal: 155000, career: "AI/ML Engineer" },
                        { name: "Agentic AI", priceVal: 155000, career: "AI Researcher" }
                    ].map(s => ({
                        name: s.name, 
                        price: formatMoney(116250), 
                        originalPrice: formatMoney(155000), 
                        careerPath: s.career, 
                        syllabus: "Duration: 2 years. Eligibility: Bachelor Degree.",
                        usps: ["Cutting-edge tech specializations.", "Up to 25% Early Bird Scholarship."],
                        duration: "24 Months", 
                        eligibility: "Bachelor Degree", 
                        paymentDetails: generateTable(116250, 24),
                        brochure: "/brochures/cu-mca.pdf"
                    }))
                }
            ]
        },
        url: "https://www.onlinecu.in/",
        applicationLink: "https://www.cuonlineedu.in/admissionportal/Login"
    };

    if (targetIdx > -1) {
        universities.splice(targetIdx, 1);
    }
    
    universities.push(cuData);

    const newStr = 'export const universities = ' + JSON.stringify(universities, null, 2) + ';\n';
    fs.writeFileSync('./src/data/universities.js', newStr, 'utf8');
    console.log("Chandigarh explicit native specializations mapped structurally replacing broad groupings explicitly with exact fees!");
}

run().catch(console.error);
