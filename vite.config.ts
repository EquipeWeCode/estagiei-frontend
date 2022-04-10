import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
const path = require('path');
import { getThemeVariables } from 'antd/dist/theme';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      optimize: true,
      libList: [
        {
          libName: 'antd',
          libDirectory: 'es',
          style: name => `antd/es/${name}/style`,
        },
      ],
    }),
  ],

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: getThemeVariables({
          // dark: true,
          // compact: true,
          'primary-color': '#1890ff',
        }),
        javascriptEnabled: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
