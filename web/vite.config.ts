import react from '@vitejs/plugin-react-swc'
import path from "path"
import { defineConfig } from "vite"
// https://vitejs.dev/config/

interface ImportMetaEnv extends ImportMeta {
  env: Record<string, string>;
}
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': (import.meta as ImportMetaEnv).env,
  },
})
