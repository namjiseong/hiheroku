var template = require('./template.js')


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
    var title = 'together';
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
            <h4>글쓰기</h4>
        </div>


        <table>
        <caption>버그 리포트</caption>
                <thead>
                    <tr>
                                    <th>번호</th>
                
                <th>제목</th>

                                    <th>글쓴이</th>
                
                                    <th>등록일</th>
                
                                    <th>조회</th>
                
                                    <th>추천</th>
                                </tr>
            </thead>
            
            <tbody>
            </tbody>
        </table>


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

}