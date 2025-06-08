import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

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
};