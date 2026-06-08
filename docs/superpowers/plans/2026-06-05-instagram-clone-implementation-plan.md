# Instagram Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modular React + TypeScript Instagram clone SPA with mock data, Redux state management, Tailwind styling, and React Router navigation.

**Architecture:** Use Atomic Design to organize UI from atoms to pages. Keep business state in Redux Toolkit slices (`users`, `posts`, `currentUser`, `ui`) and route views with React Router. Start from failing tests for reducers/selectors/components, then implement minimal code to pass.

**Tech Stack:** Vite, React 18, TypeScript, Redux Toolkit, React Redux, React Router v6, Tailwind CSS, Vitest, React Testing Library

---

## Planned File Structure

**Create:**
- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `tailwind.config.js`
- `postcss.config.js`
- `src/main.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/types/index.ts`
- `src/utils/mockData.ts`
- `src/store/store.ts`
- `src/store/hooks.ts`
- `src/store/slices/usersSlice.ts`
- `src/store/slices/postsSlice.ts`
- `src/store/slices/currentUserSlice.ts`
- `src/store/slices/uiSlice.ts`
- `src/store/selectors.ts`
- `src/components/atoms/Button.tsx`
- `src/components/atoms/Avatar.tsx`
- `src/components/atoms/Input.tsx`
- `src/components/atoms/TextArea.tsx`
- `src/components/atoms/Spinner.tsx`
- `src/components/molecules/LikeButton.tsx`
- `src/components/molecules/PostHeader.tsx`
- `src/components/molecules/CommentBox.tsx`
- `src/components/organisms/Header.tsx`
- `src/components/organisms/Sidebar.tsx`
- `src/components/organisms/PostCard.tsx`
- `src/components/organisms/PostFeed.tsx`
- `src/components/organisms/CreatePostModal.tsx`
- `src/components/organisms/UserProfile.tsx`
- `src/components/templates/MainLayout.tsx`
- `src/pages/Home.tsx`
- `src/pages/Explore.tsx`
- `src/pages/Profile.tsx`
- `src/pages/PostDetail.tsx`
- `src/pages/NotFound.tsx`
- `src/tests/slices/postsSlice.test.ts`
- `src/tests/slices/usersSlice.test.ts`
- `src/tests/components/LikeButton.test.tsx`
- `src/tests/integration/createPostFlow.test.tsx`

---

### Task 1: Bootstrap React TypeScript + Tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`

- [ ] **Step 1: Write failing smoke test command expectation**

Run: `npm test`
Expected: command fails with missing test config/package because project is not initialized.

- [ ] **Step 2: Initialize project files with Vite + TS + test scripts**

```json
{
  "name": "insta-clone",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.3.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: install completes, `node_modules` created.

- [ ] **Step 4: Run dev server check**

Run: `npm run dev`
Expected: Vite serves app, no TypeScript errors.

- [ ] **Step 5: Commit**

Run:
```bash
git add package.json tsconfig.json vite.config.ts index.html src/main.tsx src/App.tsx src/index.css
git commit -m "chore: bootstrap react typescript app with vite"
```

### Task 2: Configure Tailwind and Base Theme

**Files:**
- Create: `tailwind.config.js`, `postcss.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Write failing visual check expectation**

Run: `npm run dev`
Expected: utility classes like `p-4` do not apply before Tailwind setup.

- [ ] **Step 2: Add Tailwind config and directives**

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f5ef",
        ink: "#1f1b16",
        accent: "#e05a2a"
      }
    }
  },
  plugins: []
};
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-paper text-ink;
  font-family: "Segoe UI", sans-serif;
}
```

- [ ] **Step 3: Verify Tailwind works**

Run: `npm run dev`
Expected: styled classes render in browser without CSS build errors.

- [ ] **Step 4: Commit**

Run:
```bash
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "chore: configure tailwind css"
```

### Task 3: Add Domain Types and Mock Data

**Files:**
- Create: `src/types/index.ts`, `src/utils/mockData.ts`

- [ ] **Step 1: Write failing type check expectation**

Run: `npm run build`
Expected: imports for `User`, `Post`, `Comment` fail before types exist.

- [ ] **Step 2: Add TypeScript domain models**

```ts
export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
  timestamp: string;
}
```

- [ ] **Step 3: Add mock dataset (10+ users, 50+ posts)**

```ts
export const users: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: `u${i + 1}`,
  username: `user${i + 1}`,
  fullName: `User ${i + 1}`,
  avatar: `https://picsum.photos/seed/avatar${i + 1}/100/100`,
  bio: `Bio for user ${i + 1}`,
  followers: [],
  following: [],
  posts: []
}));

