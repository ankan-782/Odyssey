# Odyssey Events

A comprehensive event management platform for discovering, creating, and managing events worldwide. Built with Next.js 14, Tailwind CSS v3, Ant Design v5, and Framer Motion v11.

## Tech Stack

| Library / Tool               | Purpose                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------- |
| **Next.js (14.2.18)**        | Core React framework using the App Router for server-side rendering and routing. |
| **React (18)**               | UI library.                                                                      |
| **Tailwind CSS (3.4.1)**     | Utility-first CSS framework for rapid UI styling.                                |
| **Ant Design (5.22.1)**      | Comprehensive React UI component library (modals, config providers, etc.).       |
| **Framer Motion (11.11.17)** | Animation library for complex declarative UI transitions and layout animations.  |
| **Swiper (11.2.6)**          | Touch slider and carousel implementation.                                        |
| **Moment.js (2.30.1)**       | Date and time parsing/formatting.                                                |
| **Sharp (0.33.5)**           | High-performance image processing for Next.js Image Optimization.                |
| **ESLint**                   | Code quality and linting (`eslint-config-next`).                                 |

## Architecture & Routing

The application strictly uses the **Next.js App Router** with a logical split using **Route Groups**:

- **`(main-web)` vs `(admin-web)`**: These top-level route groups segregate the public site from the administrative portal. This prevents layout logic and context providers required for the public site from bleeding into the admin dashboard, and vice versa.
- **Nested Groups in `(main-web)`**: Further organized into `(auth)`, `(home)`, and `(protected)` folders. These isolate specific page scopes without affecting the URL path, ensuring a clean organization of related pages.
- **Layout Cascade**: Layouts cascade from the top down. The root `app/layout.jsx` injects fonts, global HTML tags, and a scroll progress indicator. The `(main-web)/layout.jsx` extends this by wrapping its children in an Ant Design Config Provider, a Navigation Context, and injecting the `HeaderWrapper` and `FooterWrapper`. `(admin-web)` provides its own separate layout structure.
- **Special Next.js Files**:
    - `error.jsx` / `global-error.jsx`: Catch unexpected runtime errors and display a stylized UI (`ErrorContent` / `GlobalErrorContent`).
    - `not-found.jsx`: Renders the `NotFoundContent` component when a user hits an undefined route.
    - `loading.jsx`: Provides a global suspense boundary using the `LoaderContent` component.
    - `icon.js`: Generates a dynamic Next.js edge-runtime favicon (currently rendering the letter "O").

## Shared Module (`_shared`)

The `_shared/` directory is the core of the application, keeping business logic and UI components strictly separate from the routing layer.

### `components/`

Highly modularized UI building blocks:

- **`buttons-links/`**: Unified actionable elements (`ContainedButton`, `OutlinedButton`, `TextButton`, `IconButton`, `CustomLink`).
- **`cards/`**: Directory reserved for card layouts.
- **`common-in-pages/`**: Blocks reused across multiple pages (`BulletPoints`, `DownloadAppSourceList`, `MultipleElementPreview`, `MultipleImagePreview`, `ProfileImage`, `ScrollableLabel`, `SocialNavList`, `Tabs`).
- **`common-wrapper/`**: Higher-order components and structural wrappers (`AntdGlobalConfigProviderWrapper`, `BaseMotionConfig`, `CardsLayout`, `ContainerWrapper`).
- **`forms/`**: Reusable form elements and modules (e.g., `SubscribeForm`).
- **`texts/`**: Standardized typography components (`Caption`, `Description`, `RichtextDescription`, `SpanText`, `Title`).
- **`ui/`**: Global UI states and specialized visuals (`ComingSoonContent`, `ErrorContent`, `GlobalErrorContent`, `Icons`, `LoaderContent`, `NotFoundContent`, `Rating`, `ScrollProgressIndicator`).

### `layout/`

- **`header/HeaderWrapper.jsx`**: Manages the top navigation structure, utilizing the Navigation Context. Contains a `components` subfolder for mobile menus and nav items.
- **`footer/FooterWrapper.jsx`**: Renders the footer content, social links, and quick links. Contains `components` and `sections` subfolders for organizing complex footer layouts.

### `hooks/`

- `useAuthGuard.js` — Protects pages from unauthenticated access. Redirects to `/login?redirect-to=<currentPath>` if user is not logged in. Waits for Firebase auth resolution before redirecting to avoid false redirects.
- `useApiCall.js` — Abstracted handler for API calls, managing `isLoading`, `isError`, and `error` states automatically.
- `useAutoScrollLabel.js` — Manages continuous scrolling (marquee) effects for text labels.
- `useDebounce.js` — Standard hook to delay function execution (useful for search inputs).
- `useIntersectionObserver.js` — Tracks when a DOM element enters or leaves the viewport.
- `useScrollSpy.js` — Tracks window scroll position against a target section ID and optionally syncs the URL hash.
- `useShowModal.js` — Manages Ant Design `Modal` states, returning toggle functions and pre-configured JSX (`ModalContent`).
- `useShowToastMessage.js` — Utility wrapper for dispatching toast notifications.
- `useViewportHeight.js` — Tracks real-time changes to the window's inner height.
- `useViewportWidth.js` — Tracks real-time changes to the window's inner width.

### `contexts/`

