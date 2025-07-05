# Government Spending Viewer

A full-stack web application for viewing and analyzing federal government spending data. The application consists of a FastAPI backend that fetches data from the USA Spending API and a Next.js frontend that displays the data in interactive charts.

## Features

- **Real-time Data**: Fetches spending data from the official USA Spending API
- **Interactive Charts**: Visualizes spending data using dynamic charts
- **Filtering**: Filter data by year, quarter, and agency
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Next.js and Tailwind CSS

## Project Structure

```
another_one/
├── govspend-backend/          # FastAPI backend
│   ├── main.py               # Main FastAPI application
│   ├── requirements.txt      # Python dependencies
│   ├── routers/             # API route handlers
│   └── services/            # Business logic and API services
├── govspend-frontend/        # Next.js frontend
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   └── components/      # React components
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── package.json         # Node.js dependencies
└── README.md                # This file
```

## Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd govspend-backend
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   uvicorn main:app --reload
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd govspend-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /spending/{year}/{quarter}/{agency}` - Fetch spending data for a specific year, quarter, and agency

## Technologies Used

### Backend

- **FastAPI**: Modern, fast web framework for building APIs
- **httpx**: HTTP client for making requests to external APIs
- **Pydantic**: Data validation using Python type annotations

### Frontend

- **Next.js**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive charts and graphs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [USA Spending API](https://api.usaspending.gov/) for providing the spending data
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent web framework
- [Next.js](https://nextjs.org/) for the React framework
