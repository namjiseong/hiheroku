var template = require('./template.js')
var db = require('./db.js');
db.handleDisconnect();
exports.home = function(request, response){
    var title = 'together';
    var list = `<ul>
    <li><a href="/bug">버그리포트</a></li>
    <li><a href="#">자유게시판</a></li>
    <li><a href="#">팁게시판</a></li>
    <li><a href="#">모임</a></li>
    </ul>`;
    var control = 'control';
    var body = `wellcome !<br>
    <img src="/images/homeimage.jpg"
    `;
    html=template.html(title, list, control, body);

    response.send(html);

}
exports.bug = function(request, response){
    var tag = '';
    var i = 0;
    db.query(`select * from buglist;`, function(err, topics){
        while(i < topics.length){
            tag = tag + `${topics[i].title} ${topics[i].description} ${topics[i].created}<br>`
            i++;
        }
        
        
    
    
    var title = 'together!';
    var list = `<ul>
    <li><a href="/bug">버그리포트</a></li>
    <li><a href="#">자유게시판</a></li>
    <li><a href="#">팁게시판</a></li>
    <li><a href="#">모임</a></li>
    </ul>`;
    var control = 'control';
    var body = `
    <h2>글목록</h2>
    <div class=board-top>
        <div class="left">

        </div>
        <div class="right">
            <h4><a href="/create/bug">글쓰기</a></h4>
        </div>

        ${tag}
        <div board-bottom>

            <form action="#" method="GET">
            <input type="hidden" name="query" value="list">
            <input type="hidden" name="p" value="1">
                    <input type="hidden" name="sterm" value="">

            <select name="name">
                <option value="subject">제목</option>
                <option value="content">내용</option>
                <option value="nicname">닉네임</option>
                <option value="category">카테고리</option>
                <option value="subjcont">제목+내용</option>
            </select>

            <input type="text" name="keyword" id="sword" value="">
            <button type="submit" class="search-btn board-img">검색</button>
            </form>
        </div>

    </div>
    `;
    html=template.html(title, list, control, body);

    response.send(html);
})
}

exports.createbug = function(request, response){
    var title = 'together';
    var list = `<ul>
    <li><a href="/bug">버그리포트</a></li>
    <li><a href="#">자유게시판</a></li>
    <li><a href="#">팁게시판</a></li>
    <li><a href="#">모임</a></li>
    </ul>`;
    var control = 'control';
    db.query(`SELECT * FROM author`, function(error2, authors){
        if(error2){
          throw error2;
        }
    var body = `
    <h2>글쓰기</h2>
    <div class=board-top>
        <div class="left">

        </div>
        <div class="right">
            <h4><a href="/create/bug">글쓰기</a></h4>
        </div>
        <form action="/createbug_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
          ${template.authorSelect(authors, authors[0].id)}
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        <div board-bottom>
        
            
        </div>

    </div>
    `;
    html=template.html(title, list, control, body);

    response.send(html);
    })
}

exports.createbug_process = function(request, response){
    var post = request.body;
    db.query(`
          INSERT INTO buglist (title, description, created, author_id) VALUES(?,?,NOW(),?)
          `,[post.title, post.description, post.author], 
          function(error, result){
            if(error){
              throw error;
            }
            response.redirect(`/bug`);
            })

}