- **`AuthContextProvider.jsx`**: Manages Firebase authentication state globally via `onAuthStateChanged`. Exposes `user`, `isAuthLoading`, and auth methods (`loginWithEmail`, `registerWithEmail`, `loginWithGoogle`, `logout`).
- **`EventContextProvider.jsx`**: Manages event data state globally. Exposes event list and CRUD methods (`addEvent`, `deleteEvent`).
- **`NavigationContextProvider.jsx`**: Centralizes navigation tree arrays (`headerMenuData`, `footerQuickLinksMenuData`, `footerHelpMenuData`). Prevents prop drilling across nested layout components.

### `lib/`

- `firebase-config.js` — Initializes the Firebase app (singleton pattern), exports `auth`, `googleProvider`, and `initAnalytics`.
- `events-data.js` — Static seed data for events. Acts as the local data source in absence of a backend.
- `api-url-constant-data.js` — Contains base URLs (`ROOT_URL`) and fully qualified endpoints for all API fetches.
- `font-data.js` — Initializes Next.js fonts (Epilogue, ClashDisplay, Geist) and exports them as CSS variables.
- `helper-data.js` — Reusable pure functions (e.g., `hexToRgba`, string formatting, nested category/menu tree builders).
- `motion-configuration-data.js` — Pre-configured Framer Motion variant objects (`staggeredItemsContainerMotion`, `viewportShowingMotion`) to ensure animation consistency.
- `project-constant-data.js` — Centralized numbers for UI metrics (`HEADER_HEIGHT`, `ROOT_FONT_SIZE`).
- `project-file-data.js` — Acts as a registry importing all static assets from `public/` and exporting them as a single object (`PROJECT_FILE_DATA`).
- `seo-handler-data.js` — Provides `getMetaData` for generating Next.js metadata and `getSchema` for LD-JSON injection.
- `theme-data.js` — Exports a `COLORS` object mirroring the Tailwind palette, making theme colors accessible within JavaScript logic.

### `service/`

- `auth-service.js` — Handles all Firebase Authentication operations: `loginWithEmail`, `registerWithEmail`, `loginWithGoogle`, `logoutUser`.
- `subscribe-service.js` — Handles POST requests for newsletter signups.
- `upload-service.js` — Manages file and image upload API calls.

### `sections/`

- **`page-top-content/PageTopContent.jsx`**: A reusable hero or top-level section block utilized across various pages.

## Getting Started

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd odyssey-next-project
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**
   Create a `.env.local` file in the root and add your Firebase config:

    ```env
    AUTH_TOKEN=

    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Navigate to `http://localhost:3000` to view the application.

5. **Build for production**
    ```bash
    npm run build
    npm start
    ```

## Available Scripts

| Script  | Command              | Description                                         |
| :------ | :------------------- | :-------------------------------------------------- |
| `dev`   | `next dev`           | Starts the Next.js development server.              |
| `build` | `next build`         | Compiles and builds the application for production. |
| `start` | `next start -p 8090` | Starts the production server on port 8090.          |
| `lint`  | `next lint`          | Runs ESLint to identify code quality issues.        |

## Fonts

The project implements custom fonts initialized in `app/_shared/lib/font-data.js` and injected globally in `app/layout.jsx`:

- **Epilogue**: Loaded via `next/font/google` (Default body font).
- **ClashDisplay**: Loaded via `next/font/local` (`public/fonts/ClashDisplay-Variable.woff`).
- **Geist Sans**: Loaded via `next/font/local` (`public/fonts/GeistVF.woff`).
- **Geist Mono**: Loaded via `next/font/local` (`public/fonts/GeistMonoVF.woff`).

## Public Assets

The `public/` directory is strictly organized into three subdirectories. All visual assets are registered in `project-file-data.js` before use.

- **`fonts/`**:
    - `ClashDisplay-Variable.woff`
    - `GeistMonoVF.woff`
    - `GeistVF.woff`
- **`images/`**:
    - `eps-banner-dark.png`
    - `eps-banner-light.png`
    - `sslcommerz-banner.png`
- **`logos-icons/`**:
    - `address-icon.png`, `dribble-icon.png`, `email-icon.png`, `facebook-icon.png`, `instagram-icon.png`, `linkedin-icon.png`, `phone-icon.png`, `whatsapp-icon.png`, `x-icon.png`, `youtube-icon.png`
    - `website-footer-logo-black.png`, `website-footer-logo-white.png`, `website-header-logo-black.png`, `website-header-logo-white.png`
    - `app-store-download-badge.svg`, `play-store-download-badge.png`
    - `favicon.ico`

## Key Features

- Browse and search events with multi-field filtering (category, price, rating, date)
- View detailed event pages with related event suggestions
- Firebase Authentication — Email/Password and Google Sign-In
- Protected pages: Add and Manage events (redirect with `?redirect-to=` pattern)
- Fully responsive across mobile, tablet, and desktop
- Static local data — no backend required

## Route Summary

| Route            | Type      | Description                                                              |
| :--------------- | :-------- | :----------------------------------------------------------------------- |
| `/`              | Public    | Landing page with hero, featured events, categories, stats, testimonials |
| `/events`        | Public    | All events with search and filtering                                     |
| `/events/[id]`   | Public    | Event detail page with related events                                    |
| `/about`         | Public    | About the platform                                                       |
| `/login`         | Auth      | Firebase login — Email/Password and Google                               |
| `/events/add`    | Protected | Add a new event (requires login)                                         |
| `/events/manage` | Protected | View and delete your events (requires login)                             |

## Author

Avijit Roy, Full Stack Software Developer
