$(function(){
    var wolfTime;
    //1.监听游戏规则的点击
    $(".rules").click(
        function(){
            $(".rule").stop().fadeIn(100);
            console.log("123");
        }
    );
    //2.监听关闭按钮的点击
    $(".close").click(function(){
        $(".rule").stop().fadeOut(100);
        // var wheight=$("html").scrollTop();
        // $(".container").css(window.scrollTop(wheight));
    });


    function startWolfAnimation() {
        var wolf_1=["./images/h0.png","./images/h1.png","./images/h2.png","./images/h3.png","./images/h4.png","./images/h5.png",
            "./images/h6.png","./images/h7.png","./images/h8.png","./images/h9.png"];
        var wolf_2=["./images/x0.png","./images/x1.png","./images/x2.png","./images/x3.png","./images/x4.png","./images/x5.png",
            "./images/x6.png","./images/x7.png","./images/x8.png","./images/x9.png",];
        var arrPos=[
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"},
        ];
        var $wolfImage=$("<img src='' class='wolfImage'>");
        var posIndex=Math.floor(Math.random()*8);
        $wolfImage.css({
            position:"absolute",
            top:arrPos[posIndex].top,
            left:arrPos[posIndex].left
        });
        var wolfType=Math.round(Math.random())==0?wolf_1:wolf_2;
        wolfIndex=0;
        wolfIndexEnd=5;
        wolfTime=setInterval(function(){
            if(wolfIndex>wolfIndexEnd){
                $wolfImage.remove();
                clearInterval(wolfTime);
                startWolfAnimation();
            }
            $wolfImage.attr("src",wolfType[wolfIndex]);
            console.log(wolfIndex++);
        },250);

        $(".container").append($wolfImage);
        //调用处理游戏规则的方法
        gameRules($wolfImage);
    }

    function gameRules($wolfImage){
        $wolfImage.one("click",function () {
            console.log($(this).attr("src"));
            var $src=$(this).attr("src");
            var flag=$src.indexOf("h")>=0;
            console.log(flag);
            wolfIndex=5;
            wolfIndexEnd=9;
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);
            }else{
                $(".score").text(parseInt($(".score").text())-10);
            }
        });
    }
    //3.监听开始游戏按钮的点击
    $(".start").click(function(){

        $(this).stop().fadeOut(100);
        //4.调用处理进度条的方法
        progressHandler();
        startWolfAnimation();
        //
    });

    $(".restart").click(function() {
            $(".mask").stop().fadeOut(100);
            progressHandler();
            startWolfAnimation();
        }
    );
    //定义一个专门处理进度条的方法
    function progressHandler() {
        $(".progress").css({width: 180});
        //开启定时器处理进度条
        var timer=setInterval(function(){
            //拿到进度条当前的宽度
            var  progressWidth=$(".progress").width();
            //减少当前的宽度
            progressWidth-=1.5;
            //重新给进度条赋值宽度
            $(".progress").css({
                width:progressWidth
            });
            //监听进度条是否走完
            if(progressWidth<=0){
                //关闭定时器
                clearInterval(timer);
                //显示重新开始界面
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
            }
        },20)
    }

    function  stopWolfAnimation(){
        $(".wolfImage").remove();
        clearInterval(wolfTime);
    };

});