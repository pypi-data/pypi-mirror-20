$(document).ready(function(){

    //~ GLOBAL VARIABLES
    var g_data = {}
    var project_domain = "/django_assistant"
    var active_input;

    //~ functions
    function getParams(parentElement){
	var value,key;
	var data = {}
	
	$.each(parentElement.children(),function(index,item){
	   
	    value = $(this).children('.value').val()
	    key = $(this).children('.key').val() 
	    
	    if(key != "" && key != undefined){
		
		data[key] = value
	    }
	    
	})
	
	return data
    }
    
    
    

    //~ searching URL collection
    $('body').on('keyup','#search_api_collection',function(){
	
	query_string = $(this).val()
	
	//~ $('.api_list').children().
	
	$('.api_list').children().hide().filter(function(){
	    
	    var value = $(this).attr('url_value');
	    console.log(value)
	    
	    if(value.toLowerCase().indexOf(query_string) >= 0 ){
		
		return $(this).show()
		
	    }
	    
	})
	
	
    })
    

    //~ populating the LHS with APIs
    var api_collection = [];
     $.ajax({
	url : project_domain + '/a_get_apis/',
	type : "GET",
	success : function(json){
	    
	    $.each(json["response"],function(index,api){
		
		api_collection.push(api['url'])
		
		var url_item_code = '<div class="api_item" url_value="'+api["url"]+'">\
					<div class="row">\
					    <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 paddingLeftZero">\
						<span style="color:grey;font-size:12px;margin-right:20px;">'+api["http_type"]+' </span><span class="fetch_api_details api_url_value" api_id="'+api["api_id"]+'"> '+api["url"]+'</span>\
					    </div>\
					    <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 paddingLeftZero">\
						<button class="delete_api" api_id="'+api["api_id"]+'">x</button>\
					    </div>\
					</div>\
				    </div>'
		
		$('.api_list').append(url_item_code)
		
	    })
	        
		
	}
    })
    
      


    //~ hitting an API with data
    $('body').on('click','.hit_api',function(){
	g_data = {}
	url = $('.api_url').val()
	http_type = "POST"
	$.each($('#'+active_input).children(),function(index,item){
	   
	    value = $(this).children('.value').val()
	    key = $(this).children('.key').val() 
	    
	    
	    g_data[key] = value
	    
	})
	
	console.log(g_data)
	console.log(url)
	
	$.ajax({
	    url : url,
	    type : http_type,
	    data : g_data,
	    success:function(json){
		alert("Success")
		var jsonStr = json;
		var jsonPretty = JSON.stringify(json, null, '\t');
	    
		$(".api_result").text(jsonPretty);
		$(".api_result").show()
		
	    }
	})

	
	
    })


    //~ fetching data for an API
    $('body').on('click','.fetch_api_details',function(){
	api_id = $(this).attr("api_id") 
	
	$.ajax({
	    url : project_domain + '/a_fetch_api_details/',
	    type : 'POST',
	    data:{api_id:api_id},
	    success : function(json){
		
		api = json["api"]
		url = api["url"]
		params = api["params"]
		console.log(params)
		
		//~ filling the url
		$('.api_url').val(url)
		
		
		//~ hiding exisitng inputs and its header
		$('.tab_belt_data #id_inputs #input_tab_data_container .existing_input').remove()
		 $('#id_inputs .list-inline .existing_input_header').remove()
		
		
		//~ filling key-value pairs
		$.each(params,function(index,item){
		    
		    var keyValue_code = ''
		    $('#id_inputs .list-inline').prepend('<li class="existing_input_header existing_input_'+index+'" tab="level2" target="existing_input_'+index+'">Input '+index+'</li>')
			
			
		    $.each(item,function(k,v){
			
			console.log(index+" key is "+k)
			console.log(index+" value is "+v)
			
			var keyValue_code_temp =	'<div class="key_value_pair_each">\
							    <input type="text" class="key" value="'+k+'" placeholder="key">\
							    <input type="text" class="value"  value="'+v+'" placeholder="value">\
							    <input type="button" value="X">\
							</div>'
			keyValue_code += keyValue_code_temp
						
		    })
		    
		    params_tab_code = '<div id="existing_input_'+index+'" class="existing_input" hidden>' + keyValue_code + '</div>'
		    
		    
		    $('.tab_belt_data #id_inputs #input_tab_data_container').append(params_tab_code)
		   
		    	    
		})
		
		
		//~ filling the http_type
		$('.api_details_top .http_type').val(api["http_type"])
		
		//storing api_id in addNewParams button
		$('#create_container .add_params').attr('api_id',api["id"])
	    
	    }
	    
	})
	
    })


    //~ creating an API
    $('body').on('click','.create_api_btn',function(){
	var data = {}
	
	var url = $('#createAPI_1 .api_url').val()
	var http_type = $('#createAPI_1 .httptype_value').val()
	var descr = $('#createAPI_1 .descr_value').val()
	
	data["url"] = url
	data["http_type"] = http_type
	data["descr"] = descr
	data["edit_mode"] = "add"
	
	console.log(data)
	//~ $.each($('.key_value_pair_outer').children(),function(index,item){
	   
	    //~ value = $(this).children('.value').val()
	    //~ key = $(this).children('.key').val() 
	    
	    //~ data[key] = value
	    
	//~ })
	
	$.ajax({
	    url : project_domain + '/a_create_api/',
	    type:"POST",
	    data:data,
	    success:function(json){
		
		    alert("success")
		
	    }
	    
	})
	
	
    })


    //~ adding/editing API input params 
    $('body').on('click','.edit_params,.add_params',function(){
	
	var parentElement = $('#create_container #param_container') 
	
	var data = {}
	
	data["edit_mode"] = $(this).attr("edit_mode")
	data["api_id"] = $(this).attr("api_id")
	data["params"] = JSON.stringify(getParams(parentElement))
	
	//~ console.log(data)
	
	$.ajax({
	    url:project_domain + '/a_edit_params/',
	    type:'POST',
	    content_type:"application/x-www-form-urlencoded",
	    data:data,
	    success:function(json){
		
		alert("success")
		
	    }
	    
	    
	})
	
	
    })

    //~ deleting API
    $('body').on('click','.delete_api',function(){
	var api_id = $(this).attr("api_id")
	
	$.ajax({
	    url : project_domain+'/a_delete_api/',
	    type : "POST",
	    data : { api_id : api_id },
	    success : function(json){
		
		alert("Success")
		
	    }
	    
	    
	})
    })

    //~ click api detail tabs
    $('body').on('click','#id_inputs ul li,.tab_belt li',function(){
	var tab_val = $(this).attr('tab')
	if(tab_val == 'level1'){
	    $('.tab_belt li').removeClass('active')
	    $(this).addClass('active')
	}else{
	    $('#id_inputs ul li').removeClass('active')
	    $(this).addClass('active')
	}
	target_id = $(this).attr('target')
    
	$('#'+target_id).show()
	$('#'+target_id).siblings().hide()
	
	//~ storing the active input
	if($('#'+target_id).hasClass('existing_input')){
	    active_input = target_id
	}else{
	    active_input = ''
	}
	
	
    })
    


})
