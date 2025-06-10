// =============================================================================
// TELEGRAM MINI APP INTEGRATION - UNCOMMENT WHEN READY FOR TELEGRAM
// =============================================================================

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

interface TelegramInitData {
  user?: TelegramUser;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
  auth_date: number;
  hash: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramInitData;
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: any;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: any;
  MainButton: any;
  HapticFeedback: any;
  ready(): void;
  expand(): void;
  close(): void;
  showAlert(message: string): void;
  showConfirm(message: string, callback: (confirmed: boolean) => void): void;
  showPopup(params: any, callback?: (buttonId: string) => void): void;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
  sendData(data: string): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
};

export const isTelegramMiniApp = (): boolean => {
  const webApp = getTelegramWebApp();
  return webApp !== null && webApp.initData !== '';
};

export const getTelegramUser = (): TelegramUser | null => {
  const webApp = getTelegramWebApp();
  if (webApp && webApp.initDataUnsafe.user) {
    return webApp.initDataUnsafe.user;
  }
  return null;
};

export const getTelegramInitData = (): TelegramInitData | null => {
  const webApp = getTelegramWebApp();
  if (webApp && webApp.initDataUnsafe) {
    return webApp.initDataUnsafe;
  }
  return null;
};

export const initializeTelegramApp = (): void => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    webApp.ready();
    webApp.expand();
  }
};

// =============================================================================
// MOCK DATA FOR TESTING - COMMENT OUT WHEN USING REAL TELEGRAM
// =============================================================================

// Mock Telegram data for testing purposes
// export const getMockTelegramUser = () => ({
//     id: 123456789,
//     first_name: "John",
//     last_name: "Doe",
//     username: "johndoe",
//     language_code: "en",
//     is_premium: false,
//     photo_url: "/placeholder.svg?height=80&width=80",
//   })
  
//   export const getMockTelegramInitData = () => ({
//     user: getMockTelegramUser(),
//     chat_type: "private",
//     auth_date: Date.now(),
//     hash: "mock_hash_for_testing",
//   })
  
//   // Mock functions for testing
//   export const getTelegramWebApp = () => null
//   export const isTelegramMiniApp = () => false // Set to true to test Telegram mode
//   export const getTelegramUser = () => getMockTelegramUser()
//   export const getTelegramInitData = () => getMockTelegramInitData()
//   export const initializeTelegramApp = () => {
//     console.log("Mock Telegram app initialized")
//   }
  
  // =============================================================================
  // TO SWITCH TO REAL TELEGRAM:
  // 1. Comment out the mock functions above
  // 2. Uncomment the real Telegram integration code at the top
  // 3. Add Telegram Web App script to your HTML head:
  //    <script src="https://telegram.org/js/telegram-web-app.js"></script>
  // 4. Test in actual Telegram environment
  // =============================================================================
  