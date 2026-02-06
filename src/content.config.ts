import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';


const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    /** Project title */
    title: z.string(),
    
    /** Your role in the project */
    role: z.string(),
    
    /** Year the project was completed */
    year: z.number(),
    
    /** Project duration (e.g., "3 months", "1.5 years") */
    duration: z.string().optional(),
    
    /** Team size for scope context */
    teamSize: z.number().optional(),
    
    /** Brief summary of outcomes and impact */
    outcomeSummary: z.string(),
    
    /** High-level project overview */
    overview: z.string(),
    
    /** Problem being addressed */
    problem: z.string(),
    
    /** Project constraints and limitations */
    constraints: z.array(z.string()),
    
    /** Solution approach and strategy */
    approach: z.string(),
    
    /** Key technical decisions with reasoning */
    keyDecisions: z.array(z.object({
      decision: z.string(),
      reasoning: z.string(),
      alternatives: z.array(z.string()).optional(),
    })),
    
    /** Technologies and frameworks used */
    techStack: z.array(z.string()),
    
    /** Project impact and results */
    impact: z.object({
      /** Quantitative metrics (optional) */
      metrics: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })).optional(),
      /** Qualitative impact description */
      qualitative: z.string(),
    }),
    
    /** Key learnings and takeaways */
    learnings: z.array(z.string()),
    
    /** Whether to feature on homepage */
    featured: z.boolean().default(false),
    
    /** Project status */
    status: z.enum(['completed', 'ongoing', 'archived']).default('completed'),
    
    /** Custom sort order (lower numbers first) */
    order: z.number().optional(),
    
    /** Related project slugs for cross-referencing */
    relatedProjects: z.array(z.string()).optional(),
    
    /** Related decision slugs for cross-referencing */
    relatedWriting: z.array(z.string()).optional(),
  }),
});

const writingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    /** Article title */
    title: z.string(),
    
    /** Article description for SEO and previews */
    description: z.string(),
    
    /** Original publication date */
    publishDate: z.coerce.date(),
    
    /** Last updated date (optional) */
    updatedDate: z.coerce.date().optional(),
    
    /** Tags for categorization */
    tags: z.array(z.string()).optional(),
    
    /** Whether the article is a draft (hidden from production) */
    draft: z.boolean().default(false),
  }),
});

const rantsCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/rants' }),
  schema: z.object({
    /** Rant title */
    title: z.string(),
    
    /** Date the rant was made */
    date: z.coerce.date(),
    
    /** Context and background for the rant */
    context: z.string(),
    
    /** The rant that was made */
    rant: z.string(),
    
    /** Reasoning behind the rant */
    reasoning: z.string(),
    
    /** Optional tags for categorization */
    tags: z.array(z.string()).optional(),
    
    /** Related project slugs for cross-referencing */
    relatedProjects: z.array(z.string()).optional(),
    
    /** Related rant slugs for cross-referencing */
    relatedRants: z.array(z.string()).optional(),
  }),
});

const notesCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    /** Date of the note */
    date: z.coerce.date(),
    
    /** Entry title */
    title: z.string(),
    
    /** Brief description */
    description: z.string(),
  }),
});

const usesCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/uses' }),
  schema: z.object({
    /** Category for grouping */
    category: z.enum(['tools', 'stack', 'environment']),
    
    /** List of items in this category */
    items: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().url().optional(),
    })),
    
    /** Sort order within category */
    order: z.number(),
  }),
});

export const collections = {
  projects: projectsCollection,
  notes: notesCollection,
  writing: writingCollection,
  uses: usesCollection,
  rants: rantsCollection,
};
