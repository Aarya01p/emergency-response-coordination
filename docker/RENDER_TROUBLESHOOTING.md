# Troubleshooting Render Deployment

## Common Errors and Solutions

### Error 1: "Cannot find module"

**Cause:** Dependencies not installed properly

**Solution:**
```bash
# Use this Build Command:
npm install && cd backend && npm install && npm run build

# Use this Start Command:
cd backend && npm start
```

### Error 2: "ENOENT: no such file or directory"

**Cause:** Wrong root directory or Dockerfile path

**Check:**
- Root Directory should be: `backend` (not empty, not /backend)
- Dockerfile Path should be: `../docker/Dockerfile.backend.render`
- File actually exists: Check repo structure

### Error 3: "Port already in use"

**Cause:** PORT environment variable not set

**Solution:**
Add to Environment Variables:
```
BACKEND_PORT=10000
PORT=10000
```

### Error 4: "Cannot find package.json"

**Cause:** Working directory is wrong

**Solution:**
```
Root Directory: backend
Dockerfile Path: ../docker/Dockerfile.backend.render
```

### Error 5: "Database connection failed"

**Cause:** Database not created yet or wrong credentials

**Solution:**
1. Create PostgreSQL service first
2. Wait 2-3 minutes for it to be ready
3. Copy exact connection details
4. Add to environment variables
5. Redeploy backend

### Error 6: "Build failed with exit code 1"

**Cause:** TypeScript compilation error

**Solution:**
1. Check logs for specific error
2. Run locally: `cd backend && npm run build`
3. Fix any TypeScript errors
4. Push to GitHub
5. Redeploy on Render

## Debugging Steps

### Step 1: Check Logs
```
Render Dashboard → Your Service → Logs
Look for red error messages
```

### Step 2: Test Locally
```bash
cd backend
npm install
npm run build
npm start
# Should run on http://localhost:5000
```

### Step 3: Check Environment Variables
```
Render Dashboard → Your Service → Environment
Verify all variables are set correctly
```

### Step 4: Manual Redeploy
```
Render Dashboard → Your Service → Manual Deploy
Click "Deploy latest commit"
```

## Quick Fix Checklist

- [ ] Root Directory is correct (e.g., `backend`)
- [ ] Dockerfile Path is correct (e.g., `../docker/Dockerfile.backend.render`)
- [ ] All environment variables are set
- [ ] Database is created and ready
- [ ] Build command is correct
- [ ] Start command is correct
- [ ] Latest code pushed to GitHub
- [ ] Clicked "Manual Deploy" after changes

## Still Having Issues?

1. **Share the error log** (copy full error from Logs)
2. **Check the Dockerfile** exists at correct path
3. **Verify package.json** in backend directory
4. **Test locally** before redeploying
5. **Hard refresh** Render service page (F5)

## Support

Check these files:
- `/docs/DEPLOYMENT.md` - General deployment guide
- `/docker/Dockerfile.backend.render` - Backend Dockerfile
- `/backend/package.json` - Backend dependencies
- `/docs/GETTING_STARTED.md` - Setup guide
