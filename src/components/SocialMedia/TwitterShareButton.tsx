import React from "react";
import MetaTags from "./MetaTags";

const TwitterShareButton: React.FC = () => {
  // const shareToWhatsApp = () => {
  //   const text = "Check out this data: 43 apples!";
  //   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  //   window.open(whatsappUrl, "_blank");
  // };

  const shareToTwitter = () => {
    const text = "Check out this amazing project: Quizzer!";
    const url = "http://localhost:5173";
    const hashtags = "Quizzer,React,OpenSource";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareToWhatsAppInvite = () => {
    const text = "Join the fun and challenge your friends with Quizzer!";
    // const url = "https://Quizzer_Backend.loca.lt/share/invite";
    // const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    //   `${text} ${url}`
    // )}`;
    const url = "https://gil392.github.io/Quizzer_Backend/share/invite";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${url}`)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div>
      <MetaTags
        title="Check out this amazing project: Quizzer!"
        description="A tool that makes sharing easy."
        image="https://gil392.github.io/Quizzer_Frontend/docs/sonic.jpg"
        url="http://localhost:5173"
      />
      <button onClick={shareToWhatsAppInvite}>Share on WhatsApp</button>
      <button onClick={shareToTwitter}>Share on Twitter</button>
    </div>
  );
};

export default TwitterShareButton;
