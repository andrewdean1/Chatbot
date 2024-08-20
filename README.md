# OpenAI-driven Chatbot with Next.js

<div align="center">
  <h2>OpenAI-driven Chatbot with Next.js</h2>
  <p>Next.js + Tailwind CSS + TypeScript packed with useful development features.</p>
  <p>Made by <a href="https://www.linkedin.com/in/andrewdean-">Andrew Dean</a></p>
  <p>Sourced starter code from <a href="https://theodorusclarence.com">Theodorus Clarence</a></p>
</div>

## Overview

This application is an OpenAI-driven chatbot built with Next.js, TypeScript, and Tailwind CSS. It provides a user-friendly interface for interacting with an AI assistant powered by OpenAI's GPT-3.5 model. The application features a responsive design, smooth page transitions, and integration with Supabase for data storage.

Key Features:

- Interactive chat interface
- Chat freely with the OpenAI GPT-3.5 model
- Smooth page transitions using Framer Motion
- Responsive design with Tailwind CSS
- Stores each chat interaction in a Supabase database

## Utilities

- Next.js 14 with App Router
- React 18
- Typescript
- Tailwind CSS 3
- Jest - Configured for unit testing
- Prettier Formatting
- Husky & Lint Staged
- Conventional Commit Lint

## Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/andrewdean1/Chatbot.git
   cd Chatbot
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:

   ```
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Enjoy!
