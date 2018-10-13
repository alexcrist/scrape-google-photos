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
const { url, write, file } = parser.parseArgs();

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
  if (write) {
    let content = 'module.exports = [\n';
    photos.forEach((photo, index) => {
      content += '  ' + '\'' + photo + '\'';
      content += index === photos.length - 1 ? '\n' : ',\n';
    });
    content += '];\n';
    fs.writeFile(file, content, err => {
      if (err) {
        console.log(err);
      } else {
        console.log (`Created file: "${file}"!`);
      }
    });
  } else {
    console.log(photos);
  }

  await instance.exit();
})();


