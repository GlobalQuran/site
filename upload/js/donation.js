/**
 * donation library
 * @author Basit
 * @email  i@basit.me
 */

var get_donation = function (custom_callback)
{	
	$.getJSON('http://globalquran.com/donate/json.php', function (data)
	{
		if (!data.enable) // donation box is disabled
			return;
		
		if (isFunction(custom_callback))
		{
			custom_callback(data);
			return;
		}
		
		set_donation_data(data);		
		make_donation_pie_chart(data);	
	});
};

var set_donation_data = function (data)
{
	if ($('.donation-box').length)
		$('.donation-box').html(make_donation_box(data));
	if ($('.donation-list').length && data.donators.length >= 1)
		$('.donation-list').append(make_donation_list(data)).show();
	if ($('.donation-goal').length)
		$('.donation-goal').html('$'+data.goal.formatMoney(0));
	if ($('.donation-reached').length)
		$('.donation-reached').html('$'+data.reached.formatMoney(0));
};

var make_donation_box = function (data)
{
//	data.reached += 9000; // uncomment for testing only 
	var percentage = Math.floor((data.reached / data.goal) * 100);
	return '<div class="donation-chart" data-percent="'+percentage+'"><span class="percent">'+percentage+'</span>%</div>';
};

var make_donation_list = function (data)
{
	if (data.donators.length < 1)
		return '';
	
	var html = '<ul class="list-unstyled">';
	$.each(data.donators, function(i, user)
	{
		var donated = Math.floor(user.donated);
		html += '<li><span class="donator">'+user.name+'</span> <span class="donated">$'+donated.formatMoney(2)+'</span></li>';
		if (i == 9)
			html += '<li><span class="donator">...</span></li>';
	});
	
	html += '</ul>';
	
	return html;		
};

var make_donation_pie_chart = function (data)
{
	$('.donation-chart').easyPieChart({
		barColor: $('.donation-box').data('color'),
		trackColor: '#EEEEEE',
		scaleColor: false,
		lineCap: 'butt',
		lineWidth: 20,
		animate: 5000,
		size: $('.donation-box').data('size') || 100,
		onStep: function (value) {
			 this.$el.find('span').text(~~value);
		}
	})
	.css({
		'color': $('.donation-box').data('color'),
		'position': 'relative',
		'text-align': 'center'
	})
	.find('canvas')
	.css({
		'color': $('.donation-box').data('color'),
		'position': 'absolute',
		'top': 0,
		'left': 0
	});
};

function isFunction(functionToCheck)
{
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};