type EnvConfig = {
  SERVICE_API: string;
  I_TAB_URL: string;
};

const config: Record<string, EnvConfig> = {
  dev: {
    SERVICE_API: 'http://localhost:8080',
    I_TAB_URL: 'https://...',
  },
} as const;

//Todo
export default config.dev;
