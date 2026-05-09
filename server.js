const express = require('express');
const fs = require('fs');
const path = require('path');
const BookFactory = require('./factories/bookFactory');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

const booksFile = path.join(__dirname, 'data', 'books.json');

app.get('/api/books', (req, res) => {
    const rawBooks = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
    const type = req.query.type || 'physical';
    const books = rawBooks.map(book => BookFactory.createBook(book, type));
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const rawBooks = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
    const book = rawBooks.find(b => b.id == req.params.id);
    if (!book) return res.status(404).json({ error: 'Книга не найдена' });
    res.json(BookFactory.createBook(book, 'physical'));
});

app.post('/api/books', (req, res) => {
    const rawBooks = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
    const newBook = { id: Date.now(), ...req.body };
    rawBooks.push(newBook);
    fs.writeFileSync(booksFile, JSON.stringify(rawBooks, null, 2));
    res.json({ success: true });
});

app.delete('/api/books/:id', (req, res) => {
    let rawBooks = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
    rawBooks = rawBooks.filter(b => b.id != req.params.id);
    fs.writeFileSync(booksFile, JSON.stringify(rawBooks, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});