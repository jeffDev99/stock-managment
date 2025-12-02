import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// تابعی برای خواندن فایل از پوشه public
const loadFile = (url, callback) => {
    fetch(url).then(res => res.arrayBuffer()).then(callback);
};

export const generateDocxReport = (reportData) => {
    // مسیر فایل الگو در پوشه public
    const templatePath = '/report_template.docx';

    loadFile(templatePath, (content) => {
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        // فرمت کردن تاریخ
        const formattedDate = new Date(reportData.transferDate).toLocaleDateString('fa-IR');

        // آماده‌سازی داده‌ها برای جایگذاری در قالب
        const dataForTemplate = {
            ...reportData,
            transferDate: formattedDate, // استفاده از تاریخ فرمت شده
        };
        
        doc.setData(dataForTemplate);

        try {
            // جایگذاری تگ‌ها با داده‌ها
            doc.render();
        } catch (error) {
            console.error('خطا در زمان رندر کردن فایل docx:', error);
            // می‌توانید خطا را به کاربر نمایش دهید
            return;
        }

        // تولید فایل نهایی و آماده‌سازی برای دانلود
        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        // دانلود فایل
        saveAs(out, ` سند-انتقال-${reportData.transferId}.docx`);
    });
}

// تابع برای ساخت HTML با قالب کامل
const generateHtmlTemplate = (reportData) => {
    console.log(reportData);
    const formattedDate = new Date(reportData.transferDate).toLocaleDateString('fa-IR');
    const documentNumber = reportData.transferId || reportData.documentNumber || '';
    const delivererName = reportData.fromUserFullName || reportData.deliverer?.userName || 'محمد حسین هاشمی';
    const delivererTitle = reportData.delivererTitle || 'مدیر مؤسسه';
    const receiverName = reportData.toUserFullName    || reportData.receiver?.userName || '';
    const receiverPhone = reportData.receiverPhone || reportData.receiver?.phoneNumber || '';
    const goods = reportData.goods || reportData.items || [];

    return `
        <!DOCTYPE html>
        <html dir="rtl" lang="fa">
        <head>
            <meta charset="UTF-8">
            <style>
                @page {
                    size: A4;
                    margin: 0;
                }
                @font-face {
                    font-family: 'B Nazanin';
                    src: local('B Nazanin'), local('BNazanin');
                }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'B Nazanin', 'BNazanin', 'Nazanin', 'Tahoma', 'Arial', sans-serif;
                }
                body {
                    font-family: 'B Nazanin', 'BNazanin', 'Nazanin', 'Tahoma', 'Arial', sans-serif;
                    direction: rtl;
                    width: 210mm;
                    min-height: 207mm;
                    padding: 0;
                    background: white;
                    position: relative;
                }
                .watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 0;
                    opacity: 0.2;
                    width: 50%;
                    height: auto;
                    pointer-events: none;
                }
                .watermark img {
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                    display: block;
                }
                .content {
                    position: relative;
                    z-index: 1;
                    margin: 0;
                    padding: 10mm 15mm 15mm 15mm;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-top: 0;
                    margin-bottom: 15px;
                    border-bottom: 2px solid #000;
                    padding-bottom: 10px;
                }
                .header-right {
                    text-align: right;
                }
                .header-left {
                    text-align: left;
                }
                .title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .institute-name {
                    font-size: 16px;
                    font-weight: bold;
                    margin-top: 5px;
                }
                .logo-section {
                    text-align: center;
                    margin: 5px 0;
                }
                .document-info {
                    font-size: 12px;
                    margin-top: 5px;
                }
                .table-container {
                    margin: 20px 0;
                    width: 100%;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    font-size: 11px;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 8px;
                    text-align: center;
                }
                th {
                    background-color: #f0f0f0;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 30px;
                    border-top: 2px solid #000;
                    padding-top: 15px;
                }
                .signature-section {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }
                .signature-box {
                    width: 45%;
                    text-align: center;
                }
                .signature-label {
                    margin-bottom: 60px;
                    font-size: 12px;
                }
                .commitment {
                    margin-top: 20px;
                    font-size: 11px;
                    text-align: justify;
                    line-height: 1.8;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <div class="watermark">
                <img src="/icon.png" alt="Watermark" />
            </div>
            <div class="content">
                <div class="header">
                    <div class="header-right">
                        <div class="title">سند تحویل اموال عمومی</div>
                        <div class="institute-name">مؤسسه شهید علی هاشمی</div>
                    </div>
                    <div class="header-left">
                        <div class="document-info">تاریخ ثبت: ${formattedDate}</div>
                        <div class="document-info">شماره سند: ${documentNumber}</div>
                    </div>
                </div>
                
                <div class="logo-section">
                    <div class="institute-name">مؤسسه فرهنگی و هنری سردار سرلشکر شهید علی هاشمی</div>
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ردیف</th>
                                <th>شرح اموال کالا</th>
                                <th>شماره اموال</th>
                                <th>شماره سریال</th>
                                <th>محل استقرار (استفاده)</th>
                                <th>ملاحظات</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${goods.map((good, index) => `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${good.goodName || ''}</td>
                                    <td>${good.goodNO ||  ''}</td>
                                    <td>${good.serialNO ||  ''}</td>
                                    <td>${good.currentLocation ||  ''}</td>
                                    <td>${good.description ||  ''}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <div class="footer">
                    <div style="margin-bottom: 15px;">
                        <strong>تحویل دهنده:</strong> ${delivererName} 
                    </div>
                    <div style="margin-bottom: 15px;">
                        <strong>تحویل گیرنده:</strong> ${receiverName} 
                    </div>
                    
                    <div class="signature-section">
                        <div class="signature-box">
                            <div class="signature-label">امضاء تحویل دهنده:</div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-label">امضاء تحویل گیرنده:</div>
                        </div>
                    </div>

                    <div class="commitment">
                        اینجانب متعهد میشوم هرگونه خسارت یا سرقت که در مدت تحویل اقلام فوق مندرج صورت پذیرد، خسارات وارده را پس از تأیید کمیسیون خسارات پرداخت نمایم.
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};

