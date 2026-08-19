import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GaleriaPhotosGabriel',
  webDir: 'dist',

    plugins: {
    Camera: {
      permissions: ["camera", "photos"],
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "rgb(95, 27, 27)",
    },
    Keyboard: {
      resize: "body",
    },
  },
};




export default config;
