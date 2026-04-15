const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')
const path = require('path')
const http = require('http')

let mainWindow
let nextProcess

const isDev = !app.isPackaged

function waitForServer(url, retries = 60, delay = 1000) {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const attempt = () => {
      attempts++
      console.log(`Waiting for server... attempt ${attempts}/${retries}`)
      http.get(url, (res) => {
        console.log(`Server responded with status: ${res.statusCode}`)
        if (res.statusCode < 500) resolve()
        else retry()
      }).on('error', (err) => {
        console.log(`Server not ready: ${err.message}`)
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
  if (isDev) return

  const appRoot = path.join(__dirname, '..')
  const nextBin = path.join(appRoot, 'node_modules', 'next', 'dist', 'bin', 'next')
  const mlPath = path.join(process.resourcesPath, 'ml')
  const dbPath = path.join(app.getPath('userData'), 'local.db')

  nextProcess = spawn('node', [nextBin, 'start'], {
    cwd: appRoot,
    env: {
      ...process.env,
      PORT: '3000',
      NODE_ENV: 'production',
      ML_PATH: mlPath,
      DB_PATH: dbPath
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

  try {
    await waitForServer('http://localhost:3000', 60, 1000)
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