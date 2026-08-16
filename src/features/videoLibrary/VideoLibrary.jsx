import { useState } from "react";
import { PlayCircle, Search } from "lucide-react";
import { ACTIVITY_TYPES } from "../../constants/activityTypes";
import { VIDEOS } from "../../data/videos";
import { theme } from "../../constants/theme";
import { Pill } from "../../components/ui/Pill";
import styles from "./VideoLibrary.module.css";

function youTubeSearchUrl(title, channel) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} ${channel}`)}`;
}

export function VideoLibrary() {
  const [filter, setFilter] = useState("running");

  return (
    <div>
      <div className={styles.title}>Video library</div>
      <div className={styles.filterRow}>
        {ACTIVITY_TYPES.map((type) => (
          <Pill key={type.id} active={filter === type.id} onClick={() => setFilter(type.id)}>
            {type.label}
          </Pill>
        ))}
      </div>
      <div className={styles.list}>
        {VIDEOS[filter].map((video) => (
          <a
            key={`${video.title}-${video.channel}`}
            href={youTubeSearchUrl(video.title, video.channel)}
            target="_blank"
            rel="noreferrer"
            className={styles.card}
          >
            <div className={styles.thumb}>
              <PlayCircle size={20} color={theme.color.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className={styles.videoTitle}>{video.title}</div>
              <div className={styles.channel}>{video.channel}</div>
            </div>
            <Search size={14} color="#c7c3bd" />
          </a>
        ))}
      </div>
      <div className={styles.hint}>Opens a YouTube search for the topic and channel shown.</div>
    </div>
  );
}
