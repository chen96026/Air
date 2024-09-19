// Stars
$(() => {
    $('input[name="forum_e_star"]').change(function() {
        switch (
            $(this).val()
        ) {
            case '1':
                $('#forum_star_1').addClass('forum_e_starFill');
                $('#forum_star_2').removeClass('forum_e_starFill');
                $('#forum_star_3').removeClass('forum_e_starFill');
                $('#forum_star_4').removeClass('forum_e_starFill');
                $('#forum_star_5').removeClass('forum_e_starFill');
                break;
            case '2':
                $('#forum_star_1').addClass('forum_e_starFill');
                $('#forum_star_2').addClass('forum_e_starFill');
                $('#forum_star_3').removeClass('forum_e_starFill');
                $('#forum_star_4').removeClass('forum_e_starFill');
                $('#forum_star_5').removeClass('forum_e_starFill');
                break;
            case '3':
                $('#forum_star_1').addClass('forum_e_starFill');
                $('#forum_star_2').addClass('forum_e_starFill');
                $('#forum_star_3').addClass('forum_e_starFill');
                $('#forum_star_4').removeClass('forum_e_starFill');
                $('#forum_star_5').removeClass('forum_e_starFill');
                break;
            case '4':
                $('#forum_star_1').addClass('forum_e_starFill');
                $('#forum_star_2').addClass('forum_e_starFill');
                $('#forum_star_3').addClass('forum_e_starFill');
                $('#forum_star_4').addClass('forum_e_starFill');
                $('#forum_star_5').removeClass('forum_e_starFill');
                break;
            case '5':
                $('#forum_star_1').addClass('forum_e_starFill');
                $('#forum_star_2').addClass('forum_e_starFill');
                $('#forum_star_3').addClass('forum_e_starFill');
                $('#forum_star_4').addClass('forum_e_starFill');
                $('#forum_star_5').addClass('forum_e_starFill');
                break;
            default:
                return;
        }
    })
});