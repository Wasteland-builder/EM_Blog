const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 用于处理postData
const getPostData = (req) => {
  const promise = new Promise((res, rej) => {
    if (req.method !== "POST") {
      res({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      res({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        res({});
        return;
      }
      res(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 获取path和url
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析query
  req.query = querystring.parse(url.split("?")[1]);

  // 处理postData
  getPostData(req).then((postData) => {
    req.body = postData;
    // 处理blog路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      })
      return;
    }

    // 处理user路由
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    //   return;
    // }

    // res.writeHead("404", { "Content-type": "text/plain" });
    // res.write("404 Not Found!\n");
    // res.end();
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData));
      })
      return
    }
  });
};

module.exports = serverHandle;

// process.env.NODE_ENV
