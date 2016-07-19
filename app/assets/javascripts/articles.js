jQuery(function ($) {
    $(document).ready(function(){
        $('.create-article').click(function (event) {
            event.preventDefault();
            var articleData   = $('#new_article').serialize();
            var articleTitle = $("#article_title").val();
            var articleText = $("#article_text").val();
            ClickAction (articleTitle, articleText, articleData);
        });

        $('.delete-article-button').click( function (event) {
            event.preventDefault();
            var current_item_tr = $(this).parents('tr')[0];
            // if(confirm("Вы уверены?")){
            $.ajax({
                url: '/articles/'+$(current_item_tr).attr('data-item_id'),
                type: 'DELETE',
                success: function () {
                    // $(current_item_tr).hide(300);
                    $(current_item_tr).remove();
                },
                error: function () {
                    console.log("delete error");
                }
            })
            // }
        })
        $('.edit-article-button').click( function () {
            var current_item_tr = $(this).parents('tr')[0];
            var current_id = $(current_item_tr).attr('data-item_id');
            $('#article_title').attr('value','');
            $('#article_text').text('');
            console.log("starting edit");
            $('.edit-article').show(300);
            $.ajax({
                url: '/articles/'+current_id+'/edit',
                type: 'GET',
                dataType: 'json',
                success: function (jsondata) {
                    var current_form = $('form#edit_article');
                    $(current_form).attr('data-item_id',jsondata.id);
                    $('#article_title').attr('value',jsondata.title);
                    if ((jsondata.text) == (null)) {
                        $('#article_text').text('');
                    } else {
                        $('#article_text').text(jsondata.text);
                    }
                }
            });
        });

        $('.change-article').click (function (event) {
            event.preventDefault();
            var current_form = $('form#edit_article');
            var articleId = $(current_form).attr('data-item_id');
            var articleData   = $('#edit_article').serialize();
            var articleTitle = $("#article_title").val();
            var articleText = $("#article_text").val();
            if((articleTitle.length > 4)&(articleText.length > 4)) {
                $.ajax({
                    url: '/articles/' + articleId,
                    type: 'PATCH',
                    data: articleData,
                    success: function () {
                        $('.edit-article').hide(300);
                        var current_tr = $('tr[data-item_id="' + articleId +'"]');
                        var all_td = current_tr.children([$('td')]);
                        all_td.eq(0).text(articleTitle);
                        all_td.eq(1).text(articleText);
                    },
                    error: function () {
                        console.log("change error")
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
        function ClickAction (title, text, msg) {
            if((title.length > 4)&(text.length > 4)) {
                $.ajax({
                    url: '/articles',
                    type: 'POST',
                    data: msg,
                    success: function () {
                    },
                    error: function () {
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
});

