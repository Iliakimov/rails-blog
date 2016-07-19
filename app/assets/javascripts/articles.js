jQuery(function ($) {
    $('.create-article').click(function (event) {
        event.preventDefault();
        var articleData   = $('#new_article').serialize();
        var articleTitle = $("#article_title").val();
        var articleText = $("#article_text").val();
        ClickAction (articleTitle, articleText, articleData);
    });

    $('#edit_article').ready( function () {
        var msg;
        $.ajax({
            url: '/articles/:id',
            type: 'GET',
            data: msg,
            succes: function (msg) {
                console.log(msg);
            }
        });
    })




    function ClickAction (title, text, msg) {
        if((title.length > 4)&(text.length > 4)) {
            $.ajax({
                url: '/articles',
                type: 'POST',
                data: msg,
                success: function (result) {
                    console.log(result)
                },
                error: function (xhr) {
                    console.log(xhr.responseCode)
                }
            })
        }
        else {
            console.log("error");
            // $('#errors').css("display", "block");
            $('#errors').show(300);
            if (title.length <= 4) {
                $('#title_error').show(300)
            }
            else {
                $('#title_error').hide(300)
            }
            if (text.length <= 4) {
                $('#text_error').show(300)
            }
            else {
                $('#text_error').hide(300)
            }
        }
    }
});

