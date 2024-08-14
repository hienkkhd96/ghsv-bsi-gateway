const axios = require("axios");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors("*"));
const BSI_PUBLIC_URL = "https://v9-cc.800best.com/express-cc";
app.all("/*", async (req, res) => {
  try {
    let { body, headers, url, method = "GET" } = req;
    url = `${BSI_PUBLIC_URL}${url}`;
    const configHeaders = {
      "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      "Content-type": "application/json",
      "lang-type": "vi-VN",
      "x-lan": "VI",
      "x-nat": "vi-VN",
      "x-timezone-offset": "7",
      Host: "v9-cc.800best.com",
      Origin: "https://www.best-inc.vn",
      Referer: "https://www.best-inc.vn/",
      Authorization: headers?.authorization,
    };
    let result = await axios({
      method: method,
      url,
      headers: configHeaders,
      data: body || {},
    });
    res.status(200).send(result?.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
