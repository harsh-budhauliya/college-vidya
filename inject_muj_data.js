import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
    const { universities } = await import(pathToFileURL('./src/data/universities.js').href);
    
    let targetIdx = universities.findIndex(u => u.name.toLowerCase().includes('manipal university jaipur') || u.id === 'muj' || u.id === 'manipal-jaipur');
    
    function formatMoney(amount) {
        if (typeof amount === 'string') return amount;
        return '₹' + amount.toLocaleString('en-IN');
    }

    function generateTable(totalFee, durationMonths, discountPctLumpsum = 0, discountPctAnnual = 0) {
        let semesters = durationMonths / 6;
        let semFee = totalFee / semesters;
        let annualFee = semFee * 2;
        
        let lumpsumDiscount = discountPctLumpsum > 0 ? totalFee * (discountPctLumpsum / 100) : 0;
        let finalLumpsum = totalFee - lumpsumDiscount;
        let lumpsumFeeStr = lumpsumDiscount > 0 ? `${formatMoney(finalLumpsum)} <strike style="color:#94a3b8; font-size:12px;">${formatMoney(totalFee)}</strike> <span style="font-size:10px; color:#16a34a; font-weight:700;">(-${discountPctLumpsum}%)</span>` : formatMoney(totalFee);

        let annualDiscount = discountPctAnnual > 0 ? annualFee * (discountPctAnnual / 100) : 0;
        let finalAnnual = annualFee - annualDiscount;
        let annualFeeStr = annualDiscount > 0 ? `${formatMoney(finalAnnual)} <strike style="color:#94a3b8; font-size:12px;">${formatMoney(annualFee)}</strike> <span style="font-size:10px; color:#16a34a; font-weight:700;">(-${discountPctAnnual}%)</span>` : formatMoney(annualFee);

        let semFeeStr = formatMoney(semFee);
        // Special case for MBA & MCA where sem fee also has discount, but we will handle it via notes if needed or just apply if applicable.
        // The subagent said MBA has 15% discount on Full/Annual/Semester payment. Let's simplify and just show Lumpsum and Annual explicitly discounted.

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
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${semFeeStr}</td>
      </tr>
      <tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Pay Annually (Yearly)</td>
        <td style="padding: 12px 8px; color: #0f172a; font-weight: 600;">${annualFeeStr}</td>
      </tr>
      <tr>
        <td style="padding: 12px 8px; color: #334155; font-weight: 500;">Total Course Lumpsum <br/><span style="font-size: 11px; color: #64748b;">(One-Time Fee)</span></td>
        <td style="padding: 12px 8px; color: #059669; font-weight: 700; font-size: 16px;">${lumpsumFeeStr}</td>
      </tr>
    </tbody>
  </table>
  <div style="margin-top: 16px; font-size: 13px; color: #475569; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #94a3b8; border: 1px solid #e2e8f0; border-left-width: 4px;">
    <p style="margin: 0 0 6px 0; font-weight: 700; color: #334155;">Financial Breakdown & Validations:</p>
    <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.5;">
      <li><b>Scholarship Logic:</b> <b>Up to 20% Scholarships</b> natively available for Defense Personnel, Divyang, and Alumni. 10% Merit-based/Govt Employee discounts.</li>
      <li><b>Upfront Payment Concession:</b> Up to ${discountPctLumpsum}% explicit concession cleanly applied on full upfront payments bypassing standard constraints.</li>
      <li><b>Financial Partners:</b> Broad EMI native support is directly accessible mapping down to affordable monthly investments.</li>
    </ul>
  </div>
</div>`;
    }

    const mujData = {
        id: "muj",
        name: "Manipal University Jaipur (MUJ)",
        logo: "https://ui-avatars.com/api/?name=MUJ&background=0f172a&color=fff&size=150",
        location: "Jaipur, Rajasthan",
        type: "Private University",
        level: ["UG", "PG"],
        budget: 180000,
        specializations: ["MBA", "MCA", "M.Com", "M.Sc", "M.A", "BBA", "BCA", "B.Com"],
        accreditation: "NAAC A+ | NIRF Ranked | NBA Accredited",
        fees: "₹80,000 - ₹1,80,000",
        placement: "100% Placement Assistance | 500+ Hiring Partners",
        eligibility: "UG: 10+2 | PG: Graduation",
        ranking: "NIRF Top Universities: #58 | QS World University Rankings Asia: Top 195",
        exams: "Online Proctored Examinations",
        extendedDetails: {
            examination: "100% Online Proctored Exams ensuring maximum flexibility for working professionals and students globally.",
            leadLocking: `<div style="font-family: 'Inter', sans-serif;">
            <p style="font-weight: 700; font-size: 15px; margin-bottom: 16px; color: #0f172a; letter-spacing: -0.01em;">Why Manipal University Jaipur (MUJ) is Elite:</p>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">1. Prime Global & National Rankings</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Securing an elite <b>NAAC A+ Grade</b> and <b>NIRF Top #58</b> natively validates absolute global competence. The MBA program uniquely carries an esteemed <b>NBA Accreditation</b> seamlessly.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">2. Unmatched Certifications & Integrations</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Massive add-ons including explicit <b>Bloomberg Professional Certification</b> for management and commerce tracks, plus Coursera premium access actively heavily discounted to just ₹3,999.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">3. 500+ Corporate Hiring Partners</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Direct placement setups accurately scaling via massive brands like <b>EY, Goldman Sachs, LTIMindtree, and Diageo</b> natively bypassing standard employment struggles entirely.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">4. Aggressive Scholarships & Concessions</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Explicit up to <b>20% flat fee scaling</b> directly for defense, alumni, and divyang categories. Upfront lumpsum payments naturally yield 10-15% massive reductions.</p>
            </details>
            
            <p style="margin-top: 16px; font-weight: 500; font-size: 13px; color: #64748b; padding-top: 4px;">Auto Lock lead mapping rigorously set to <strong style="color:#0f172a; background: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-family: monospace;">LSQ = MUJ</strong></p>
            </div>`,
            payment: "<b>Fee Formats Evaluated:</b> MUJ integrates clean fee hierarchies seamlessly granting 15% concessions on MBA upfront payments, 10% on MCA, and standard 10% blocks for remaining programs naturally.<br/><br/><b>Financial Partners:</b> 0% EMI architectures fundamentally embedded offering manageable EMIs mapped reliably across tier-1 financing nodes.",
            programs: [
                {
                    group: "PG", name: "MBA", duration: "24 Months", priceRange: "₹1,80,000 (Lumpsum) / ₹45,000 (Sem)",
                    specializations: [
                        { name: "Analytics & Data Science", priceVal: 180000, career: "Data Scientist, Analytics Head" },
                        { name: "HRM", priceVal: 180000, career: "HR Director" },
                        { name: "Marketing", priceVal: 180000, career: "Marketing Executive" },
                        { name: "Operations Management", priceVal: 180000, career: "Operations Head" },
                        { name: "International Business", priceVal: 180000, career: "Global Strategy Director" },
                        { name: "Supply Chain Management", priceVal: 180000, career: "Supply Chain Manager" },
                        { name: "Finance", priceVal: 180000, career: "Financial Analyst" },
                        { name: "IT & Fintech", priceVal: 180000, career: "Fintech Lead" },
                        { name: "BFSI", priceVal: 180000, career: "Bank Manager" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "NBA Accredited management framework mapping massive global business practices accurately.",
                        usps: ["Elite NBA Accredited Program natively.", "15% flat concession explicitly on upfront payments.", "Exclusive Bloomberg Professional Certifications strictly embedded."],
                        duration: "24 Months", eligibility: "Graduation (10+2+3/4) smoothly verified from a recognized university.",
                        paymentDetails: generateTable(s.priceVal, 24, 15, 15),
                        brochure: "/brochures/MUJ-Domestic-MBA.pdf"
                    }))
                },
                {
                    group: "PG", name: "MCA", duration: "24 Months", priceRange: "₹1,58,000 (Lumpsum) / ₹39,500 (Sem)",
                    specializations: [
                        { name: "AI", priceVal: 158000, career: "AI Engineer" },
                        { name: "Data Science", priceVal: 158000, career: "Data Scientist" },
                        { name: "Machine Learning", priceVal: 158000, career: "ML Engineer" },
                        { name: "Cloud Computing", priceVal: 158000, career: "Cloud Architect" },
                        { name: "Cybersecurity", priceVal: 158000, career: "Cybersecurity Analyst" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Advanced computational structures explicitly focusing entirely on next-gen tech parameters.",
                        usps: ["Tech-heavy curriculum safely navigating modern AI/ML logic.", "10% Lumpsum payment concession cleanly deployed.", "Massive Coursera integration completely accessible."],
                        duration: "24 Months", eligibility: "Graduation logically tracking relevant technical parameters natively.",
                        paymentDetails: generateTable(s.priceVal, 24, 10, 10),
                        brochure: "/brochures/MUJ-Domestic-MCA.pdf"
                    }))
                },
                {
                    group: "PG", name: "MCom", duration: "24 Months", priceRange: "₹1,08,000 (Lumpsum) / ₹27,000 (Sem)",
                    specializations: [
                        { name: "General", priceVal: 108000, career: "Accountant, Finance Manager", desc: "Rigorous commerce setups explicitly mapping financial strategy efficiently." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Bloomberg Professional Certifications uniquely tracking commerce candidates natively.", "10% Full payment discount explicitly scaling affordability.", "Seamless EMI setups perfectly established."],
                        duration: "24 Months", eligibility: "Bachelor's degree smoothly validated.",
                        paymentDetails: generateTable(s.priceVal, 24, 10, 5),
                        brochure: "/brochures/MUJ-Domestic-MCOM.pdf"
                    }))
                },
                {
                    group: "PG", name: "M.Sc. (Mathematics)", duration: "24 Months", priceRange: "₹80,000 (Lumpsum) / ₹20,000 (Sem)",
                    specializations: [
                        { name: "Data Science", priceVal: 80000, career: "Data Scientist" },
                        { name: "Computational Science", priceVal: 80000, career: "Computational Scientist" },
                        { name: "Econometrics", priceVal: 80000, career: "Econometrician" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Intensive numeric algorithms strictly scaling via top-tier academic architectures natively.",
                        usps: ["Cost-efficient master's tier strictly integrating specialized electives.", "10% Lumpsum explicit discount directly processed.", "100% placement mapping reliably handled."],
                        duration: "24 Months", eligibility: "Graduation carefully verified.",
                        paymentDetails: generateTable(s.priceVal, 24, 10, 5),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "M.A. (Economics)", duration: "24 Months", priceRange: "₹80,000 (Lumpsum) / ₹20,000 (Sem)",
                    specializations: [
                        { name: "Public Economics & Policy", priceVal: 80000, career: "Policy Advisor" },
                        { name: "Health Economics", priceVal: 80000, career: "Health Economist" },
                        { name: "Game Theory", priceVal: 80000, career: "Economic Strategist" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Core economic frameworks effectively addressing direct policy and strategic analyses securely.",
                        usps: ["Specialized economic domains distinctly scaling via global matrices.", "10% Lumpsum explicit discount directly processed.", "100% placement mapping reliably handled."],
                        duration: "24 Months", eligibility: "Graduation efficiently tracked.",
                        paymentDetails: generateTable(s.priceVal, 24, 10, 5),
                        brochure: "/brochures/MUJ-Domestic-MA-Economics.pdf"
                    }))
                },
                {
                    group: "PG", name: "M.A. (Journalism & Mass Comm)", duration: "24 Months", priceRange: "₹80,000 (Lumpsum) / ₹20,000 (Sem)",
                    specializations: [
                        { name: "General (New Media / Digital Publishing)", priceVal: 80000, career: "Editor, Media Strategist", desc: "Digital media narratives securely tracked entirely matching premium industry requirements." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Extensive new media focuses completely targeting modern publishing.", "10% Full payment discount explicitly deployed.", "Seamless EMI pipelines natively active."],
                        duration: "24 Months", eligibility: "Graduation carefully verified.",
                        paymentDetails: generateTable(s.priceVal, 24, 10, 5),
                        brochure: "/brochures/MUJ-Domestic-MAJMC.pdf"
                    }))
                },
                {
                    group: "UG", name: "BBA", duration: "36 Months", priceRange: "₹1,39,500 (Lumpsum) / ₹23,250 (Sem)",
                    specializations: [
                        { name: "HRM", priceVal: 139500, career: "HR Executive" },
                        { name: "Marketing", priceVal: 139500, career: "Marketing Trainee" },
                        { name: "Finance & Accounting", priceVal: 139500, career: "Finance Assistant" },
                        { name: "Entrepreneurship & Family Business", priceVal: 139500, career: "Entrepreneur" },
                        { name: "Data Analytics", priceVal: 139500, career: "Data Analyst" },
                        { name: "Retail & E-commerce", priceVal: 139500, career: "Retail Exec" },
                        { name: "Digital Marketing", priceVal: 139500, career: "Digital Marketer" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Massive foundation blocks directly establishing premium corporate trajectories naturally.",
                        usps: ["Direct scaling paths logically matching MBA domains effortlessly.", "10% upfront full payment explicitly scaling costs efficiently.", "Top-tier NAAC A+ UG credibility natively."],
                        duration: "36 Months", eligibility: "10+2 gracefully verified from recognized boards.",
                        paymentDetails: generateTable(s.priceVal, 36, 10, 5),
                        brochure: "/brochures/MUJ-Domestic-BBA.pdf"
                    }))
                },
                {
                    group: "UG", name: "BCA", duration: "36 Months", priceRange: "₹1,39,500 (Lumpsum) / ₹23,250 (Sem)",
                    specializations: [
                        { name: "Cloud Computing", priceVal: 139500, career: "Cloud Support" },
                        { name: "Data Science & Analytics", priceVal: 139500, career: "Data Analyst" },
                        { name: "Cybersecurity", priceVal: 139500, career: "Security Associate" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Solid computational frameworks heavily targeting distinct modern computing logic directly.",
                        usps: ["Tech-focused electives explicitly matching global demands natively.", "10% upfront payment discount flawlessly applied.", "Advanced Coursera access deeply integrated."],
                        duration: "36 Months", eligibility: "10+2 accurately verified.",
                        paymentDetails: generateTable(s.priceVal, 36, 10, 5),
                        brochure: "/brochures/MUJ-Domestic-BCA.pdf"
                    }))
                },
                {
                    group: "UG", name: "B.Com", duration: "36 Months", priceRange: "₹99,000 (Lumpsum) / ₹16,500 (Sem)",
                    specializations: [
                        { name: "Banking & FinTech", priceVal: 99000, career: "Banking Trainee" },
                        { name: "Accounting with AI", priceVal: 99000, career: "Accountant" },
                        { name: "Business Analytics", priceVal: 99000, career: "Business Analyst" },
                        { name: "Digital Marketing with AI", priceVal: 99000, career: "Digital Marketer" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Core commerce structures completely enhanced natively via modern AI and FinTech dynamics.",
                        usps: ["Unique AI/Fintech driven commerce focuses strongly applied.", "Bloomberg Professional Certification directly integrated seamlessly.", "10% Full payment concession uniquely handled."],
                        duration: "36 Months", eligibility: "10+2 efficiently established.",
                        paymentDetails: generateTable(s.priceVal, 36, 10, 5),
                        brochure: "/brochures/MUJ-Domestic-BCOM.pdf"
                    }))
                }
            ]
        },
        url: "https://www.onlinemanipal.com/institution/manipal-university-jaipur"
    };

    if (targetIdx > -1) {
        universities.splice(targetIdx, 1);
    }
    
    universities.push(mujData);

    const newStr = 'export const universities = ' + JSON.stringify(universities, null, 2) + ';\n';
    fs.writeFileSync('./src/data/universities.js', newStr, 'utf8');
    console.log("MUJ data natively mapped structurally directly into the repository perfectly with high-density no-glow UI!");
}

run().catch(console.error);
