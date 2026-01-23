import { Certificate } from '@/types';

export const certificates: Certificate[] = [
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    date: '2024',
    image: '/images/certificates/google-data.png',
    url: 'https://coursera.org/verify/google-data-analytics',
  },
  {
    id: 'python-basics',
    title: 'Python for Data Science and AI',
    issuer: 'IBM',
    date: '2023',
    image: '/images/certificates/python-ibm.png',
    url: 'https://coursera.org/verify/python-ibm',
  },
  {
    id: 'sql-advanced',
    title: 'Advanced SQL for Data Scientists',
    issuer: 'LinkedIn Learning',
    date: '2023',
    image: '/images/certificates/sql-advanced.png',
    url: '#',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    date: '2024',
    image: '/images/certificates/aws-cloud.png',
    url: '#',
  },
];
