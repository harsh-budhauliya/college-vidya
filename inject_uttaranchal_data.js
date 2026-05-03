import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
    const { universities } = await import(pathToFileURL('./src/data/universities.js').href);
    
    let uuIdx = universities.findIndex(u => u.name.toLowerCase().includes('uttaranchal') || u.id === 'uttaranchal-online');
    
    function formatMoney(amount) {
        if (typeof amount === 'string') return amount;
        return '₹' + amount.toLocaleString('en-IN');
    }

    function generateTable(lumSumFee, semFee, annualFee, durationMonths, scholarshipText, originalLumSum, originalSem) {
        let semesters = durationMonths / 6;
        let originalTotal = originalSem * semesters;
        
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
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Pay Semester-wise</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(semFee)} <strike style="color:#94a3b8; font-size:12px;">${formatMoney(originalSem)}</strike></td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Pay Annually (Yearly)</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(annualFee)}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Semester Total Baseline</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;"><strike style="color:#94a3b8; font-size:12px;">${formatMoney(originalTotal)}</strike></td>
      </tr>
      <tr>
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Total Course Lumpsum <br/><span style="font-size: 11px; color: #64748b;">(One-Time Fee)</span></td>
        <td style="padding: 12px 8px; color: #059669; font-weight: 700; font-size: 16px;">${formatMoney(lumSumFee)} <strike style="color:#94a3b8; font-size:12px;">${formatMoney(originalLumSum)}</strike></td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top: 16px; font-size: 13px; color: #475569; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #94a3b8; border: 1px solid #e2e8f0; border-left-width: 4px;">
    <p style="margin: 0 0 6px 0; font-weight: 700; color: #334155;">Financial Breakdown & Validations:</p>
    <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.5;">
      <li><b>Scholarship Logic:</b> <b>${scholarshipText}</b> is currently active for early enrollments.</li>
      <li><b>Exam Fee:</b> ₹2,500/semester is <b>already included</b> in the displayed fees.</li>
      <li><b>Financial Partners:</b> 0% No-Cost EMI Native Support is directly accessible via authorized banking partners.</li>
    </ul>
  </div>
