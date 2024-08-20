'use client';

import React, { Suspense } from 'react';

import ChatComponent from './ChatComponent';

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatComponent />
    </Suspense>
  );
}
