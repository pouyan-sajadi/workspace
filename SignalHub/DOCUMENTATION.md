# Signal News App - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Frontend Structure](#frontend-structure)
4. [API Layer](#api-layer)
5. [Components Guide](#components-guide)
6. [Pages](#pages)
7. [State Management](#state-management)
8. [Styling and Design](#styling-and-design)
9. [Development Workflow](#development-workflow)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

## Project Overview

Signal News App is a real-time AI-powered news aggregation and synthesis platform that transforms user queries into comprehensive, personalized news reports. The application eliminates information noise by intelligently gathering, filtering, and synthesizing relevant news content into clear, digestible reports.

### Key Features
- **Instant Intelligence**: Convert any topic into a comprehensive news report in real-time
- **Noise-Free Content**: AI-powered filtering ensures only relevant, high-quality information
- **Personalized Experience**: Customizable focus, depth, and tone based on user preferences
- **Real-Time Transparency**: Live updates showing exactly what the system is doing

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn/ui components
- **Routing**: React Router DOM v7
- **Icons**: Lucide React & Heroicons
- **HTTP Client**: Axios
- **Backend**: Express.js with MongoDB (separate service)

## Architecture

The application follows a modern React architecture with clear separation of concerns: