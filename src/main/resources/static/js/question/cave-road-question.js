import { leftScrean, rightScrean } from "./my-question.js"

$(function(){
    $('.cave-road-screan').not($('.cave-road-screan').eq(0)).hide();
    leftScrean();
    rightScrean();
})