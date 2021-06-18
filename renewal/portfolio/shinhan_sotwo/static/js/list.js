class listFunc {
    constructor(container, session, max) {
        this.container = container;
        this.page = {
            pre: null,
            now: null,
            index: null,
            session: session,
        };
        if (max) {
            this.page.max = max;
        }
        this.loading = {
            start: true,
            end: false,
        };
    }
    //////////////////// load
    load(type, page, callback) {
        var _self = this;

        this.dataBind(function (dataSet) {
            if (type == "pre") {
                $(`${_self.container}  .list`).prepend(_self.pagePrint(dataSet, page));
                $(`${_self.container}  .loading.pre`).css("opacity", "0.3");
                setTimeout(function () {
                    $("#parcel .loading.pre").css("opacity", "0");
                }, 500);
            } else {
                $(`${_self.container}  .list`).append(_self.pagePrint(dataSet, page));
                $(`${_self.container}  .loading.next`).css("opacity", "0.3");
                setTimeout(function () {
                    $(`${_self.container}  .loading.next`).css("opacity", "0");
                }, 500);
            }
        });
        if (callback) {
            setTimeout(function () {
                callback();
            }, 0);
        }
    }
    //////////////////// add
    add() {
        this.page.now++;
        this.load(null, this.page.now);
    }
    //////////////////// pre
    pre() {
        var _self = this;
        var start = $(`${_self.container} .list .page[data-page=${_self.page.pre}] .cell:nth-child(1)`);
        _self.page.pre--;
        this.load("pre", this.page.pre, function () {
            $("html, body").animate({ scrollTop: start.offset().top }, 0);
        });
    }
    //////////////////// init
    init() {
        var _self = this;

        if (sessionStorage.getItem(`${_self.page.session}`)) {
            var localListData = JSON.parse(sessionStorage.getItem(`${_self.page.session}`));
            _self.page.now = localListData.now;
            _self.page.index = localListData.index;
        } else {
            _self.page.now = 1;
        }

        if (_self.page.now > 1) {
            _self.page.pre = _self.page.now;
            _self.load(null, _self.page.now, function () {
                _self.page.pre--;
                var start = $(`${_self.container} .list .page[data-page=${_self.page.now}] .cell:nth-child(${_self.page.index + 1})`);
                _self.load("pre", _self.page.pre, function () {
                    $("html, body").animate({ scrollTop: start.offset().top }, 0);
                });
            });
        } else {
            _self.page.pre = 1;
            _self.load(null, _self.page.now, () => {
                if (_self.page.index) {
                    var start = $(`${_self.container} .list .page[data-page=1] .cell:nth-child(${_self.page.index + 1})`);
                    $("html, body").animate({ scrollTop: start.offset().top }, 0);
                } else {
                    $("html, body").animate({ scrollTop: 0 }, 0);
                }
            });

            var lastPoint = $(`${_self.container} .list`).offset().top + $(`${_self.container} .list`).height();
            var winHeight = $(window).height();
            if (winHeight >= lastPoint && _self.page.max > 1) {
                _self.load(null, _self.page.now);
            }
        }

        $(window).on("scroll", function () {
            var winHeight = $(window).height();
            var documentHeight = $(document).height();
            var scrollTop = $(window).scrollTop();
            var endPoint = scrollTop + winHeight;
            var startPoint = $(`${_self.container} .list .cell:first-child`).offset().top;

            if (scrollTop < startPoint && _self.loading.start == false && _self.page.pre > 1) {
                _self.loading.start = true;
                _self.pre();
            } else if (scrollTop > startPoint) {
                _self.loading.start = false;
            }
            if (documentHeight === endPoint && _self.page.now < _self.page.max) {
                _self.add();
            }
        });
    }
    //////////////////// link
    link(url, page, index) {
        if (page && index) {
            var dataValue = {
                now: page,
                index: index,
            };
            sessionStorage.setItem(`${this.page.session}`, JSON.stringify(dataValue));
        } else {
            sessionStorage.removeItem(`${this.page.session}`);
        }
        location.href = url;
    }
    //////////////////// link
    reset() {
        var _self = this;
        var dataValue = {
            now: 1,
            index: 0,
        };
        sessionStorage.setItem(`${this.page.session}`, JSON.stringify(dataValue));
        $(`${_self.container} .list`).html("");
        this.init();
        $("html, body").animate({ scrollTop: 0 }, 500);
    }
}
