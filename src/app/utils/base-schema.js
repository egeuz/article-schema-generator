const baseSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "" //URL here -> input item
  },
  "headline": "", // selector: h1 | property: innerText
  "description": "", //article description
  "image": [], //all article images
  "author": {
    "@type": "Person",
    "name": "", //article author
    "url": "" //article author link
  },
  "publisher": {
    "@type": "Organization",
    "name": "Teamflect",
    "logo": {
      "@type": "ImageObject",
      "url": "https://cdn.prod.website-files.com/66bc8a29fa3e55d327b2aee7/66bc95742a1fde7706bf7488_Layer%201.svg"
    }
  },
  "datePublished": "", // date 1
  "dateModified": "" // date 2
}

export default baseSchema;