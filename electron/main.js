const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const http = require('http')

let mainWindow
let nextProcess

const isDev = !app.isPackaged

function waitForServer(url, retries = 30, delay = 1000) {
    return new Promise((resolve, reject) => {
        let attempts = 0
        const attempt = () => {
            attempts++
            console.log(`Waiting for server... attempt ${attempts}/${retries}`)
            http.get(url, (res) => {
                console.log(`Server responded with status: ${res.statusCode}`)
                if (res.statusCode < 500) resolve()  // accept any non-server-error response
                else retry()
            }).on('error', (err) => {
                console.log(`Server not ready yet: ${err.message}`)
                retry()
            })
        }
        const retry = () => {
            if (retries-- <= 0) return reject(new Error('Server did not start in time'))
            setTimeout(attempt, delay)
        }
        attempt()
    })
}

function startNextServer() {
    // Only spawn Next.js in production — in dev, concurrently handles it
    if (isDev) return

    nextProcess = spawn('node', [
        path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next'),
        'start'
    ], {
        cwd: path.join(__dirname, '..'),
        env: {
            ...process.env,
            PORT: '3000',
            NODE_ENV: 'production',
            ML_PATH: path.join(process.resourcesPath, 'ml')
        }
    })

    nextProcess.stdout.on('data', (data) => console.log(`Next.js: ${data}`))
    nextProcess.stderr.on('data', (data) => console.error(`Next.js error: ${data}`))
}

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        }
    })

    mainWindow.loadFile(path.join(__dirname, 'loading.html'))
    mainWindow.show()
    // mainWindow.webContents.openDevTools()  // ← add this temporarily

    try {
        await waitForServer('http://localhost:3000', 60, 1000)  // 60 seconds
        mainWindow.loadURL('http://localhost:3000')
    } catch (err) {
        mainWindow.loadFile(path.join(__dirname, 'error.html'))
    }
}

app.whenReady().then(() => {
    startNextServer()
    createWindow()
})

app.on('window-all-closed', () => {
    if (nextProcess) nextProcess.kill()
    app.quit()
})

app.on('before-quit', () => {
    if (nextProcess) nextProcess.kill()
})