import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '../../layouts/PublicLayout';
import { mockBlogPosts } from '../../data/mock';
import { getUserById } from '../../data/users';
import { formatDate, getInitials } from '../../utils';
import { NotFoundPage } from '../NotFoundPage';
import { Clock, Eye, ChevronRight, ArrowLeft, BookOpen, Tag } from 'lucide-react';
import { ArticleCard } from '../../components/ui/ArticleCard';

// Expanded article content keyed by slug
const articleContent: Record<string, string> = {
  'getting-started-with-llms': `
## Introduction

Large Language Models (LLMs) have transformed the way we think about AI. As a college student, you don't need a PhD to start experimenting — you just need curiosity and a laptop.

## What Is an LLM?

An LLM is a neural network trained on massive amounts of text to predict and generate language. Models like GPT-4, Claude, and Gemini power everything from chatbots to code generators.

## Step 1: Understand the Basics

Before diving into code, grasp these core concepts:

- **Tokens**: LLMs process text as chunks called tokens, not characters or words
- **Context window**: The maximum amount of text a model can "see" at once
- **Temperature**: Controls creativity — higher values = more random outputs
- **Prompt engineering**: The art of crafting inputs to get better outputs

## Step 2: Set Up Your Environment

\`\`\`bash
pip install openai python-dotenv
\`\`\`

Create a \`.env\` file:
\`\`\`
OPENAI_API_KEY=your_key_here
\`\`\`

## Step 3: Your First API Call

\`\`\`python
import openai
from dotenv import load_dotenv
import os

load_dotenv()
client = openai.OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful study assistant."},
        {"role": "user", "content": "Explain recursion in simple terms."}
    ]
)

print(response.choices[0].message.content)
\`\`\`

## Step 4: Build Something Useful

Try these beginner projects:

1. **Study Q&A bot** — answers questions from your notes
2. **Essay feedback tool** — critiques writing style and structure
3. **Code explainer** — paste code and get explanations in plain English

## Tips for College Students

- Use free tiers (OpenAI, Google Gemini, Groq) to stay within budget
- Explore open-source models like Llama 3 via Ollama for offline use
- Join the club's AI study group for hands-on sessions

## Conclusion

LLMs are no longer just for researchers. With just a few lines of Python, you can build powerful AI-powered tools. Start small, experiment often, and share what you learn with the club!
  `,
  'smart-attendance-system-case-study': `
## The Problem

Manual attendance was taking up to 10 minutes of every class, encouraging proxy marking, and leaving faculty with no reliable analytics. We wanted to fix this — for good.

## Our Approach

We started by talking to 12 faculty members across 4 departments. Their core needs: automation, reliability, and minimal hardware cost.

## Architecture

Our stack:
- **Raspberry Pi 4** as the edge compute unit per classroom
- **OpenCV** for face detection and recognition
- **RFID reader** as a backup verification method
- **FastAPI** backend with PostgreSQL
- **React** dashboard for faculty

## Month 1: Proof of Concept

We got face detection working in 3 days using pre-trained Haar cascades, then switched to a more accurate dlib model by week 2. The RFID reader was wired in by day 18.

## Month 2: Backend and Integration

The biggest challenge was the ERP integration. We had to reverse-engineer the college portal's API (with permission!) to push attendance data in real-time.

## Month 3: Testing and Deployment

We ran a 3-week pilot in Lab 301 with Dr. Meena Iyer's permission. Accuracy was 94.7% — better than we expected.

## Key Lessons

1. Talk to users before writing a single line of code
2. Perfect is the enemy of shipped — our v1 had no dashboard at all
3. Privacy matters — we stored face embeddings, never raw images
4. Hardware fails. Always have a backup plan (hence the RFID)

## Current Status

The system is now live in 3 classrooms. We're working on the faculty analytics dashboard. Check our GitHub for the full source code!
  `,
  'top-open-source-projects-beginners': `
## Why Contribute to Open Source?

Contributing to open source is the fastest way to level up as a developer. You get real code review, collaborate with engineers worldwide, and build a portfolio that speaks for itself.

## The 10 Projects

### 1. First Contributions
The starter repository for all beginners. Your first task: add your name to a list. Simple, but it teaches the pull request workflow.

### 2. freeCodeCamp
Massive educational platform with thousands of issues labeled "good first issue". Great if you know JavaScript.

### 3. Mozilla Firefox
Surprisingly beginner-friendly for certain areas. They have a detailed contributor guide and a welcoming IRC community.

### 4. Exercism
A platform for coding practice. You can contribute exercises in your language of choice.

### 5. OpenFarm
A crop database for farmers. Built with Ruby on Rails — great for backend learners.

### 6. Mattermost
An open-source Slack alternative. Active community, lots of frontend issues.

### 7. Habitica
A gamified habit tracker. Fun codebase, great for JavaScript developers.

### 8. Public APIs
A repository of public APIs organized into categories. Great for documentation contributions.

### 9. Codecombat
A game that teaches programming. Contribute levels, courses, or translations.

### 10. Club Projects (This Platform!)
Don't forget — the IT Club's own tools are open source. Contributing here directly impacts your college community!

## How to Get Started Today

1. Pick one project from this list
2. Read their CONTRIBUTING.md
3. Find an issue labeled "good first issue"
4. Fork, clone, make your change, submit a PR
5. Celebrate your first contribution! 🎉
  `,
  'react-19-features': `
## React 19 is Here

After years of anticipation, React 19 brings some of the most significant changes to the library since hooks. Here's what you need to start using today.

## 1. The React Compiler

The biggest addition — an automatic memoization compiler. You can delete most of your \`useMemo\`, \`useCallback\`, and \`memo\` wrappers. The compiler handles it.

\`\`\`jsx
// React 18: manual optimization
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

// React 19: just write normal code
const value = computeExpensive(a, b); // compiler handles it
\`\`\`

## 2. Actions

A new pattern for handling form submissions and async operations. Forms can now directly call async functions.

\`\`\`jsx
async function updateName(formData) {
  'use server';
  await db.users.update({ name: formData.get('name') });
}

<form action={updateName}>
  <input name="name" />
  <button type="submit">Update</button>
</form>
\`\`\`

## 3. New Hooks

- **useActionState** — manage state for form actions
- **useOptimistic** — show optimistic UI updates before server confirmation
- **useFormStatus** — access parent form's pending state

## 4. Improved Error Handling

React 19 adds better error boundaries and improved hydration error messages. No more cryptic "Text content did not match" errors without context.

## 5. Document Metadata

You can now render \`<title>\`, \`<meta>\`, and \`<link>\` tags anywhere in your tree and React will hoist them to \`<head>\`:

\`\`\`jsx
function BlogPost({ title }) {
  return (
    <article>
      <title>{title}</title>
      <meta name="description" content="..." />
      <h1>{title}</h1>
    </article>
  );
}
\`\`\`

## Getting Started

\`\`\`bash
npm install react@19 react-dom@19
\`\`\`

The ecosystem is rapidly catching up — most major libraries already support React 19.
  `,
};

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFoundPage />;

  const author = getUserById(post.authorId);
  const content = articleContent[post.slug] ?? post.content;
  const related = mockBlogPosts.filter((p) => p.id !== post.id && p.tags.some((t) => post.tags.includes(t))).slice(0, 2);

  // Simple markdown-ish renderer
  function renderContent(md: string) {
    const lines = md.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let codeLines: string[] = [];
    let inCode = false;
    let codeKey = 0;

    const flushList = (key: string) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} style={{ paddingLeft: 20, marginBottom: 16 }}>
            {listItems.map((li, i) => (
              <li key={i} style={{ fontSize: 15, color: 'var(--color-text)', lineHeight: 1.7, marginBottom: 4 }}
                dangerouslySetInnerHTML={{ __html: formatInline(li) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCode) {
          elements.push(
            <pre key={`code-${codeKey++}`} style={{ background: 'var(--color-primary)', color: '#E2E8F0', padding: '16px 20px', borderRadius: 10, overflowX: 'auto', marginBottom: 20, fontSize: 13, lineHeight: 1.6 }}>
              <code>{codeLines.join('\n')}</code>
            </pre>
          );
          codeLines = [];
          inCode = false;
        } else {
          flushList(String(i));
          inCode = true;
        }
        return;
      }
      if (inCode) { codeLines.push(line); return; }
      if (line.startsWith('## ')) {
        flushList(String(i));
        elements.push(<h2 key={i} style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10, marginTop: 28 }}>{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        flushList(String(i));
        elements.push(<h3 key={i} style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)', marginBottom: 8, marginTop: 20 }}>{line.slice(4)}</h3>);
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        listItems.push(line.slice(2));
      } else if (line.trim() === '') {
        flushList(String(i));
      } else {
        flushList(String(i));
        elements.push(<p key={i} style={{ fontSize: 15, color: 'var(--color-text)', lineHeight: 1.8, marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />);
      }
    });
    flushList('end');
    return elements;
  }

  function formatInline(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:#F1F5F9;padding:2px 6px;border-radius:4px;font-size:13px;color:#17365D">$1</code>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  return (
    <PublicLayout>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '32px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
          <Link to="/learn" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Learn</Link>
          <ChevronRight size={14} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{post.title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            <span className="badge" style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>{post.category}</span>
            {post.featured && <span className="badge" style={{ background: '#FFFBEB', color: '#F59E0B' }}>⭐ Featured</span>}
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.25, marginBottom: 16 }}>{post.title}</h1>
          <p style={{ fontSize: 16, color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                {author ? getInitials(author.name) : '?'}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{author?.name ?? 'Unknown Author'}</p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{author?.department}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: 'var(--color-text-secondary)' }}>
              <span>{formatDate(post.publishedAt)}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} /> {post.readingTime} min read</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Eye size={13} /> {post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: 'var(--color-border)', marginBottom: 32 }} />

        {/* Article Body */}
        <article style={{ marginBottom: 48 }}>
          {renderContent(content)}
        </article>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          <Tag size={14} style={{ color: 'var(--color-text-secondary)', marginTop: 2 }} />
          {post.tags.map((tag) => (
            <span key={tag} className="badge" style={{ background: 'var(--color-bg)' }}>{tag}</span>
          ))}
        </div>

        <hr style={{ borderColor: 'var(--color-border)', marginBottom: 32 }} />

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={18} style={{ color: 'var(--color-accent)' }} /> Related Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {related.map((p) => <ArticleCard key={p.id} post={p} href={`/learn/${p.slug}`} />)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <Link to="/learn">
            <button className="btn btn-ghost btn-sm" style={{ gap: 6 }}><ArrowLeft size={14} /> Back to Knowledge Hub</button>
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}
