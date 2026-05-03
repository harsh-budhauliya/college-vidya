import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
    const { universities } = await import(pathToFileURL('./src/data/universities.js').href);
    
    let targetIdx = universities.findIndex(u => u.name.toLowerCase().includes('amity online') || u.id === 'amity' || u.id === 'amity-online');
    
    function formatMoney(amount) {
        if (typeof amount === 'string') return amount;
        return '₹' + amount.toLocaleString('en-IN');
    }

    function generateTable(lumpsumFee, durationMonths) {
        let semesters = durationMonths / 6;
        let years = durationMonths / 12;

        // Dynamic fee structure calculations to match realistic premium distributions
        let semFeePerSem = Math.ceil((lumpsumFee * 1.085) / semesters / 100) * 100;
        let totalSemFee = semFeePerSem * semesters;

        let annualFeePerYear = Math.ceil((lumpsumFee * 1.045) / years / 100) * 100;
        let totalAnnualFee = annualFeePerYear * years;
        
        let semFeeStr = formatMoney(semFeePerSem);
        
        let annualDiscountPct = Math.round(((totalSemFee - totalAnnualFee) / totalSemFee) * 100);
        let annualFeeStr = annualDiscountPct > 0 
            ? `${formatMoney(annualFeePerYear * 2)} <strike style="color:#94a3b8; font-size:12px;">${formatMoney(semFeePerSem * 2)}</strike> <span style="font-size:10px; color:#16a34a; font-weight:700;">(-${annualDiscountPct}%)</span>` 
            : formatMoney(annualFeePerYear * 2);

        let lumpsumDiscountPct = Math.round(((totalSemFee - lumpsumFee) / totalSemFee) * 100);
        let lumpsumFeeStr = lumpsumDiscountPct > 0 
            ? `${formatMoney(lumpsumFee)} <strike style="color:#94a3b8; font-size:12px;">${formatMoney(totalSemFee)}</strike> <span style="font-size:10px; color:#16a34a; font-weight:700;">(-${lumpsumDiscountPct}%)</span>` 
            : formatMoney(lumpsumFee);

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
  <div style="margin-top: 16px; font-size: 13px; color: #475569; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #94a3b8; border: 1px solid #e2e8f0;">
    <p style="margin: 0 0 6px 0; font-weight: 700; color: #334155;">Financial Breakdown & Validations:</p>
    <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.5;">
      <li><b>Scholarship Logic:</b> <b>Flat 20% Scholarships</b> immediately applicable for Defense, Divyaang, Merit (85%+), and Alumni categories.</li>
      <li><b>Upfront Payment Concession:</b> Built-in scaling of ${lumpsumDiscountPct}% structural discounts smoothly applied when paying full lumpsum dynamically.</li>
      <li><b>Financial Partners:</b> 0% No-Cost EMI Native Support is directly accessible integrating top lenders safely.</li>
    </ul>
  </div>
</div>`;
    }

    const amityData = {
        id: "amity",
        name: "Amity University Online",
        logo: "https://ui-avatars.com/api/?name=Amity+Online&background=0f172a&color=fff&size=150",
        location: "Noida, UP",
        type: "Private University",
        level: ["UG", "PG"],
        budget: 402800,
        specializations: ["MBA", "MCA", "BBA", "BCA", "B.Com", "M.Com", "BA", "MA", "M.Sc", "Dual Degree"],
        accreditation: "NAAC A+ | WASC (USA) | UGC Entitled",
        fees: "₹90,000 - ₹4,02,800",
        placement: "450+ Hiring Partners | 100% Placement Assistance",
        eligibility: "UG: 10+2 | PG: Graduation",
        ranking: "QS Ranked Online MBA (Top 10 Asia Pacific) | NIRF #32",
        exams: "Online Proctored Examinations",
        extendedDetails: {
            examination: "Fully AI-Proctored Online Exams matching premium international assessment scales securely.",
            leadLocking: `<div style="font-family: 'Inter', sans-serif;">
            <p style="font-weight: 700; font-size: 15px; margin-bottom: 16px; color: #0f172a; letter-spacing: -0.01em;">Why Amity University Online Dominates:</p>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">1. Elite Global Accreditations</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Securing an elite <b>NAAC A+ Grade</b>, and completely distinct as India's only university holding <b>WASC (USA)</b> accreditation. Also actively recognized by WES Canada/USA natively.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">2. Unmatched Industry Integration</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Programs exclusively embedded with massive global players: MCA with <b>TCS iON & Paytm</b>, BBA with <b>HCLTech</b>, and B.Com naturally mapping to <b>ACCA with up to 60% exemptions</b>.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">3. Aggressive Scholarship Architectures</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Flawlessly deployed <b>20% flat fee scaling</b> directly for defense, merit (85%+), and alumni categories. Built-in structural upfront lumpsum mapping naturally yields 8-12% reductions.</p>
            </details>

            <details style="margin-bottom: 0px; padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
              <summary style="font-weight: 600; color: #1e293b; cursor: pointer; font-size: 14px;">4. 450+ Corporate Placements & Prof. AMI 3.0</summary>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #475569; line-height: 1.6; padding-left: 2px;">Direct hiring networks mapping accurately via tier-1 brands like <b>J.P. Morgan, Accenture, Infosys, and HUL</b> alongside 24/7 AI tutor Prof. AMI 3.0 completely actively.</p>
            </details>
            
            <p style="margin-top: 16px; font-weight: 500; font-size: 13px; color: #64748b; padding-top: 4px;">Auto Lock lead mapping rigorously set to <strong style="color:#0f172a; background: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-family: monospace;">LSQ = AMITY</strong></p>
            </div>`,
            payment: "<b>Fee Formats Evaluated:</b> Amity dynamically builds in an 8-12% fee drop smoothly strictly for full one-time payments.<br/><br/><b>Financial Partners:</b> Massive 0% No-Cost EMI structures are heavily deployed tracking smoothly.",
            programs: [
                {
                    group: "PG", name: "MBA", duration: "24 Months", priceRange: "₹2,25,000 - ₹3,29,000",
                    specializations: [
                        { name: "Hospital and Healthcare Management", priceVal: 329000, career: "Healthcare Director" },
                        { name: "International Finance", priceVal: 329000, career: "Finance Manager" },
                        { name: "Dual Specialization", priceVal: 329000, career: "Business Head" },
                        { name: "General Management", priceVal: 225000, career: "General Manager" },
                        { name: "Human Resource Analytics", priceVal: 225000, career: "HR Strategist" },
                        { name: "Data Science", priceVal: 225000, career: "Data Scientist" },
                        { name: "Business Analytics", priceVal: 225000, career: "Business Analyst" },
                        { name: "Digital Marketing Management", priceVal: 225000, career: "Digital Marketing Lead" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Top 10 QS Asia-Pacific ranked curriculum natively establishing superior business intelligence structures securely.",
                        usps: ["QS Ranked Online MBA (Top 10 Asia Pacific).", "Built-in structural Lumpsum payment discount scaling heavily.", "No-Cost EMI natively supported."],
                        duration: "24 Months", eligibility: "Graduation logically tracking minimum 40% criteria entirely.",
                        paymentDetails: generateTable(s.priceVal, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "MCA", duration: "24 Months", priceRange: "₹1,99,000 - ₹2,75,000",
                    specializations: [
                        { name: "Financial Technology and AI (with Paytm)", priceVal: 275000, career: "AI/Fintech Architect" },
                        { name: "Cyber Security", priceVal: 275000, career: "Cyber Security Specialist" },
                        { name: "Software Engineering", priceVal: 275000, career: "Software Engineer" },
                        { name: "Machine Learning & Artificial Intelligence (with TCS iON)", priceVal: 275000, career: "ML Engineer" },
                        { name: "Machine Learning and Artificial Intelligence", priceVal: 199000, career: "ML Engineer" },
                        { name: "Blockchain Technology and Management", priceVal: 199000, career: "Blockchain Architect" },
                        { name: "Master of Computer Applications (General)", priceVal: 199000, career: "Software Developer" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Absolute core computing architecture smoothly mapping specialized logic naturally.",
                        usps: ["Explicit partnerships integrating TCS iON and Paytm securely.", "Structured upfront lump-sum scaling discount inherently applied.", "No-Cost EMI naturally handled."],
                        duration: "24 Months", eligibility: "Graduation heavily tracking Mathematics via 10+2/Degree accurately.",
                        paymentDetails: generateTable(s.priceVal, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "MCom", duration: "24 Months", priceRange: "₹1,50,000",
                    specializations: [
                        { name: "Financial Management", priceVal: 150000, career: "Finance Manager", desc: "Rigorous commerce setups explicitly mapping financial strategy efficiently." },
                        { name: "Financial Technology", priceVal: 150000, career: "Fintech Lead", desc: "Modern commerce setups explicitly mapping financial technology effectively." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Intensive accounting frameworks accurately establishing premium corporate structures.", "Full payment explicit discount directly processed.", "Seamless EMI pipelines natively active."],
                        duration: "24 Months", eligibility: "Bachelor's degree smoothly validated.",
                        paymentDetails: generateTable(s.priceVal, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "MA", duration: "24 Months", priceRange: "₹1,50,000 - ₹1,90,000",
                    specializations: [
                        { name: "Journalism and Mass Communication", priceVal: 190000, career: "Media Manager, Editor", desc: "Advanced media narratives securely tracked entirely matching premium industry requirements." },
                        { name: "Public Policy & Governance", priceVal: 150000, career: "Policy Advisor", desc: "Advanced policy mechanisms securely tracked entirely matching premium government & NGO requirements." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Extensive focuses completely targeting modern publishing & policy networks.", "Full payment discount explicitly deployed inherently.", "Seamless EMI pipelines smoothly active."],
                        duration: "24 Months", eligibility: "Graduation carefully verified.",
                        paymentDetails: generateTable(s.priceVal, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "M.Sc", duration: "24 Months", priceRange: "₹2,75,000",
                    specializations: [
                        { name: "Data Science", priceVal: 275000, career: "Data Scientist", desc: "Core data infrastructures and mathematical models completely mapped." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Intensive analytical architectures.", "Full payment explicit discount directly processed."],
                        duration: "24 Months", eligibility: "Graduation logically tracking analytical foundations.",
                        paymentDetails: generateTable(s.priceVal, 24),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BBA", duration: "36 Months", priceRange: "₹1,99,000 - ₹2,50,000",
                    specializations: [
                        { name: "Data Analytics", priceVal: 250000, career: "Data Analyst" },
                        { name: "Business Analytics Professional", priceVal: 230000, career: "Business Analyst" },
                        { name: "Travel and Tourism Management", priceVal: 199000, career: "Tourism Executive" },
                        { name: "Bachelor of Business Administration (General)", priceVal: 199000, career: "Business Executive" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Massive foundation blocks directly establishing premium corporate trajectories naturally.",
                        usps: ["Direct alliances flawlessly tracking industry setups.", "Built-in explicit lumpsum payment discount entirely verified.", "No Cost EMI reliably handled."],
                        duration: "36 Months", eligibility: "10+2 gracefully verified from recognized boards.",
                        paymentDetails: generateTable(s.priceVal, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BCA", duration: "36 Months", priceRange: "₹1,75,000 - ₹2,75,000",
                    specializations: [
                        { name: "Financial Technology and AI", priceVal: 275000, career: "Fintech Executive" },
                        { name: "Cloud and Security", priceVal: 250000, career: "Cloud Support" },
                        { name: "Software Engineering", priceVal: 250000, career: "Software Engineer" },
                        { name: "Data Engineering", priceVal: 250000, career: "Data Engineer" },
                        { name: "Data Analytics", priceVal: 250000, career: "Data Analyst" },
                        { name: "Applied Data Engineering", priceVal: 230000, career: "Data Engineer" },
                        { name: "Data Science", priceVal: 175000, career: "Data Scientist" },
                        { name: "Bachelor of Computer Applications (General)", priceVal: 175000, career: "Software Developer" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Solid computational frameworks heavily targeting distinct modern computing logic directly.",
                        usps: ["Absolute exclusive corporate alignments natively.", "Upfront payment discount flawlessly scaling perfectly.", "Advanced WES recognized tier strictly active."],
                        duration: "36 Months", eligibility: "10+2 accurately verified.",
                        paymentDetails: generateTable(s.priceVal, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "B.Com", duration: "36 Months", priceRange: "₹1,15,000 - ₹2,75,000",
                    specializations: [
                        { name: "International Finance & Accounting", priceVal: 275000, career: "Finance Manager", desc: "Core commerce structures completely enhanced natively via ACCA." },
                        { name: "Honours", priceVal: 175000, career: "Accountant", desc: "Core commerce structures extensively expanded." },
                        { name: "Bachelor of Commerce (General)", priceVal: 115000, career: "Accountant", desc: "Solid commerce foundations seamlessly applied." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Direct ACCA alignment explicitly possible for international finance.", "Bloomberg Professional integration inherently mapped.", "EMI structurally mapped gracefully."],
                        duration: "36 Months", eligibility: "10+2 efficiently established.",
                        paymentDetails: generateTable(s.priceVal, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BA", duration: "36 Months", priceRange: "₹90,000 - ₹1,90,000",
                    specializations: [
                        { name: "Journalism and Mass Communication", priceVal: 190000, career: "Media Executive" },
                        { name: "Bachelor of Arts (General)", priceVal: 115000, career: "Civil Services Aspirant" },
                        { name: "BA (Malayalam/Tamil/Kannada/Telugu/Hindi Medium)", priceVal: 90000, career: "Content Executive" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Broad societal architectures deeply mapping essential liberal arts safely.",
                        usps: ["Premium NAAC A+ humanities degree scaling civil services correctly.", "Massive affordability effectively logging seamless EMI.", "Lumpsum structural discount cleanly active."],
                        duration: "36 Months", eligibility: "10+2 efficiently established.",
                        paymentDetails: generateTable(s.priceVal, 36),
                        brochure: null
                    }))
                },
                {
                    group: "Combo", name: "Dual Degree", duration: "54 Months", priceRange: "₹1,99,000 - ₹4,02,800",
                    specializations: [
                        { name: "BBA + MBA Degree Program", priceVal: 402800, career: "Business Head" },
                        { name: "BCA + MCA Degree Program", priceVal: 355300, career: "Tech Lead" },
                        { name: "B.Com + MBA Degree Program", priceVal: 323000, career: "Finance Head" },
                        { name: "UG + PG Degree Program", priceVal: 199000, career: "Corporate Executive" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Integrated curriculums explicitly linking UG and PG pipelines directly flawlessly.",
                        usps: ["Accelerated and combined degree paths securely.", "Lumpsum structural discount cleanly active.", "Premium NAAC A+ combined scaling natively."],
                        duration: "54 Months", eligibility: "10+2 accurately verified.",
                        paymentDetails: generateTable(s.priceVal, 54),
                        brochure: null
                    }))
                }
            ]
        },
        url: "https://amityonline.com/"
    };

    if (targetIdx > -1) {
        universities.splice(targetIdx, 1);
    }
    
    universities.push(amityData);

    const newStr = 'export const universities = ' + JSON.stringify(universities, null, 2) + ';\n';
    fs.writeFileSync('./src/data/universities.js', newStr, 'utf8');
    console.log("Amity Online data completely updated with exact website prices, specializations, discounts, scholarships and structure!");
}

run().catch(console.error);
