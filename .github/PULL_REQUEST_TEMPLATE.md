### 🧪 Testing & Development

- [ ] All **unit tests** have been executed successfully (using `jest`, `vitest` or equivalent).
- [ ] **End-to-End (E2E) tests** have been run and passed (e.g., with `Playwright` or `Cypress`).
- [ ] New or updated **custom hooks** (`useAuth`, `useFetchData`, etc.) have been tested in isolation.
- [ ] All **API routes** (`/app/api/`) have been manually tested or tested via Postman.
- [ ] **Middleware** (`middleware.ts`) behaves as expected.
- [ ] The database schema has been updated using **Prisma Migrate** (if applicable).
- [ ] All **TypeScript types** are valid and clean (no unnecessary `any` types).
- [ ] There are no unusual **errors or warnings** in the Next.js console or logs.

### 🔐 Authentication & Security

- [ ] Authentication using **JWT** or **NextAuth** is working correctly.
- [ ] **Session validation** is enforced across protected routes.
- [ ] Middleware (auth-check) properly protects restricted pages or APIs.
- [ ] No **sensitive information** is exposed in the browser (API keys, tokens).
- [ ] All **user inputs** are securely validated (e.g., with Zod or Yup).

### 🧩 Architecture & Structure

- [ ] Custom hooks are placed in `/hooks` or similar folders and clearly named.
- [ ] API routes are placed in `/app/api/` or `/pages/api/` depending on router.
- [ ] The project follows a **modular, scalable** architecture (e.g., `lib`, `services`, `components`).
- [ ] Utility functions are centralized (`/lib`, `/utils`, etc.).
- [ ] Codebase follows consistent conventions (naming, folder structure).

### 📚 Documentation

- [ ] `README.md` or internal `/docs` are up to date.
- [ ] API endpoints documented in OpenAPI, Swagger, or Markdown.
- [ ] Important logic is explained in comments or dev notes.

### 🧑‍💻 Developer Experience

- [ ] Commit messages follow convention (`feat:`, `fix:`, etc.).
- [ ] Errors are properly caught/logged (no `console.error(e)` sans explication).
- [ ] All `console.log` and `debugger` have been removed.
- [ ] Unused code or legacy files cleaned up.

### 🌍 UI/UX

- [ ] Design matches mockups (Tailwind, ShadCN, etc.).
- [ ] Responsive design verified (mobile, tablet, desktop).
- [ ] No critical bugs or flow issues.
- [ ] Accessibility basics OK (keyboard, labels, contrast).

### 🚀 Deployment & CI/CD

- [ ] GitHub Actions or CI workflows pass successfully.
- [ ] The app builds cleanly with `next build`.
- [ ] Staging/test deployment has been verified.
- [ ] No merge conflicts with `main` or `dev`.
- [ ] App is ready to go to production.

### 🔄 Review & Approval

- [ ] PR reviewed by at least one dev.
- [ ] All comments resolved.
- [ ] PR approved and ready to merge.
