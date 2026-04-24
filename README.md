# Odyssey - Next.js Starter Project
A personal starter kit to skip the boring setup, coming with Next.js 14, Tailwind CSS v3, Ant Design v5, and Framer Motion v11.

## Tech Stack
| Library / Tool | Purpose |
| -------------- | ------- |
| **Next.js (14.2.18)** | Core React framework using the App Router for server-side rendering and routing. |
| **React (18)** | UI library. |
| **Tailwind CSS (3.4.1)** | Utility-first CSS framework for rapid UI styling. |
| **Ant Design (5.22.1)** | Comprehensive React UI component library (modals, config providers, etc.). |
| **Framer Motion (11.11.17)** | Animation library for complex declarative UI transitions and layout animations. |
| **Swiper (11.2.6)** | Touch slider and carousel implementation. |
| **Moment.js (2.30.1)** | Date and time parsing/formatting. |
| **Sharp (0.33.5)** | High-performance image processing for Next.js Image Optimization. |
| **ESLint** | Code quality and linting (`eslint-config-next`). |

## Project Structure
```text
├── app/
│   ├── (routes)/                # Route groups separating distinct website areas
│   │   ├── (admin-web)/         # Admin portal routes
│   │   └── (main-web)/          # Public-facing website routes
│   ├── _shared/                 # Centralized shared application logic and UI
│   │   ├── components/          # Categorized, reusable React components
│   │   ├── contexts/            # React Context providers (e.g., Navigation)
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layout/              # Header and Footer layout component wrappers
│   │   ├── lib/                 # Constants, helpers, theme, and config files
│   │   ├── sections/            # Reusable page sections
│   │   └── service/             # API interaction services
│   ├── error.jsx                # Global error boundary component
│   ├── global-error.jsx         # Fallback error boundary for the root document
│   ├── globals.css              # Tailwind directives and global CSS overrides
│   ├── icon.js                  # Dynamic favicon generator (using next/og)
│   ├── layout.jsx               # Root HTML/Body layout and font injection
│   ├── loading.jsx              # Global loading suspense fallback
│   └── not-found.jsx            # Custom 404 Not Found page
├── public/                      # Static assets served at the root
│   ├── fonts/                   # Local font files (.woff)
│   ├── images/                  # Standard image assets
│   └── logos-icons/             # Project logos, badges, and social icons
├── .eslintrc.json               # ESLint configuration
├── jsconfig.json                # Path aliasing configuration (@/* -> ./*)
├── next.config.mjs              # Next.js configuration (e.g., remote image patterns)
├── package.json                 # Project dependencies and npm scripts
└── tailwind.config.js           # Tailwind CSS theme extensions and plugin config
```

## Architecture & Routing
The application strictly uses the **Next.js App Router** with a logical split using **Route Groups**:
- **`(main-web)` vs `(admin-web)`**: These top-level route groups segregate the public site from the administrative portal. This prevents layout logic and context providers required for the public site from bleeding into the admin dashboard, and vice versa.
- **Nested Groups in `(main-web)`**: Further organized into `(auth)`, `(home)`, and `(protected)` folders. These isolate specific page scopes without affecting the URL path, allowing developers to group related pages cleanly.
- **Layout Cascade**: Layouts cascade from the top down. The root `app/layout.jsx` injects fonts, global HTML tags, and a scroll progress indicator. The `(main-web)/layout.jsx` extends this by wrapping its children in an Ant Design Config Provider, a Navigation Context, and injecting the `HeaderWrapper` and `FooterWrapper`. `(admin-web)` provides its own separate layout structure.
- **Special Next.js Files**:
  - `error.jsx` / `global-error.jsx`: Catch unexpected runtime errors and display a stylized UI (`ErrorContent` / `GlobalErrorContent`).
  - `not-found.jsx`: Renders the `NotFoundContent` component when a user hits an undefined route.
  - `loading.jsx`: Provides a global suspense boundary using the `LoaderContent` component.
  - `icon.js`: Generates a dynamic Next.js edge-runtime favicon (currently rendering the letter "B").

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
- **`NavigationContextProvider.jsx`**: Centralizes navigation tree arrays (`headerMenuData`, `footerQuickLinksMenuData`, `footerHelpMenuData`). This prevents massive prop drilling and allows any nested component to access menu paths globally.

