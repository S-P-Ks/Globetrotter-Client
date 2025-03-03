# The Globetrotter Challenge

An interactive web application that tests users' travel knowledge through engaging cryptic clues about famous destinations worldwide. Built with React, TypeScript, and modern web technologies, this application offers an immersive experience for travel enthusiasts and quiz lovers alike.

## Table of Contents
- [The Globetrotter Challenge](#the-globetrotter-challenge)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Environment Variables](#environment-variables)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Interactive Quiz System**
  - Cryptic clues about global destinations
  - Real-time feedback on answers
  - Progressive difficulty levels
  - Fun facts and trivia reveals

- **User Experience**
  - Modern, responsive UI with Tailwind CSS
  - Smooth animations and transitions
  - Dark mode support
  - Interactive components using Radix UI

- **Game Features**
  - Score tracking system
  - Challenge friends functionality
  - Global leaderboard
  - 100+ destinations from around the world

- **Technical Features**
  - State persistence
  - Real-time updates
  - Responsive design
  - Progressive Web App capabilities

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:**
  - Tailwind CSS
  - Radix UI components
  - Tailwind Animations
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form with Zod validation
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **UI Components:**
  - Custom components built on Radix UI primitives
  - Lucide React icons
  - Embla Carousel
  - Recharts for statistics

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/globetrotter-challenge.git
cd globetrotter-challenge
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.sample .env
```
Edit the `.env` file with your configuration:
```env
VITE_API_URL=your_api_url_here
```

4. **Start the development server**
```bash
npm run dev
```

## Project Structure

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
