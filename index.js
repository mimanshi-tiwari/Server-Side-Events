const express = require('express')
const app = express()

const { join } = require('node:path')

app.get('/sse', (req,res) => {
    //* setup sse logic
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Cache-Control', 'no-cache')

    res.write('data: Welcome to server side events \n\n')
    //* data can come form anywhere, eg DB, here writing simple setinterval login

    const intervalId = setInterval(() => {
        res.write(`data: Server time ${new Date().toLocaleTimeString()}  \n\n`)
    }, 5000);

    req.on('close', () => {
        clearInterval(intervalId)
    })
})

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('listening to port ', PORT)
})
