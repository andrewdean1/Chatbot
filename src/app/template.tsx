'use client';

import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className='min-h-screen bg-gradient-to-b from-primary-500 to-primary-950'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
