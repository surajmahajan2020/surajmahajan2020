function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

	function ShowError(msg)
	{
		$.toast({
			    heading: 'Error',
			    text: msg,
			    icon: 'error',
			    loader: true,        
			    position: 'bottom-right',
			    loaderBg: '#9EC600'  
			});
	}
	function ShowSuccess(msg)
	{
		$.toast({
			    heading: 'Success',
			    text:msg,
			    icon: 'success',
			    loader: true,        
			    position: 'bottom-right',
			    loaderBg: '#9EC600'  
			});
	}