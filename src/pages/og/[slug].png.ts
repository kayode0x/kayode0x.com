import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection('writing', ({ data }) => {
    return data.draft === false;
  });

  return articles.map((article) => ({
    params: { slug: article.id },
    props: {
      title: article.data.title,
      description: article.data.description,
      publishDate: article.data.publishDate,
    },
  }));
};

async function getInterFont(): Promise<ArrayBuffer> {
  const response = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf'
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Inter Regular: ${response.status}`);
  }
  return response.arrayBuffer();
}

async function getInterBoldFont(): Promise<ArrayBuffer> {
  const response = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch Inter Bold: ${response.status}`);
  }
  return response.arrayBuffer();
}

function getFaviconBase64(): string {
  const faviconPath = join(process.cwd(), 'public', 'favicon-192x192.png');
  const faviconBuffer = readFileSync(faviconPath);
  return `data:image/png;base64,${faviconBuffer.toString('base64')}`;
}

function getBackgroundBase64(): string {
  const bgPath = join(process.cwd(), 'src', 'assets', 'base-og.png');
  const bgBuffer = readFileSync(bgPath);
  return `data:image/png;base64,${bgBuffer.toString('base64')}`;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description, publishDate } = props as {
    title: string;
    description: string;
    publishDate: Date;
  };

  const [interRegular, interBold] = await Promise.all([
    getInterFont(),
    getInterBoldFont(),
  ]);

  const faviconBase64 = getFaviconBase64();
  const backgroundBase64 = getBackgroundBase64();

  const truncatedDesc = description.length > 150
    ? description.slice(0, 150) + '...'
    : description;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          {
            type: 'img',
            props: {
              src: backgroundBase64,
              width: 1200,
              height: 900,
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                objectFit: 'cover',
                objectPosition: 'top',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
              },
            },
          },
          {
            type: 'img',
            props: {
              src: faviconBase64,
              width: 56,
              height: 56,
              style: {
                borderRadius: '10px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '20px',
                maxWidth: '850px',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: title.length > 45 ? '48px' : '56px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      letterSpacing: '-0.025em',
                      margin: 0,
                    },
                    children: title,
                  },
                },
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#d4d4d4',
                      lineHeight: 1.5,
                      margin: 0,
                    },
                    children: truncatedDesc,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#d4d4d4',
                      fontWeight: 400,
                    },
                    children: formatDate(publishDate),
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: interBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(new Uint8Array(pngBuffer), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
