# Document Hosting Platform

A platform for hosting and sharing HTML, CSS, and JavaScript documents.

## MongoDB Setup for Vercel Deployment

This application uses MongoDB to store document content, which allows it to work on Vercel's read-only filesystem.

### Setting up MongoDB Atlas

1. Create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
2. Create a new cluster (the free tier is sufficient)
3. Under "Security" > "Database Access", create a new database user with read and write permissions
4. Under "Security" > "Network Access", add your IP address or allow access from anywhere (for development)
5. Under "Databases", click "Connect" on your cluster, then "Connect your application"
6. Copy the connection string and replace the placeholders with your username and password

### Environment Variables

1. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/deployment_tool?retryWrites=true&w=majority
   MONGODB_DB=deployment_tool
   ```
   Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials

2. For Vercel deployment, add these same environment variables in the Vercel project settings:
   - Go to your project on Vercel
   - Navigate to "Settings" > "Environment Variables"
   - Add the same variables as in your `.env.local` file

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Deployment on Vercel

Push your code to a Git repository and import it into Vercel. Make sure to add the environment variables in the Vercel project settings.