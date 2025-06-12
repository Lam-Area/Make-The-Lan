import React from 'react';

export default function DiscordWidget() {
  return (
    <div className="w-[350px] h-[500px] overflow-hidden rounded-xl shadow-lg">
      <iframe
        src="https://discordapp.com/widget?id=1237554713323638814&theme=dark"
        width="100%"
        height="100%"
        allowTransparency="true"
        frameBorder="0"
        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
}
