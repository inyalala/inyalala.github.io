#!/usr/bin/env node
/**
 * CSS Minification and Bundling Script
 * Combines and minifies CSS files for production
 * @author Dr. Innocent Nyalala - IIT Madras Zanzibar
 */

const fs = require('fs');
const path = require('path');

// Simple CSS minifier
function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace
        .replace(/\s+/g, ' ')
        // Remove spaces around certain characters
        .replace(/\s*([{}:;,>+~])\s*/g, '$1')
        // Remove trailing semicolons
        .replace(/;}/g, '}')
        // Remove empty rules
        .replace(/[^\}]+\{\}/g, '')
        .trim();
}

// Bundle multiple CSS files
function bundleCSS(files, outputFile) {
    let combined = '';
    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    console.log('🎨 Starting CSS bundling and minification...\n');

    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            combined += content + '\n';
            totalOriginalSize += content.length;
            console.log(`✓ Loaded: ${file} (${(content.length / 1024).toFixed(2)} KB)`);
        } catch (err) {
            console.error(`✗ Error reading ${file}:`, err.message);
        }
    });

    // Add banner
    const banner = `/*! Website CSS Bundle - Dr. Innocent Nyalala | Generated: ${new Date().toISOString()} */\n`;
    const minified = banner + minifyCSS(combined);
    totalMinifiedSize = minified.length;

    // Write minified file
    fs.writeFileSync(outputFile, minified, 'utf8');

    console.log(`\n✅ CSS bundling complete!`);
    console.log(`📦 Output: ${outputFile}`);
    console.log(`📊 Original size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
    console.log(`📊 Minified size: ${(totalMinifiedSize / 1024).toFixed(2)} KB`);
    console.log(`💰 Reduction: ${((1 - totalMinifiedSize / totalOriginalSize) * 100).toFixed(2)}%`);
}

// Configuration
const CSS_FILES = [
    path.join(__dirname, '../css/modern.css')
];

const OUTPUT_FILE = path.join(__dirname, '../css/modern.min.css');

// Run bundling
bundleCSS(CSS_FILES, OUTPUT_FILE);
