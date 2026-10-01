// The fallback Metro and TypeScript resolve when no platform file matches (App.android.tsx,
// App.ios.tsx pick each platform's UI; docs/PLATFORM_UIS.md). Same as Android until iOS has its own.
export { default } from "./src/ui-android/App";
