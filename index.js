//puppeteerのインポート
const puppeteer = require("puppeteer");
(async () => {
//ブラウザの起動(ヘッドレスで)
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 10,
    defaultViewport: {
      width: 1000,
      height: 1000,
    },
    args: ["--lang=ja", "--no-sandbox", "--disable-extensions"],
  });

  try {
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ja-JP", //日本語版ページが読み込まれるようにする
    });

    const url = 'https://stackoverflow.com/questions/47616985/node-puppeteer-take-screenshot-full-page-spa';
    await page.goto(url, {
        waitUntil: 'networkidle2'
    });
    // await page.waitFor(500);
    
    await page.screenshot({ path: 'fullpage.png', fullPage: true });
    console.log("shot");
  } catch (e) {
    console.log(e);
  } finally {
//実行できたらブラウザを閉じて、コンソールに"done"と出力させる
    await browser.close();
    console.log("done");
  }
})();