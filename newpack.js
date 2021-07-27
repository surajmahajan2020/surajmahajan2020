

function enableDesableStickertypecheckbox()
{
	if($('.preview').length> 0){
		$('#ChkIsAnimated').attr('disabled','disabled');
	}
	else{
		$('#ChkIsAnimated').removeAttr('disabled');
	}
}

function ToggleStickerTypeCheckbox(){
	if($('#ChkIsAnimated').prop('checked')===true){
			$('#staticStickerUpload').hide();
			$('#animatedStickerUpload').show();
			$('#ChkIsAnimated').attr('value','True');
	}
	else{
		$('#staticStickerUpload').show();
		$('#animatedStickerUpload').hide();
		$('#ChkIsAnimated').attr('value','False');
	}
}


$(document).ready(function(){
	ToggleStickerTypeCheckbox();	
	enableDesableStickertypecheckbox();
});


var FileLis=[];

$('#trySelect').change(function(){
	
	if( $(this).get(0).files.length  > 0 )
	{
		//var FR= new FileReader();
		//FR.addEventListener("load", function(e) {
			// e.target.result
			//$('#tryPreview').html( '<img src="'+ e.target.result +'" width="100" /> ' );
		//});
		//	FR.readAsDataURL(  $(this).get(0).files[0]);
		var  file=$(this).get(0).files[0];
		
		var formData = new FormData();
			formData.append('upload64try', file); 
			

			$.ajax({
				type: "POST",
				data: formData,
				url: 'apis/try.php',
				contentType: false,
				processData: false,
				success: function(data){
				   //$('#hiddenArea').append('<input type="hidden" name="upload64[]" value='+  data.trim() +'>');
				   //$($('._row')[_currentI]).find('.status').text('Done');
				   $('#tryPreview').html( '<img src="apis/userdata/temp/'+ data +'.png" width="100" /> ' );
				   $('#try').val(data);
				   //_currentI=_currentI+1;
					//   uploadAll();
					}
				});
	}
	
});

$('#uploadwebp').change(function(){
	if($('.sticker').length + this.files.length > 30)
		{
			ShowError("Total 30 Srickers are allowed")
			$('#upload').val('');
			enableDesableStickertypecheckbox();
			return false;
		}

		var _totalSelectedImages=this.files.length;
		var _currentFSIndex=0;
		var names = [];
		for (var i = 0; i < $(this).get(0).files.length; ++i)
		{
				FileLis.push(this.files[i]);
				var FR= new FileReader();
				var IsOutOfSize=false;
				FR.addEventListener("load", function(e) {
						   var strim="";
						   var _className="preview";
						   IsOutOfSize=false;
 
						   if(e.loaded / 1024 >= 300 )
						   {
	 
						   }
						   strim +='<div data-toggle="tooltip" data-placement="top" title="File size : '+ parseFloat(e.loaded / 1024).toFixed(1) +' kb "  IsOutOfSize="'+ IsOutOfSize +'" class="card sticker " style="width: 120px;margin:5px;float:left;">';
						   strim +='	<img class="'+_className+' card-img-top" style="padding:5px;margin:5px;width:100px" src="'+ e.target.result  +'" alt="Card image cap" />';
						   strim +='<button  type="button" onclick="_removeSingle(this)" class="btnRemove btn btn-danger btn-sm">Remove</button>';
						   strim +='</div>';
 
						   $('#imgArea').append(strim);
						   
						   _currentFSIndex=_currentFSIndex+1;
						   if(_currentFSIndex==_totalSelectedImages)
						   {
							   $('[isoutofsize="true"]').css('border','1px solid red');
							   $('[data-toggle="tooltip"]').tooltip();	
							   _IssueWithStickrs();
							   setStickerCount();
						   }
			 }); 			
 
			 FR.readAsDataURL( this.files[i]);
		}
		$('#uploadwebp').val('');

});





