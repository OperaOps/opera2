const fs = require('fs');
const path = require('path');

// Fix TypeScript errors in all files
const files = [
  'bulletproof-recent-patients.ts',
  'bulletproof-recent-locations.ts', 
  'bulletproof-recent-appointment-types.ts',
  'combine-recent-data.ts'
];

files.forEach(filename => {
  const filePath = path.resolve(__dirname, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix accessToken return type error
  content = content.replace(
    '    return accessToken;',
    '    return accessToken!;'
  );
  
  // Fix combine-recent-data.ts errors
  if (filename === 'combine-recent-data.ts') {
    content = content.replace(
      '        const lines = content.split(\'\\n\').filter(line => line.trim());',
      '        const lines = content.split(\'\\n\').filter((line: string) => line.trim());'
    );
    
    content = content.replace(
      '        console.log(`⚠️ Could not read ${filename}: ${error.message}`);',
      '        console.log(`⚠️ Could not read ${filename}: ${(error as any).message}`);'
    );
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed TypeScript errors in ${filename}`);
});

console.log('🎉 All TypeScript errors fixed!');
