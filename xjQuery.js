(function(window){
    var xjQuery=function(selector){
        return new xjQuery.prototype.init(selector);
    };
    xjQuery.prototype={
        constructor:xjQuery,
        init:function(selector){
            //0.取出字符串两端的空格
            selector=xjQuery.trim(selector);
            //传入''  null  undefined NaN 0 false
            if(!selector){
                // console.log(this);

            }
            //函数
             else if(xjQuery.isFunction1(selector)){
                // console.log("是方法");
                xjQuery.ready1(selector);
            }
            //字符串
            else if(xjQuery.isString(selector)){
                //2.1判断是否是代码片段
                if(xjQuery.isHTML(selector)){
                    //1.根据代码片段创建所有元素
                    var temp=document.createElement("div");
                    temp.innerHTML=selector;
                    console.log(temp);
                    /*
                    //2.将创建好的一级元素添加到jquery中
                    for(var i=0;i<temp.children.length;i++){
                        this[i]=temp.children[i];
                    }

                    //3.给jquery对象添加length属性
                    this.length=temp.children.length;
                    */

                   [].push.apply(this,temp.children);
                    //4.加工好的this(jquery)

                }
                //2.2判断是否是选择器
                else{
                    //1.根据传入的选择器查找到相应的元素
                    var res=document.querySelectorAll(selector);
                    console.log(res);
                    //2.将找到的元素添加到jquery上
                    for(var i=0;i<res.length;i++){
                        this[i]=res[i];
                    }
                    //3.给jquery对象添加length属性
                    this.length=res.length;
                    // [].push.apply(this,res);

                    //3.返回加工好的this

                }
            }
            //数组
            else if( xjQuery.isArray(selector) ){
                // console.log(this); init{}
                // console.log("是数组");
                /*
                //3.1真数组
                if(({}).toString.apply(selector)==="[object Array]"){
                    // console.log("真数组");

                    [].push.apply(this,selector);
                    return this;
                }else{
                    //3.2伪数
                    // console.log(selector);
                    console.log(this);
                    console.log("wei数组");
                    //将自定义的伪数组转换为真数组
                    var arr=[].slice.call(selector);
                    //再将真数组转化为伪数组
                    [].push.apply(this,arr);
                    return this;
                }
                */
                // 将自定义的伪数组转换为真数组
                var arr=[].slice.call(selector);
                //再将真数组转化为伪数组
                [].push.apply(this,arr);

            }
            //除上述类型 对象 dom元素  基本类型
            else{
                this[0]=selector;
                this.length=1;

            }
            return this;
        },
        jquery:"1.1.0",
        selector:"",
        length:0,
        push:[].push,
        sort:[].sort,
        splice:[].splice,
        toArray:function(){
            return [].slice.call(this);
        },
        get1:function(num){
            if(arguments.length===0){
               return  this.toArray();
            }
            if(num<0){
                return this[num+this.length];
            }else{
                return this[num];
            }


        },
        eq:function(num){
            if(arguments.length===0){
                return new xjQuery();
            }else{
                return xjQuery(this.get1(num));
            }
        },
        first:function(){
            return this.eq(0);
        },
        last:function(){
            return this.eq(this.length-1);
        },
        each:function(fn){
            return xjQuery.each(this,fn);
        }


    };

    //工具方法抽取
    xjQuery.extend=xjQuery.prototype.extend=function(obj){
        for(var key in obj){
            this[key]=obj[key];
        }
    }
    xjQuery.extend({
        isObject:function(sele){
            return typeof  sele==="object";
        },
        isWindow:function(sele){
        return sele!==window;
    },
        isArray:function(sele){
             if(xjQuery.isObject(sele)&&
            "length" in sele &&xjQuery.isWindow(sele)){
                 // console.log("11");
            return true;
        }
            // console.log("22");
    },
        isString:function(str){
            return typeof str==="string";
    },
        isHTML:function(str){
            return str.charAt(0)=="<"&&
            str.charAt(str.length-1)==">"&&
            str.length>=3;
    },
        isFunction1:function(sele){
            return typeof sele==="function";
    },
        trim:function(str){
        if(!xjQuery.isString(str)){
            return str;
        }
        //判断是否支持trim方法，低级浏览器不支持trim方法
        if(str.trim){
            return str.trim();
        }else{
            return str.replace(/^\s+|\s+$/g,"");
        }
    },
        ready1:function(fn){
            //判断DOM是否加载完毕
            if(document.readyState==="complete"){
                fn();
            }else
                if(document.addEventListener){
                document.addEventListener("DOMContentLoaded",function(){
                    fn();
                });
            }else{
                document.attachEvent("onreadystatechange",function(){
                    if(document.readyState==="complete"){
                        fn();
                    }
                });
            }

        },
        each:function(obj,fn){
            //1.判断是否是数组
            if(xjQuery.isArray(obj)){
                for(var i=0;i<obj.length;i++){
                    var res=fn.call(obj[i],i,obj[i]);
                    if(res===true){
                        continue;
                    }
                    else if(res===false){
                        break;
                    }
                }

            }
            //2.判断是否是对象
            else if(xjQuery.isObject(obj)){
                for(var key in obj){
                    var res=fn.call(obj[key],key,obj[key]);
                    if(res===true){
                        continue;
                    }else if(res===false){
                        break;
                    }
                }
            }
            return obj;
        },
        map:function(obj,fn){
            var res=[];
            //1.判断是否是数组
            if(xjQuery.isArray(obj)){
                for(var i=0;i<obj.length;i++){
                    var temp=fn(obj[i],i);
                    if(temp){
                        res.push(temp);
                    }
                }
            }
            //2.判断是否是对象
            else if(xjQuery.isObject(obj)){
                for(var key in obj){
                    var temp=fn(obj[key],key);
                    if(temp){
                        res.push(temp);
                    }
                }
            }
            return res;
        }
    });
    xjQuery.prototype.extend({
        empty:function(){
            //遍历找到的元素
            this.each(function(key,value){
                value.innerHTML="";
            });
            //方便链式编程
            return this;
        },
        remove:function(sele){
            if(arguments.length===0){
                this.each(function(key,value){
                    var parent=value.parentNode;
                    parent.removeChild(value);
                });
            }else{
                var $this=this;
                //1.根据传入的选择器找到对应的元素
                $(sele).each(function(key,value){
                    //2.遍历找到的元素，获取对应类型
                    var type=value.tagName;
                    //3.遍历指定的元素
                    $this.each(function(k,v){
                        //4.获取指定元素的类型
                        var t=v.tagName;
                        //5.判断找到的元素类型和指定元素的类型
                        if(t===type){
                            var parent=value.parentNode;
                            parent.removeChild(value);
                        }
                    });


                });


            }
            return this;
        },
        html:function(content){
            if(arguments.length===0){
                return this[0].innerHTML;
            }else{
                this.each(function(key,value){
                    value.innerHTML=content;
                });
            }
        },
        text:function(content){
            if(arguments.length=== 0){
                var res='';
                this.each(function(key,value){
                    res+=value.innerText;
                });
                return res;
            }else{
                this.each(function(key,value){
                    value.innerText=content;
                })
            }
        },
        appendTo:function(sele){
            //选择器、jQuery对象、dom元素
            var $target=$(sele);
            var $this=this;
            var res=[];
            $.each($target,function(key,value){
                $this.each(function(k,v){
                    if(key===1){
                        value.appendChild(v);
                        res.push(v);
                    }else{
                        var temp=v.cloneNode(true);
                        value.appendChild(temp);
                        res.push[temp];
                    }
                });
            });
            //返回
            return $(res);
            // //1.遍历取出所有指定的元素
            // for(var i=0;i<$target.length;i++){
            //     var targetEle=$target[i];
            //     //2.遍历取出所有的元素
            //     for(var j=0;j<$this.length;j++){
            //         var sourceEle=$this[i];
            //         //3.判断当前是否是第0个指定元素
            //         if(i===0){
            //             //直接添加
            //             targetEle.appendChild(sourceEle);
            //         }else{
            //             //先拷贝再添加
            //             var temp=sourceEle.cloneNode(true);
            //             targetEle.appendChild(temp);
            //         }
            //     }
            // }

        },
        prependTo:function(sele){
            //选择器、jQuery对象、dom元素
            var $target=$(sele);
            var $this=this;
            var res=[];
            $.each($target,function(key,value){
                $this.each(function(k,v){
                    if(key===1){
                        value.insertBefore(v,value.firstChild);
                        res.push(v);
                    }else{
                        var temp=v.cloneNode(true);
                        value.insertBefore(temp,value.firstChild);
                        res.push[temp];
                    }
                });
            });
            //返回
            return $(res);
        },
        append:function(sele){
            //判断传入的参数是否是字符串
            if(xjQuery.isString(sele)){
                this[0].innerHTML+=sele;
            }else{
                $(sele).appendTo(this);
            }
            return this;
        },
        prepend:function(sele){
            //判断传入的参数是否是字符串
            if(xjQuery.isString(sele)){
                this[0].innerHTML=sele+this[0].innerHTML;
            }else{
                $(sele).prependTo(this);
            }
            return this;
        }
    });
    xjQuery.prototype.init.prototype=xjQuery.prototype;
    window.xjQuery=window.$=xjQuery;
})(window);