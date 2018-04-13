#!/usr/bin/env node
// 全局sh
require("shelljs/global");
var shell = require("shelljs");
// 路径
var path = require("path");
// 文件读写
var fs = require("fs");
// 获取参数
var argv = require("yargs")
  .option("n", {
    alias: "name", // 别名
    demand: true, // 必要
    describe: "目录名称",
    type: "string"
  })
  .usage("Usage: ./init.js [options]")
  .example("node ./bin/init.js -n 项目英文名称（比如下面的）")
  .example("node ./bin/init.js -n quiz").argv;

var t = new Date();
var y = t.getFullYear();
var m =
  (t.getMonth() + 1).toString().length == 2
    ? t.getMonth() + 1
    : "0" + (t.getMonth() + 1);
var d =
  t.getDate().toString().length == 2 ? "" + t.getDate() : "0" + t.getDate();
// console.log(t, y, m, d, y + m + d)

var src = y + "/" + m + d + "-" + argv.n;
var ROOT = path.dirname(__dirname);
var DESTROOT = "h5/" + src;
var rROOT = "../";
// console.log(ROOT) // /Users/luckyzd/www/global-h5page
// console.log(DESTROOT) // h5/2018/0101
// console.log(rROOT) // ../../../../

// return
var i = 0;
while (i < DESTROOT.split(path.sep).length) {
  rROOT += "../";
  i++;
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
  fs.access(dist, function(err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if (err) {
          callback(err);
        } else {
          paths.forEach(function(path) {
            var _src = src + "/" + path;
            var _dist = dist + "/" + path;
            fs.stat(_src, function(err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback);
                }
              }
            });
          });
        }
      });
    }
  }
}

// start
if (argv.n) {
  // 制作替身node_modules
  mkdir("-p", DESTROOT);
  ln(
    "-s",
    path.resolve(__dirname, "../node_modules"),
    DESTROOT + "/node_modules"
  );
  // shell.exec('sh ./bin/change-node.sh ' + DESTROOT, function() {})
  //ln('-s', path.resolve(__dirname, '../lib'), DESTROOT+'/lib')

  // 使用 default 模板
  copyDir(ROOT + "/tmp/default", DESTROOT, function(err) {
    if (err) {
      console.log(err);
    }
  });
  // 拷贝libs
  mkdir("-p", DESTROOT + "/libs");
  copyDir(ROOT + "/libs", DESTROOT + "/libs", function(err) {
    if (err) {
      console.log(err);
    }
  });
}

if (DESTROOT.indexOf("zzz") > -1) {
  console.log("zzz创建完成：" + DESTROOT);
  // shell.exec('sh ' + DESTROOT + '/start.sh')
  // shell.exec('open -a "/Applications/Google Chrome.app" http://zd.s1.mi.com/');
  // shell.exec('code ' + DESTROOT);
  // shell.exec('echo ' + DESTROOT + ' | pbcopy');
} else {
  console.log("粘贴 进入项目" + DESTROOT);
  console.log("然后 npm run dev 进入开发");
  shell.exec("echo cd " + DESTROOT + " | pbcopy");
}
