# HEAL GEMSS – Native Mobile Application (Android & iOS)

This directory contains the production-ready React Native / Expo codebase for **HEAL GEMSS** by **Smpita Deb**, connected directly to your existing WooCommerce store: `https://numerosouravmidya.in`.

---

## 1. Prerequisites

- **Node.js**: v18 or higher
- **Expo CLI & EAS CLI**:
  ```bash
  npm install -g eas-cli expo-cli
  ```
- **Expo Account**: Create a free account at [expo.dev](https://expo.dev)

---

## 2. Project Setup

From your terminal:
```bash
cd native-app
npm install
```

Log in to your Expo account:
```bash
eas login
```

Configure your EAS project:
```bash
eas project:init
```

---

## 3. Building for Android

### A. Build Standalone Installable APK (For Direct Device Testing)
```bash
eas build -p android --profile preview
```
Once the build completes on the EAS cloud, download the `.apk` file and install it directly on any Android smartphone or tablet.

### B. Build Google Play Store App Bundle (AAB)
```bash
eas build -p android --profile production
```
Upload the generated `.aab` file to your Google Play Console under **Production > Releases**.

---

## 4. Building for Apple iOS (iPhone & iPad)

### A. Build iOS App Store Package (IPA)
```bash
eas build -p ios --profile production
```

### B. Submit Directly to Apple App Store / TestFlight
```bash
eas submit -p ios --profile production
```

---

## 5. WooCommerce Store Integration

The mobile application connects directly to your live WooCommerce store using the Store API:
- Endpoint: `https://numerosouravmidya.in/wp-json/wc/store/v1/products?per_page=100`
- Physical Products: Natural Crystal Bracelets, Rudraksha beads & malas, Vastu tapes.
- Consultations & astrology services are excluded by design.

---

## 6. Razorpay Configuration

In `app.json` (or your EAS secret environment variables):
- `RAZORPAY_KEY_ID`: Your Razorpay Key ID (e.g., `rzp_live_...`)
- `RAZORPAY_KEY_SECRET`: Kept securely on your backend server (`server.ts`) for HMAC SHA-256 signature verification.
