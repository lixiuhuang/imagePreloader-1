function preloader(o) {
    this.data = o.data || [];
    var that = this;

    var option = {
        n: 0, //计数器
        path: '', //html引用地址
        state: {}, //es5属性监听

        listeners: o.listeners || null,//进度监听

        status: {
            completedCount: 0,
            totalCount: that.data.length,
            success: false,
            error: true
        }
    }

    Object.defineProperty(option, 'state', {
        set: function() {
            getImg();
            option.listeners(option.status);
        },
        get: function() {
            getImg();
            option.listeners(option.status);
        }
    })

    function getImg() {
        var img = new Image();
        if (!that.data[option.status.completedCount]) {
            return;
        }

        img.src = 'images/' + that.data[option.status.completedCount];
        option.status.completedCount++;

        if (img.complete) {
            option.state;
        } else {
            img.onload = function() {
                option.state;
            }
            img.onerror = function() {
                option.state = null;
            }
        }
    }

    this.getImage = function() {
        getImg();
    }
}

preloader.prototype = {
    add: function(s) {
        this.data.push(s);
    },
    start: function() {
        this.getImage();
        this.getImage();
        this.getImage();
    }

}

var a = new preloader({
    data: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png", "16.png", "17.png", "18.png", "19.png", "20.png", "21.png", "22.png", "23.png", "24.png", "25.png", "26.png", "27.png", "28.png", "29.png", "30.png"],
    listeners: function(e) {
        console.log(1,JSON.stringify(e));
    }
});
a.start();