import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import FinalCTA from '../components/FinalCTA';
import { A, Callout, H2, P } from '../components/ui/PostKit';
import { BOOKS, amazonSearchUrl, monthLabel } from '../lib/books';
import type { Book } from '../lib/books';

const TONES: Record<Book['tone'], string> = {
  blue: 'from-[#12306b] to-[#0b1a3d]',
  teal: 'from-[#0f4c4a] to-[#0a2a2b]',
  violet: 'from-[#3b2a7a] to-[#1c1442]',
  amber: 'from-[#7a4a12] to-[#3d260a]',
  rose: 'from-[#7a2a3b] to-[#3d1420]',
};

const bookSchema = (b: Book) => {
  const formats: Record<string, unknown>[] = [];
  if (b.kindle) {
    formats.push({ '@type': 'Book', bookFormat: 'https://schema.org/EBook', datePublished: b.kindle });
  }
  if (b.paperback) {
    formats.push({ '@type': 'Book', bookFormat: 'https://schema.org/Paperback', datePublished: b.paperback });
  }
  return {
    '@type': 'Book',
    name: b.title,
    ...(b.subtitle ? { alternativeHeadline: b.subtitle } : {}),
    ...(b.description ? { description: b.description } : {}),
    ...(b.cover ? { image: `https://akshay.website${b.cover}` } : {}),
    inLanguage: 'en',
    author: { '@type': 'Person', name: 'Akshay Mahajan', url: 'https://akshay.website/about' },
    publisher: { '@type': 'Organization', name: 'Amazon Kindle Direct Publishing' },
    ...(formats.length ? { workExample: formats } : {}),
  };
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Books by Akshay Mahajan',
  itemListElement: BOOKS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: bookSchema(b),
  })),
};

const Formats: React.FC<{ book: Book }> = ({ book }) => (
  <ul className="mt-4 flex flex-wrap gap-2 text-[13px]">
    {book.kindle && (
      <li className="rounded-full border border-border px-3 py-1 text-textSecondary">
        Kindle · {monthLabel(book.kindle)}
      </li>
    )}
    {book.paperback && (
      <li className="rounded-full border border-border px-3 py-1 text-textSecondary">
        Paperback · {monthLabel(book.paperback)}
      </li>
    )}
  </ul>
);

const BookCard: React.FC<{ book: Book }> = ({ book }) => (
  <article className="panel flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
    {book.cover ? (
      <img
        src={book.cover}
        alt={`Cover of ${book.title} by Akshay Mahajan`}
        width={420}
        height={672}
        loading="lazy"
        decoding="async"
        className="aspect-[5/8] w-full max-w-[150px] shrink-0 rounded-[4px] object-cover shadow-[0_10px_30px_-12px_rgba(15,23,42,0.45)] sm:w-[130px]"
      />
    ) : (
      <div
        aria-hidden="true"
        className={`flex aspect-[2/3] w-full max-w-[150px] shrink-0 items-end rounded-[4px] bg-gradient-to-b p-3 sm:w-[130px] ${TONES[book.tone]}`}
      >
        <span className="font-display text-[15px] font-bold leading-tight text-white">{book.title}</span>
      </div>
    )}
    <div className="min-w-0 flex-1">
      <h2 className="font-display text-[22px] font-bold leading-tight tracking-tightest text-text">
        {book.title}
      </h2>
      {book.subtitle && <p className="mt-1 text-[15px] leading-snug text-muted">{book.subtitle}</p>}
      {book.description && (
        <p className="mt-3 text-[16px] leading-[1.7] text-textSecondary">{book.description}</p>
      )}
      <Formats book={book} />
      <a
        href={amazonSearchUrl(book)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost mt-5 inline-flex items-center justify-center px-5 py-2.5 text-[14.5px] font-medium"
      >
        View on Amazon
      </a>
    </div>
  </article>
);

const Books: React.FC = () => (
  <PageTransition>
    <SEO schema={schema} />
    <PageHero
      eyebrow="Books"
      title="Practical self-help guides."
      lead="Short, plain-language books on overthinking, habits and boundaries, published on Amazon as Kindle eBooks and paperbacks."
    />
    <section className="relative pb-16 md:pb-24">
      <div className="container mx-auto max-w-shell px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mt-2 space-y-5">
              {BOOKS.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>
          </Reveal>

          <Reveal>
            <H2>About the books</H2>
            <P>
              Each book is written to be read in short sittings and put to use the same week: clear ideas,
              honest limits on what they can promise, and exercises or scripts you can try. They are
              self-help guides, not medical or psychological advice.
            </P>
            <P>
              The "View on Amazon" buttons open an Amazon search for the title and author. Prices and
              availability by country are shown on Amazon itself.
            </P>
            <Callout title="Also by the same author">
              I also build websites and automation for small businesses. See the{' '}
              <A to="/services">services</A> or read the <A to="/about">about page</A>.
            </Callout>
          </Reveal>
        </div>
      </div>
    </section>
    <FinalCTA />
  </PageTransition>
);

export default Books;
