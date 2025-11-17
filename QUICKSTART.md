# Quick Start Guide

Get your 11ty site deployed to AWS in minutes!

## 🚀 Deploy to AWS (Production)

### Step 1: AWS Setup (One-time)

1. **Create AWS OIDC Provider:**

   - Go to AWS Console → IAM → Identity Providers
   - Add Provider: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`

2. **Create IAM Role:**

   - Name: `GitHubActionsDeployRole` (or any name)
   - Trust policy: Allow GitHub Actions from your repository
   - Attach policy with permissions for S3, CloudFront, Lambda, CloudFormation, SSM

3. **Note the Role ARN:**
   ```
   arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsDeployRole
   ```

### Step 2: GitHub Configuration

1. **Add Secrets to GitHub:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Add `AWS_ROLE_ARN`: Your role ARN from Step 1
   - Add `AWS_REGION`: `us-east-1` (or your preferred region)

### Step 3: Deploy!

```bash
# Commit and push to main branch
git add .
git commit -m "Initial deployment setup"
git push origin main
```

**That's it!** 🎉

GitHub Actions will:

1. Build your site
2. Deploy to AWS using SST
3. Provide a CloudFront URL

Check the **Actions** tab in GitHub to see progress!

## 📋 What Gets Created

Your repository name automatically determines infrastructure naming:

**Repository: `your-username/my-blog`**

- SST App: `my-blog`
- S3 Bucket: `my-blog-production-website-...`
- CloudFront Distribution: Automatic
- SSL Certificate: Automatic (via ACM)

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
# Visit: http://localhost:8080

# Build for production
npm run build

# Deploy manually (requires AWS credentials)
npm run sst:deploy:prod
```

## 📝 Content Management

### Add a Blog Post

Create `src/posts/2024-10-16-my-post.md`:

```markdown
---
title: My New Post
published: true
date: 2024-10-16
layout: layouts/post.html
---

Your content here!
```

### Add a Page

Create `src/pages/contact.md`:

```markdown
---
title: Contact
permalink: /contact/
layout: layouts/base.html
---

Contact page content
```

### Use Alpine.js

Add `alpine: true` to frontmatter:

```markdown
---
title: Interactive Page
alpine: true
---

<div x-data="{ count: 0 }">
  <button @click="count++">Count: <span x-text="count"></span></button>
</div>
```

## 🎨 Customization

1. **Site Info:** Edit `src/_data/site.json`
2. **Styles:** Edit `src/assets/css/main.css`
3. **Domain:** Edit `sst.config.ts` to add custom domain

## 💡 Next Steps

- 📚 Read [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed AWS setup
- 📖 Check [DYNAMIC-COLLECTIONS.md](./docs/DYNAMIC-COLLECTIONS.md) for content types
- 🎯 See [README.md](./README.md) for full documentation

## ⚡ Common Commands

```bash
npm run dev          # Start dev server
npm run build        # Build site
npm run sst:deploy:prod  # Deploy to AWS
npm run sst:remove   # Remove AWS resources
```

## 🆘 Troubleshooting

### Deployment fails with "Access Denied"

- Check AWS_ROLE_ARN is correct
- Verify IAM role has proper permissions

### First deployment takes long (10+ min)

- Normal! CloudFront distribution creation is slow
- Next deployments will be much faster (1-2 min)

### Changes not showing

- Clear cache or wait a few minutes
- SST automatically invalidates CloudFront cache

## 💰 Costs

Typical monthly cost: **$2-10**

- S3 storage: ~$0.50
- CloudFront traffic: ~$1-5
- Most small sites stay in AWS free tier!

---

**Need help?** Check the full documentation in the `docs/` folder!
