'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import UnstyledLink from '@/components/links/UnstyledLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * Can override the next-env to change type
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  const router = useRouter();

  return (
    <section className='min-h-screen bg-gradient-to-b from-primary-200 to-primary-500 flex items-center justify-center px-4'>
      <div className='max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center'>
        <Image
          src='/favicon/android-chrome-512x512-removebg-preview.png'
          alt='Chatbot Logo'
          width={512}
          height={512}
          className='w-36 h-36 mx-auto mb-2'
        />
        <h1 className='font-inter font-light text-primary-50 text-5xl mb-4'>
          Welcome
        </h1>
        <p className='mb-8 text-xl font-inter font-light text-primary-100'>
          To a Personalized Chatbot!
        </p>
        <button
          onClick={() => router.push('/chat')}
          className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-lg font-medium text-primary-200 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'
        >
          <span className='relative px-8 py-3 transition-all ease-in duration-200 bg-white dark:bg-primary-400 rounded-full group-hover:bg-opacity-0'>
            Get Started
          </span>
        </button>

        <footer className='mt-12 text-primary-50 text-sm space-y-2'>
          <p>
            © {new Date().getFullYear()} By{' '}
            <ArrowLink
              as={UnstyledLink}
              href='https://github.com/andrewdean1/Chatbot'
              className='text-primary-50 hover:text-white inline-flex items-center'
            >
              Andrew Dean
            </ArrowLink>
          </p>
          <p>
            <ArrowLink
              as={UnstyledLink}
              href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'
              className='text-primary-50 hover:text-white inline-flex items-center'
            >
              Credit to Theodorus Clarence for the starter code
            </ArrowLink>
          </p>
        </footer>
      </div>
    </section>
  );
}
