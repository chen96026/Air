$(() => {
    console.log($('#forum_sort').val());
    
    $('#forum_sort').change(function() {
        switch (
            $(this).val()
        ) {
            case 'postDate':
                console.log($(this).val());
                break;
            case 'likes':
                console.log($(this).val());
                break;
            case 'rating':
                console.log($(this).val());
                break;
        }
    })
})