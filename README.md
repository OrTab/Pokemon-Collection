# Pokémon Collection

A dynamic full-stack application that lets users explore and manage their favorite Pokémon with an intuitive interface, efficient data caching, and responsive design.

## Live Demo

Link: [https://pokemon-collection-zeta.vercel.app](https://pokemon-collection-zeta.vercel.app/)

Backend: [https://pokemon-collection.onrender.com](https://pokemon-collection.onrender.com)

## Project Structure

This project is organized into three main directories:

- **client/**: React frontend application
- **backend/**: Node.js backend API
- **shared/**: Common types used by both frontend and backend

## Tech Stack

### Frontend

- React 19 with TypeScript
- Redux Toolkit for state management
- Chakra UI for component styling
- Axios for API requests
- Vite for build tooling

### Backend

- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose for data persistence
- Redis for response caching
- Express Rate Limiter for API protection

## Features

- Browse through Pokémons with infinite scroll pagination
- View detailed information for each Pokémon (abilities, types, evolutions)
- Add and remove Pokémon from your favorites collection
- Filter to view only favorited Pokémon
- Search functionality to quickly find specific Pokémon
- Responsive design that works on all device sizes
- Backend caching for improved performance

## Getting Started

### Prerequisites

- Node.js (v20+)
- Docker (optional, recommended for local MongoDB and Redis setup if not installed)
- MongoDB (local, Atlas, or Docker)
- Redis (required for caching)

### Setting Up MongoDB Locally

You can set up MongoDB using Docker:

```bash
# Pull the MongoDB image
docker pull mongo

# Create a directory for MongoDB data
mkdir -p ~/mongodb/data

# Run MongoDB container
docker run --name pokemon-mongodb -p 27017:27017 -v ~/mongodb/data:/data/db -d mongo

# Verify MongoDB is running
docker ps
```

### Setting Up Redis Locally

Redis is required for the application to run properly. You can set it up locally using Docker:

```bash
# Pull the Redis image
docker pull redis

# Run Redis container
docker run --name pokemon-redis -p 6379:6379 -d redis

# Verify Redis is running
docker ps
```

### Running the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/pokemons
   REDIS_URL=redis://localhost:6379
   CORS_ORIGIN=http://localhost:5000
   ```

   If not installing locally, use your MongoDB Atlas connection string:

   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-address>/pokemons?retryWrites=true&w=majority
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The backend will be available at http://localhost:3000

### Running the Frontend

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following:

   ```
   VITE_API_URL=http://localhost:3000
   VITE_API_PREFIX=/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:5000

## API Documentation

The backend exposes the following endpoints:

| Endpoint                             | Method | Description                   | Request Body            | Response                 |
| ------------------------------------ | ------ | ----------------------------- | ----------------------- | ------------------------ |
| `/api/pokemons`                      | GET    | Get paginated list of Pokémon | `page` query param      | Array of Pokémon objects |
| `/api/pokemons/favorites`            | GET    | Get all favorite Pokémon      | -                       | Array of favorites       |
| `/api/pokemons/favorites`            | POST   | Add a Pokémon to favorites    | `{ pokemonId: number }` | Added favorite           |
| `/api/pokemons/favorites/:pokemonId` | DELETE | Remove from favorites         | -                       | 204 No Content           |

## Deployment

This application is deployed using:

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Caching**: Render (Redis service)

### Continuous Deployment

- **Frontend**: Automatically deploys to Vercel when changes are pushed to the main branch of the client directory
- **Backend**: Automatically deploys to Render when changes are pushed to the main branch of the backend directory

## Development Approach

### Performance Optimizations

- Redis caching for frequently accessed data
- Pagination to limit data transfer
- Chakra UI with optimized rendering
- Virtualized grid rendering to display only items within the viewport, improving performance with large datasets

### State Management

- Redux Toolkit is used to manage application state
- API calls are centralized in slice files with proper loading/error states

### Responsive Design

- The UI adapts to different screen sizes
- Mobile-first approach using Chakra UI's responsive utilities

## Additional Features

- **Caching Strategy**: Redis is utilized to cache API responses, significantly reducing the load on the PokéAPI and improving response times.
- **Rate Limiting**: Implemented API rate limiting to prevent abuse and ensure fair usage.
- **Error Handling**: Comprehensive error handling throughout the application with user-friendly error messages.

## Credits

- Pokémon data provided by [PokéAPI](https://pokeapi.co/)
- Icons by [React Icons](https://react-icons.github.io/react-icons/)
