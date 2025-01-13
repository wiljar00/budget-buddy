import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs/promises'
import path from 'path'

const dataFile = path.resolve('./src/utils/data.json')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-json-storage',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/save-json' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                await fs.writeFile(dataFile, body)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: true }))
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Failed to save' }))
              }
            })
            return
          }
          
          if (req.url === '/api/load-json' && req.method === 'GET') {
            try {
              const exists = await fs.access(dataFile).then(() => true).catch(() => false)
              if (!exists) {
                await fs.writeFile(dataFile, '[]')
              }
              const data = await fs.readFile(dataFile, 'utf-8')
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(data)
            } catch (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Failed to load' }))
            }
            return
          }
          
          next()
        })
      },
    },
  ],
})
