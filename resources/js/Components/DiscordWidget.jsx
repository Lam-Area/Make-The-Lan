import React from 'react';

export default function DiscordWidget() {
  return (
    <div className="w-full flex justify-center mt-4">
      <div className="w-[350px] h-[500px] sm:w-[300px] sm:h-[450px] xs:w-[100%] xs:h-[400px] max-w-full rounded-xl shadow-lg overflow-hidden">
        <iframe
          src="https://discordapp.com/widget?id=1237554713323638814&theme=dark"
          width="100%"
          height="100%"
          allowtransparency="true"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  );
}
