import { useState } from "react"

export default function SchemaItem({ schema }) {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSchema = () => { setIsOpen(prev => !prev) }

  const copySchemaData = () => {
    const schemaData = `<script type="application/ld+json">${JSON.stringify(schema, 4)}</script>`
    navigator.clipboard.writeText(schemaData);
  }
  console.log(schema);
  return (
    <div>
      <div className="schema-header">
        <h3>{schema.headline}</h3>
        <div className="actions">
          <button onClick={copySchemaData} title="Copy LD+JSON">
            <img src="/copy.svg" alt="copy schema data" />
          </button>
          <button onClick={toggleSchema} title="Expand Schema">
            <img src="/expand.svg" alt="expand schema item" style={{ transform: isOpen && "rotateZ(180deg)" }} />
          </button>
        </div>
      </div>
      {isOpen &&
        <div className="schema-body">
          {`<script type="application/ld+json">${JSON.stringify(schema, 4)}</script>`}
        </div>
      }
    </div>
  )
}