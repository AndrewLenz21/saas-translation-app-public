import DeleteChatButton from './DeleteChatButton';
import InviteUser from './InviteUser';


function ChatAdminControls({ chatId }: { chatId: string}) {
  return (
    <div className="flex justify-end space-x-2 m-5">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
}

export default ChatAdminControls;