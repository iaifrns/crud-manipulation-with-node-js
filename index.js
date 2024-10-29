import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __direname = path.dirname(__filename)
const app = express()

const __publicfolder = path.join(__direname, 'public')

app.use(express.static(__publicfolder))

app.get('/', (req, res) => {
    res.sendFile(path.join(__publicfolder, 'mainPage.html'))
})

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__publicfolder, 'createUserPage.html'))
})

const port = '3000'

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})

