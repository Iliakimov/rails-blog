jQuery(function ($) {
    $('.save-article').click(function (event) {
        event.preventDefault();
        var msg   = $('#new_article').serialize();
        var articleTitle = $("#article_title").val();
        var articleText = $("#article_text").val();
        if((articleTitle.length > 4)&(articleText.length > 4)) {
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
            if (articleTitle.length <= 4) {
                $('#title_error').show(300)
            }
            else {
                $('#title_error').hide(300)
            }
            if (articleText.length <= 4) {
                $('#text_error').show(300)
            }
            else {
                $('#text_error').hide(300)
            }
        }
    });



    function ClickFunction () {
        var msg   = $('form_article').serialize();
        var articleTitle = $("#article_title").val();
        var articleText = $("#article_text").val();
        if((articleTitle.length > 4)&(articleText.length > 4)) {
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
            if (articleTitle.length <= 4) {
                $('#title_error').show(300)
            }
            else {
                $('#title_error').hide(300)
            }
            if (articleText.length <= 4) {
                $('#text_error').show(300)
            }
            else {
                $('#text_error').hide(300)
            }
        }
    }
});

