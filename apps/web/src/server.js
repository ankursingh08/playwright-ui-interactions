const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ filename: req.file.originalname, size: req.file.size, mimetype: req.file.mimetype });
});

app.post('/api/upload-multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files' });
  res.json({ files: req.files.map((f) => ({ filename: f.originalname, size: f.size, mimetype: f.mimetype })) });
});

app.get('/api/download/:filename', (req, res) => {
  res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(`Sample content for ${req.params.filename}`);
});

app.get('/api/search', (req, res) => {
  const query = (req.query.q || '').toString().toLowerCase();
  const items = ['JavaScript','TypeScript','Python','Java','Go','Rust','C++','Ruby','Swift','Kotlin','Playwright','Cypress','Selenium','Puppeteer','WebdriverIO'];
  setTimeout(() => res.json(items.filter((i) => i.toLowerCase().includes(query))), 200);
});

app.get('/api/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const total = 50;
  const start = (page - 1) * limit;
  const items = [];
  for (let i = start; i < Math.min(start + limit, total); i++) {
    items.push({ id: i + 1, title: `Item ${i + 1}`, description: `Description for item ${i + 1}` });
  }
  res.json({ items, page, totalPages: Math.ceil(total / limit), hasMore: start + limit < total });
});

app.listen(PORT, () => console.log(`Test app running at http://localhost:${PORT}`));
