import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import contactHandler from './api/contact.ts';

// Load .env and .env.local for local serverless execution in Vite dev server
dotenv.config();
dotenv.config({ path: '.env.local', override: true });

function contactApiPlugin(): Plugin {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method === 'POST') {
          try {
            let bodyStr = '';
            for await (const chunk of req) {
              bodyStr += chunk;
            }

            let parsedBody = {};
            try {
              parsedBody = bodyStr ? JSON.parse(bodyStr) : {};
            } catch {
              parsedBody = {};
            }

            // Create compatible mock req & res objects for contact handler
            const fakeReq = {
              method: req.method,
              headers: req.headers,
              body: parsedBody,
            };

            const fakeRes = {
              statusCode: 200,
              headers: {} as Record<string, string>,
              setHeader(key: string, value: string) {
                this.headers[key] = value;
                res.setHeader(key, value);
                return this;
              },
              status(code: number) {
                this.statusCode = code;
                res.statusCode = code;
                return this;
              },
              json(data: any) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = this.statusCode;
                res.end(JSON.stringify(data));
                return this;
              },
              end(data?: any) {
                res.statusCode = this.statusCode;
                res.end(data);
                return this;
              },
            };

            await contactHandler(fakeReq, fakeRes);
          } catch (err: any) {
            console.error('[Vite Local Dev API Error]:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message || 'Internal Dev Server Error' }));
          }
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contactApiPlugin()],
});
