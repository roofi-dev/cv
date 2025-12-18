# Personal CV Website

A modern, animated CV/Portfolio website built with Astro, Tailwind CSS, GSAP + ScrollTrigger, and Sanity CMS.

## Features

- **Astro** - Fast, modern static site generator
- **Tailwind CSS v4** - Utility-first CSS framework
- **GSAP + ScrollTrigger** - Smooth scroll-based animations
- **Dark Mode Toggle** - System preference detection with manual toggle
- **Sanity CMS** - Headless CMS for content management
- **LottieFiles** - Beautiful animated illustrations
- **Responsive Design** - Mobile-first approach

## Project Structure

```text
/
├── public/
│   └── favicon.svg
├── sanity/
│   └── schemas/          # Sanity CMS schemas
├── src/
│   ├── components/       # Astro components
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── sanity.ts     # Sanity client & queries
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .env.example
└── package.json
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### 3. (Optional) Setup Sanity CMS

To manage your content via Sanity CMS:

1. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` to `.env` and fill in your Sanity credentials:

```bash
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
```

3. Initialize Sanity Studio in a separate folder:

```bash
npm create sanity@latest -- --project-id YOUR_PROJECT_ID --dataset production
```

4. Copy the schemas from `sanity/schemas/` to your Sanity Studio project

5. Deploy your Sanity Studio and start adding content!

**Note:** The website works without Sanity - it uses fallback demo data if CMS is not configured.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installs dependencies                       |
| `npm run dev`     | Starts local dev server at `localhost:4321` |
| `npm run build`   | Build your production site to `./dist/`     |
| `npm run preview` | Preview your build locally, before deploying|

## Customization

### Updating Content (Without CMS)

Edit the fallback data in `src/lib/sanity.ts`:
- `getPersonalInfo()` - Your name, title, bio, contact info
- `getSkills()` - Your technical skills
- `getExperiences()` - Work experience
- `getProjects()` - Portfolio projects
- `getEducation()` - Education history

### Styling

- Colors and theme: `src/styles/global.css` (in `@theme` block)
- Component styles: Individual `.astro` files

### Animations

GSAP animations are defined in each component's `<script>` section. Modify timing, easing, and effects as needed.

## Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com) - CSS Framework
- [GSAP](https://greensock.com/gsap/) - Animation Library
- [Sanity](https://www.sanity.io) - Headless CMS
- [LottieFiles](https://lottiefiles.com) - Animated Illustrations

## License

MIT
