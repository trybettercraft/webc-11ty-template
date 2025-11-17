# 11ty Template with PagesCMS, GrapesJS & AlpineJS

A production-ready 11ty (Eleventy) template with pre-configured optimizations, content management, interactive components, and **automated AWS deployment**.

**🚀 [Quick Start Guide](./QUICKSTART.md)** | **📚 [AWS Deployment Guide](./docs/DEPLOYMENT.md)**

## Features

- **Dynamic Collections** - Collections auto-generated from `.pages.yml` - no code changes needed!
- **PagesCMS Integration** - Easy content management for pages, posts, and site settings
- **GrapesJS Support** - Design templates visually with Handlebars data injection
- **AlpineJS** - Lightweight JavaScript framework for interactive components
- **Modular Configuration** - Clean, maintainable plugin architecture
- **Image Optimization** - Automatic conversion to AVIF, WebP with responsive sizes
- **SEO Ready** - Sitemap generation and meta tags configured
- **RSS Feed** - Automatic RSS feed for blog posts
- **HTML Minification** - Optimized output for production
- **Modern CSS** - Mobile-responsive, customizable design system

## Directory Structure

```
11ty-template/
├── src/
│   ├── _data/              # Global data files (site.json)
│   ├── _includes/          # Layouts and templates
│   │   └── layouts/        # Base and post layouts
│   ├── posts/              # Blog posts (managed by PagesCMS)
│   ├── pages/              # Site pages (managed by PagesCMS)
│   ├── media/              # Media files (managed by PagesCMS)
│   ├── assets/             # Static assets (CSS, JS, fonts)
│   └── grapesjs-templates/ # GrapesJS exported templates
├── config/
│   ├── plugins/            # Plugin modules (image, rss, sitemap, minify)
│   ├── collections.js      # Collections configuration
│   ├── filters.js          # Template filters
│   └── passthroughs.js     # Asset copying & watch targets
├── .pages.yml              # PagesCMS configuration
├── eleventy.config.js      # 11ty main configuration
└── package.json            # Dependencies
```

## Getting Started

### Using This Template

This is a GitHub template repository. Click the **"Use this template"** button at the top of the repository to create your own copy.

### 1. Installation

```bash
npm install
```

### 2. Development

```bash
npm run dev
```

This will start the 11ty development server with live reload at `http://localhost:8080`.

### 3. Build for Production

```bash
npm run build
```

The static site will be generated in the `_site` directory.

## Using PagesCMS

PagesCMS is configured in `.pages.yml` with the following content types:

### Posts Collection

Create blog posts at `src/posts/`. Each post should have:

```yaml
---
title: Your Post Title
published: true
date: 2024-01-15
layout: layouts/post.html
---
Your content here...
```

### Pages Collection

Create static pages at `src/pages/`:

```yaml
---
title: Page Title
permalink: /page-url/
layout: layouts/base.html
---
Your page content...
```

### Site Settings

Edit global site settings in `src/_data/site.json`:

```json
{
  "title": "Your Site Title",
  "description": "Site description",
  "url": "https://yoursite.com",
  "cover": "/media/cover.jpg"
}
```

## Working with GrapesJS

### Designing Templates

1. Use GrapesJS to design your page layouts visually
2. Use Handlebars syntax for dynamic content: `{{ site.title }}`, `{{ title }}`
3. Add AlpineJS directives directly to elements: `x-data`, `x-show`, `x-if`
4. Export the HTML from GrapesJS

### Data Sources Integration

Configure GrapesJS with data sources for live preview:

```javascript
editor.DataSources.add({
  id: "site-data",
  records: [
    { title: "{{ site.title }}", description: "{{ site.description }}" },
  ],
});
```

### Saving Templates

Save exported GrapesJS templates to:

- `src/_includes/layouts/` for layout templates
- `src/grapesjs-templates/` for template storage

See `src/grapesjs-templates/README.md` for detailed GrapesJS integration guide.

## AlpineJS Interactive Elements

### Creating Interactive Elements

Add Alpine.js directly in your templates using directives:

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Content</div>
</div>
```

### Common Directives

- `x-data` - Define component state
- `x-show` - Toggle visibility
- `x-if` - Conditional rendering
- `@click` - Handle click events
- `x-text` - Dynamic text binding
- `x-model` - Two-way data binding

### AlpineJS in GrapesJS

When designing in GrapesJS, you can add Alpine directives as attributes:

- `x-data` for component state
- `x-show` for conditional visibility
- `@click` for event handlers
- `x-text` for dynamic text binding

## Image Optimization

Images are automatically optimized on build:

```html
<img src="https://example.com/image.jpg" alt="Description" />
```

Will be transformed to:

```html
<picture>
  <source type="image/avif" srcset="..." />
  <source type="image/webp" srcset="..." />
  <img src="..." loading="lazy" decoding="async" />
