import { Helmet } from "react-helmet-async";
import { APP_TITLE } from "@/const";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title,
  description = "منصة RegTech المتقدمة للامتثال التنظيمي - حلول ذكية مدعومة بالذكاء الاصطناعي لإدارة الامتثال في السعودية والخليج",
  keywords = "امتثال تنظيمي، RegTech، SAMA، NCA، CITC، SFDA، سياسات، لوائح، السعودية، الخليج، ذكاء اصطناعي، حوكمة",
  image = "https://regtech.sa/og-image.png",
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${APP_TITLE}` : APP_TITLE;
  const canonicalUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={APP_TITLE} />
      <meta property="og:locale" content="ar_SA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Specific */}
      {type === "article" && author && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
        </>
      )}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Arabic" />
      <meta name="geo.region" content="SA" />
      <meta name="geo.placename" content="Riyadh" />
    </Helmet>
  );
}
