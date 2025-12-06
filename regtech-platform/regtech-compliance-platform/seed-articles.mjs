import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.DATABASE_URL);

// الحصول على أول framework
const [frameworks] = await connection.execute('SELECT id FROM frameworks LIMIT 1');
if (frameworks.length === 0) {
  console.error('No frameworks found');
  process.exit(1);
}

const frameworkId = frameworks[0].id;

const articles = [
  {
    frameworkId,
    articleNumber: 'ART-1',
    title: 'مقدمة في الامتثال التنظيمي',
    content: 'نظرة عامة على متطلبات الامتثال التنظيمي في السعودية',
    status: 'active',
  },
  {
    frameworkId,
    articleNumber: 'ART-2',
    title: 'أفضل الممارسات في إدارة المخاطر',
    content: 'دليل شامل لأفضل الممارسات في إدارة المخاطر',
    status: 'active',
  },
  {
    frameworkId,
    articleNumber: 'ART-3',
    title: 'حماية البيانات الشخصية',
    content: 'متطلبات حماية البيانات الشخصية وفقاً للأنظمة السعودية',
    status: 'active',
  },
];

for (const article of articles) {
  await connection.execute(
    'INSERT INTO articles (frameworkId, articleNumber, title, content, status) VALUES (?, ?, ?, ?, ?)',
    [article.frameworkId, article.articleNumber, article.title, article.content, article.status]
  );
  console.log(`✅ تم إضافة مادة: ${article.title}`);
}

await connection.end();
console.log('\n✅ تم إضافة جميع المواد بنجاح!');