</div>`;
    }

    const uuData = {
        id: "uttaranchal-online",
        name: "Uttaranchal University Online",
        logo: "https://ui-avatars.com/api/?name=UU&background=0f172a&color=fff&size=150",
        location: "Dehradun, Uttarakhand",
        type: "Private University",
        level: ["UG", "PG"],
        budget: 94000,
        specializations: ["MBA", "MCA", "BBA", "BCA", "BA"],
        accreditation: "NAAC A+ Grade | UGC Entitled",
        fees: "₹55,200 - ₹94,000",
        placement: "Job Assistance | 1-on-1 Mentorship | Skill Enhancing Curriculum",
        eligibility: "UG: 10+2 | PG: Graduation",
        ranking: "Top Ranked University | Industry Immersion",
        exams: "Online Proctored Examinations",
        extendedDetails: {
            examination: "Online Proctored End-Term Exam | Examination fee of ₹2,500/sem already included in program cost metrics.",
            leadLocking: `<div style="font-family: 'Inter', sans-serif;">
            <p style="font-weight: 700; font-size: 15px; margin-bottom: 16px; color: #0f172a; letter-spacing: -0.01em;">Why Uttaranchal University Online is Premium:</p>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">1. International & National Recognitions</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Uttaranchal University stands tall with a prestigious <strong style="color:#0f172a;">NAAC A+ Grade</strong> and is fully recognized by the UGC under Section 2(f) and 12(B) as a highly valued institution.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">2. Academic Logistics & LMS</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">LMS: High-end Integrated Learning Management System with massive e-library access 24/7. Includes recorded video content by top-notch faculty and interactive live lectures through chat/discussion forums.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">3. 1-on-1 Mentorship Logic</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">
                To provide absolute support at every tier, a dedicated mentor is assigned directly to each student parsing advanced career trajectories naturally.
              </p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">4. CRC & Placement Support</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Corporate Resource Centre (CRC) provides complete job assistance including CV workshops, mock interviews, and direct placement assistance targeting industry-leading corporations natively.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">5. Inclusive Pricing Architecture</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Extremely transparent pricing logic: the ₹2,500/semester exam fee is definitively bundled into the quoted costs cleanly bypassing hidden overheads entirely.</p>
            </details>

            <p style="margin-top: 16px; font-weight: 500; font-size: 13px; color: #64748b; padding-top: 4px;">Auto Lock lead mapping rigorously set to <strong style="color:#0f172a; background: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-family: monospace;">LSQ = Uttaranchal</strong></p>
            </div>`,
            payment: "<b>Fee Formats Evaluated:</b> Uttaranchal University ensures total transparency by already factoring the ₹2,500/sem examination fee inside the quoted Sem/Annual/Lumpsum matrices.<br/><br/><b>Financial Partners:</b> Broad 0% No-Cost EMI setups are fully supported via standardized banking channels for heavy financial scalability natively.",
            programs: [
                {
                    group: "PG", name: "MBA", duration: "24 Months", priceRange: "₹94,000 (Lumpsum) / ₹24,500 (Sem)",
                    specializations: [
                        { name: "Marketing Management", career: "Brand Specialist, Market Researcher", desc: "Advanced programmatic marketing funnels and comprehensive brand architecture scaling.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "Financial Management", career: "Financial Analyst, Wealth Manager", desc: "Deep investment banking logic mapping entirely across massive corporate ledgers natively.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "Human Resource Management", career: "HR Director, Talent Acquisition Lead", desc: "Corporate HR frameworks securely aligned exactly around modern remote workforces.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "Business Analytics", career: "Data Modeler, Analytics Head", desc: "Predictive statistical matrices mapping raw SQL data sets securely tracking enterprise logic.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "Information Technology", career: "IT Project Manager, Cloud Ops", desc: "Tech infrastructure logic thoroughly matching cloud architecture optimizations natively.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "Digital Marketing", career: "Digital Strategy Exec, SEO/PPC Lead", desc: "Natively driven ad logic parsing vast social platforms accurately optimizing ROI limits.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "International Business", career: "Global Strategy Director, Trade Exec", desc: "Cross border EXIM mechanics flawlessly integrated around global supply logic directly.", brochure: "/brochures/uu-mba.pdf" },
                        { name: "Logistics and Supply Chain Management", career: "Supply Chain Manager, Operations Head", desc: "Massive inventory matrices dynamically monitored providing absolute operational efficiency.", brochure: "/brochures/uu-mba.pdf" }
                    ].map(s => ({
                        name: s.name, price: "₹94,000", careerPath: s.career, syllabus: s.desc,
                        usps: [
                            "UGC Entitled MBA naturally bypassing any corporate validity limits completely.",
                            "Direct 1-on-1 Personalised Mentorship effectively maximizing placement probability.",
                            "Aggressive 30% Early Bird Scholarship logic securely applied slashing baseline fees extensively."
                        ],
                        duration: "24 Months", eligibility: "Bachelor’s degree (min 3 years) with 50% for General (45% for Reserved) safely.", paymentDetails: generateTable(94000, 24500, 47000, 24, "30% Early Bird Scholarship", 136000, 35000), brochure: s.brochure
                    }))
                },
                {
                    group: "PG", name: "MCA", duration: "24 Months", priceRange: "₹92,000 (Lumpsum) / ₹24,000 (Sem)",
                    specializations: [
                        { name: "General", career: "Software Engineer, Full Stack Dev", desc: "Raw algorithmic paradigms actively parsed mapping directly across top-tier enterprise coding environments.", brochure: "/brochures/uu-mca.pdf" }
                    ].map(s => ({
                        name: s.name, price: "₹92,000", careerPath: s.career, syllabus: s.desc,
                        usps: [
                            "Strict focus natively establishing elite programming syntaxes securely via recorded/live setups.",
                            "Bridge courses actively handled supporting non-Mathematics backgrounds efficiently.",
                            "Solid 20% Early Bird Scholarship effectively managing costs perfectly."
                        ],
                        duration: "24 Months", eligibility: "BCA/B.Sc/B.Tech or Graduation with Math at 10+2/Grad level (Bridge course logic applies for non-Math).", paymentDetails: generateTable(92000, 24000, 46000, 24, "20% Early Bird Scholarship", 116000, 30000), brochure: s.brochure
                    }))
                },
                {
                    group: "UG", name: "BBA", duration: "36 Months", priceRange: "₹96,000 (Lumpsum) / ₹17,000 (Sem)",
                    specializations: [
                        { name: "Marketing Management", career: "Sales Trainee, Brand Exec", desc: "Micro/Macro economics seamlessly scaling directly into core digital marketing setups.", brochure: "/brochures/uu-bba.pdf" },
                        { name: "Financial Management", career: "Accountant, Finance Trainee", desc: "Ledger logic securely mapping vast fiscal parameters naturally via modern accounting.", brochure: "/brochures/uu-bba.pdf" },
                        { name: "Human Resource Management", career: "HR Assistant, Recruiter", desc: "Base industrial relations effectively scaled accurately setting pure corporate standards.", brochure: "/brochures/uu-bba.pdf" }
                    ].map(s => ({
                        name: s.name, price: "₹96,000", careerPath: s.career, syllabus: s.desc,
                        usps: [
                            "Comprehensive foundations accurately preparing massive PG MBA capabilities natively.",
                            "Integrated LMS inherently providing 24x7 e-library access entirely seamlessly.",
                            "15% Early Bird Scholarship drops Lumpsum investment securely to ₹96,000 naturally."
                        ],
                        duration: "36 Months", eligibility: "10+2 securely verified from recognized board grids.", paymentDetails: generateTable(96000, 17000, 32000, 36, "15% Early Bird Scholarship", 114000, 20000), brochure: s.brochure
                    }))
                },
                {
                    group: "UG", name: "BCA", duration: "36 Months", priceRange: "₹96,000 (Lumpsum) / ₹17,000 (Sem)",
                    specializations: [
                        { name: "General", career: "Junior Developer, Ops DB Trainee", desc: "Algorithm logics perfectly executing standard database architecture safely matching real-world demands.", brochure: "/brochures/uu-bca.pdf" }
                    ].map(s => ({
                        name: s.name, price: "₹96,000", careerPath: s.career, syllabus: s.desc,
                        usps: [
                            "Uttaranchal NAAC A+ perfectly boosting global employment matrices securely.",
                            "Intensive tech-focused curriculum naturally bypassing rote learning explicitly.",
                            "15% Early Bird Scholarship strictly dropping baseline constraints significantly."
                        ],
                        duration: "36 Months", eligibility: "10+2 smoothly accessed from any verified board.", paymentDetails: generateTable(96000, 17000, 32000, 36, "15% Early Bird Scholarship", 114000, 20000), brochure: s.brochure
                    }))
                },
                {
                    group: "UG", name: "BA", duration: "36 Months", priceRange: "₹55,200 (Lumpsum) / ₹10,200 (Sem)",
                    specializations: [
                        { name: "General", career: "Community Ops, Content Reviewer", desc: "Broad societal architectures natively leveraging history, political structure, and English communication.", brochure: "/brochures/uu-ba.pdf" }
                    ].map(s => ({
                        name: s.name, price: "₹55,200", careerPath: s.career, syllabus: s.desc,
                        usps: [
                            "Research-intensive BA completely unlocking upscale public sector employment bounds.",
                            "Hyper-low price perfectly mapped at ₹55,200 safely allowing absolute accessibility.",
                            "1-on-1 Personalised Mentorship deeply tracking progression exactly from Day 1."
                        ],
                        duration: "36 Months", eligibility: "10+2 seamlessly accessed via any foundational stream.", paymentDetails: generateTable(55200, 10200, 18400, 36, "15% Early Bird Scholarship", 66000, 12000), brochure: s.brochure
                    }))
                }
            ]
        },
        url: "https://www.onlineuu.in/"
    };

    if (uuIdx > -1) {
        universities[uuIdx] = uuData;
    } else {
        universities.push(uuData);
    }

    const newStr = `export const universities = ${JSON.stringify(universities, null, 2)};\n`;
    fs.writeFileSync('./src/data/universities.js', newStr, 'utf8');
    console.log("Uttaranchal University strictly updated to user parameters! Sharp No-Glow UI active with precise website data!");
}

run().catch(console.error);