$('#upload').change(function(){

		

		if($('.sticker').length + this.files.length > 30)
		{
			ShowError("Total 30 Srickers are allowed")
			$('#upload').val('');
			enableDesableStickertypecheckbox();
			return false;
		}

	   var _totalSelectedImages=this.files.length;
	   var _currentFSIndex=0;
	   var names = [];
	   for (var i = 0; i < $(this).get(0).files.length; ++i)
	   {
		
		   debugger;
	   		var FR= new FileReader();
	   		var IsOutOfSize=false;
	   		FR.addEventListener("load", function(e) {
						  var strim="";
						  var _className="preview";
						  IsOutOfSize=false;

						  if(e.loaded / 1024 >= 100 )
						  {
	
						  }
						  strim +='<div data-toggle="tooltip" data-placement="top" title="File size : '+ parseFloat(e.loaded / 1024).toFixed(1) +' kb "  IsOutOfSize="'+ IsOutOfSize +'" class="card sticker " style="width: 120px;margin:5px;float:left;">';
						  strim +='	<img class="'+_className+' card-img-top" style="padding:5px;margin:5px;width:100px" src="'+ e.target.result  +'" alt="Card image cap" />';
						  strim +='<button  type="button" onclick="_removeSingle(this)" class="btnRemove btn btn-danger btn-sm">Remove</button>';
						  strim +='</div>';

						  $('#imgArea').append(strim);
						  
						  _currentFSIndex=_currentFSIndex+1;
						  if(_currentFSIndex==_totalSelectedImages)
						  {
						  	$('[isoutofsize="true"]').css('border','1px solid red');
						  	$('[data-toggle="tooltip"]').tooltip();	
						  	_IssueWithStickrs();
						  	setStickerCount();
						  }
			}); 			

			FR.readAsDataURL( this.files[i]);
	   }
	   $('#upload').val('');
	   enableDesableStickertypecheckbox();
	});	


	function _IssueWithStickrs()
	{
		var  IsProblem=false;
		$('.sticker').each(function(){
			if( $(this).attr('IsOutOfSize')=="true" )
			{
				IsProblem=true;
			}
		});

		if(IsProblem==true)
		{
			ShowError("There is problem with some sticker. Please remove problematic sticker and try again.");
		}
		if($('.sticker').length==0)
		{
			ShowError("Please Select Stickers");
			IsProblem=true;
		}

		return IsProblem;
	}

	function _clearStickers()
	{
		$('#imgArea').html('');
		setStickerCount();		
	}
	function _removeSingle(element)
	{
		var btnIndex=-1;
		var i=0;
		$('.btnRemove').each(function(){
			if( $(this).is( $(element) ) ) {
			btnIndex=i;
			}
			i=i+1
		});
		console.log("btnIndex="+btnIndex);
		FileLis.splice(btnIndex,1);
		debugger;

		$(element).parent().remove();
		setStickerCount();
	}

	function setStickerCount()
	{
		$('#stickerCount').text( $('.sticker').length );
		enableDesableStickertypecheckbox();
	}




	var _currentI=0;

	function Valdate()
	{
		if($("#StickerPackName").val()=="")
		{
			ShowError("Please enter Sticker Pack Name");
			return false;
		}
		if($("#publisher").val()=="")
		{
			ShowError("Please enter publisher");
			return false;
		}
		if( $('.preview').length < 3 )
		{
			ShowError("Minimum 3 Stickers are required in one Sticker Pack");
			return false;	
		}
		if( $('.preview').length > 30 )
		{
			ShowError("Maxximum 30 Stickers are Allowed in one Sticker Pack");
			return false;	
		}
		return true;
	}

	function _SaveData()
	{
		if(Valdate()==true)
		{
			HoldOn.open({
	                                    theme:'sk-rect',
	                                    message:"Uploading.. <span id='CurrentLoadingCnt'>0</span> /  " + $('.preview').length
	                                });
			 uploadAll();	
		}
	}

	function postSingle()
	{
		$('#CurrentLoadingCnt').text(_currentI+1);

		var _PostUrl="apis/uploadSingleFile.php";
		if($('#ChkIsAnimated').prop('checked')===true)
		{
			_PostUrl="apis/uploadSingleFileWebP.php";

			var formData = new FormData();
			formData.append('upload64', FileLis[_currentI]); 
			

			$.ajax({
				type: "POST",
				data: formData,
				url: _PostUrl,
				contentType: false,
				processData: false,
				success: function(data){
				   $('#hiddenArea').append('<input type="hidden" name="upload64[]" value='+  data.trim() +'>');
				   $($('._row')[_currentI]).find('.status').text('Done');
				   
				   _currentI=_currentI+1;
					   uploadAll();
					}
				});
		}
		else{

			$.ajax({
				type: "POST",
				data: {upload64:$($('.preview')[_currentI]).attr('src')},
				url: _PostUrl,
				success: function(data){
				   console.log(data.trim())
				   $('#hiddenArea').append('<input type="hidden" name="upload64[]" value='+  data.trim() +'>');
				   $($('._row')[_currentI]).find('.status').text('Done');
				   
				   _currentI=_currentI+1;
					   uploadAll();
					}
				});
		}


		
	}

	function uploadAll()
	{
		if($('.preview').length >_currentI )
			{
				postSingle();
			}
			else
			{
				postForm()
			}
	}


function postForm()
{
	$('#ChkIsAnimated').removeAttr('disabled');
	$.ajax({
					url:'apis/savenewpack.php',
					method:'post',
					data:$('#newpackForm').serialize(),
					success:function()
					{
						$('#ChkIsAnimated').attr('disabled','disabled');
						ShowSuccess("Pack Created Successfully");
						HoldOn.close();
						$('#btnSave').attr('disabled','disabled');
						setTimeout(function(){
							window.location.href="stickerpack.php"
						},3000);
					}
					});
}
