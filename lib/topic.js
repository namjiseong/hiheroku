var template = require('./template.js')
var mysql = require('mysql')
var  db_config = require('./db.js')

function handleDisconnect() {
    db = mysql.createConnection(db_config);
    db.connect(function(err) {            
      if(err) {                            
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                   
    });                                 
                                           
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        return handleDisconnect();                      
      } else {                                    
        throw err;                              
      }
    });
  }
  
  handleDisconnect();

exports.home = function(request, response){
    var title = 'together';
    var list = `<ul>
    <li><a href="/bug">버그리포트</a></li>
    <li><a href="#">자유게시판</a></li>
    <li><a href="#">팁게시판</a></li>
    <li><a href="#">모임</a></li>
    </ul>`;
    var control = 'control';
    var body = `welcome !<br>
    <img src="/images/homeimage.jpg"
    `;
    html=template.html(title, list, control, body);

    response.send(html);

}
exports.bug = function(request, response){
    var tag = `<table>
    <thread>
      <tr>
        <th>title</th>
        <th>author</th>
        <th>조회수</th>
      </tr>
    </thread><tbody>`;
    var i = 0;
    db.query(`select * from buglist;`, function(err, topics){
        while(i < topics.length){
            tag = tag + `<tr><th><a href="/bug/${topics[i].id}">${topics[i].title}</a></th><th>${topics[i].author_id}</th></tr>`
            i++;
        }
        tag += `</tbody></table>`;
        
    
    
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
            <h4><a href="/bug/create">글쓰기</a></h4>
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
exports.bug_page = function(request, response){
  db.query(`SELECT * FROM buglist LEFT JOIN author ON buglist.author_id=author.id WHERE buglist.id=?`,[request.params.pageId], function(error2,bugpage){
    if(error2){
      throw error2;
    }
    var title = 'together!';
    var list = `<ul>
    <li><a href="/bug">버그리포트</a></li>
    <li><a href="#">자유게시판</a></li>
    <li><a href="#">팁게시판</a></li>
    <li><a href="#">모임</a></li>
    </ul>`;
    var control = `
    <a href="/bug/update/${request.params.pageId}">수정하기</a>
    <form action="/bug/delete_process" method="post">
      <input type="hidden" name="id" value="${request.params.pageId}">
      <input type="submit" value="delete">
    </form>
    `;
    var body = `
    <h2>${bugpage[0].title}</h2>
    <div class=board-top>
        <div class="left">

        </div>
        <div class="right">
            <h4><a href="/bug/create">글쓰기</a></h4>
        </div>
        <p>
        ${bugpage[0].description}
        
        </p>
        made dy ${bugpage[0].name}
        <br>
        
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
  });
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
            <h4><a href="/bug/create">글쓰기</a></h4>
        </div>
        <form action="/bug/create_process" method="post">
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

exports.updatebug = function(request, response){
  db.query(`SELECT * FROM buglist WHERE id=${request.params.pageId}`, function(err, bugpage){
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
    <h2>수정하기</h2>
    <div class=board-top>
        <div class="left">

        </div>
        <div class="right">
            <h4><a href="/bug/create">글쓰기</a></h4>
        </div>
        <form action="/bug/update_process/${request.params.pageId}" method="post">
          <p><input type="text" name="title" value="${bugpage[0].title}"></p>
          <p>
            <textarea name="description" placeholder="description">${bugpage[0].description}</textarea>
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
  })
  
}
exports.updatebugprocess = function(request, response){
  var post = request.body;
  db.query(`
        UPDATE buglist SET title=?, description=?, author_id=? WHERE id=?
        `,[post.title, post.description, post.author, request.params.pageId], 
        function(error, result){
          if(error){
            throw error;
          }
          response.redirect(`/bug/${request.params.pageId}`);
          })
}

exports.deletebugprocess = function(request, response){
  var post = request.body;
   db.query(`DELETE FROM buglist WHERE id=${post.id};`,function(err, result){
    response.redirect(`/bug`);
   })
}