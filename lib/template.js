exports.html = function(title, list, control, body){
    return `
    <!doctype html>
    <html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
            
            
            <link rel="stylesheet" href="/css/style.css">
            
            
            
        </head>
        <body>
            <h1 id=title><a href="/">게시판 홈페이지</a></h1>
            
            <div id=top_list>${list}</div>
            <p id=control> ${control}</p>
            <p>${body}</p>
        </body>
    </html>
    `;
}
exports.authorSelect= function (authors, author_id) {
    var tag = "";
    var i = 0;
    while (i < authors.length) {
      var selected = "";
      if (authors[i].id === author_id) {
        selected = "selected";
      }
      tag =
        tag +
        `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i++;
    }
    return `
  <select name="author">
  ${tag}
  </select> 
  `;
  }