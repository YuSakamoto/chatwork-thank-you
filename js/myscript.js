const DEFAULT_STATEMENTS = [
  '有難うございます',
  '承知致しました',
]
const DEFAULT_SUFFIX = [
  '。',
  '！',
  '(bow)',
]
const DEFAULT_KEY_CODES = {
  'STATEMENT' : 91,
  'SUFFIX' : 16,
}

var settings = {
  'keyCodes': {
    'statement':DEFAULT_KEY_CODES.STATEMENT,
    'suffix':DEFAULT_KEY_CODES.SUFFIX
  },
  'statements':DEFAULT_STATEMENTS,
  'suffixes':DEFAULT_SUFFIX
};

chrome.storage.sync.get(["model"], function(model) {
  if (model.model == undefined) {
    return;
  }
  settings = model.model;
});


var statementIndex = 0;

var suffixIndex = 0;

var THANK_YOU_DOM = '<li role="button" class="_cwABAction linkStatus thankYou" data-cwui-ab-type="reply"><span class="icoFontActionReply"></span><span class="_showAreaText showAreatext"></span></li>';

function addThankYou() {
  $(".thankYou").remove();
  $("ul._messageActionNav").not(".thankYou").prepend(THANK_YOU_DOM);
  $(".thankYou").click(function(){
    $(this).next().click();
    var statements = settings.statements[statementIndex].split('/');
    var selectedStatement = statements[Math.floor(Math.random() * statements.length)];

    var suffixes = settings.suffixes[suffixIndex].split('/');
    var selectedSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    $("#_chatText").val($("#_chatText").val() + selectedStatement + selectedSuffix);
    $("#_sendButton").click();
  });
  $(".thankYou span:last-child").text(settings.statements[statementIndex].split('/')[0] + settings.suffixes[suffixIndex].split('/')[0]);
}



$(window).keydown(function(e){
  if (e.keyCode == settings.keyCodes.statement) {
    statementIndex = (settings.statements.length - 1 < statementIndex + 1) ? 0 : statementIndex + 1;
    addThankYou();
  } else if (e.keyCode == settings.keyCodes.suffix) {
    suffixIndex = (settings.suffixes.length - 1 < suffixIndex + 1) ? 0 : suffixIndex + 1;
    addThankYou();
  }
});