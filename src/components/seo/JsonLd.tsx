interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  sameAs?: string[];
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs = [],
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    image,
    sameAs,
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Bandırma 17 Eylül Üniversitesi',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Anadolu Üniversitesi',
      },
    ],
    knowsAbout: [
      'Python',
      'Data Analysis',
      'SQL',
      'Web Development',
      'React',
      'Automation',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebSiteSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function WebSiteSchema({ name, description, url }: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