### `lib/`
- `api-url-constant-data.js` — Contains base URLs (`ROOT_URL`) and fully qualified endpoints for all API fetches.
- `font-data.js` — Initializes Next.js fonts (Epilogue, ClashDisplay, Geist) and exports them as CSS variables.
- `helper-data.js` — Reusable pure functions (e.g., `hexToRgba`, string formatting, nested category/menu tree builders).
- `motion-configuration-data.js` — Pre-configured Framer Motion variant objects (`staggeredItemsContainerMotion`, `viewportShowingMotion`) to ensure animation consistency.
- `project-constant-data.js` — Centralized numbers for UI metrics (`HEADER_HEIGHT`, `ROOT_FONT_SIZE`).
- `project-file-data.js` — Acts as a registry importing all static assets from `public/` and exporting them as a single object (`PROJECT_FILE_DATA`).
- `seo-handler-data.js` — Provides `getMetaData` for generating Next.js metadata and `getSchema` for LD-JSON injection.
- `theme-data.js` — Exports a `COLORS` object mirroring the Tailwind palette, making theme colors accessible within JavaScript logic.

### `service/`
- `contact-service.js` — Handles POST requests for submitting contact forms.
- `site-config-service.js` — Handles GET requests to retrieve global site configuration.
- `static-page-service.js` — Handles GET requests to fetch data for static pages (like privacy policies) via slugs.
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

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to view the application.

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `next dev` | Starts the Next.js development server. |
| `build` | `next build` | Compiles and builds the application for production. |
| `start` | `next start -p 8090` | Starts the production server on port 8090. |
| `lint` | `next lint` | Runs ESLint to identify code quality issues. |

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

## Coding Conventions
Based on the established architecture, adhere to the following patterns:

- **Folder and File Naming Patterns**:
  - React components are written in `PascalCase` (e.g., `ContainedButton.jsx`).
  - Hooks, services, and utility files are written in `camelCase` or `kebab-case`.
  - Data, config, and library files strictly use the `-data.js` suffix (e.g., `theme-data.js`, `helper-data.js`).
  - Structural layout components use the `Wrapper` suffix (e.g., `HeaderWrapper.jsx`).

- **Component Structure Patterns**:
  - All reusable UI elements must reside in `app/_shared/components/` and be placed in the appropriate categorical subfolder (`buttons-links`, `texts`, etc.). Do not build ad-hoc reusable components inside route folders.
  - Rely on Tailwind CSS via the `className` prop for styling. Complex reused styles should utilize `@apply` in `globals.css` (e.g., `.btn-contained`).

- **Adding New Pages**:
  - New public pages should be added inside `app/(routes)/(main-web)/`. If they logically group together (like policies), wrap them in a folder or nested route group.
  - New admin pages must be placed strictly within `app/(routes)/(admin-web)/admin/` to inherit the admin layout.

- **Adding Shared Components**:
  - Identify the category (text, button, wrapper, UI) and place the `.jsx` file in the corresponding `app/_shared/components/` subfolder.
  - If a component is highly specific to a layout (like a footer link column), place it in `app/_shared/layout/footer/components/`.

- **Adding New Hooks & Services**:
  - Place custom hooks in `app/_shared/hooks/` and export them as default. Use standard `use` prefix.
  - Place API fetch logic in `app/_shared/service/` and suffix the file with `-service.js`.

- **Constants & Configuration**:
  - Never hardcode URLs in components; add them to `app/_shared/lib/api-url-constant-data.js`.
  - Store colors in `theme-data.js`.
  - Import all new public assets into `project-file-data.js` and export them via the `PROJECT_FILE_DATA` object.

## Author
Avijit Roy, Full Stack Developer