export const posts: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: `p${i + 1}`,
  userId: users[i % users.length].id,
  image: `https://picsum.photos/seed/post${i + 1}/800/800`,
  caption: `Caption ${i + 1}`,
  likes: [],
  comments: [],
  timestamp: new Date(Date.now() - i * 60000).toISOString()
}));
```

- [ ] **Step 4: Verify build succeeds**

Run: `npm run build`
Expected: TypeScript compiles with no type errors.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/types/index.ts src/utils/mockData.ts
git commit -m "feat: add typed domain models and mock dataset"
```

### Task 4: Build Redux Store and Slices via TDD

**Files:**
- Create: `src/store/store.ts`, `src/store/hooks.ts`, `src/store/selectors.ts`
- Create: `src/store/slices/usersSlice.ts`, `src/store/slices/postsSlice.ts`, `src/store/slices/currentUserSlice.ts`, `src/store/slices/uiSlice.ts`
- Create: `src/tests/slices/postsSlice.test.ts`, `src/tests/slices/usersSlice.test.ts`

- [ ] **Step 1: Write failing tests for `toggleLike`, `addComment`, `followUser`**

```ts
import { describe, expect, it } from "vitest";
import { postsReducer, toggleLike } from "../../store/slices/postsSlice";

describe("posts slice", () => {
  it("toggles like for current user", () => {
    const state = postsReducer(undefined, toggleLike({ postId: "p1", userId: "u1" }));
    expect(state.allPosts.find(p => p.id === "p1")?.likes).toContain("u1");
  });
});
```

- [ ] **Step 2: Run slice tests to verify failure**

Run: `npm test -- src/tests/slices/postsSlice.test.ts`
Expected: FAIL due to missing reducers/actions.

- [ ] **Step 3: Implement minimal slices and store**

```ts
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.allPosts.find(p => p.id === postId);
      if (!post) return;
      const hasLike = post.likes.includes(userId);
      post.likes = hasLike ? post.likes.filter(id => id !== userId) : [...post.likes, userId];
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.allPosts.find(p => p.id === postId);
      if (post) post.comments.push(comment);
    }
  }
});
```

- [ ] **Step 4: Re-run reducer tests**

Run: `npm test -- src/tests/slices/postsSlice.test.ts src/tests/slices/usersSlice.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/store src/tests/slices
git commit -m "feat: implement redux slices with reducer tests"
```

### Task 5: Wire App Providers and Routing Shell

**Files:**
- Modify: `src/main.tsx`, `src/App.tsx`
- Create: `src/pages/Home.tsx`, `src/pages/Explore.tsx`, `src/pages/Profile.tsx`, `src/pages/PostDetail.tsx`, `src/pages/NotFound.tsx`

- [ ] **Step 1: Write failing routing smoke test expectation**

Run: `npm run dev`
Expected: routes not found or blank app before router/provider setup.

- [ ] **Step 2: Add Provider + BrowserRouter and route table**

