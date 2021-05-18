#!/usr/bin/env node

const phantom = require('phantom');
const argparse = require('argparse');
const fs = require('fs');

// Parse URL from CLI arguments
const ArgumentParser = argparse.ArgumentParser;
const parser = new ArgumentParser({
  addHelp:     true,
  description: 'Scrapes image preview URLs from Google Photo albums.',
  version:     '1.0.0'
});
parser.addArgument('url', { help: 'Google Photos album URL' });
parser.addArgument(['-w', '--write'], {
  action: 'storeTrue',
  help: 'Write photo URLs to file'
});
parser.addArgument(['-f', '--file'], {
  defaultValue: 'photos.js',
  help: 'Name of file to create'
});
parser.addArgument(['-mw', '--maxWidth'], {
  help: 'Max width of each photo in pixels'
});
parser.addArgument(['-mh', '--maxHeight'], {
  help: 'Max height of each photo in pixels'
});
const { url, write, file, maxWidth, maxHeight } = parser.parseArgs();

// Intercept image preview URLs from album's network calls using PhantomJS
(async () => {
  
  // Instantiate PhantomJS page
  const instance = await phantom.create();
  const page     = await instance.createPage();
  await page.property('viewportSize', { width: 1024, height: 100000 });

  // Save requested URLs
  let requestedUrls = [];
  await page.on('onResourceRequested', requestData => {
    requestedUrls.push(requestData.url);
  });

  // Open Google Photos album
  await page.open(url);
  await page.property('content');

  // Filter URLs to include only photos
  const photos = requestedUrls
    .filter(requestedUrl => {
      return requestedUrl.includes('https://lh3.');
    })
    .map(photo => {
      const end = photo.lastIndexOf('=w');
      return photo.substring(0, end);
    });

  // Handle output
  let content = '';
    photos.forEach((photo, index) => {
      content += '  ' + '\'' + photo + (maxWidth != null || maxHeight != null ? '=' : '' ) + ( maxWidth != null ? ('w' + maxWidth) : '' ) + (maxWidth != null && maxHeight != null ? '-' : '' ) + ( maxHeight != null ? ('h' + maxHeight) : '' ) + '\'';
      content += index === photos.length - 1 ? '\n' : ',\n';
    });
    
  if (write) {
    content = 'module.exports = [\n' + content;
    content += '];\n';
    fs.writeFile(file, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log (`Created file: "${file}"!`);
      }
    });
  } else {
    console.log(content);
  }

  await instance.exit();
})();



