---
description: Deploy portfolio to Vercel
---

# Deploy Portfolio to Vercel

Follow these steps to deploy your portfolio to Vercel:

## Option 1: Deploy via Vercel CLI (Fastest)

1. Install Vercel CLI globally
```bash
npm install -g vercel
```

2. Login to Vercel (this will open a browser window)
```bash
vercel login
```

3. Deploy to Vercel (from the project directory)
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **port_new** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override settings? **N**

5. For production deployment, run:
```bash
vercel --prod
```

## Option 2: Deploy via Vercel Dashboard (Recommended for Git integration)

### Step 1: Initialize Git Repository (if not already done)

1. Initialize git in your project
```bash
git init
```

2. Add all files
```bash
git add .
```

3. Commit the files
```bash
git commit -m "Initial commit - Portfolio ready for deployment"
```

### Step 2: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
   - Name it something like `portfolio` or `my-portfolio`
   - Don't initialize with README (we already have files)

2. Add the remote repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

3. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com and sign up/login (you can use your GitHub account)

2. Click "Add New Project" or "Import Project"

3. Import your GitHub repository

4. Vercel will auto-detect it's a Vite project and configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click "Deploy"

6. Wait for deployment to complete (usually 1-2 minutes)

7. Your site will be live at: `https://your-project-name.vercel.app`

## Post-Deployment

- Every push to the `main` branch will automatically trigger a new deployment
- You can set up a custom domain in Vercel dashboard under "Settings" > "Domains"
- Preview deployments are created for pull requests automatically

## Troubleshooting

If build fails, check:
- All dependencies are in `package.json`
- Build command works locally: `npm run build`
- No environment variables are missing
- Node version compatibility (Vercel uses Node 18 by default)
