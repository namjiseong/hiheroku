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
    <li><a href="/st">스트레칭</a></li>
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

exports.stretching = function(request, response){
    var title = 'together';
    var list = `<ul>
    <li><a href="/bug">버그리포트</a></li>
    <li><a href="#">자유게시판</a></li>
    <li><a href="#">팁게시판</a></li>
    <li><a href="#">모임</a></li>
    <li><a href="/st">스트레칭</a></li>
    </ul>`;
    var control = `<div>Teachable Machine Pose Model</div>
    <button type="button" onclick="init()">Start</button>
    <div><canvas id="canvas"></canvas></div>
    <div id="label-container"></div>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
    <script type="text/javascript">
        // More API functions here:
        // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose
    
        // the link to your model provided by Teachable Machine export panel
        const URL = "https://teachablemachine.withgoogle.com/models/g9RBx3WyR/";
        let model, webcam, ctx, labelContainer, maxPredictions;
    
        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
    
            // load the model and metadata
            // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
            // Note: the pose library adds a tmPose object to your window (window.tmPose)
            model = await tmPose.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
    
            // Convenience function to setup a webcam
            const size = 200;
            const flip = true; // whether to flip the webcam
            webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
            await webcam.setup(); // request access to the webcam
            await webcam.play();
            window.requestAnimationFrame(loop);
    
            // append/get elements to the DOM
            const canvas = document.getElementById("canvas");
            canvas.width = size; canvas.height = size;
            ctx = canvas.getContext("2d");
            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                labelContainer.appendChild(document.createElement("div"));
            }
        }
    
        async function loop(timestamp) {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
        }
    
        async function predict() {
            // Prediction #1: run input through posenet
            // estimatePose can take in an image, video or canvas html element
            const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
            // Prediction 2: run input through teachable machine classification model
            const prediction = await model.predict(posenetOutput);
    
            for (let i = 0; i < maxPredictions; i++) {
                const classPrediction =
                    prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                labelContainer.childNodes[i].innerHTML = classPrediction;
            }
            
            // finally draw the poses
            drawPose(pose);
        }
    
        function drawPose(pose) {
            if (webcam.canvas) {
                ctx.drawImage(webcam.canvas, 0, 0);
                // draw the keypoints and skeleton
                if (pose) {
                    const minPartConfidence = 0.5;
                    tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                    tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
                }
            }
        }
    </script>
    `;
    var body = `손을 머리위로 쭉 펴보세요
    `;

  html=template.html(title, list, control, body);

    response.send(html);
}