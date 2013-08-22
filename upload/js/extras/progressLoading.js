/**
 * function to show progress bar while loading the site, once completed, then hide progress bar
 * adds progress bar percentage
 * @param percentageAdd
 */
var progressPercentage = 20;
function progressLoading (percentageAdd)
{
	progressPercentage += percentageAdd;
	
	if (progressPercentage > 100)
		progressPercentage = 100;
	
	$('.progress-bar').css('width', progressPercentage+'%');
}
$(window).on('load', function () {
	progressLoading(10);
	$('.loadingSite').hide();
	$('.quran').removeClass('hide');
});