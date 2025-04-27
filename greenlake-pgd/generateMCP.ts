import * as fs from 'fs';
import * as path from 'path';

const schemaPath = path.join(__dirname, 'prisma/schema.prisma');
const outputDir = path.join(__dirname, 'mcp_contexts');

// Leer el schema.prisma
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

// Regex para detectar modelos
const modelRegex = /model (\w+) \{([\s\S]*?)\}/g;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

let match;
while ((match = modelRegex.exec(schemaContent)) !== null) {
  const modelName = match[1];
  const fieldsBlock = match[2];

  const fields: Record<string, string> = {};

  const lines = fieldsBlock.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));

  lines.forEach(line => {
    const parts = line.split(/\s+/);
    const fieldName = parts[0];
    const fieldType = parts[1];

    if (fieldName && fieldType && !fieldType.startsWith('@')) {
      fields[fieldName] = fieldType;
    }
  });

  const mcp = {
    model: modelName,
    fields: fields,
    actions: ["find", "filter"]
  };

  fs.writeFileSync(
    path.join(outputDir, `${modelName}.json`),
    JSON.stringify(mcp, null, 2)
  );

  console.log(`✅ MCP generado para modelo: ${modelName}`);
}

console.log('🎉 Todos los MCP han sido generados correctamente.');
