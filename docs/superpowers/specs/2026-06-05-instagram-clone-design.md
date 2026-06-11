# Instagram Design Specification

**Date:** 2026-06-05  
**Project:** Simplified Instagram  
**Tech Stack:** React 18, TypeScript, Redux Toolkit, React Router v6, Tailwind CSS  
**Status:** Design Approved

---

## 1. Project Overview

A modular, single-page Instagram app built to demonstrate:
- **Nesting Components:** Atomic Design principles (atoms → molecules → organisms → templates)
- **Passing Props:** Clean unidirectional data flow (parent → child)
- **Managing State:** Redux-based centralized state management
- **Implementing Routing:** Client-side navigation with React Router

**MVP Features:**
- Home feed (view all posts)
- User profiles (view/edit user info, see user posts)
- Create posts (image URL + caption)
- Like/unlike posts
- Add/view comments
- Follow/unfollow users
- Explore page (discover posts)

**Data Model:** Mock data with 10+ users and 50+ posts

---

## 2. Project Structure

```
instagram/
├── public/
├── src/
│   ├── components/
│   │   ├── atoms/              # Reusable basic UI elements
│   │   │   ├── Button.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── TextArea.tsx
│   │   │   └── Spinner.tsx
│   │   ├── molecules/          # Simple combinations
│   │   │   ├── CommentBox.tsx
│   │   │   ├── PostHeader.tsx
│   │   │   ├── LikeButton.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── organisms/          # Complex components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── PostFeed.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── UserProfile.tsx
│   │   │   └── CreatePostModal.tsx
│   │   └── templates/          # Layout wrappers
│   │       ├── MainLayout.tsx
│   │       └── AuthLayout.tsx
│   ├── pages/                  # Page-level components (routable)
│   │   ├── Home.tsx
│   │   ├── Profile.tsx
│   │   ├── Explore.tsx
│   │   ├── PostDetail.tsx
│   │   └── NotFound.tsx
│   ├── store/                  # Redux configuration
│   │   ├── store.ts            # Configure store
│   │   ├── slices/
│   │   │   ├── usersSlice.ts
│   │   │   ├── postsSlice.ts
│   │   │   ├── currentUserSlice.ts
│   │   │   └── uiSlice.ts
│   │   └── hooks.ts            # Custom typed useAppDispatch, useAppSelector
│   ├── types/                  # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/
│   │   ├── mockData.ts         # Mock users & posts
│   │   └── helpers.ts          # Utility functions
│   ├── App.tsx                 # Router configuration
│   └── index.tsx               # Entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## 3. Redux State Architecture

### State Shape

```typescript
{
  users: {
    allUsers: User[],
    loading: boolean,
    error: string | null
  },
  currentUser: {
    user: User | null,
    following: string[]
  },
  posts: {
    allPosts: Post[],
    loading: boolean,
    error: string | null
  },
  ui: {
    isCreateModalOpen: boolean,
    isCommentingOn: string | null,      // Post ID being commented
    sidebarOpen: boolean,
    selectedPostId: string | null
  }
}
```

### State Types

```typescript
interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: string[];           // User IDs
  following: string[];           // User IDs
  posts: string[];               // Post IDs
}

interface Post {
  id: string;
  userId: string;
  image: string;
  caption: string;
  likes: string[];               // User IDs who liked
  comments: Comment[];
  timestamp: string;
}

interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}
```

### Redux Slices

**usersSlice:**
- Actions: `setUsers`, `addUser`, `updateUser`, `followUser`, `unfollowUser`
- Reducers handle adding/removing followers and following lists

**postsSlice:**
- Actions: `setPosts`, `addPost`, `deletePost`, `toggleLike`, `addComment`, `deleteComment`
- Handles post CRUD operations and interactions

**currentUserSlice:**
- Actions: `setCurrentUser`, `updateCurrentUserBio`, `setFollowing`
- Tracks the logged-in user and their following list

**uiSlice:**
- Actions: `toggleCreateModal`, `setCommentingOn`, `toggleSidebar`, `setSelectedPost`
- Manages UI state (modals, toggles, selections)

---

## 4. Component Hierarchy & Atomic Design

### Atoms (Pure, Reusable)
No Redux connection. Props-only.

- `Button` - onClick, label, variant (primary/secondary/danger)
- `Icon` - name, size, color
- `Avatar` - src, size, alt
- `Badge` - count, color
- `Input` - placeholder, value, onChange
- `TextArea` - placeholder, value, onChange, rows
- `Spinner` - size, color

### Molecules (Composable)
May connect to Redux OR receive props.

- `CommentBox` - Avatar + TextArea + Button (for adding comments)
- `PostHeader` - Avatar + username + timestamp + menu button
- `LikeButton` - Heart icon + like count + onClick
- `SearchBar` - Input + search icon

### Organisms (Complex, Typically Connected)
Usually connect to Redux. Compose molecules.

- `Header` - Logo + SearchBar + Navigation + User menu
- `Sidebar` - Navigation links (Home, Explore, Profile) + Current user section
- `PostCard` - PostHeader + Image + LikeButton + Comments + CommentBox
- `PostFeed` - Collection of PostCards
- `UserProfile` - User header (bio, follow button) + Post grid
- `CreatePostModal` - Modal with image URL input + caption textarea + submit button
- `Explore` - Grid of all posts

### Templates (Layout Wrappers)

- `MainLayout` - Header + Sidebar + Main content area
- `AuthLayout` - Centered content (for future auth pages)

---

## 5. Data Flow & Props Pattern

### Unidirectional Flow

```
User Interaction (e.g., click Like button)
  ↓
Component dispatches Redux action
  ↓
Redux slice updates state
  ↓
Connected components subscribe and re-render with new data
  ↓
UI reflects new state
```

### Props Strategy

**Atoms:**
- Pure components—receive only props
- No Redux connection
- Example: `<Button onClick={handleClick} label="Like" />`

**Molecules:**
- Can receive data as props OR connect to Redux
- Prefer props for reusability
- Example: `<CommentBox userId={userId} postId={postId} onSubmit={handleComment} />`

**Organisms:**
- Typically connect to Redux via `useAppSelector` and `useAppDispatch`
- Transform data for child molecules/atoms
- Example: `PostCard` selects post data, current user, and passes to children

**Pages:**
- Connect to Redux, extract URL params
- Fetch and pass data to layout/organisms

### Example: Like Post

```typescript
// User clicks LikeButton (Atom)
<LikeButton postId="123" onClick={() => dispatch(toggleLike('123'))} />

// toggleLike action dispatched
dispatch(postsSlice.toggleLike('123'))

// Redux reducer updates post.likes[]
posts.allPosts[0].likes = [userId, ...rest] or posts.allPosts[0].likes.filter(...)

// Connected PostCard component re-renders with updated likes
const post = useAppSelector(state => selectPostById(state, '123'))
<LikeButton count={post.likes.length} ... />
```

---

## 6. Routing (React Router v6)

### Route Definitions

```typescript
const routes = [
  { path: '/', element: <Home />, name: 'Home' },
  { path: '/explore', element: <Explore />, name: 'Explore' },
  { path: '/profile/:userId', element: <Profile />, name: 'Profile' },
  { path: '/profile/me', element: <Profile />, name: 'My Profile' },
  { path: '/post/:postId', element: <PostDetail />, name: 'Post' },
  { path: '*', element: <NotFound /> }
]
```

### Navigation Features

- **Client-side routing:** No full page refreshes
- **URL params:** `/profile/:userId` for dynamic routes
- **Link components:** Use `<Link>` for navigation
- **Programmatic navigation:** `useNavigate()` for redirect after actions
- **History management:** Browser back/forward works correctly

### Route Protection

- All routes publicly accessible (no auth required for MVP)
- Hardcode current user as first user in mock data

---

## 7. Core Features & Interactions

### Home Feed

- Display all posts sorted by newest first
- **Interactions:** Like/unlike, add comment, navigate to profile
- **Data:** Select from Redux `posts.allPosts`
- **Component:** `<Home>` page → `<PostFeed>` → `<PostCard>` (repeated)

### User Profiles

- Display user info (fullName, bio, follower/following counts)
- Show user's posts in a grid layout
- **Interactions:** 
  - Follow/unfollow button (changes current user's following list)
  - Edit bio (if viewing current user's profile)
  - Click post to view detail
- **Data:** Select user from `users.allUsers`, filter posts by `userId`
- **Component:** `<Profile>` page → `<UserProfile>` organism

### Create Post

- Modal form with image URL input + caption textarea
- **Interactions:** Submit adds post to Redux, modal closes, post appears in feed
- **Data:** Dispatch `addPost` action with new post data
- **Component:** `<CreatePostModal>` organism

### Explore Page

- Display all posts (similar to feed, no filtering)
- **Interactions:** Like, comment, navigate to profile
- **Data:** Select all posts from Redux
- **Component:** `<Explore>` page → `<PostFeed>`

### Comments

- Display comments on each post
- **Interactions:** Add comment via `<CommentBox>`, delete own comments
- **Data:** Comments stored in post.comments array
- **Component:** `<PostCard>` contains comments + `<CommentBox>`

---

## 8. Error Handling & Loading States

### Loading States

- **Global loading:** `ui.loading` tracks fetch-like operations
- **Component loading:** Show `<Spinner>` while loading posts/users
- **Button states:** Disable buttons during submission, show loading indicator
- **Animation:** Brief like animation on interaction

### Error Handling

- **Invalid IDs:** Show "User not found" or "Post not found" message
- **Toast notifications:** Brief feedback for actions (success/error)
- **Graceful fallbacks:** Show default content if data missing

### Implementation

```typescript
// Loading indicator
{postsLoading && <Spinner />}