// تابع برای تبدیل DOCX به PDF با حفظ قالب
export const generatePdfReport = async (reportData) => {
    try {
        // ساخت HTML با قالب کامل
        const htmlContent = generateHtmlTemplate(reportData);

        // ایجاد یک المان موقت برای رندر کردن HTML
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '210mm';
        tempDiv.style.backgroundColor = 'white';
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        // صبر برای لود شدن تصویر watermark
        const watermarkImg = tempDiv.querySelector('.watermark img');
        if (watermarkImg) {
            await new Promise((resolve) => {
                if (watermarkImg.complete) {
                    resolve();
                } else {
                    watermarkImg.onload = resolve;
                    watermarkImg.onerror = resolve; // ادامه حتی اگر تصویر لود نشد
                }
            });
        }

        // صبر برای لود شدن فونت‌ها و سایر تصاویر
        await new Promise(resolve => setTimeout(resolve, 500));

        // تبدیل HTML به Canvas با html2canvas - کل tempDiv را رندر می‌کنیم
        const canvas = await html2canvas(tempDiv, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            width: 794, // عرض A4 به پیکسل (210mm * 3.78)
            height: tempDiv.scrollHeight,
            windowWidth: 794,
            allowTaint: true
        });

        // حذف المان موقت
        document.body.removeChild(tempDiv);

        // ایجاد PDF با jsPDF
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        const imgWidth = 297; // عرض A4 به میلی‌متر
        const pageHeight = 210; // ارتفاع A4 به میلی‌متر
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // اضافه کردن تصویر به PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // اضافه کردن صفحات بیشتر در صورت نیاز
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // دانلود فایل PDF
        pdf.save(`سند-انتقال-${reportData.transferId || reportData.documentNumber || 'document'}.pdf`);
    } catch (error) {
        console.error('خطا در تبدیل به PDF:', error);
        throw error;
    }
}
