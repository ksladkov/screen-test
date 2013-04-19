var screenTests;

$(document).ready(function(){
    if (!(screenTests instanceof Array)) return;

    var content = document.getElementById('testing-page');
    var controls = $('.testing-controls');
    var testList = $('.testing-list', controls).empty();

    screenTests.forEach(function(test){
        testList.append(
            $('<li></li>').addClass('testing-list__item').text(test.title).data('test', test)
        );
    });

    testList.on('click', '.testing-list__item', function(){
        $('.testing-list__item_current', testList).removeClass('testing-list__item_current');
        var test = $(this).addClass('testing-list__item_current').data('test');
        setCurrentTest(test);
    });

    function setCurrentTest(test) {
        content.setAttribute('src', test.page);
        $(content).on('load', function(){
            var page = content.contentDocument;
            var testingElement = $(test.element, page);
            if (!testingElement.length) return;

            var testingOffset = testingElement.offset();

            var screen = $('<div></div>').append($('<img>').attr('src', test.screen)).css({
                'position': 'absolute',
                'z-index': 1,
                'width': testingElement.width(),
                'height': testingElement.height()
            });
            testingElement.before(screen).offset(testingOffset).css({
                'opacity':'0.5',
                'z-index': 2
            });
            screen.offset(testingOffset);

        });
    }

});