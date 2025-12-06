import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * 📜 Compliance Readiness Certificate Generator
 * توليد شهادة امتثال قابلة للطباعة مع دعم كامل للعربية
 */

export interface CertificateData {
  companyName: string;
  score: number;
  frameworks: string[];
  date: Date;
  assessmentType: string;
}

/**
 * إنشاء HTML للشهادة مع CSS
 */
function createCertificateHTML(data: CertificateData): HTMLElement {
  const container = document.createElement("div");
  container.style.cssText = `
    width: 1122px;
    height: 794px;
    background: linear-gradient(135deg, #102e25 0%, #163c30 100%);
    padding: 40px;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: fixed;
    left: -9999px;
    top: 0;
  `;

  const dateStr = data.date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  container.innerHTML = `
    <div style="
      width: 100%;
      height: 100%;
      border: 3px solid #b8860b;
      border-radius: 8px;
      padding: 60px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    ">
      <!-- Title -->
      <div style="margin-bottom: 40px;">
        <h1 style="
          color: #b8860b;
          font-size: 48px;
          font-weight: bold;
          margin: 0 0 10px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        ">شهادة جاهزية الامتثال</h1>
        <p style="
          color: #c8c8c8;
          font-size: 20px;
          margin: 0;
        ">Compliance Readiness Certificate</p>
        <div style="
          width: 200px;
          height: 2px;
          background: #b8860b;
          margin: 20px auto;
        "></div>
      </div>

      <!-- Body -->
      <div style="margin-bottom: 40px;">
        <p style="
          color: #ffffff;
          font-size: 18px;
          margin: 0 0 20px 0;
        ">هذه الشهادة تؤكد أن</p>
        
        <h2 style="
          color: #b8860b;
          font-size: 36px;
          font-weight: bold;
          margin: 0 0 30px 0;
        ">${data.companyName}</h2>
        
        <p style="
          color: #ffffff;
          font-size: 18px;
          margin: 0 0 20px 0;
        ">قد حققت نسبة امتثال قدرها</p>
        
        <div style="
          color: #b8860b;
          font-size: 72px;
          font-weight: bold;
          margin: 0 0 10px 0;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.5);
        ">${data.score}%</div>
        
        <p style="
          color: #c8c8c8;
          font-size: 16px;
          margin: 0 0 30px 0;
        ">في تقييم: ${data.assessmentType}</p>
        
        ${data.frameworks.length > 0 ? `
          <p style="
            color: #ffffff;
            font-size: 14px;
            margin: 0 0 10px 0;
          ">الأطر التنظيمية المغطاة:</p>
          <p style="
            color: #b8860b;
            font-size: 14px;
            margin: 0;
          ">${data.frameworks.join(" • ")}</p>
        ` : ''}
      </div>

      <!-- Footer -->
      <div style="
        position: absolute;
        bottom: 40px;
        left: 60px;
        right: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      ">
        <div style="text-align: right;">
          <p style="
            color: #c8c8c8;
            font-size: 14px;
            margin: 0;
          ">تاريخ الإصدار: ${dateStr}</p>
        </div>
        
        <div style="
          width: 80px;
          height: 80px;
          border: 3px solid #b8860b;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            color: #b8860b;
            font-size: 14px;
            font-weight: bold;
          ">مصدق</span>
          <span style="
            color: #b8860b;
            font-size: 14px;
            font-weight: bold;
          ">رقمياً</span>
        </div>
      </div>

      <!-- Disclaimer -->
      <div style="
        position: absolute;
        bottom: 10px;
        left: 60px;
        right: 60px;
        text-align: center;
      ">
        <p style="
          color: #969696;
          font-size: 11px;
          margin: 0 0 8px 0;
        ">هذه الشهادة صادرة عن منصة الامتثال القانوني والتقني لأغراض التقييم والتحليل ولا تُعد استشارة قانونية ملزمة.</p>
        <p style="
          color: #b8860b;
          font-size: 13px;
          font-weight: bold;
          margin: 0;
        ">منصة الامتثال القانوني والتقني</p>
      </div>
    </div>
  `;

  return container;
}

/**
 * توليد شهادة الامتثال
 */
export async function generateComplianceCertificate(data: CertificateData): Promise<Blob> {
  // Create HTML element
  const element = createCertificateHTML(data);
  document.body.appendChild(element);

  try {
    // Convert to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: null,
      logging: false,
      useCORS: true
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    // Clean up
    document.body.removeChild(element);

    return pdf.output("blob");
  } catch (error) {
    document.body.removeChild(element);
    throw error;
  }
}

/**
 * تحميل الشهادة مباشرة
 */
export async function downloadCertificate(data: CertificateData) {
  const blob = await generateComplianceCertificate(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `compliance-certificate-${data.companyName}-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
