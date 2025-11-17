# 🚀 Quick Deployment Guide

Deploy your site to AWS in one command!

## Deploy to Production

```bash
npm run deploy
```

This will:

1. ✅ Check for uncommitted changes
2. 🏷️ Create a timestamped tag (e.g., `deploy-20241016-143022`)
3. 📤 Push the tag to trigger deployment
4. 🔗 Show GitHub Actions link to monitor

## What Happens Next

When the tag is pushed:

1. **GitHub Actions triggers** (in ~5 seconds)
2. **Build process** (~1-2 minutes with cache):
   - Install dependencies
   - Build the 11ty site
   - Package for deployment
3. **Deploy to AWS** (~2-3 minutes):
   - Upload to S3
   - Update CloudFront
   - Invalidate cache

**Total time:** ~3-5 minutes ⚡

## First Time Setup

If you haven't deployed before:

1. **Configure AWS:**

   - Set up OIDC provider in AWS IAM
   - Create IAM role for GitHub Actions
   - Note the role ARN

2. **Add GitHub Secrets:**

   - Go to: Settings → Secrets and variables → Actions
   - Add `AWS_BUILD_PIPELINE_ROLE_ARN` with your role ARN
   - Add `AWS_ORG_REGION` (optional, defaults to us-east-1)

3. **Deploy:**
   ```bash
   npm run deploy
   ```

📚 **[Detailed AWS Setup Guide](./docs/DEPLOYMENT.md)**

## Alternative Deployment Methods

### Manual Tag

```bash
git tag -a deploy-v1.0.0 -m "Version 1.0.0"
git push origin deploy-v1.0.0
```

### Manual Workflow Trigger

1. Go to **Actions** tab in GitHub
2. Select **"Deploy to Production"**
3. Click **"Run workflow"**

## Tag Naming

Tags **must** start with `deploy-*` to trigger deployment:

✅ Valid: `deploy-v1.0.0`, `deploy-hotfix`, `deploy-20241016`  
❌ Invalid: `v1.0.0`, `release-1.0.0`

## Monitor Deployment

After deploying, check:

- **GitHub Actions:** https://github.com/YOUR_ORG/YOUR_REPO/actions
- **AWS Console:** CloudFormation → Stacks

You'll see:

- ✅ Build status
- ⚡ Cache performance
- 🌐 Deployment URL (CloudFront)

## Rollback

To rollback to a previous version:

```bash
# Find previous deployment commit
git log --oneline

# Create new deployment tag at old commit
git tag -a deploy-rollback OLD_COMMIT_HASH -m "Rollback"
git push origin deploy-rollback
```

## Troubleshooting

### "AWS_BUILD_PIPELINE_ROLE_ARN secret is not set"

Add the secret in GitHub: Settings → Secrets and variables → Actions

### "Deployment failed"

1. Check GitHub Actions logs
2. Verify AWS credentials
3. Check IAM role permissions

### "No changes detected"

Cache is working! Deployment still happens, just faster.

## Cost

Typical monthly cost: **$2-10**

- S3 storage: ~$0.50
- CloudFront traffic: ~$1-5
- Lambda (SST): Usually free tier

First 12 months often covered by AWS free tier!

---

**Need help?** See [TAG-DEPLOYMENT.md](./docs/TAG-DEPLOYMENT.md) for detailed guide.
