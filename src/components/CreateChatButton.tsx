'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { MessageSquarePlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useToast } from './ui/use-toast';
import { useSubscriptionStore } from '@/store/store';
import LoadingSpinner from './LoadingSpinner';
import { v4 as uuidv4 } from 'uuid';
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from '@/lib/converters/ChatMembers';
import { ToastAction } from './ui/toast';

function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const router = useRouter();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    // All logic here
    if (!session?.user.id) return;

    toast({
      title: 'Creating new chat...',
      description: 'Hold tight while we create your new chat...',
      duration: 3000,
    });

    // TODO: Check if user is pro and limit then creating a new chat
    const chats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data());

    const isPro =
      subscription?.role === 'pro' && subscription.status === 'active';

    if (!isPro && chats.length >= 3) {
      toast({
        title: 'Free plan limit exceeded',
        description:
          "You've exceeded the limit of chats for the FREE plan.Please Upgrade to PRO to continue adding users to chat!!!",
        variant: 'destructive',
        action: (
          <ToastAction
            altText='UPGRADE'
            onClick={() => router.push('/register')}
          >
            UPGRADE TO PRO!!!
          </ToastAction>
        ),
      });
      setLoading(false);
      return;
    }
    // ---

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || '',
    })
      .then(() => {
        toast({
          title: 'Success',
          description: 'Your chat has been created!',
          className: 'bg-green-600 text-white',
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: 'Error',
          description: 'There was an error while creating your chat!',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoading(false);
      });

    router.push(`/chat/abc`);
  };

  if (isLarge)
    return (
      <div>
        <Button variant={'default'} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : 'Create a New Chat'}
        </Button>
      </div>
    );

  return (
    <Button onClick={createNewChat} variant={'ghost'}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
