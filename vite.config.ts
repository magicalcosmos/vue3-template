import { defineConfig } from 'vite';
import devUserConfig from './configuration/vite.config.dev';
import prodUserConfig from './configuration/vite.config.prod';

const configResolve = {
  serve: () => {
    return { ...devUserConfig };
  },
  build: () => {
    return { ...prodUserConfig };
  },
};

export default defineConfig(({ command }) => {
  return configResolve[command]();
});
