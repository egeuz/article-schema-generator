'use server'

import { chromium } from 'playwright';
import baseSchema from './utils/base-schema';


export async function generateSchemas(prevState, formData) {
  // init playwright
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // get input urls
  const urls = formData.get('urls').split('\r\n')

  const schemas = await Promise.all(urls.map(async url => {
    const schema = { ...baseSchema }
    await page.goto(url);
    // parse images
    const images = await page.locator('section img');
    const numImages = await images.count();
    const imageURLs = [];
    for (let i = 0; i < numImages; i++) {
      let src = await images.nth(i).getAttribute('src');
      if (src.includes('.webp') || src.includes('.png')) imageURLs.push(src);
    }
    // scrape data from schema
    schema.mainEntityOfPage["@id"] = url;
    schema.headline = await page.locator("h1").innerText();
    schema.description = await page.locator('meta[name="description"]').getAttribute('content');
    schema.image = imageURLs;
    schema.author.name = await page.locator('.author-link-block .author').innerText();
    schema.author.url = `https://teamflect.com/${await page.locator('.author-link-block').getAttribute('href')}`;
    schema.datePublished = new Date(await page.locator('.blog-post-section .date', { hasNotText: 'on:' }).nth(0).innerText()).toISOString();
    schema.dateModified = new Date(await page.locator('.blog-post-section .date', { hasNotText: 'on:' }).nth(1).innerText()).toISOString();

    return schema;
  }));
  return schemas;
}