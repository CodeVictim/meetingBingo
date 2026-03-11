# Meeting Bingo — North Star 2026

## Deploy to Netlify

1. Go to netlify.com → Log in with personal email
2. Click "Add new site" → "Deploy manually"
3. Drag the entire `meeting-bingo` folder onto the Netlify drop zone
4. Site will be live in seconds

## Password Protect It
1. Site Settings → Access Control → Visitor Access
2. Click "Enable Password Protection"
3. Set a password → Share URL + password with team

## To Rebuild Locally
```
npm install
npm run build
```
Then redeploy the `dist` folder.
