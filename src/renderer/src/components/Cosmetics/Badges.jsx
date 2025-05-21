import { memo, useCallback, useState } from "react";
import { kickBadgeMap } from "../../../../../utils/constants";
import BadgeTooltip from "./BadgeTooltip";

const Badge = memo(({ badge, subscriberBadges }) => {
  const [showBadgeInfo, setShowBadgeInfo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const badgeInfo = badge.type === "subscriber" ? kickBadgeMap[badge.type](badge, subscriberBadges) : kickBadgeMap[badge.type];
  if (!badgeInfo) return null;

  const handleMouseEnter = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setShowBadgeInfo(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowBadgeInfo(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (showBadgeInfo) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [showBadgeInfo],
  );

  return (
    <div className="chatroomBadge" key={badge.type} onMouseMove={handleMouseMove}>
      <BadgeTooltip showBadgeInfo={showBadgeInfo} mousePos={mousePos} badgeInfo={badgeInfo} />
      <img
        key={badge.type}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="chatroomBadgeIcon"
        src={badgeInfo.src}
        alt={badge.type}
      />
    </div>
  );
});

const KickBadges = memo(({ badges, subscriberBadges = null }) => {
  if (!badges?.length) return null;

  return badges.map((badge) => <Badge key={badge.type} badge={badge} subscriberBadges={subscriberBadges} />);
});

const KickTalkBadges = memo(
  ({ badges }) => {
    const [showBadgeInfo, setShowBadgeInfo] = useState(false);
    const [mousePos, setMousePos] = useState({ x: null, y: null });

    const handleMouseEnter = useCallback((e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowBadgeInfo(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setShowBadgeInfo(false);
    }, []);

    const handleMouseMove = useCallback(
      (e) => {
        if (showBadgeInfo) {
          setMousePos({ x: e.clientX, y: e.clientY });
        }
      },
      [showBadgeInfo],
    );

    return badges.map((badge) => {
      const badgeUrl = `https://cdn.kicktalk.app/${badge.type}.webp`;
      return (
        <div className="chatroomBadge" key={badge.type} onMouseMove={handleMouseMove}>
          <BadgeTooltip
            showBadgeInfo={showBadgeInfo}
            mousePos={mousePos}
            badgeInfo={{ ...badge, src: badgeUrl, owner: { username: "d9" } }}
          />
          <img
            className="chatroomBadgeIcon"
            src={badgeUrl}
            alt={badge.title}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      );
    });
  },
  (prevProps, nextProps) => {
    return prevProps.badges === nextProps.badges;
  },
);

const StvBadges = memo(({ badge }) => {
  const [showBadgeInfo, setShowBadgeInfo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });

  const handleMouseEnter = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setShowBadgeInfo(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowBadgeInfo(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (showBadgeInfo) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    },
    [showBadgeInfo],
  );

  const badgeUrl = badge.url;
  return (
    <div className="chatroomBadge" key={badge.type} onMouseMove={handleMouseMove}>
      <BadgeTooltip showBadgeInfo={showBadgeInfo} mousePos={mousePos} badgeInfo={{ ...badge, src: badgeUrl }} />
      <img
        className="chatroomBadgeIcon"
        src={badgeUrl}
        alt={badge.title}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
});

export { KickBadges, KickTalkBadges, StvBadges };
