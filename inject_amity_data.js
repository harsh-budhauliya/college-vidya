import fs from 'fs';
import { pathToFileURL } from 'url';

async function run() {
    const { universities } = await import(pathToFileURL('./src/data/universities.js').href);
    
    let targetIdx = universities.findIndex(u => u.name.toLowerCase().includes('amity online') || u.id === 'amity' || u.id === 'amity-online');
    
    function formatMoney(amount) {
        if (typeof amount === 'string') return amount;
        return '₹' + amount.toLocaleString('en-IN');
    }

    function generateTable(lumpsumFee, annualFeePerYear, semFeePerSem, durationMonths) {
        let semesters = durationMonths / 6;
        let years = durationMonths / 12;

        let totalSemFee = semFeePerSem * semesters;
        let totalAnnualFee = annualFeePerYear * years;
        
        // Let's use totalSemFee as the base "original" price, and calculate how much discount is applied if they pay Annually or Lumpsum
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
  <div style="margin-top: 16px; font-size: 13px; color: #475569; background: #f8fafc; padding: 12px; border-radius: 6px; border-left: 4px solid #94a3b8; border: 1px solid #e2e8f0; border-left-width: 4px;">
    <p style="margin: 0 0 6px 0; font-weight: 700; color: #334155;">Financial Breakdown & Validations:</p>
    <ul style="margin: 0; padding-left: 20px; font-size: 12px; line-height: 1.5;">
      <li><b>Scholarship Logic:</b> <b>Flat 20% Scholarships</b> immediately applicable for Defense, Divyaang, Merit (85%+), and Alumni categories.</li>
      <li><b>Upfront Payment Concession:</b> Built-in scaling of 8-12% structural discounts smoothly applied when paying full lumpsum dynamically.</li>
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
        budget: 207000,
        specializations: ["MBA", "MCA", "BBA", "BCA", "B.Com", "M.Com", "BA", "MA JMC", "BA JMC"],
        accreditation: "NAAC A+ | WASC (USA) | UGC Entitled",
        fees: "₹81,180 - ₹2,07,000",
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
            payment: "<b>Fee Formats Evaluated:</b> Amity dynamically builds in an 8-12% fee drop smoothly strictly for full one-time payments.<br/><br/><b>Financial Partners:</b> Massive 0% No-Cost EMI structures are heavily deployed tracking smoothly down to minimums like ₹4,552/month flawlessly.",
            programs: [
                {
                    group: "PG", name: "MBA", duration: "24 Months", priceRange: "₹2,07,000 (Lumpsum) / ₹56,300 (Sem)",
                    specializations: [
                        { name: "Dual Specialization", priceVal: 207000, career: "Business Head" },
                        { name: "General Management", priceVal: 207000, career: "General Manager" },
                        { name: "Hospital and Healthcare Management", priceVal: 207000, career: "Healthcare Director" },
                        { name: "International Finance", priceVal: 207000, career: "Finance Manager" },
                        { name: "Business Analytics", priceVal: 207000, career: "Business Analyst" },
                        { name: "Data Science", priceVal: 207000, career: "Data Scientist" },
                        { name: "HR Analytics", priceVal: 207000, career: "HR Strategist" },
                        { name: "Digital Marketing Management", priceVal: 207000, career: "Digital Marketing Lead" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Top 10 QS Asia-Pacific ranked curriculum natively establishing superior business intelligence structures securely.",
                        usps: ["QS Ranked Online MBA (Top 10 Asia Pacific).", "8% structural Lumpsum payment discount scaling heavily.", "EMI scaling sharply at ₹8,906/month."],
                        duration: "24 Months", eligibility: "Graduation logically tracking minimum 40% criteria entirely.",
                        paymentDetails: generateTable(s.priceVal, 106880, 56300, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "MCA", duration: "24 Months", priceRange: "₹1,83,080 (Lumpsum) / ₹49,800 (Sem)",
                    specializations: [
                        { name: "Fintech & AI (with Paytm)", priceVal: 183080, career: "AI/Fintech Architect" },
                        { name: "Machine Learning & AI (with TCS iON)", priceVal: 183080, career: "ML Engineer" },
                        { name: "Cyber Security (with HCLTech)", priceVal: 183080, career: "Cyber Security Specialist" },
                        { name: "Software Engineering (with HCLTech)", priceVal: 183080, career: "Software Engineer" },
                        { name: "Blockchain Technology & Management", priceVal: 183080, career: "Blockchain Architect" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Absolute core computing architecture smoothly mapping specialized logic naturally.",
                        usps: ["Explicit partnerships integrating TCS iON, HCLTech, and Paytm securely.", "Structured upfront lump-sum scaling discount inherently applied.", "EMI naturally handled at ₹7,877/month."],
                        duration: "24 Months", eligibility: "Graduation heavily tracking Mathematics via 10+2/Degree accurately.",
                        paymentDetails: generateTable(s.priceVal, 94530, 49800, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "MCom", duration: "24 Months", priceRange: "₹1,32,000 (Lumpsum) / ₹35,625 (Sem)",
                    specializations: [
                        { name: "Financial Management", priceVal: 132000, career: "Finance Manager", desc: "Rigorous commerce setups explicitly mapping financial strategy efficiently." },
                        { name: "Fintech", priceVal: 132000, career: "Fintech Lead", desc: "Modern commerce setups explicitly mapping financial technology effectively." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Intensive accounting frameworks accurately establishing premium corporate structures.", "Full payment explicit discount directly processed.", "Seamless EMI pipelines natively active at ₹5,938/month."],
                        duration: "24 Months", eligibility: "Bachelor's degree smoothly validated.",
                        paymentDetails: generateTable(s.priceVal, 68250, 35625, 24),
                        brochure: null
                    }))
                },
                {
                    group: "PG", name: "MA (Journalism & Mass Comm)", duration: "24 Months", priceRange: "₹1,67,200 (Lumpsum) / ₹45,000 (Sem)",
                    specializations: [
                        { name: "General", priceVal: 167200, career: "Media Manager, Editor", desc: "Advanced media narratives securely tracked entirely matching premium industry requirements." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Extensive media focuses completely targeting modern publishing networks.", "Full payment discount explicitly deployed inherently.", "Seamless EMI pipelines smoothly active at ₹7,521/month."],
                        duration: "24 Months", eligibility: "Graduation carefully verified.",
                        paymentDetails: generateTable(s.priceVal, 86320, 45000, 24),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BBA", duration: "36 Months", priceRange: "₹1,75,120 (Lumpsum) / ₹33,200 (Sem)",
                    specializations: [
                        { name: "Data Analytics (with HCLTech)", priceVal: 175120, career: "Data Analyst" },
                        { name: "Travel and Tourism Management", priceVal: 175120, career: "Tourism Executive" },
                        { name: "Digital Marketing", priceVal: 175120, career: "Digital Marketer" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Massive foundation blocks directly establishing premium corporate trajectories naturally.",
                        usps: ["Direct HCLTech alliance flawlessly tracking industry setups.", "Built-in explicit lumpsum payment discount entirely verified.", "No Cost EMI reliably handled at ₹7,877/month."],
                        duration: "36 Months", eligibility: "10+2 gracefully verified from recognized boards.",
                        paymentDetails: generateTable(s.priceVal, 63020, 33200, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BCA", duration: "36 Months", priceRange: "₹1,54,000 (Lumpsum) / ₹29,200 (Sem)",
                    specializations: [
                        { name: "Fintech & AI (with Paytm)", priceVal: 154000, career: "Fintech Executive" },
                        { name: "Data Engineering (with HCLTech)", priceVal: 154000, career: "Data Engineer" },
                        { name: "Software Engineering (with HCLTech)", priceVal: 154000, career: "Software Engineer" },
                        { name: "Data Analytics", priceVal: 154000, career: "Data Analyst" },
                        { name: "Cloud & Security", priceVal: 154000, career: "Cloud Support" },
                        { name: "Data Science", priceVal: 154000, career: "Data Scientist" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Solid computational frameworks heavily targeting distinct modern computing logic directly.",
                        usps: ["Absolute exclusive corporate alignments natively (Paytm, HCLTech).", "Upfront payment discount flawlessly scaling perfectly.", "Advanced WES recognized tier strictly active."],
                        duration: "36 Months", eligibility: "10+2 accurately verified.",
                        paymentDetails: generateTable(s.priceVal, 55420, 29200, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "B.Com", duration: "36 Months", priceRange: "₹1,06,000 (Lumpsum) / ₹20,000 (Sem)",
                    specializations: [
                        { name: "International Finance & Accounting", priceVal: 106000, career: "Accountant, Finance Manager", desc: "Core commerce structures completely enhanced natively via ACCA." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Direct ACCA alignment heavily providing up to 60% exemptions natively.", "Bloomberg Professional integration inherently mapped.", "EMI structurally mapped gracefully down to ₹4,773/month."],
                        duration: "36 Months", eligibility: "10+2 efficiently established.",
                        paymentDetails: generateTable(s.priceVal, 38150, 20000, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BA", duration: "36 Months", priceRange: "₹81,180 (Lumpsum) / ₹15,000 (Sem)",
                    specializations: [
                        { name: "Sociology", priceVal: 81180, career: "HR Executive" },
                        { name: "Political Science", priceVal: 81180, career: "Policy Analyst" },
                        { name: "English", priceVal: 81180, career: "Content Writer" },
                        { name: "Economics", priceVal: 81180, career: "Economist" }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: "Broad societal architectures deeply mapping essential liberal arts safely.",
                        usps: ["Premium NAAC A+ humanities degree scaling civil services correctly.", "Massive affordability effectively logging ₹4,552/month EMI.", "Lumpsum structural discount cleanly active."],
                        duration: "36 Months", eligibility: "10+2 efficiently established.",
                        paymentDetails: generateTable(s.priceVal, 28600, 15000, 36),
                        brochure: null
                    }))
                },
                {
                    group: "UG", name: "BA (Journalism & Mass Comm)", duration: "36 Months", priceRange: "₹1,67,200 (Lumpsum) / ₹31,700 (Sem)",
                    specializations: [
                        { name: "General", priceVal: 167200, career: "Media Executive", desc: "Core media structures completely mapping digital transitions." }
                    ].map(s => ({
                        name: s.name, price: formatMoney(s.priceVal), careerPath: s.career, syllabus: s.desc,
                        usps: ["Direct media house alignments fully validated.", "Lumpsum explicit discount natively supported.", "EMI smoothly tracked gracefully to ₹7,521/month."],
                        duration: "36 Months", eligibility: "10+2 efficiently established.",
                        paymentDetails: generateTable(s.priceVal, 60170, 31700, 36),
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
    console.log("Amity Online data natively mapped structurally directly into the repository perfectly with high-density no-glow UI!");
}

run().catch(console.error);
