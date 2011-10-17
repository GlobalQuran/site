<?php
		if($_POST['gq_hidden'] == 'Y') {
			//Form data sent
			$key = $_POST['gq_key'];
			update_option('gq_key', $key);

			$css_url = $_POST['gq_css_url'];
			update_option('gq_css_url', $css_url);

			$css_print_url = $_POST['gq_css_print_url'];
			update_option('gq_css_print_url', $css_print_url);
			?>
			<div class="updated"><p><strong><?php _e('Options saved.' ); ?></strong></p></div>
			<?php
		} else {
			//Normal page display
			$key = get_option('gq_key');
			$css_url = get_option('gq_css_url');
			$css_print_url = get_option('gq_css_print_url');
		}
	?>
<div class="wrap">
	<?php    echo "<h2>" . __( 'Global Quran Api Settings') . "</h2>"; ?>

	<form name="gq_form" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
		<input type="hidden" name="gq_hidden" value="Y">
		<!-- PENDING <?php    echo "<h4>" . __( 'Api Key') . "</h4>"; ?>
		<p><?php _e("key: " ); ?><input type="text" name="gq_key" value="<?php echo $key; ?>" size="50"><?php _e(" ex: 32s5df4232sf5d5 (key might not be released yet)" ); ?></p> -->
		<?php    echo "<h4>" . __( 'Layout Settings') . "</h4>"; ?>
		<p><?php _e("Global CSS File: " ); ?><input type="text" name="gq_css_url" value="<?php echo $css_url; ?>" size="50"><?php _e(" ex: http://www.yourdomain.com/style/global.css" ); ?></p>
		<p><?php _e("Print CSS File: " ); ?><input type="text" name="gq_css_print_url" value="<?php echo $css_print_url; ?>" size="50"><?php _e(" ex: http://www.yourdomain.com/style/print.css" ); ?></p>

		<p class="submit">
		<input type="submit" name="Submit" value="<?php _e('Update Options') ?>" />
		</p>
	</form>
</div>