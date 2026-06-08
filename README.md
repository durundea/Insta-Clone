# Instagram Clone

A modern, modular React + TypeScript Instagram clone built with Redux Toolkit, React Router, and Tailwind CSS. Features a responsive UI using Atomic Design patterns with mock data.

## Features

- ✅ **Feed with Likes & Comments** - View posts in a scrollable feed with interactive like and comment functionality
- ✅ **User Profiles with Follow/Unfollow** - Browse user profiles and manage follow relationships
- ✅ **Create Post Modal** - Create new posts with modal interface and state management
- ✅ **Explore Page** - Discover posts from all users
- ✅ **Post Detail View** - View individual posts with full details and comments
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **State Management:** Redux Toolkit + React Redux
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library

## Setup

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd insta-clone

# Install dependencies
npm install
```

## Development

### Start Development Server

```bash
npm run dev
```

This starts the Vite dev server at `http://localhost:5173` with hot module replacement (HMR).

### Run Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

Tests are organized by:
- **Unit Tests:** Redux reducers and selectors in `src/tests/slices/`
- **Component Tests:** React components in `src/tests/components/`
- **Integration Tests:** Complex flows combining multiple features

### Build for Production

```bash
npm run build
```

Runs TypeScript type checking (`tsc -b`) and builds optimized output to `dist/`.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally.

## Project Structure

```
src/
├── components/          # Atomic Design components
│   ├── atoms/          # Basic UI elements (Button, Avatar, Input, etc.)
│   ├── molecules/      # Compound components (CommentBox, LikeButton, PostHeader)
│   ├── organisms/      # Complex UI sections (Header, Sidebar, PostCard, PostFeed)
│   └── templates/      # Page layouts (MainLayout)
├── pages/              # Route pages (Home, Explore, Profile, PostDetail, NotFound)
├── store/              # Redux state management
│   ├── slices/         # Redux slices (users, posts, currentUser, ui)
│   ├── store.ts        # Redux store configuration
│   ├── hooks.ts        # Custom Redux hooks (useAppDispatch, useAppSelector)
│   └── selectors.ts    # Redux selectors
├── types/              # TypeScript type definitions
├── utils/              # Utilities (mockData, helpers)
├── tests/              # Test files
├── App.tsx             # Root component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## Architecture

### State Management

Redux Toolkit manages four slices:

- **`users`** - All users in the app with follow relationships
- **`posts`** - All posts with comments and likes
- **`currentUser`** - Currently logged-in user
- **`ui`** - UI state (loading, error, modals)

### Component Hierarchy

Uses Atomic Design for scalable, reusable components:

- **Atoms:** Basic elements (`Button`, `Avatar`, `Input`, `TextArea`, `Spinner`)
- **Molecules:** Simple combinations (`LikeButton`, `CommentBox`, `PostHeader`)
- **Organisms:** Complex sections (`Header`, `Sidebar`, `PostCard`, `PostFeed`, `CreatePostModal`)
- **Templates:** Layout wrappers (`MainLayout`)

### Routing

React Router v6 handles client-side navigation:

- `/` - Home feed
- `/explore` - Explore all posts
- `/profile/:userId` - User profile
- `/posts/:postId` - Post detail view
- `*` - 404 Not Found

## Usage Example

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Browse the feed** - See all posts from all users

3. **Like a post** - Click the heart icon on any post

4. **Add a comment** - Click the comment section and type your comment

5. **Create a post** - Click the "Create Post" button to open modal

6. **Visit a profile** - Click a user's avatar to see their profile

7. **Follow/Unfollow** - Click the follow button on any profile

8. **Explore** - Click "Explore" in sidebar to discover posts

## Testing Strategy

- **Unit Tests:** Redux reducers and selectors validate state mutations
- **Component Tests:** React Testing Library tests UI behavior and user interactions
- **Integration Tests:** Complex user flows across multiple components

Run the full test suite:

```bash
npm test
```

Expected output: All tests pass ✅

## Quality Verification

Run the complete quality gate before deploying:

```bash
npm test && npm run build
```

This ensures:
- ✅ All tests pass (unit, component, integration)
- ✅ TypeScript builds with no errors
- ✅ Production build completes successfully with no warnings

## License

MIT
