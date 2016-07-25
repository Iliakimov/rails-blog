jQuery(function ($) {
    $(document).ready(function(){
        //******************************************************************** СОЗДАНИЕ

        $('.create-article').click( function (event) {
            event.preventDefault();
            var articleData   = $('form#new_article').serialize();
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
                        window.location.replace(jsondata.id);
                    },
                    error: function () {
                        console.log('error create')
                    }
                })
            }
            else {
                console.log("create error");
                $('form#new_article #errors').show();
                if (articleTitle.length <= 4) {
                    $('form#new_article #title_error').show()
                }
                else {
                    $('form#new_article #title_error').hide()
                }
                if (articleText.length <= 4) {
                    $('form#new_article #text_error').show()
                }
                else {
                    $('form#new_article #text_error').hide()
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
            $('.new-article').hide();
            $('.edit-article').show();
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
            var articleData   = $('form#edit_article').serialize();
            var articleTitle = $("form#edit_article #article_title").val();
            var articleText = $("form#edit_article #article_text").val();
            if((articleTitle.length > 4)&(articleText.length > 4)) {
                $.ajax({
                    url: '/articles/' + articleId,
                    type: 'PATCH',
                    data: articleData,
                    success: function () {
                        $('.edit-article').hide();
                        var current_tr = $('tr[data-item_id="' + articleId +'"]');
                        var all_td = current_tr.children([$('td')]);
                        all_td.eq(0).text(articleTitle);
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
                $('#errors').show();
                if (articleTitle.length <= 4) {
                    $('form#edit_article #title_error').show()
                }
                else {
                    $('form#edit_article #title_error').hide()
                }
                if (articleText.length <= 4) {
                    $('form#edit_article #text_error').show()
                }
                else {
                    $('form#edit_article #text_error').hide()
                }
            }
        });

        $('.undo-change-article').click (function (event) {
            event.preventDefault();
            $('.edit-article').hide();
            $('form#edit_article #article_title').attr('value','');
            $('form#edit_article #article_text').text('');
            $('form#edit_article #article_category').attr('value',"5");
        })


        //******************************************************************** КАТЕГОРИИ
        // $.ajax({
        //     url: '/categories/',
        //     type: 'GET',
        //     dataType: 'json',
        //     success: function (jsondata) {
        //         console.log(jsondata);
        //         console.log(jsondata.length);
        //         console.log(jsondata[1]);
        //         for(i = 0; i < jsondata.length; i++){
        //             num = i+1;
        //             $('#article_category_id').append('<option value='+num+'>'+jsondata[i].name+'</option>>');
        //         }
        //     }
        // });
    });
});

