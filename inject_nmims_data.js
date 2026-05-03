import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
    const { universities } = await import(pathToFileURL('./src/data/universities.js').href);
    
    let nmimsIdx = universities.findIndex(u => u.name.toLowerCase().includes('nmims') || u.id === 'nmims-online');
    
    function formatMoney(amount) {
        if (typeof amount === 'string') return amount;
        return '₹' + amount.toLocaleString('en-IN');
    }

    function generateNMIMSTable(baseTotal, lumpSum, semFee, durationMonths) {
        let defenceFee = Math.round(baseTotal * 0.80);
        let registration = 1200;

        return `<div style="font-family: 'Inter', sans-serif; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
  <div style="background: #f1f5f9; color: #475569; font-weight: 600; padding: 8px 12px; border-radius: 6px; display: inline-block; margin-bottom: 16px; font-size: 13px; border: 1px solid #cbd5e1;">
    ⭐️ Premium SVKM Legacy Programs
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
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Admission Processing Fee</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(registration)} <span style="font-size:11px; color:#64748b;">(One-Time)</span></td>
      </tr>
      ${semFee ? `<tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Per Semester Tuition Fee</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(semFee)}</td>
      </tr>` : ""}
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Base Total Fee (Semester-Wise)</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${formatMoney(baseTotal)}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f0fdf4;">
        <td style="padding: 12px 8px; color: #166534; font-weight: 600;">Lump-Sum Total Fee (Discounted)</td>
        <td style="padding: 12px 8px; color: #15803d; font-weight: 700; font-size: 15px;">${formatMoney(lumpSum)}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9; background-color: #eff6ff;">
        <td style="padding: 12px 8px; color: #1d4ed8; font-weight: 600;">Defence Personnel Fee (Flat 20% Off)</td>
        <td style="padding: 12px 8px; color: #1d4ed8; font-weight: 700; font-size: 15px;">${formatMoney(defenceFee)}</td>
      </tr>
    </tbody>
  </table>
  
  <div style="margin-top: 16px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
     <div style="background: #f8fafc; padding: 10px 12px; font-weight: 700; font-size: 12px; color: #334155; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; gap: 6px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #3b82f6;"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        Official EMI & Loan Partners (0% Interest Available)
     </div>
     <div style="padding: 12px; font-size: 12px; color: #475569; background: #ffffff; line-height: 1.6;">
        <b>NBFC Partners:</b> Eduvanz, Liquiloans, Propelld, Grayquest, HDFC Credila<br/>
        <b>Banking Partners:</b> HDFC, ICICI, Axis Bank, Bank of Baroda, IDFC First<br/>
        <i>*EMI options available for 3, 6, 9, and 12 months with minimal processing fees.</i>
     </div>
  </div>
</div>`;
    }

    const nmimsData = {
        id: "nmims-online",
        name: "NMIMS University (Narsee Monjee)",
        logo: "https://ui-avatars.com/api/?name=NMIMS&background=dc2626&color=fff&size=150",
        location: "Mumbai, Maharashtra",
        type: "Deemed-to-be University",
        level: ["UG", "PG", "Diploma", "Certificate"],
        budget: 400000,
        specializations: ["MBA", "Executive MBA (MBA WX)", "BBA", "B.Com", "Diploma", "Certificate"],
        accreditation: "NAAC A++ (Highest Grade), UGC Entitled, Category 1 Autonomy",
        fees: "0% Interest EMI Available / Semester / Annual",
        placement: "Tier-1 Fortune 500 Acceptance | Dedicated NMIMS Job Portal",
        eligibility: "12th / Graduation as per course",
        ranking: "India's Premier B-School Legacy (SVKM Group)",
        exams: "Strictly NGA-SCE Proctored (Highly Respected)",
        extendedDetails: {
            examination: "100% Online Remote Proctored (Highly Strict Environment) | Passing Criteria = Minimum 50% Aggregate Required",
            leadLocking: `<div style="font-family: 'Inter', sans-serif;">
            <p style="font-weight: 700; font-size: 15px; margin-bottom: 16px; color: #0f172a; letter-spacing: -0.01em;">Why NMIMS University stands apart (Unique Highlights):</p>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">1. SVKM Legacy & NAAC A++</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Highest tier A++ grading heavily validates exactly identical curriculum delivery mapping directly to physical SVKM standards.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">2. Elite Corporate Job Portal</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Provides extremely exclusive direct networking routes into pure Fortune 500 companies tracking actively natively.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">3. Direct 20% Military/Defence Flat Discount</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Universally verifiable strict flat 20% drops for Defence networks inherently securely maintained structurally.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">4. Incredibly Rigorous Proctored Exams</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Employers trust NMIMS precisely due to absolutely rigorous zero-tolerance online examination policies organically.</p>
            </details>
            
            <p style="margin-top: 16px; font-weight: 500; font-size: 13px; color: #64748b; padding-top: 4px;">Auto Lock lead mapping rigorously set to <strong style="color:#0f172a; background: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-family: monospace;">LSQ = NMIMS</strong></p>
            </div>`,
            payment: "<b>Premium NMIMS Financial Options</b><br/>Zero Cost EMIs (Eduvanz, Liquiloans) and Armed Forces concessions (20%) are available universally.",
            programs: [
                {
                    group: "PG", name: "MBA (Online)", duration: "24", priceRange: "₹1,96,000",
                    specializations: [
                        { name: "Business Analytics", career: "Data Modeler, Technical Director" },
                        { name: "Information Technology Management", career: "IT Consultant, Tech Lead" },
                        { name: "Business Management", career: "CFO, Management Consultant" },
                        { name: "Financial Management", career: "Wealth Manager, Banking Executive" },
                        { name: "HR", career: "HR Director" },
                        { name: "Marketing", career: "CMO, Digital Strategy Head" },
                        { name: "Operations & Data Science", career: "Supply Chain Analyst" }
                    ].map(s => ({
                        name: s.name, price: "₹1,96,000 (Lump-Sum)", careerPath: s.career, syllabus: "2 Years | 4 Semesters. Strict Proctored Exams.",
                        usps: [
                            "Unmatched SVKM legacy giving you equivalent strategic business insights.",
                            "Curriculum crafted directly by industry veterans from Fortune 500.",
                            "Zero Cost EMI officially partnered natively."
                        ],
                        duration: "24 Months", eligibility: "Bachelor’s degree (10+2+3) with min. 50% marks OR 2 yrs work experience.", 
                        paymentDetails: generateNMIMSTable(220000, 196000, 55000, 24),
                        brochure: "/brochures/nmims-MBA_Brochure_Jan26Drive.pdf"
                    }))
                },
                {
                    group: "PG", name: "MBA WX (Executive)", duration: "24", priceRange: "₹4,00,000",
                    specializations: [
                        { name: "Applied Finance", career: "Hedge Fund Manager" },
                        { name: "Digital Marketing", career: "CMO, VP Digital" },
                        { name: "Leadership and Strategy", career: "CEO, Managing Director" },
                        { name: "Marketing", career: "Marketing Director" },
                        { name: "Operations & Supply Chain", career: "Chief Operating Officer" }
                    ].map(s => ({
                        name: s.name, price: "₹4,00,000 (Lump-Sum)", careerPath: s.career, syllabus: "Built strictly for working professionals with 3+ years experience.",
                        usps: [
                            "Harvard Business Publishing case studies explicitly mapped.",
                            "Elite networking directly building massive C-suite interactions."
                        ],
                        duration: "24 Months", eligibility: "Bachelor’s degree with 50% + Min 3 years work experience.", 
                        paymentDetails: generateNMIMSTable(400000, 400000, 100000, 24),
                        brochure: "/brochures/nmims-MBA WX PPT Sept 2025.pdf"
                    }))
                },
                {
                    group: "UG", name: "BBA", duration: "36", priceRange: "₹1,44,000",
                    specializations: [
                        { name: "Business Analytics", career: "Data Modeler Jr." },
                        { name: "Marketing", career: "Marketing Assoc." },
                        { name: "Finance", career: "Finance Executive" },
                        { name: "General Business Administration", career: "Business Coordinator" }
                    ].map(s => ({
                        name: s.name, price: "₹1,44,000 (Lump-Sum)", careerPath: s.career, syllabus: "3 Years | 6 Semesters.",
                        usps: [
                            "The absolute highest tier BBA available in India.",
                            "NMIMS Career Services securely building robust HR arrays."
                        ],
                        duration: "36 Months", eligibility: "10+2 (HSC) in any discipline with a minimum of 50% marks.", 
                        paymentDetails: generateNMIMSTable(144000, 144000, 24000, 36),
                        brochure: "/brochures/nmims-UG - BCom BBA (Online) Brochure.pdf"
                    }))
                },
                {
                    group: "UG", name: "B.Com", duration: "36", priceRange: "₹94,000",
                    specializations: [
                        { name: "General Commerce", career: "Staff Accountant" }
                    ].map(s => ({
                        name: s.name, price: "₹94,000 (Lump-Sum)", careerPath: s.career, syllabus: "3 Years | 6 Semesters.",
                        usps: [
                            "Highly regarded by Big 4 accounting securely deeply inherently successfully.",
                            "Fully remote tracking completely effectively correctly maintaining perfect UX."
                        ],
                        duration: "36 Months", eligibility: "10+2 in any discipline securely validated strictly cleanly.", 
                        paymentDetails: generateNMIMSTable(94000, 94000, 15666, 36),
                        brochure: "/brochures/nmims-UG - BCom BBA (Online) Brochure.pdf"
                    }))
                },
                {
                    group: "Diploma", name: "Diploma Programs", duration: "12", priceRange: "₹94,000",
                    specializations: [
                        { name: "Business Management", career: "Subject Expert" },
                        { name: "Financial Management", career: "Finance Associate" },
                        { name: "Human Resource Management", career: "HR Associate" },
                        { name: "Marketing Management", career: "Marketing Executive" },
                        { name: "Operation Management", career: "Operations Executive" }
                    ].map(s => ({
                        name: s.name, price: "₹94,000 (Total)", careerPath: s.career, syllabus: "Intensive 1-year corporate limit successfully tracking effectively.",
                        usps: [
                            "No 2-year lock in securely exactly effectively providing agile upskilling."
                        ],
                        duration: "12 Months", eligibility: "Bachelor's Degree OR 10+2 with 2 years of work.", 
                        paymentDetails: generateNMIMSTable(94000, 94000, 47000, 12)
                    }))
                },
                {
                    group: "Certificate", name: "Certificate Programs", duration: "6", priceRange: "₹47,000",
                    specializations: [
                        { name: "Business Management", career: "Junior Consultant" }
                    ].map(s => ({
                        name: s.name, price: "₹47,000 (Total)", careerPath: s.career, syllabus: "Extremely rapid 6-month tracking.",
                        usps: [
                            "Lightning fast correctly securely establishing directly perfect brand leverage."
                        ],
                        duration: "6 Months", eligibility: "Bachelor's Degree OR 10+2 with 2 years of work.", 
                        paymentDetails: generateNMIMSTable(47000, 47000, 47000, 6)
                    }))
                }
            ]
        },
        url: "https://online.nmims.edu/"
    };

    if (nmimsIdx > -1) {
        universities.splice(nmimsIdx, 1);
    }
    
    universities.push(nmimsData);

    const newStr = 'export const universities = ' + JSON.stringify(universities, null, 2) + ';\n';
    fs.writeFileSync('./src/data/universities.js', newStr, 'utf8');
    console.log("NMIMS University successfully updated with advanced UI/UX fee tables, correct specializations, and loan partners.");
}

run().catch(console.error);
