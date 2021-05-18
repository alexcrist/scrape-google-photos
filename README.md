# 🥢 `scrape-google-photos`

> A command line tool that takes the URL of a public Google Photos album and returns a list of the URLs of the preview-quality images in the album.

## 💡 Applications

This tool could be useful for building a website whose images are hosted on Google Photos. Just create a public Google Photos album and use this tool with the `--write` parameter to aggregate the contained image URLs into a javascript file.

The fact that this tool outputs not-full quality versions of the images is actually ideal for embedding the images in a website because the preview-quality images are still reasonably good but the smaller size saves bandwidth and gives the web page higher performance.

## 🔌 Installation

`npm install -g scrape-google-photos`

## 🔦 Usage

`scrape-google-photos [ALBUM-URL] --write --file=[FILE-NAME]`

* **`[ALBUM-URL]`** is your public Google Photos album URL
* **`--write`** is an optional parameter that when used will write the output to a `.js` file
* **`--file=[FILE_NAME]`** is an optional parameter that specifies the output file name (default: `photos.js`)

## 💽 Example

#### Input: CLI

```scrape-google-photos https://photos.app.goo.gl/ZpfXxtahskVAC4647 --write```

#### Output: `photos.js`

```
module.exports = [
  'https://lh3.googleusercontent.com/_cNNTylvzIcRouc7syabFviNF8uqRUL77GMBs-Yy3a_68SuZ9Qe55VBfNDNsXXm8hwmDytQCLATPO_rujEqT5VACNubUZonPexqoIGb4qix6uJGgwRucFNCfYmpOhY_MjGm7XUzAZHY',
  'https://lh3.googleusercontent.com/PmH5-dxOUlE02FPz_R6PaOvjdSYrpftTafAPbVmH0liE7a05BU_xfEE-5G1dCSVkXtLkzJx3j4H2k9TQVtXjIr-xTsk0adwB_amHCpSpW4mWaWWp9ufr6XxSgEfeHNiBllK-baM9_V4',
  'https://lh3.googleusercontent.com/db0xBNg0xOEGqD2PABW3dkT-lo8Vc4mWE94WcguZGCZTgLAgYcPf5nKfTCCcUey9OcxgBzLMcNNIL8bgd1kjEBtanoEF5MeCqfBdEUF6SJ0Emxq9x8gLHsqB4dLWPyf7XzgIvVC9q6g',
  'https://lh3.googleusercontent.com/R8ESg_jEH-3TmzE8JqTJsMUT_q5K1AvokAnyItrc4mEWX13VitvOuQykDt41fF5OunlRNbUzUbgCGbL25JiPhhbCuihK_CwmlwGBlQoXA3Qg1TNvTZokZGfaGaAqMQTC8pn6vaA_pQg'
];
```

## 📷 Create a public Google Photos album URL

* Go to your Google Photos album
* Click the **Share** icon
* Click **Get Link**

## This is a test header