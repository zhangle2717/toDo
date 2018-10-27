(function (window,Vue) {
	var list = [{ content: 'a', id: 1, isFinish: false },
		{ content: 'b', id: 2, isFinish: true },
		{ content: 'c', id: 3, isFinish: false },]
	new Vue({
		el:'#app',
		data:{
			list:JSON.parse(window.localStorage.getItem('list'))||[],
			setVal:"",
			// list:JSON.parse(window.localStorage.getItem('list')) || [],
		},
		methods:{
			
			addVal(){
				if(!this.setVal.trim())return;
				this.list.push({ 
							content: this.setVal, 
							id: this.list.length?this.list.sort((a,b)=>a.id-b.id).slice(this.list.length-1)[0].id+1:1, 
							isFinish: false 
								})
				this.setVal=""				
			},
			dele(id){
			return	this.list.splice(id,1);
			},
			deleAll(){
			this.list=this.list.filter(v=>!v.isFinish)
			}
		},
		
		directives:{
			focus:{
				inserted(el){
					el:focus();
				}
			}
		},
		computed:{
			newOld(){
				return this.list.some((v)=>v.isFinish==true)
			},
			wancheng(){
				return this.list.filter((v)=>v.isFinish==true).length
			},

			toDOAll:{
				get(){
					return this.list.every((v)=>v.isFinish==true);
				},
				set(v){
					return this.list.forEach(a=>a.isFinish=v);
				}
			}
		},
		watch:{
			list:{
				handler(n){
					console.log(1);
					
					window.localStorage.setItem('list',JSON.stringify(n))
				},
				deep:true
			}
		}
		

	})


})(window,Vue);
