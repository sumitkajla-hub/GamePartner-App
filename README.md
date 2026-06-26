# GamePartner - Local Sports & Indoor Games Partner Finder

GamePartner is a community-based digital platform designed to help individuals discover and connect with nearby playing partners for indoor and outdoor games. 

## Features

- **User Authentication**: Secure login and registration.
- **Location-Based Search**: Find players in your specific area/society.
- **Smart Matchmaking**: Filter by game type, skill level, and availability.
- **Play Requests**: Send, receive, and manage game requests.
- **Community Groups**: Join or create local sports groups.
- **Player Profiles**: Manage your games, availability, and skill levels.
- **Admin Dashboard**: Platform oversight and statistics.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19
- **Styling**: Vanilla CSS with modern UI/UX design (glassmorphism, gradients, animations)
- **Data/State**: React Context API, LocalStorage for persistence
- **Icons/Avatars**: Native Emoji & CSS Gradients

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo Accounts

- **User Account**: `aarav@example.com` / `password123`
- **Admin Account**: `admin@gamepartner.com` / `admin123`

## Deployment

This project is configured for static export (`output: 'export'` in `next.config.mjs`) which makes it incredibly easy to deploy to Vercel, Netlify, or GitHub Pages.

### Vercel Deployment

1. Push your code to a GitHub repository.
2. Import the repository in Vercel.
3. Vercel will automatically detect Next.js.
4. Set the Framework Preset to "Next.js".
5. Click Deploy!
