# GitScribe

AI-generated pull request descriptions from your git diff.

GitScribe is a developer productivity tool that automatically generates structured GitHub Pull Request descriptions using AI. Instead of manually writing summaries of your changes, you can paste a git diff and GitScribe will generate a clean PR description including summaries, change breakdowns, testing notes, and potential risks.

GitScribe is currently in public beta and focused on helping developers ship better PRs faster.

## Why GitScribe

Writing pull request descriptions is repetitive and time-consuming.

Most developers end up writing something like:

> "misc fixes"

or copy-pasting commit messages.

GitScribe converts your actual code changes into a structured PR description so reviewers can quickly understand:

- What changed
- Why it changed
- How to test it
- Any risks introduced

This improves code review speed and clarity.

## Example Workflow

Developer workflow with GitScribe:

1. `git diff origin/main`
2. Copy the diff and paste it into GitScribe.
3. GitScribe analyzes the changes and generates a PR description like:

```
## Summary
Implements rate limiting using Redis to prevent excessive API usage.

## Changes
- Added Redis client configuration
- Implemented rate limiting middleware
- Updated API route to enforce request limits

## Testing
- Verified rate limit triggers after 20 requests
- Confirmed Redis key expiration works correctly

## Risks
Minimal. Limited to API request handling.
```

The generated text can then be pasted directly into the GitHub PR description.

## Current Features

- GitHub OAuth authentication
- AI-generated PR descriptions
- Structured output for consistent pull requests
- Daily request limits to ensure fair usage
- Clean developer-focused UI

## Tech Stack

GitScribe is built using a modern serverless architecture.

**Frontend**
- Next.js (App Router)
- Tailwind CSS

**Authentication**
- NextAuth
- GitHub OAuth

**Backend**
- Next.js API routes
- Gemini API (Google Generative AI)

**Infrastructure**
- Vercel (hosting)
- Upstash Redis (rate limiting)

## Architecture Overview

```
User
  ↓
Next.js Frontend
  ↓
NextAuth (GitHub OAuth)
  ↓
API Route /generate
  ↓
Rate Limit Check (Upstash Redis)
  ↓
Gemini AI
  ↓
Generated PR Description
```

The system is fully serverless and designed to scale without managing infrastructure.

## Rate Limiting (Beta)

To prevent abuse during the beta phase, GitScribe enforces a daily generation limit.

**Current limit:** 20 PR generations per user per day

This limit may change based on usage patterns and infrastructure scaling.

## Local Development

Clone the repository:

```bash
git clone https://github.com/your-username/gitscribe.git
cd gitscribe
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env.local
```

Add the following variables:

```
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret

GEMINI_API_KEY=your_gemini_api_key

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

Run the development server:

```bash
npm run dev
```

The application will start at: `http://localhost:3000`

## Deployment

GitScribe is deployed on Vercel.

Steps for deployment:

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add required environment variables in Vercel settings
4. Deploy

Make sure to update the following in production:

```
NEXTAUTH_URL=https://your-domain.vercel.app
```

GitHub OAuth callback must be set to:

```
https://your-domain.vercel.app/api/auth/callback/github
```

## Beta Status

GitScribe is currently in public beta.

During this phase we are focused on:

- Gathering feedback from developers
- Improving PR generation accuracy
- Optimizing performance and cost efficiency
- Expanding GitHub integrations

Expect rapid iteration and frequent improvements.

## Roadmap

Planned improvements include:

**GitHub Integration**
Automatically fetch PR diffs from GitHub instead of manual copy/paste.

**Chrome Extension**
Generate PR descriptions directly inside the GitHub Pull Request page.

**PR History**
Allow users to view previously generated PR descriptions.

**Team Features**
Enable teams to standardize PR templates and generation rules.

**Custom Templates**
Support organization-specific PR formats. Example:

```
Summary
Changes
Testing
Screenshots
Checklist
```

**Usage Analytics**
Track usage patterns to improve the AI model and product features.

**Paid Plans**
Introduce pricing tiers for higher usage limits and advanced features.

## Security

GitScribe does not store repository code permanently.

Code diffs submitted to the generator are:

- Processed temporarily for AI generation
- Not persisted in long-term storage
- Not shared with third parties beyond the AI model provider

Future updates will include additional privacy controls.

## Contributing

Contributions are welcome.

If you'd like to improve GitScribe:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Please open an issue before making large architectural changes.

## Feedback

GitScribe is actively evolving and feedback from developers is extremely valuable.

If you encounter issues or have feature suggestions, please open an issue in the repository.

## License

MIT License

---

**Built For Developers**

GitScribe was created to remove friction from the code review process and help developers communicate changes more effectively.
