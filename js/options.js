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

function save_options() {
	var model = {
		'keyCodes': {
			'statement':0,
			'suffix':0
		},
		'statements':[],
		'suffixes':[]
	};
	model.keyCodes.statement = $('#statement-key-code').val();
	model.keyCodes.suffix = $('#suffix-key-code').val();

	$(".statement").each(function(i, input) {
		model.statements.push($(input).val());
	});
	$(".suffix").each(function(i, input) {
		model.suffixes.push($(input).val());
	});
	chrome.storage.sync.set({
		"model": model
	}, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
	});
}

function restore_options() {
	chrome.storage.sync.get(["model"], function(model) {
		if (model.model == undefined) {
			model = {
				'model' : {
					'keyCodes': {
						'statement':DEFAULT_KEY_CODES.STATEMENT,
						'suffix':DEFAULT_KEY_CODES.SUFFIX
					},
					'statements':DEFAULT_STATEMENTS,
					'suffixes':DEFAULT_SUFFIX
				}
			};
    }
 		$('#statement-key-code').val(model.model.keyCodes.statement);
 		$('#suffix-key-code').val(model.model.keyCodes.suffix);
 		$.each(model.model.statements, function(i, value) {
 			$(".add-statement").before('<input type="text" class="statement form-control" style="margin-bottom:5px;" value="' + value + '" /><br />')
 		});
 		$.each(model.model.suffixes, function(i, value) {
 			$(".add-suffix").before('<input type="text" class="suffix form-control" style="margin-bottom:5px;" value="' + value + '" /><br />')
 		});
	});
}

document.addEventListener('DOMContentLoaded', restore_options);
$(".save").click(function(){
	save_options();
});


$(".add-statement").click(function(){
	$(this).parent().before('<input type="text" class="statement form-control" style="margin-bottom:5px;" /><br />');
});

$(".add-suffix").click(function(){
	$(this).parent().before('<input type="text" class="suffix form-control" style="margin-bottom:5px;" /><br />');
});
