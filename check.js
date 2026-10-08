// check.js - Syntax and integrity checker for GATE Focus Timer index.html
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('🔍 Running automated validation on index.html...');

const htmlPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('❌ Error: index.html not found at ' + htmlPath);
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 1. Verify HTML syntax markers
const requiredHtmlMarkers = [
  '<!DOCTYPE html>',
  '<html',
  '</html>',
  'id="cloudOv"',
  'id="cloudAuthView"',
  'id="panelSignIn"',
  'id="panelSignUp"',
  'id="cloudUserView"',
  'id="btnGuestBackup"',
  'id="btnSignInSubmit"',
  'id="btnSignUpSubmit"'
];

let htmlErrors = 0;
for (const marker of requiredHtmlMarkers) {
  if (!htmlContent.includes(marker)) {
    console.error(`❌ Missing expected HTML marker: ${marker}`);
    htmlErrors++;
  }
}

if (htmlErrors > 0) {
  console.error(`❌ HTML validation failed with ${htmlErrors} errors.`);
  process.exit(1);
}
console.log('✅ HTML structure and auth modal elements verified.');

// 2. Extract inline script content
const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIndex = 0;
let jsSyntaxErrors = 0;

while ((match = scriptRegex.exec(htmlContent)) !== null) {
  scriptIndex++;
  const scriptCode = match[1];
  console.log(`🔍 Checking inline script #${scriptIndex} (${scriptCode.length} characters)...`);

  try {
    new vm.Script(scriptCode, {
      filename: `inline-script-${scriptIndex}.js`,
      displayErrors: true
    });
    console.log(`✅ Script #${scriptIndex} compiled successfully with 0 syntax errors.`);
  } catch (err) {
    console.error(`❌ Syntax error in script #${scriptIndex}:`, err);
    jsSyntaxErrors++;
  }
}

if (jsSyntaxErrors > 0) {
  console.error(`❌ JavaScript validation failed with ${jsSyntaxErrors} syntax errors.`);
  process.exit(1);
}

// 3. Verify required auth & UX features in script code
const requiredJsFeatures = [
  { name: "Resend confirmation email call", pattern: /sbClient\.auth\.resend\s*\(\s*\{\s*type:\s*['"]signup['"]/ },
  { name: "Resend confirmation function", pattern: /function\s+resendConfirmationEmail\s*\(/ },
  { name: "Instant guest sign-in call", pattern: /sbClient\.auth\.signInAnonymously\s*\(/ },
  { name: "Guest sign-in function", pattern: /function\s+handleGuestSignIn\s*\(/ },
  { name: "Email not confirmed handler", pattern: /email not confirmed/i },
  { name: "Email rate limit handler", pattern: /rate limit/i }
];

let featureErrors = 0;
for (const feat of requiredJsFeatures) {
  if (!feat.pattern.test(htmlContent)) {
    console.error(`❌ Missing required feature: ${feat.name}`);
    featureErrors++;
  } else {
    console.log(`✅ Feature verified: ${feat.name}`);
  }
}

if (featureErrors > 0) {
  console.error(`❌ Feature validation failed with ${featureErrors} missing items.`);
  process.exit(1);
}

console.log('\n=========================================');
console.log('🎉 ALL AUDIT CHECKS PASSED: ZERO ERRORS! ');
console.log('=========================================\n');
process.exit(0);
