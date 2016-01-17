# LocalProject
Create Mac NodeJs Local Test Project
#WebSpider
--
### MySpider.js
爬虫主程序。<br>
  while(urls.hasNext){<br>
    request(urls.next(),function(data){<br>
        //处理响应数据<br>
    });<br>
  }\n
### SpiderEat.js
处理响应的数据，过滤出需要的数据，过滤出新的待爬的链接。
### SpiderMind.js
控制爬虫的链接路径。存储待爬的链接，记录已爬的链接，提供hasNext()和next()方法