// Error message
{error && <ErrorBanner message={error} />}

// Disabled state
<Button disabled={isSubmitting} onClick={handleSubmit}>
  {isSubmitting ? 'Posting...' : 'Post'}
</Button>
```

---

## 9. Testing Strategy

### Unit Tests (Redux)

- **Slices:** Test reducers produce correct state updates
- **Selectors:** Test derived state returns correct values
- Example:
  ```typescript
  test('toggleLike adds userId to post likes', () => {
    const state = postsSlice.reducer(initialState, toggleLike('post1'));
    expect(state.allPosts[0].likes).toContain(currentUserId);
  });
  ```

### Component Tests (React Testing Library)

- **Atoms:** Props render correctly, events fire
- **Molecules:** Composition works, props flow correctly
- **Organisms:** Connected to Redux, UI reflects state
- Example:
  ```typescript
  test('LikeButton toggles like on click', () => {
    render(<LikeButton postId="1" liked={false} />);
    fireEvent.click(screen.getByRole('button'));
    expect(dispatch).toHaveBeenCalledWith(toggleLike('1'));
  });
  ```

### Integration Tests

- **User flow:** Create post → post appears in feed
- **Navigation:** Navigate between routes, state persists
- **Interactions:** Like post → count updates, follow user → appears in following list

### Key Test Cases

1. Redux state updates correctly on actions
2. Props pass correctly through component tree
3. UI updates reflect Redux state changes
4. Navigation works between routes
5. Form submissions work (create post, add comment)
6. Error states handled gracefully

---

## 10. Performance Considerations

- **Memoization:** Use `React.memo` for expensive atoms/molecules
- **Selectors:** Use Redux selectors to prevent unnecessary re-renders
- **Lazy loading:** Pages can be lazy-loaded via `React.lazy()` (future optimization)
- **Scroll:** Infinite scroll or pagination on feed (future enhancement)

---

## 11. Success Criteria

✅ **Nesting Components:** Atomic Design hierarchy clear and modular  
✅ **Passing Props:** Unidirectional data flow from parent → child  
✅ **Managing State:** Redux centralized state with proper actions/reducers  
✅ **Implementing Routing:** Client-side navigation without page refreshes  
✅ **All Features:** Feed, profiles, create posts, likes, comments, follow/unfollow  
✅ **Mock Data:** 10+ users, 50+ posts with realistic interactions  
✅ **TypeScript:** Proper types throughout, no `any` types  
✅ **Styling:** Tailwind CSS for consistent, responsive design  

---

## Next Steps

1. Write implementation plan (using writing-plans skill)
2. Set up project from scratch (Vite + React + TypeScript)
3. Implement Redux store and slices
4. Build component hierarchy
5. Implement routing
6. Add mock data and integrate
7. Test and deploy

