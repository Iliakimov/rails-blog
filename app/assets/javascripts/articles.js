jQuery(function ($) {
    $(document).ready(function(){
        //******************************************************************** СОЗДАНИЕ

        $('.create-article').click( function (event) {
            event.preventDefault();
            console.log('start create');
            var articleData   = $('form#new_article').serialize();
            console.log(articleData);
            var articleTitle = $("form#new_article #article_title").val();
            var articleText = $("form#new_article #article_text").val();
            var articleCategory = $("form#new_article #article_category").val();
            if((articleTitle.length > 4)&(articleText.length > 4)) {
                $.ajax({
                    url: '/articles/',
                    type: 'POST',
                    data: articleData,
                    dataType: 'json',
                    success: function (jsondata) {
                        console.log(jsondata);
                        window.location.replace(jsondata.id);
                    },
                    error: function () {
                        console.log('error create')
                    }
                })
            }
            else {
                console.log("create error");
                $('form#new_article #errors').show(300);
                if (articleTitle.length <= 4) {
                    $('form#new_article #title_error').show(300)
                }
                else {
                    $('form#new_article #title_error').hide(300)
                }
                if (articleText.length <= 4) {
                    $('form#new_article #text_error').show(300)
                }
                else {
                    $('form#new_article #text_error').hide(300)
                }
            }
        });

        //******************************************************************** УДАЛЕНИЕ

        $('.delete-article-button').click( function (event) {
            event.preventDefault();
            var current_item_tr = $(this).parents('tr')[0];
            // if(confirm("Вы уверены?")){
            $.ajax({
                url: '/articles/'+$(current_item_tr).attr('data-item_id'),
                type: 'DELETE',
                success: function () {
                    $(current_item_tr).remove();
                },
                error: function () {
                    console.log("delete error");
                }
            })
            // }
        })

        //******************************************************************** ИЗМЕНЕНИЕ

        $('.edit-article-button').click( function () {
            var current_item_tr = $(this).parents('tr')[0];
            var current_id = $(current_item_tr).attr('data-item_id');
            $('#article_title').attr('value','');
            $('#article_text').text('');
            $('.new-article').hide(300);
            $('.edit-article').show(300);
            $.ajax({
                url: '/articles/'+current_id+'/edit',
                type: 'GET',
                dataType: 'json',
                success: function (jsondata) {
                    var current_form = $('form#edit_article');
                    $(current_form).attr('data-item_id',jsondata.id);
                    $('#article_title').attr('value',jsondata.title);
                    if(jsondata.category_id==null) {
                        $('#article_category_id').val(5);
                    } else {
                        $('#article_category_id').val(jsondata.category_id);
                    };
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
            var articleId = + ($(current_form).attr('data-item_id'));
            console.log(articleId);
            var articleData   = $('form#edit_article').serialize();
            console.log(articleData);
            var articleTitle = $("form#edit_article #article_title").val();
            var articleText = $("form#edit_article #article_text").val();
            console.log(articleData);
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
                        $('form#edit_article #article_title').attr('value','');
                        $('form#edit_article #article_text').text('');
                        $('form#edit_article #article_category').attr('value',"5");
                    },
                    error: function () {
                        console.log("change error")
                    }
                })
            }
            else {
                console.log("error");
                $('#errors').show(300);
                if (articleTitle.length <= 4) {
                    $('form#edit_article #title_error').show(300)
                }
                else {
                    $('form#edit_article #title_error').hide(300)
                }
                if (articleText.length <= 4) {
                    $('form#edit_article #text_error').show(300)
                }
                else {
                    $('form#edit_article #text_error').hide(300)
                }
            }
        });

        $('.undo-change-article').click (function (event) {
            event.preventDefault();
            $('.edit-article').hide(300);
            $('form#edit_article #article_title').attr('value','');
            $('form#edit_article #article_text').text('');
            $('form#edit_article #article_category').attr('value',"5");
        })
    });
});

