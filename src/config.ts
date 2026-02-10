/**
 * Helper function to get environment variable with fallback
 * 
 * Safely retrieves environment variables with a default fallback value.
 * Uses nullish coalescing to handle undefined values.
 * 
 * @param key - Environment variable key (e.g., 'SITE_URL')
 * @param fallback - Default value if environment variable is not set
 * @returns Environment variable value or fallback
 */
const getEnv = (key: string, fallback: string = ''): string => {
  return import.meta.env[key] ?? fallback;
};

/**
 * Site configuration object
 * 
 * Centralized configuration loaded from environment variables with sensible defaults.
 * All values are loaded at build time and are type-safe throughout the application.
 * 
 * @constant
 */
export const siteConfig = {
  /**
   * Site URL (required for sitemap, canonical URLs, OG tags)
   * 
   * Should be the full production URL without trailing slash.
   * Example: 'https://example.com'
   */
  url: getEnv('SITE_URL', 'https://kayode0x.com'),
  
  /**
   * Site language (ISO 639-1 code)
   * 
   * Two-letter language code for HTML lang attribute and SEO.
   * Examples: 'en', 'id', 'es', 'fr'
   */
  language: getEnv('SITE_LANGUAGE', 'en'),
  
  /**
   * Site title
   * 
   * Used as fallback when page-specific title is not provided.
   */
  title: getEnv('SITE_TITLE', 'Kayode O. - Software Engineer'),
  
  /**
   * Site description
   * 
   * Default meta description for SEO and social sharing.
   */
  description: getEnv('SITE_DESCRIPTION', 'Software engineer focused on backend development, mobile apps, and automotive technology.'),
  
  /**
   * Author information
   * 
   * Personal details used throughout the site for attribution,
   * contact information, and structured data.
   */
  author: {
    /** Full name */
    name: getEnv('SITE_AUTHOR_NAME', 'Kayode O.'),
    
    /** Professional title or role */
    title: getEnv('SITE_AUTHOR_TITLE', 'Software Engineer'),
    
    /** Short biography or professional summary */
    bio: getEnv('SITE_AUTHOR_BIO', 'Software Engineer specializing in building scalable backend systems and mobile applications. I build what I wish existed, including car projects + lessons learned along the way.'),
    
    /** Contact email address */
    email: getEnv('SITE_AUTHOR_EMAIL', '[redacted]@kayode0x.com'),
    
    /** Location (optional, empty string to hide) */
    location: getEnv('SITE_AUTHOR_LOCATION', ''),
  },
  
  /**
   * Social media links
   * 
   * Set to empty string to hide a specific platform.
   * Only configured (non-empty) links will be displayed.
   */
  social: {
    /** GitHub profile URL */
    github: getEnv('SOCIAL_GITHUB', ''),
    
    /** LinkedIn profile URL */
    linkedin: getEnv('SOCIAL_LINKEDIN', ''),
    
    /** Instagram profile URL */
    instagram: getEnv('SOCIAL_INSTAGRAM', ''),

    /** Twitter/X profile URL */
    twitter: getEnv('SOCIAL_TWITTER', ''),
  },
  
  /**
   * Navigation links
   * 
   * Main site navigation structure. Order determines display order in the nav bar.
   * Add or remove items to customize navigation.
   */
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Writing', href: '/writing' },
    { label: 'Rants', href: '/rants' },
    { label: 'Notes', href: '/notes' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;

/**
 * Type export for the entire site configuration
 * 
 * Use this type when you need to reference the full config structure.
 */
export type SiteConfig = typeof siteConfig;

/**
 * Type export for social links object
 * 
 * Use this type when working specifically with social media links.
 */
export type SocialLinks = typeof siteConfig.social;

/**
 * Type export for a single navigation item
 * 
 * Use this type when working with individual nav items.
 */
export type NavItem = typeof siteConfig.nav[number];
