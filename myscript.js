var STATEMENTS = [
  '有難うございます',
  '承知致しました',
]
var SUFFIX = [
  '。',
  '！',
  '(bow)',
]

var statementIndex = 0;

var suffixIndex = 0;

var THANK_YOU_DOM = '<li role="button" class="_cwABAction linkStatus thankYou" data-cwui-ab-type="reply"><span class="icoFontActionReply"></span><span class="_showAreaText showAreatext"></span></li>';

function addThankYou() {
  $(".thankYou").remove();
  $("ul._messageActionNav").not(".thankYou").prepend(THANK_YOU_DOM);
  $(".thankYou").click(function(){
    $(this).next().click();
    $("#_chatText").val($("#_chatText").val() + STATEMENTS[statementIndex] + SUFFIX[suffixIndex]);
    $("#_sendButton").click();
  });
  $(".thankYou span:last-child").text(STATEMENTS[statementIndex] + SUFFIX[suffixIndex]);
}






$(window).keydown(function(e){
  if (e.keyCode == 91 || e.keyCode == 17) {
    statementIndex = (STATEMENTS.length - 1 < statementIndex + 1) ? 0 : statementIndex + 1;
    addThankYou();
  } else if (e.keyCode == 16) {
    suffixIndex = (SUFFIX.length - 1 < suffixIndex + 1) ? 0 : suffixIndex + 1;
    addThankYou();
  }
});