```tsx
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>
```

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/explore" element={<Explore />} />
  <Route path="/profile/:userId" element={<Profile />} />
  <Route path="/profile/me" element={<Profile />} />
  <Route path="/post/:postId" element={<PostDetail />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

- [ ] **Step 3: Verify route navigation manually**

Run: `npm run dev`
Expected: each route renders placeholder heading.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/main.tsx src/App.tsx src/pages
git commit -m "feat: wire redux provider and app routes"
```

### Task 6: Build Atomic UI Primitives

**Files:**
- Create: `src/components/atoms/Button.tsx`, `Avatar.tsx`, `Input.tsx`, `TextArea.tsx`, `Spinner.tsx`

- [ ] **Step 1: Write failing component test for Button click**

```ts
it("calls onClick when pressed", async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Like</Button>);
  await userEvent.click(screen.getByRole("button", { name: "Like" }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: Run component test to verify failure**

Run: `npm test -- src/tests/components/LikeButton.test.tsx`
Expected: FAIL until atoms exist.

- [ ] **Step 3: Implement atoms with typed props and variants**

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const styleMap = {
    primary: "bg-accent text-white",
    secondary: "bg-ink text-paper",
    ghost: "bg-transparent text-ink"
  };
  return <button className={`rounded px-4 py-2 ${styleMap[variant]} ${className ?? ""}`} {...props} />;
}
```

- [ ] **Step 4: Re-run tests**

Run: `npm test -- src/tests/components/LikeButton.test.tsx`
Expected: PASS for atom-level interactions.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/atoms src/tests/components/LikeButton.test.tsx
git commit -m "feat: add atomic ui primitives with tests"
```

### Task 7: Build Molecules and Post Organisms

**Files:**
- Create: `src/components/molecules/LikeButton.tsx`, `PostHeader.tsx`, `CommentBox.tsx`
- Create: `src/components/organisms/PostCard.tsx`, `PostFeed.tsx`

- [ ] **Step 1: Write failing test for like action dispatch**

```ts
it("dispatches toggleLike when clicking like", async () => {
  renderWithStore(<LikeButton postId="p1" userId="u1" likes={[]} />);
  await userEvent.click(screen.getByRole("button", { name: /like/i }));
  expect(store.getState().posts.allPosts.find(p => p.id === "p1")?.likes).toContain("u1");
});
```

- [ ] **Step 2: Run test to confirm failure**

Run: `npm test -- src/tests/components/LikeButton.test.tsx`
Expected: FAIL with missing molecule/dispatch wiring.

- [ ] **Step 3: Implement molecules and compose `PostCard`**

```tsx
export function PostCard({ post }: { post: Post }) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.currentUser.user?.id ?? "u1");
  return (
    <article className="rounded-xl border bg-white">
      <PostHeader userId={post.userId} timestamp={post.timestamp} />
      <img src={post.image} alt={post.caption} className="w-full" />
      <LikeButton postId={post.id} userId={userId} likes={post.likes} />
      <CommentBox
        onSubmit={(text) =>
          dispatch(addComment({ postId: post.id, comment: { id: crypto.randomUUID(), userId, text, timestamp: new Date().toISOString() } }))
        }
      />
    </article>
  );
}
```

- [ ] **Step 4: Re-run component tests**

Run: `npm test -- src/tests/components/LikeButton.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/molecules src/components/organisms
git commit -m "feat: add post molecules and feed organisms"
```

### Task 8: Build Layout, Header, Sidebar, and Pages

**Files:**
- Create: `src/components/organisms/Header.tsx`, `Sidebar.tsx`, `CreatePostModal.tsx`, `UserProfile.tsx`
- Create: `src/components/templates/MainLayout.tsx`
- Modify: `src/pages/Home.tsx`, `src/pages/Explore.tsx`, `src/pages/Profile.tsx`, `src/pages/PostDetail.tsx`

- [ ] **Step 1: Write failing integration expectation for page composition**

Run: `npm run build`
Expected: page imports fail before organisms/template exist.

- [ ] **Step 2: Implement layout shell and connect pages to Redux selectors**

```tsx
export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto grid max-w-6xl grid-cols-[220px_1fr] gap-6 p-4">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify all routes render complete UI**

Run: `npm run dev`
Expected: Home feed, Explore feed, Profile page, Post detail load inside main layout.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/components/organisms src/components/templates src/pages
git commit -m "feat: implement app layout and routed pages"
```

### Task 9: Implement Create Post, Follow/Unfollow, and Profile Editing

**Files:**
- Modify: `src/store/slices/postsSlice.ts`, `src/store/slices/usersSlice.ts`, `src/store/slices/currentUserSlice.ts`
- Modify: `src/components/organisms/CreatePostModal.tsx`, `UserProfile.tsx`, `Header.tsx`

- [ ] **Step 1: Write failing integration test for create-post flow**

```ts
it("creates a new post from modal and shows it in feed", async () => {
  renderAppAtRoute("/");
  await userEvent.click(screen.getByRole("button", { name: /create post/i }));
  await userEvent.type(screen.getByLabelText(/image url/i), "https://picsum.photos/seed/new/800/800");
  await userEvent.type(screen.getByLabelText(/caption/i), "My new post");
  await userEvent.click(screen.getByRole("button", { name: /publish/i }));
  expect(screen.getByText("My new post")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run integration test to confirm failure**

Run: `npm test -- src/tests/integration/createPostFlow.test.tsx`
Expected: FAIL until modal/actions are connected.

- [ ] **Step 3: Implement actions and UI wiring**

```ts
addPost: (state, action: PayloadAction<Post>) => {
  state.allPosts.unshift(action.payload);
}
```

```tsx
const onPublish = () => {
  dispatch(addPost({ id: crypto.randomUUID(), userId, image, caption, likes: [], comments: [], timestamp: new Date().toISOString() }));
  dispatch(toggleCreateModal(false));
};
```

- [ ] **Step 4: Re-run integration test**

Run: `npm test -- src/tests/integration/createPostFlow.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/store/slices src/components/organisms src/tests/integration/createPostFlow.test.tsx
git commit -m "feat: add post creation and profile interactions"
```

### Task 10: Error States, Loading States, and Not Found Handling

**Files:**
- Modify: `src/store/slices/uiSlice.ts`, `src/components/organisms/PostFeed.tsx`, `src/pages/Profile.tsx`, `src/pages/PostDetail.tsx`, `src/pages/NotFound.tsx`

- [ ] **Step 1: Write failing test for missing profile route behavior**

```ts
it("shows not found when profile id does not exist", () => {
  renderAppAtRoute("/profile/unknown");
  expect(screen.getByText(/user not found/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run targeted test to verify failure**

Run: `npm test -- src/tests/integration/createPostFlow.test.tsx`
Expected: FAIL due to absent error handling path.

- [ ] **Step 3: Implement loading and error UI branches**

```tsx
if (loading) return <Spinner />;
if (!profile) return <p className="rounded bg-red-50 p-3 text-red-700">User not found</p>;
```

- [ ] **Step 4: Re-run tests and build**

Run: `npm test && npm run build`
Expected: all tests pass, production build passes.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/store/slices/uiSlice.ts src/components/organisms/PostFeed.tsx src/pages/Profile.tsx src/pages/PostDetail.tsx src/pages/NotFound.tsx
git commit -m "feat: add loading and error states"
```

### Task 11: Final Verification and Quality Gate

**Files:**
- Modify: `README.md` (if missing, create)

- [ ] **Step 1: Add README usage notes and feature checklist**

```md
## Features
- Feed with like/comment
- Profiles with follow/unfollow
- Create post modal
- Explore and post detail routes

## Run
npm install
npm run dev
npm test
npm run build
```

- [ ] **Step 2: Run full verification suite**

Run: `npm test && npm run build`
Expected: all checks green.

- [ ] **Step 3: Commit release-ready state**

Run:
```bash
git add README.md
git commit -m "docs: add setup and verification instructions"
```

---

## Self-Review

### 1. Spec Coverage Check

- Component nesting (Atomic Design): covered in Tasks 6-8.
- Passing props with unidirectional flow: covered in Tasks 6-8 with atoms/molecules/organisms composition.
- State management (Redux slices + interactions): covered in Tasks 4, 7, 9, 10.
- Routing without refresh: covered in Task 5 and route pages in Task 8.
- Features (feed, profiles, create post, likes, comments, follow/unfollow, explore): covered in Tasks 7-10.
- Error/loading handling: covered in Task 10.
- Testing strategy: reducer/component/integration testing included across Tasks 4, 6, 7, 9, 10, 11.

No spec gaps found.

### 2. Placeholder Scan

- No TODO/TBD placeholders in tasks.
- Every task includes concrete files, commands, and expected outcomes.

### 3. Type and Naming Consistency

- Entities consistently use `User`, `Post`, `Comment`.
- Redux actions consistently use `toggleLike`, `addComment`, `addPost`, `toggleCreateModal`.
- Routes and page names align with design spec (`Home`, `Explore`, `Profile`, `PostDetail`, `NotFound`).

Consistency check passed.
