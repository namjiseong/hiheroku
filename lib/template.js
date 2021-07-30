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