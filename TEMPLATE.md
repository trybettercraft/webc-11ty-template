# Setting Up Your New Site from This Template

Congratulations on using this 11ty template! Follow these steps to customize it for your project.

## Initial Setup Checklist

### 1. Clone Your New Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

### 2. Update Site Information

Edit `src/_data/site.json`:

```json
{
  "title": "Your Site Name",
  "description": "Your site description",
  "url": "https://yourdomain.com",
  "author": "Your Name",
  "cover": "/media/your-cover-image.jpg"
}
```

### 3. Configure SEO Settings

Update `config/plugins/sitemap.js` with your domain:

```javascript
hostname: "https://yourdomain.com";
```

### 4. Customize Package Information

Edit `package.json`:

```json
{
  "name": "your-project-name",
  "description": "Your project description",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-repo"
  }
}
```

### 5. Replace Example Content

- Delete example posts in `src/posts/`
- Update or delete `src/pages/about.md`
- Replace favicon and images in `src/media/`
- Customize CSS in `src/assets/css/main.css`

### 6. Configure PagesCMS (Optional)

If using PagesCMS, update `.pages.yml` with your repository details.

### 7. Test Your Site

```bash
# Development mode
npm run dev

# Production build
npm run build
```

### 8. Deploy

Choose your hosting provider and set:

- **Build command**: `npm run build`
- **Publish directory**: `_site`

Popular options:

- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## What to Customize

### Essential

- [ ] Site title, description, and URL in `src/_data/site.json`
- [ ] Sitemap hostname in `config/plugins/sitemap.js`
- [ ] Package.json metadata
- [ ] Delete example posts
- [ ] Add your own content

### Design

- [ ] CSS variables in `src/assets/css/main.css`
- [ ] Layouts in `src/_includes/layouts/`
- [ ] Favicon and images in `src/media/`

### Optional

- [ ] Add Google Analytics or other tracking
- [ ] Configure custom domain
- [ ] Set up PagesCMS for content management
- [ ] Add more collections or filters in `config/`

## Need Help?

Refer to the main [README.md](./README.md) for detailed documentation on features and configuration.

## Template Updates

To get updates from the original template:

```bash
# Add the template as a remote
git remote add template https://github.com/trybettercraft/11ty-template.git

# Fetch template updates
git fetch template

# Merge updates (review changes carefully)
git merge template/main --allow-unrelated-histories
```

---

**Happy building!** 🚀
