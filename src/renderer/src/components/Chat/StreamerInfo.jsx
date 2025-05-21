import { useState, useEffect } from "react";
import clsx from "clsx";
import PinnedMessage from "./PinnedMessage";
import useChatStore from "../../providers/ChatProvider";
import { useShallow } from "zustand/shallow";
import PushPin from "../../assets/icons/push-pin-fill.svg?asset";
import UserIcon from "../../assets/icons/user-fill.svg?asset";
import PollMessage from "./PollMessage";

const StreamerInfo = ({ streamerData, streamStatus, isStreamerLive, chatroomId, userChatroomInfo }) => {
  const [showPinnedMessage, setShowPinnedMessage] = useState(true);
  const [showPollMessage, setShowPollMessage] = useState(false);

  const pinnedMessage = useChatStore(
    useShallow((state) => state.chatrooms.find((room) => room.id === chatroomId)?.pinnedMessage),
  );
  const pollMessage = useChatStore(useShallow((state) => state.chatrooms.find((room) => room.id === chatroomId)?.pollDetails));
  const chatters = useChatStore(useShallow((state) => state.chatrooms.find((room) => room.id === chatroomId)?.chatters));

  const handleChattersBtn = (e) => {
    const chattersData = {
      chatters: chatters || [],
      streamerData,
    };

    window.app.chattersDialog.open(chattersData);
  };

  useEffect(() => {
    if (pinnedMessage) {
      setShowPinnedMessage(true);
    }
    if (pollMessage) {
      setShowPollMessage(true);
    }
  }, [pinnedMessage, pollMessage]);

  const handleContextMenu = () => {
    window.app.contextMenu.streamerInfo(streamerData);
  };

  const canModerate = userChatroomInfo?.is_broadcaster || userChatroomInfo?.is_moderator || userChatroomInfo?.is_super_admin;

  return (
    <div className="chatStreamerInfo" onContextMenu={handleContextMenu}>
      <div
        className="chatStreamerInfoContent"
        onMouseDown={async (e) => {
          if (e.button === 1 && streamerData?.slug) {
            window.open(`https://kick.com/${streamerData?.slug}`, "_blank");
          }
        }}>
        <span className="streamerName">{streamerData?.user?.username}</span>
        {isStreamerLive && <span className="liveBadgeDot" />}
      </div>

      <div className="chatStreamerLiveStatus">
        {streamStatus?.session_title && (
          <span className="chatStreamerLiveStatusTitle" title={streamStatus?.session_title}>
            {streamStatus?.session_title}
          </span>
        )}
      </div>
      <div className="chatStreamerInfoActions">
        <button onClick={handleChattersBtn} className="chattersBtn">
          <img src={UserIcon} width={20} height={20} alt="Pin Message" />
        </button>
        {pinnedMessage && (
          <button
            className={clsx("pinnedMessageBtn", pinnedMessage && "show", showPinnedMessage && "open")}
            onClick={() => setShowPinnedMessage(!showPinnedMessage)}>
            <img src={PushPin} width={20} height={20} alt="Pin Message" />
          </button>
        )}
        {/* {pollMessage && (
          <button
            className={clsx("pollMessageBtn", pollMessage && "show", showPollMessage && "open")}
            onClick={() => setShowPollMessage(!showPollMessage)}>
            <img src={PushPin} width={20} height={20} alt="Pin Message" />
          </button>
        )} */}
      </div>

      {pinnedMessage && (
        <PinnedMessage
          chatroomName={streamerData?.user?.username}
          showPinnedMessage={showPinnedMessage}
          setShowPinnedMessage={setShowPinnedMessage}
          pinnedMessage={pinnedMessage}
          chatroomId={chatroomId}
          canModerate={canModerate}
          userChatroomInfo={userChatroomInfo}
        />
      )}
      {/* {pollMessage && (
        <PollMessage
          showPollMessage={showPollMessage}
          setShowPollMessage={setShowPollMessage}
          pollData={pollMessage.poll}
          chatroomId={chatroomId}
        />
      )} */}
    </div>
  );
};

export default StreamerInfo;
