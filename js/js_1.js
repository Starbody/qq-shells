$(function(){
    var list1=$(".week-nav li");
    var activea=$(".active-list a");
    var weeknum=$(".week-num");
    list1.mouseover(function(){
        list1.find('img').removeClass("show");
        $(this).find('img').addClass("show");
        weeknum.removeClass("show-num-bg");
        $(this).find(".week-num").addClass("show-num-bg");
    })
    activea.mousemove(function(){
        $(this).attr("id","hidden");
        $(this).find("span").removeClass("list-bg");
        $(this).find("span").addClass("active-span-bg");
    }).mouseout(function(){
        $(this).removeAttr("id");
        $(this).find("span").addClass("list-bg");
    })
});
//�ֲ�ͼ
var container=document.getElementById("container");
var list=document.getElementById("lunbo");
var buttons=document.getElementById("buttons").getElementsByTagName("span");
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var index=1;
var type=false;
var timer;
//���ڿ���С����ı���ɫ
function showButton(){
    for(var i=0;i<buttons.length;i++){
        if(buttons[i].className=="on"){
            buttons[i].className="";
            break;
        }
    }
    buttons[index-1].className="on";
}
function animate(offset){
    type=true;
    var newList=parseInt(list.style.left)+offset;
    var time=300;//λ����ʱ��
    var interval=10;//λ�Ƽ��ʱ��
    var speed=offset/(time/interval);//ÿ�ε�λ����
    function go(){
        if((speed<0 && parseInt(list.style.left)>newList) || (speed>0 && parseInt(list.style.left)<newList)){
            list.style.left=parseInt(list.style.left)+speed+"px";
            setTimeout(go,interval);
        }else{
            type=false;
            list.style.left=newList+"px";
            if(newList>-740){
                list.style.left=-2960+"px";
            }
            if(newList<-2960){
                list.style.left=-740+"px";
            }
        }
    }
    go();

}
function play(){
    timer=setInterval(function(){
        next.onclick();
    },3000);
}
function stop(){
    clearInterval(timer);
}
//������ҵļ�ͷ
next.onclick=function(){
    if(index==4){
        index=1;
    }else{
        index+=1;
    }
    showButton();
    if(!type){
        animate(-740);
    }
}
//�������ļ�ͷ
prev.onclick=function(){
    if(index==1){
        index=4;
    }else{
        index-=1;
    }
    showButton();
    if(!type){
        animate(740);
    }
}
for(var i=0;i<buttons.length;i++){
    buttons[i].onclick=function(){
        if(this.className=="on"){
            return;
        }
        var myindex=parseInt(this.getAttribute("index"));
        var offset=-740*(myindex-index);
        animate(offset);
        index=myindex;
        showButton();
    }
}
container.onmousemove=stop;
container.onmouseout=play;
play();

