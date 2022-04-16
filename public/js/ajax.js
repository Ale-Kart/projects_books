let renderLikes = $("#renderLikes");
$("#btnLikesAutor").on('click', function (e) {
    e.preventDefault();
    let idProfile = $(this).data("id");
    // $.post(`/livros/${idProfile}/like`).done(data => {
    //     console.log(data);
    // });
    req = $.ajax({
        url : `http://localhost:1234/Autores/${idProfile}/like`,
        type : "POST",
        data: renderLikes.html(),
        
    });
    req.done((data)=>{
        renderLikes.html(data.likes + 1);
        console.log("data do jquery => ",data);
    });
});

let renderLikesByLivro = $("#renderLikesByLivro");
$("#btnLikesLivro").on('click', function (e) {
    e.preventDefault();
    let idProfile = $(this).data("id");
    // $.post(`/livros/${idProfile}/like`).done(data => {
    //     console.log(data);
    // });
    req = $.ajax({
        url : `http://localhost:1234/livros/${idProfile}/like`,
        type : "POST",
        data: renderLikes.html(),
        
    });
    req.done((data)=>{
        renderLikesByLivro.html(data.likes + 1);
        console.log("data do jquery => ",data);
    });
});