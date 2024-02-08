module.exports = {
    '*.{js,jsx,ts,tsx}': ['npx eslint --fix'],
    '*.{ts,tsx}': [() => 'npx tsc --skipLibCheck --noEmit']
};
