const { Client, LocalAuth } = require('whatsapp-web.js');

console.log('بدء تشغيل التطبيق...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('رمز QR النصي (انسخه وحوله إلى صورة):', qr);
});

client.on('ready', () => {
    console.log('الشات بوت جاهز!');
});

client.on('message', message => {
    console.log('رسالة جديدة:', message.body);
    if (message.body === 'مرحبا') {
        message.reply('مرحباً! كيف يمكنني مساعدتك اليوم؟');
    } else if (message.body === 'ما الأسعار؟') {
        message.reply('الأسعار تبدأ من 50 دولار شهرياً. تواصل معنا للتفاصيل!');
    } else {
        message.reply('آسف، لم أفهم. اكتب "مرحبا" للبدء.');
    }
});

client.on('disconnected', (reason) => {
    console.log('تم قطع الاتصال:', reason);
});

client.on('error', (error) => {
    console.log('خطأ في التطبيق:', error);
});

client.initialize().then(() => {
    console.log('تم تهيئة العميل بنجاح');
}).catch((err) => {
    console.log('فشل في تهيئة العميل:', err);
});
