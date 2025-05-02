import React from "react";
import { Helmet } from "react-helmet";

interface MetaTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  image,
  url,
}) => (
  <Helmet>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
  </Helmet>
);

export default MetaTags;