</picture>
```

## Customization

### Styling

Edit `src/assets/css/main.css` to customize:

- CSS variables for colors and spacing
- Component styles
- Layout and typography

### Configuration

The configuration is modularized for better maintainability:

#### Main Configuration

- `eleventy.config.js` - Main entry point that imports all modules

#### Plugin Modules (`config/plugins/`)

- `image.js` - Image optimization settings
- `rss.js` - RSS feed configuration
- `sitemap.js` - Sitemap generation (update hostname here)
- `minify.js` - HTML minification settings

#### Other Modules

- `config/collections.js` - Add custom collections
- `config/filters.js` - Register new filters
- `config/passthroughs.js` - Asset copying & watch targets

### Site Settings

1. Update the sitemap hostname in `config/plugins/sitemap.js`:

```javascript
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://yoursite.com", // Change this to your domain
    },
  });
}
```

2. Update site information in `src/_data/site.json`:

```json
{
  "title": "Your Site Title",
  "description": "Site description",
  "url": "https://yoursite.com"
}
```

## Deployment

### AWS Deployment (Recommended)

This template includes automated AWS deployment using SST (Serverless Stack):

**Features:**

- 🏷️ Tag-based deployments (`deploy-*` tags trigger production)
- ⚡ Build caching for faster deployments (2-3 min after first deploy)
- 📦 Infrastructure automatically named after your repository
- 🌐 CloudFront CDN with global distribution
- 🔒 HTTPS by default with automatic SSL certificates
- 💰 Pay-as-you-go pricing (typically $2-10/month)

**Quick Deploy:**

```bash
# Use the deploy script
npm run deploy

# Or create a tag manually
git tag -a deploy-v1.0.0 -m "Deploy version 1.0.0"
git push origin deploy-v1.0.0
```

**Setup:**

1. Configure AWS OIDC and IAM role (see [DEPLOYMENT.md](./docs/DEPLOYMENT.md))
2. Add GitHub secrets:
   - `AWS_BUILD_PIPELINE_ROLE_ARN`: Your IAM role ARN
   - `AWS_ORG_REGION`: AWS region (optional, defaults to us-east-1)
3. Run `npm run deploy` or push a `deploy-*` tag!

📚 **[Full Guide](./docs/DEPLOYMENT.md)** | 🏷️ **[Tag Deployment](./docs/TAG-DEPLOYMENT.md)** | 🚀 **[Quick Start](./DEPLOY.md)**

### Other Hosting Providers

This template also works with any static hosting provider:

**GitHub Pages / Netlify / Vercel / Cloudflare Pages:**

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `_site`

## Collections

### Dynamic Collections from .pages.yml

Collections are **automatically generated** from your `.pages.yml` configuration! No code changes needed to add new content types.

#### Default Behavior

**All collections automatically:**

- ✅ Filter out items with `published: false`
- ✅ Sort by last updated date (newest first)
- ✅ Customizable with optional `sortBy` and `sortOrder` fields

#### Using Collections

Access collections in templates:

```html
{% for post in collections.posts %}
<h2>{{ post.data.title }}</h2>
<time>{{ post.date | readableDate }}</time>
{% endfor %}
```

#### Adding New Collections

Simply add to `.pages.yml`:

```yaml
content:
  - name: recipes # Becomes collections.recipes
    type: collection
    path: "src/recipes"
    sortBy: title # Optional (default: "date")
    sortOrder: asc # Optional (default: "desc")
    fields:
      - name: title
        type: string
      - name: published
        type: boolean
        default: true
```

Create `src/recipes/` directory and add markdown files - that's it!

**📚 For detailed documentation, see [docs/DYNAMIC-COLLECTIONS.md](./docs/DYNAMIC-COLLECTIONS.md)**

### Available Collections

- `collections.posts` - Blog posts
- `collections.pages` - Static pages

All collections filter by `published` status and sort by date (newest first) by default.

## Filters

Available template filters:

- `readableDate` - Format dates as "January 15, 2024"
- `htmlDateString` - Format dates as "2024-01-15" for datetime attributes

## Resources

- [11ty Documentation](https://www.11ty.dev/docs/)
- [PagesCMS](https://pagescms.org/)
- [GrapesJS Documentation](https://grapesjs.com/docs/)
- [AlpineJS Documentation](https://alpinejs.dev/)

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
