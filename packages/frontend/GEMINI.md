### Custom Instructions: React Native + Expo Project Architecture & Best Practices

**Objective:** To generate code and project structures that are scalable, maintainable, and follow modern best practices for React Native and Expo. Apply these rules consistently.

### **1. Project Setup & Directory Structure**

A well-organized project is the foundation of a scalable application. Use the following structure within a `src/` directory.

```
my-expo-app/
├── src/
│   ├── api/             # API layer, data fetching logic (e.g., TanStack Query hooks)
│   ├── assets/          # Static assets (fonts, images, etc.)
│   ├── components/      # Reusable, shared UI components
│   │   ├── common/      # Atomic components (Button, Input, Card)
│   │   └── layout/      # Layout components (Container, Header)
│   ├── config/          # App configuration, constants, theme
│   │   └── theme.ts     # Centralized theme (colors, spacing, fonts)
│   ├── constants/       # App-wide constants (e.g., API_URL, storage keys)
│   ├── contexts/        # React Context providers
│   ├── features/        # Feature-based modules (e.g., auth, profile, feed)
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── screens/
│   │   └── ...
│   ├── hooks/           # Shared, reusable custom hooks
│   ├── navigation/      # Navigation logic, stacks, and types
│   ├── screens/         # (Alternative to features) Screen components
│   ├── store/           # Global state management (Zustand, Redux)
│   └── utils/           # Utility/helper functions
├── app.config.ts        # Expo configuration file
├── babel.config.js      # Babel configuration for module aliasing
├── tsconfig.json        # TypeScript configuration
└── package.json
```

**Key Principles:**

- **`src` Directory:** All application code lives inside `src/`.
- **Absolute Imports:** Configure `tsconfig.json` and `babel.config.js` to use absolute paths (e.g., `import Button from '@/components/common/Button'`). This improves refactoring and readability.
- **Feature-Based vs. Role-Based:** Prefer a **feature-based** structure (`src/features/auth`) for scalability. Group files by what they do together, not by their type. For smaller projects, a role-based structure (`screens`, `components`) is acceptable.
- **File Naming:**
  - Components & Screens: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
  - Hooks: `useCamelCase.ts` (e.g., `useAuth.ts`)
  - Other files: `camelCase.ts` (e.g., `apiClient.ts`)

### **2. Core Technology Choices**

- **Language:** **TypeScript is mandatory.** It provides type safety, better autocompletion, and reduces runtime errors.
- **Navigation:**
  - **Expo Router (File-Based):** **Strongly preferred for new projects.** It simplifies routing, deep linking, and provides a structure similar to web frameworks like Next.js. Create files in an `app/` directory to define routes.
  - **React Navigation:** The standard choice if not using Expo Router. Always centralize navigation setup in `src/navigation/` and create strongly-typed route definitions.
- **Data Fetching:**
  - **TanStack Query (React Query):** **Use this by default.** It handles caching, background refetching, loading/error states, and mutations elegantly. Avoid manual `fetch` inside `useEffect`.
  - Centralize API logic in `src/api/` or `src/features/*/api/`. Use a pre-configured client like Axios or a wrapped `fetch`.
- **State Management:**
  1.  **Local State (`useState`, `useReducer`):** Use for component-level state.
  2.  **React Context:** Use for passing down simple, slowly-changing state like theme, authentication status, or user information. Be mindful of performance, as updates re-render all consumers.
  3.  **Global State (Zustand):** **Recommended for complex global state.** It's lightweight, simple, and avoids boilerplate. Use it when data is shared across many unrelated components. Redux Toolkit is a powerful alternative for very large-scale apps.

### **3. Component Design & Philosophy**

- **Functional Components & Hooks:** All components must be functional components. Use hooks for state and side effects. Class components are forbidden.
- **Props with TypeScript:** Define all component props with a `type` or `interface`.

  ```tsx
  type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
  };

  export const Button = ({
    title,
    onPress,
    variant = 'primary',
  }: ButtonProps) => {
    // ...
  };
  ```

- **Separation of Concerns (Logic vs. View):**
  - Keep components focused on presentation ("dumb" components).
  - Extract complex logic, state management, and data fetching into custom hooks (`useUserProfile`, `useAuth`). This makes components reusable and easier to test.
  - **Example:** A `UserProfileScreen.tsx` would use a `useUserProfile()` hook which handles fetching the user data. The screen component just displays the loading, error, or data states.
- **Atomicity:** Break large components into smaller, single-purpose components located in `src/components/common/`.

### **4. Styling**

- **`StyleSheet.create()`:** Always use `StyleSheet.create()` for performance benefits (styles are sent over the bridge only once). **Avoid inline styles.**
- **Theming:** Create a central `theme.ts` file.

  ```typescript
  // src/config/theme.ts
  export const colors = {
    primary: '#007AFF',
    background: '#F2F2F7',
    text: '#1C1C1E',
  };

  export const spacing = {
    sm: 8,
    md: 16,
    lg: 24,
  };
  ```

  Import and use this theme throughout the application instead of hardcoding values.

- **Responsive Design:** Use `useWindowDimensions` for dynamic layouts. Use `Platform.select()` for platform-specific styles.
- **Advanced Styling:** For type-safe, compiled styling systems, consider libraries like **Tamagui** or **Restyle**.

### **5. Performance**

- **Lists:** Use `FlatList` or `SectionList` for rendering lists.
  - Always provide a `keyExtractor`.
  - Use `getItemLayout` if list items have a fixed height.
  - Memoize list items with `React.memo` to prevent unnecessary re-renders.
- **Memoization:** Use `useMemo` and `useCallback` judiciously to prevent expensive calculations or re-creation of functions passed to memoized children. Do not overuse them.
- **Images:** Use **`expo-image`**. It's the modern, performant replacement for the core `Image` component, offering advanced caching and performance features (like blurhash placeholders).
- **Bundle Size:** Analyze bundle size with `npx expo-codemod static-image-imports` and be mindful of large asset imports.

### **6. Tooling & Developer Experience (DX)**

- **Linter & Formatter:** **ESLint and Prettier are mandatory.** Configure them to run on save and as a pre-commit hook (`husky` + `lint-staged`). This ensures consistent code style.
- **CI/CD:** Use **EAS (Expo Application Services)** for building, submitting, and updating your app. Automate this process with GitHub Actions or other CI/CD providers.
- **Environment Variables:** Store sensitive keys and environment-specific configurations in `.env` files and access them via `app.config.ts`. **Never hardcode secrets in your source code.** Use `expo-constants` to access them at runtime.

### **7. Expo-Specific Best Practices**

- **Use EAS:** Prefer `eas build` and `eas update` over the classic `expo build`.
- **Development Builds:** When you need custom native code (e.g., a library not in the Expo Go app), create a development build with `eas build --profile development`. This gives you the power of native code without ejecting from the Expo ecosystem.
- **`app.config.ts`:** This is the single source of truth for your app's configuration (name, icon, splash screen, plugins, environment variables). Keep it clean and well-organized.
- **Stay Updated:** Regularly update to the latest Expo SDK version to get new features, bug fixes, and performance improvements. Use `npx expo-doctor` to check for issues.
- **Security:** Use `expo-secure-store` to store sensitive information like authentication tokens on the device.

---
