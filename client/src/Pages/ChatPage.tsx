import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { UseFetchAllQuery } from "../lib/api";
import { CHAT_TOKEN_URL } from "../lib/config";
import ChatLoader from "../component/ChatLoader";
import toast from "react-hot-toast";
import CallButton from "../component/CallButton";


const VITE_STREAMING_API_KEY= import.meta.env.VITE_STREAMING_API_KEY;
const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState<any | null>(null);
  const [channel, setChannel] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { authUser } = useAuthUser();

  const { data:tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: () => UseFetchAllQuery(CHAT_TOKEN_URL),
    enabled: !!authUser, // !! convert value into boolean
  });
  

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      const { StreamChat } = await import("stream-chat");
      try {
        console.log("Initializing chat client...");
        const client = StreamChat.getInstance(VITE_STREAMING_API_KEY);
        await client.connectUser({
          id: authUser._id,
          name: authUser.fullName,
          image: authUser?.profileImage
        },tokenData.token);
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currentChannel = client.channel("messaging",channelId,{
          members:[authUser._id, targetUserId]
        })
        await currentChannel.watch();
        setChatClient(client);
        setChannel(currentChannel);
        setLoading(false)
      } catch (error) {
        console.log("Error connecting user to chat:", error);
        toast.error("Failed to connect to chat. Please try again later.");
        return;
      }
    }
    initChat()
  },[tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if(channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `Let's have a video call!, Join me here: ${callUrl}`,
      })
    }
  }


  if(loading || !chatClient || !channel) return <ChatLoader/>
  return  <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>;
};

export default ChatPage;
