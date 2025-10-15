# 📄 Document Hosting Platform

A modern Next.js web application for hosting and sharing static HTML, CSS, and JavaScript documents. Perfect for developers who want to quickly share interactive demos, presentations, or any web content.

## ✨ Features

- 🔐 **Secure Authentication**: Protected dashboard and upload routes with JWT-based auth
- 📤 **Easy Upload**: Paste your HTML/CSS/JS code and get an instant shareable link
- 👁️ **Live Preview**: Real-time preview with split, editor, and preview modes
- ✏️ **Edit Documents**: Edit your uploaded documents with live preview
- 📊 **Dashboard**: Manage all your hosted documents from one central location
- 🔗 **Simple Sharing**: Each document gets a unique URL for easy sharing (no auth required)
- 🗑️ **Document Management**: Delete documents you no longer need
- 🎨 **Beautiful UI**: Modern, responsive design with gradient effects
- ⚡ **Fast Performance**: Built with Next.js 15 for optimal speed

## 🚀 Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

3. Edit `.env.local` and set your authentication credentials:
```env
AUTH_USERNAME=admin
AUTH_PASSWORD=your-secure-password-here
AUTH_SECRET=your-random-secret-min-32-characters
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. Login at [http://localhost:3000/login](http://localhost:3000/login) with your credentials

### Usage

1. **Login**:
   - Visit `/login` and enter your credentials from `.env.local`
   - You'll be redirected to the dashboard

2. **Upload a Document**:
   - Click "Upload Document" from the dashboard
   - Enter a title for your document
   - Paste your HTML/CSS/JS code
   - Use the preview modes (Editor, Split, Preview) to see your document live
   - Click "Upload Document"

3. **View Your Documents**:
   - Visit the Dashboard to see all uploaded documents
   - Click "View Document" to see the rendered page (opens in new tab)
   - Click "Copy Link" to share the document URL

4. **Edit Documents**:
   - From the Dashboard, click "Edit" on any document
   - Modify the title or content with live preview
   - Click "Save Changes" to update the document
   - If the title changes, the URL slug will be updated automatically

5. **Share Documents**:
   - Shared document links (`/view/[slug]`) are publicly accessible
   - No authentication required for viewing shared documents

6. **Delete Documents**:
   - From the Dashboard, click "Delete" on any document
   - Confirm the deletion

## 📁 Project Structure

```
app/
├── page.tsx              # Home page
├── login/page.tsx        # Login page
├── dashboard/page.tsx    # Dashboard to view all documents
├── upload/page.tsx       # Upload new documents with live preview
├── edit/[slug]/page.tsx  # Edit existing documents with live preview
├── view/[slug]/page.tsx  # View individual documents (public)
└── api/
    ├── auth/
    │   ├── login/route.ts     # Login API endpoint
    │   └── logout/route.ts    # Logout API endpoint
    └── documents/
        ├── upload/route.ts    # Upload API endpoint
        ├── update/route.ts    # Update API endpoint
        ├── get/[slug]/route.ts # Get document content API endpoint
        └── delete/route.ts    # Delete API endpoint
lib/
├── auth.ts               # Authentication utilities
└── documents.ts          # Document management utilities
components/
├── DocumentCard.tsx      # Document card component
└── LogoutButton.tsx      # Logout button component
middleware.ts             # Route protection middleware
public/
└── documents/            # Storage for HTML files
.env.local               # Environment variables (not committed)
.env.example             # Example environment variables
```

## 🌐 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com):

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings:
   - `AUTH_USERNAME` - Your admin username
   - `AUTH_PASSWORD` - Your secure password
   - `AUTH_SECRET` - A random secret string (min 32 characters)
5. Click "Deploy"

Vercel will automatically detect the Next.js configuration and deploy your site.

**Important**: Make sure to set strong credentials for production!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: JWT (jose library)
- **Storage**: File-based (public/documents)
- **Deployment**: Vercel

## 📝 Example Document

Check out the sample document at `/view/sample-document` to see what you can create!

Example HTML structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Document</title>
  <style>
    body { font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <script>
    console.log('Document loaded!');
  </script>
</body>
</html>
```

## 🔒 Security Features

- **Protected Routes**: Dashboard and upload routes require authentication
- **Public Sharing**: Document view routes remain public for easy sharing
- **JWT Sessions**: Secure session management with HTTP-only cookies
- **Environment Variables**: Credentials stored securely in environment variables
- **Middleware Protection**: Next.js middleware guards protected routes

## 🔧 Optional Enhancements

- Add multi-user support with database
- Integrate database for document metadata (PostgreSQL, MongoDB)
- Add file upload for images/assets
- Implement document editing
- Add document versioning
- Include analytics
- Add password reset functionality
- Implement rate limiting

## 📄 License

MIT
