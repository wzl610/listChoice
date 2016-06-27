;(function($){
	$.fn.listPlugin = function(option){
		//创建默认值
		var tmp = {
			0 : [1 , 2 , 4 , 5 ],
			1 : [2 , 3],
			2 : [1 , 3],
			3 : [1 , 2 , 5],
			4 : [3 , 4 , 5],
			5 : [4 , 5]
		}
		var opts = $.extend({
			
		},option);
		
		return this.each(function(){
			var event = function(){
				$('.l-selectList').on('click','.l-selectItem',function(){
					//单击添加列表项
					var $this = $(this);
					if($this.hasClass('l-active')){
						return ;
					}
					createNode($this);
					checkList();
				});

				$('.l-saveList').on('click','.l-saveItem',function(){
					//选择一个组
					var $this = $(this), val , $item;
					if($this.hasClass('l-active')) return;
					$this.addClass('l-active');
					var list = tmp[$this.val()];
					for(var i = 0 , length = list.length ; i < length ;  i++){
						val = list[i];
						$item = $('.l-selectItem[value="'+val+'"]');
						if($item.hasClass('l-active')){
							continue;
						}else{
							createNode($item);
						}
					}
					checkList();
				});

				$('#l-left').on('keyup','.l-searchInput',function(){
					//搜索
					var $this = $(this) , val = $this.val();
					var $list = $this.parents('#l-left').find('.l-leftList').not(':hidden').find('li');
					search($list,val);
				});

				$('#l-right').on('keyup','.l-searchInput',function(){
					var $this = $(this) , val = $this.val();
					var $list = $this.parent().next().find('li');
					search($list,val);
				});

				$('.l-resultList').on('click','.l-resultItem',function(){
					//移除列表项
					var $this = $(this),val = $this.val();
					$this.remove();
					$('.l-selectItem[value='+val+']').removeClass('l-active');
					update(0);
					checkList();
				});

				$('#l-left').on('click','.l-navTab',function(){
					var $this = $(this);
					$this.addClass('l-current').siblings().removeClass('l-current');
					$('.l-leftList').hide();
					$('.l-leftList').eq($('.l-navTab').index($this)).show();
				});
			};
			event();

			var update = function(type){
				//type : 1增加 0 减少
				var $choiceNum = $('.l-choiceNum'),num = parseInt($choiceNum.text());
				type == 0 ? num-- : num++;
				$choiceNum.text(num);
			};

			var search = function(list,val){
				list.each(function(k,i){
					i = $(i);
					if(i.text().indexOf(val)== -1){
						i.hide();
					}else{
						i.show();
					}
				});
			};

			var createNode = function(item){
				item.addClass('l-active');
				$('.l-resultList').append('<li class="l-resultItem" value="'+item.val()+'">'+item.text()+'</li>');				
				update(1); 
			};

			var checkList = function(){
				//每次对于项目的更改都检测保存列表
				var $resultItem = $('.l-resultItem'),$saveItem = $('.l-saveItem') ,list = [] , $item ,length;
				for(var i = 0 , length = $resultItem.length ; i < length ; i++ ){
					list.push($resultItem[i].value);
				}
				for(var j in tmp){
					$item = $saveItem.eq(j);
					if(isInclude(list,tmp[j])){
						$item.addClass('l-active');
					}else{
						$item.removeClass('l-active');
					}
				}
			};

			var isInclude = function(a,b){
				//判断一个数组是否包含于另外一个数组
			    if(a.length < b.length) return false;
			    for(var i = 0, len = b.length; i < len; i++){
			       if(a.indexOf(b[i]) == -1) return false;
			    }
			    return true;
			}

		});
	};
})(jQuery);