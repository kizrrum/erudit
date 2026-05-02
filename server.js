const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/words.txt', (req, res) => {
    res.sendFile(path.join(__dirname, 'words.txt'));
});

//
// 🎵 ДОБАВЛЯЕМ ЭТО
//
app.get('/midi-list', (req, res) => {
    const dir = path.join(__dirname, 'music');

    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка чтения папки music');
        }

        const midi = files.filter(f => f.toLowerCase().endsWith('.mid'));
        res.json(midi);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});