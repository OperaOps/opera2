# Opera AI Dashboard

A modern, AI-powered dental practice management dashboard built with Next.js, React, and Tailwind CSS.

## Features

- **AI-Powered Analytics**: Get insights about your dental practice with natural language queries
- **Real-time Dashboard**: Monitor key metrics like production, collection rates, and patient flow
- **Greyfinch Integration**: Connect to Greyfinch API for real dental practice data
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Voice Input**: Ask questions using voice recognition

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Greyfinch API credentials (from your test.py file)

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your Greyfinch API credentials:
   ```
   GREYFINCH_API_KEY=your_api_key_here
   GREYFINCH_API_SECRET=your_api_secret_here
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
opera/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── greyfinch/    # Greyfinch API integration
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── HomePage.tsx      # Main dashboard component
├── Components/            # React components
│   ├── ai/               # AI-related components
│   ├── dashboard/        # Dashboard widgets
│   ├── layout/           # Layout components
│   └── opportunities/    # Opportunity tracking
├── components/           # Reusable UI components
│   └── ui/              # Base UI components
├── entities/            # Data models and utilities
├── lib/                 # Utility functions
├── Pages/               # Legacy page components
└── apiTest/            # API testing scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The app integrates with Greyfinch API to fetch real dental practice data. The integration includes:

- **Authentication**: Automatic login with API key/secret
- **GraphQL Queries**: Fetch appointment data, patient information, and metrics
- **Real-time Updates**: Live data synchronization

## Customization

### Adding New Metrics

1. Update `Components/ai/operaAI.js` to add new query patterns
2. Modify `Components/dashboard/MetricCard.jsx` for new metric types
3. Update the API routes in `app/api/greyfinch/` for new data sources

### Styling

The app uses Tailwind CSS with custom components. Key styling files:

- `app/globals.css` - Global styles and utilities
- `tailwind.config.js` - Tailwind configuration
- Component-specific styles in individual files

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Verify your Greyfinch API credentials
2. **Build Errors**: Check that all dependencies are installed
3. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Getting Help

- Check the console for error messages
- Verify your environment variables
- Ensure all dependencies are up to date

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.


