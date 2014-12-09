function save_options() {
	var items = [];
	$('.item').each(function(){
		items.push({
		'regex': $(this).children('.regex').first().val(),
		'replace': $(this).children('.replace').first().val()
		});
	});
	chrome.storage.sync.set({
		items: items
	}, function() {
		var state = document.getElementById('status');
		state.textContent = 'Options saved.';
	        setTimeout(function() {
		  state.textContent = '';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		items: [{"regex":"[aeiou]","replace":"o"},{"regex":"[AEIOU]","replace":"O"}]
	}, function(data) {
		data.items.forEach(function(val, index){
			$('#form').append('<div class="item" id="item' + index + '">\nRegex:<input class="regex" type="text" name="regex' + index + '">\nReplace with:<input class="replace" type="text" name="replace' + index + '">\n<button class="remove">Remove</button>\n</div>');
			$('#item' + index + ' .regex').val(val.regex);
			$('#item' + index + ' .replace').val(val.replace);
			$('#item' + index + ' .remove').click({index: index}, remove);
		});
	});
	$('#add').click(add);
}

function remove(item){
	$('#item' + item.data.index).remove();
}

function add(){
	var count = $('#form').children().length;
	$('#form').append('<div class="item" id="item' + count + '">\nRegex:<input class="regex" type="text" name="regex' + count + '">\nReplace with:<input class="replace" type="text" name="replace' + count + '">\n<button class="remove">Remove</button>\n</div>');
	$('#item' + count + ' .remove').click({index: count}, remove);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
