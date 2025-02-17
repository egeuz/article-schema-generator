'use client'
import Head from 'next/head';
import { useActionState } from 'react';
import { generateSchemas } from './actions';
// components
import SchemaItem from './schema-item';

export default function Home() {
  const [schemas, formAction] = useActionState(generateSchemas, "");

  return (
    <main>
      <Head>
        <title>Teamflect Article Schema Generator</title>
      </Head>
      <h1>Teamflect Article Schema Generator</h1>
      <form id="input" action={formAction}>
        <textarea
          placeholder="Paste each URLs on a separate line"
          id="urls"
          name="urls"
          required
        />
        <button type="submit">Generate Article Schemas</button>
      </form>
      <div id="output">
        {schemas && schemas.map((schema, i) => {
          return (
            <SchemaItem key={i} schema={schema} />
          )
        })}
      </div>
    </main>
  );
}
