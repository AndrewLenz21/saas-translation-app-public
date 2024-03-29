import ChatList from '@/components/ChatList';
import ChatPermissionError from '@/components/ChatPermissionError';
import React from 'react';

type Props = {
  params: {};
  searchParams: {
    error: string;
  };
};

function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div>
      {/* Chat Permission chat */}
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      {/* ChatList */}
      <ChatList/>
    </div>
  );
}

export default ChatsPage;
