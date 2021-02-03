$(function(){
        $("body").delegate(".comment","propertychange input",function(){
            if($(this).val().length>0){
                $(".send").prop("disabled",false);
            }else{
                $(".send").prop("disabled",true);
            }
        });


        $(".send").click(function(){
            $(".send").prop("disabled", true);
            var $text=$(".comment").val();
            var $weibo=createEle($text);
            $(".messageList").prepend($weibo);
            $(".comment").val("");
        });
        $("body").delegate(".infoTop","click",function(){
            // alert("top");
            var i=parseInt($(this).text())+1;

            $(this).text(i);

        });
        $("body").delegate(".infoDown","click",function(){
            // alert("down");
            var i=parseInt($(this).text())+1;

            $(this).text(i);
        });
        $("body").delegate(".del","click",function(){
            // alert("del");
            $(this).parents(".info").remove();
        });

        function createEle(text){
            $weibo=$("<div class=\"info\">\n" +
                "                    <p class=\"infoText\">\n" +
                "                        "+text+"\n" +
                "                    </p>\n" +
                "                    <p class=\"infoOperation\">\n" +
                "                        <span class=\"infoTime\">"+createTime()+"</span>\n" +
                "                        <span class=\"infoHandle\">\n" +
                "                            <a href=\"javascropt:;\"  class=\"infoTop\">0</a>\n" +
                "                            <a href=\"javascropt:;\" class=\"infoDown\">0</a>\n" +
                "                            <a href=\"javascropt:;\" class=\"del\">删除</a>\n" +
                "                        </span>\n" +
                "                    </p>\n" +
                "                </div>");
            return $weibo;
        }

        function createTime(){
            var date=new Date();
            var year=date.getFullYear();
            var mouth=date.getMonth()+1;
            var day=date.getDate();
            var hour=date.getHours();
            var min=date.getMinutes();
            var sec=date.getSeconds();
            $time=year+"-"+mouth+"-"+day+" "+hour+":"+min+":"+sec;
            return $time;
        }
    }
);