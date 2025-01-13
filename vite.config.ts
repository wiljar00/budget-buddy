import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs/promises'
import path from 'path'

const dataFile = 'data.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    middleware: [
      {
        name: 'handle-income-data',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/save' && req.method === 'POST') {
              let body = ''
              req.on('data', chunk => { body += chunk })
              req.on('end', async () => {
                try {
                  await fs.writeFile(dataFile, body)
                  res.end(JSON.stringify({ success: true }))
                } catch (error) {
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: 'Failed to save' }))
                }
              })
              return
            }
            
            if (req.url === '/api/load' && req.method === 'GET') {
              try {
                const exists = await fs.access(dataFile).then(() => true).catch(() => false)
                const data = exists ? await fs.readFile(dataFile, 'utf-8') : '[]'
                res.end(data)
              } catch (error) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: 'Failed to load' }))
              }
              return
            }
            
            next()
          })
        }
      }
    ]
  }
})
