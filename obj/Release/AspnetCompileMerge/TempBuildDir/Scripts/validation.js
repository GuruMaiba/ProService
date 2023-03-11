const validaionModule = (function() {
    const init = function() {
        setUpListeners();
    }

    const setUpListeners = function () {
        $('.form__button').on('click', validationForm);
    }

        // ф-ция с помощью регулярногшо выражения проверяет валидность номера
    function isValidPhone(myPhone) {
        var re = /^\d[\d\(\)\ -]{4,14}\d$/;
        return re.test(myPhone);
    }

    function validationForm() {
        const form = $(this).parent().parent().parent();
        let inputs = form.find('input');
 
        inputs.each(function(index, item) {
            let element = $(item);
            let value = element.val();

            if (!value) {
                element.addClass('error');
            }
        });
    }

    return {
        init
    }
})();
validaionModule.init();