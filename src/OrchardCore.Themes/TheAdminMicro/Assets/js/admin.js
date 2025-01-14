function confirmDialog({title, message, okText, cancelText, okCssClass, cancelCssClass, callback}) {
    var $confirmRemoveModalMetadata = $('#confirmRemoveModalMetadata')
    title = title || $confirmRemoveModalMetadata.data('title');
    message = message || $confirmRemoveModalMetadata.data('message');
    okText = okText || $confirmRemoveModalMetadata.data('ok');
    cancelText = cancelText || $confirmRemoveModalMetadata.data('cancel');
    okCssClass = okCssClass || $confirmRemoveModalMetadata.data('okClass');
    cancelCssClass = cancelCssClass || $confirmRemoveModalMetadata.data('cancelClass');

    $('<div id="confirmRemoveModal" class="modal" tabindex="-1" role="dialog">\
        <div class="modal-dialog modal-dialog-centered" role="document">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <h5 class="modal-title">' + title + '</h5>\
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                        <span aria-hidden="true">&times;</span>\
                    </button>\
                </div>\
                <div class="modal-body">\
                    <p>' + message +'</p>\
                </div>\
                <div class="modal-footer">\
                    <button id="modalOkButton" type="button" class="btn ' + okCssClass + '">' + okText + '</button>\
                    <button id="modalCancelButton" type="button" class="btn ' + cancelCssClass + '" data-dismiss="modal">' + cancelText + '</button>\
                </div>\
            </div>\
        </div>\
    </div>').appendTo("body");
    $("#confirmRemoveModal").modal({
        backdrop: 'static',
        keyboard: false
    });

    $("#confirmRemoveModal").on('hidden.bs.modal', function () {
        $("#confirmRemoveModal").remove();
    });

    $("#modalOkButton").click(function () {
        callback(true);
        $("#confirmRemoveModal").modal("hide");
    });

    $("#modalCancelButton").click(function () {
        callback(false);
        $("#confirmRemoveModal").modal("hide");
    });
}

$(function () {
    $("body").removeClass("preload");
});

$(function () {
    $("body").on("click", "[itemprop~='RemoveUrl']", function () {
        var _this = $(this);
        // don't show the confirm dialog if the link is also UnsafeUrl, as it will already be handled below.
        if (_this.filter("[itemprop~='UnsafeUrl']").length == 1) {
            return false;
        }
        // use a custom message if its set in data-message
        var title = _this.data('title');
        var message = _this.data('message');
        var okText = _this.data('ok');
        var cancelText = _this.data('cancel');
        var okCssClass = _this.data('okClass');
        var cancelCssClass = _this.data('cancelClass');
        confirmDialog({ title: title,
             message: message,
             okText: okText, 
             cancelText: cancelText, 
             okCssClass: okCssClass, 
             cancelCssClass: cancelCssClass,  
             callback: function(resp) {
                if (resp) {
                    var url = _this.attr('href');
                    if (url == undefined) {
                        var form = _this.parents('form');
                        // This line is reuired in case we used the FormValueRequiredAttribute
                        form.append($("<input type=\"hidden\" name=\"" + _this.attr('name') + "\" value=\"" + _this.attr('value') + "\" />"));
                        form.submit();
                    }
                    else {
                        window.location = url;
                    }
                }
            }});

        return false;
    });
});

$(function () {
    var magicToken = $("input[name=__RequestVerificationToken]").first();
    if (magicToken) {
        $("body").on("click", "a[itemprop~='UnsafeUrl'], a[data-unsafe-url]", function () {
            var _this = $(this);
            var hrefParts = _this.attr("href").split("?");
            var form = $("<form action=\"" + hrefParts[0] + "\" method=\"POST\" />");
            form.append(magicToken.clone());
            if (hrefParts.length > 1) {
                var queryParts = hrefParts[1].split("&");
                for (var i = 0; i < queryParts.length; i++) {
                    var queryPartKVP = queryParts[i].split("=");
                    //trusting hrefs in the page here
                    form.append($("<input type=\"hidden\" name=\"" + decodeURIComponent(queryPartKVP[0]) + "\" value=\"" + decodeURIComponent(queryPartKVP[1]) + "\" />"));
                }
            }
            form.css({ "position": "absolute", "left": "-9999em" });
            $("body").append(form);

            var unsafeUrlPrompt = _this.data("unsafe-url");
            var title = _this.data("title");
            var message = _this.data('message');
            var okText = _this.data('ok');
            var cancelText = _this.data('cancel');
            var okCssClass = _this.data('okClass');
            var cancelCssClass = _this.data('cancelClass');

            if (unsafeUrlPrompt && unsafeUrlPrompt.length > 0) {
                confirmDialog({title:title, 
                    message: unsafeUrlPrompt, 
                    okText: okText, 
                    cancelText: cancelText, 
                    okCssClass: okCssClass, 
                    cancelCssClass: cancelCssClass,
                    callback: function(resp) {
                        if (resp) {
                            form.submit();
                        }
                    }
                });

                return false;
            }

            if (_this.filter("[itemprop~='RemoveUrl']").length == 1) {
                confirmDialog({title: title, 
                    message: message,
                    okText: okText, 
                    cancelText: cancelText, 
                    okCssClass: okCssClass, 
                    cancelCssClass: cancelCssClass, 
                    callback: function(resp) {
                        if (resp) {
                            form.submit();
                        }
                    }
                });

                return false;
            }

            form.submit();
            return false;
        });
    }
});

function getTechnicalName(name) {
    var result = "", c;

    if (!name || name.length == 0) {
        return "";
    }

    name = removeDiacritics(name);

    for (i = 0; i < name.length; i++) {
        c = name[i];
        if (isLetter(c) || (isNumber(c) && i > 0)) {
            result += c;
        }
    }

    return result;
}

function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function isNumber(str) {
    return str.length === 1 && str.match(/[0-9]/i);
}