# 🥢 `scrape-google-photos`

A command line tool that takes the URL of a public Google Photos album and returns a list of the URLs of the preview-quality images in the album.

This tool could be useful for building a website whose images are hosted on Google Photos. Just create a public Google Photos album, use this tool to aggregate the contained images into a single list, then use that of URLs in your website's JS somewhere.

The fact that this tool outputs non-full quality versions of the images is actually ideal for embedding the images in your website as the preview-quality images are still a reasonably high resolution but will save you bandwidth and give your page high performance.

## 🔌 Installation

`npm install -g scrape-google-photos`

## 🔦 Usage

`scrape-google-photos [ALBUM-URL] --write --file=[FILE-NAME]`

* **`[ALBUM-URL]`** is your public Google Photos album URL
* **`--write`** is an optional parameter that when used will write the output to a `.js` file
* **`--file=[FILE_NAME]`** is an optional parameter that specifies the output file name (default: `photos.js`)

## 📷 Create a public Google Photos album URL

* Go to your Google Photos album
* Click the **Share** icon
* Click **Get Link**
