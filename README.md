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

## Deep Dive into Key Features

### 📍 Smart Matchmaking & Location Search
The platform makes finding game partners effortless. You can search for players within your specific neighborhood or society. The system allows you to filter matches based on:
- **Game Preference**: Whether you want to play Chess, Cricket, or Table Tennis.
- **Skill Level**: Choose to play with Beginners, Intermediate, or Advanced players.
- **Availability**: Match with people whose schedule (e.g. Weekends, Evenings) aligns with yours.

### 📩 Play Request System
Instead of randomly sharing contact numbers, GamePartner uses an integrated Play Request system. 
- You can browse player profiles and send a tailored match request.
- The request includes the chosen game, a custom message, preferred date/time, and the playing location.
- The recipient can securely accept or decline the match request right from their dashboard.

### 👥 Community Groups
If you want to play in a group instead of 1-on-1, you can join or create Community Groups.
- Discover local groups like "Pune Weekend Cricketers" or "Noida Chess Club".
- Join communities to see how many members are participating and engage with fellow enthusiasts.
