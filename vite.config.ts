import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs/promises'
import path from 'path'

const incomeFile = path.resolve('./src/utils/income.json')
const expenseFile = path.resolve('./src/utils/expenses.json')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'handle-json-storage',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          // Handle income data
          if (req.url === '/api/save-json' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const jsonData = JSON.parse(body)
                const prettyJson = JSON.stringify(jsonData, null, 2)
                await fs.writeFile(incomeFile, prettyJson)
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
              const exists = await fs.access(incomeFile).then(() => true).catch(() => false)
              if (!exists) {
                await fs.writeFile(incomeFile, '[]')
              }
              const data = await fs.readFile(incomeFile, 'utf-8')
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(data)
            } catch (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: 'Failed to load' }))
            }
            return
          }

          // Handle expense data
          if (req.url === '/api/save-expenses' && req.method === 'POST') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const jsonData = JSON.parse(body)
                const prettyJson = JSON.stringify(jsonData, null, 2)
                await fs.writeFile(expenseFile, prettyJson)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ success: true }))
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Failed to save' }))
              }
            })
            return
          }
          
          if (req.url === '/api/load-expenses' && req.method === 'GET') {
            try {
              const exists = await fs.access(expenseFile).then(() => true).catch(() => false)
              if (!exists) {
                await fs.writeFile(expenseFile, '[]')
              }
              const data = await fs.readFile(expenseFile, 'utf-8')
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
