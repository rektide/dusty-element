var dust= require("dustjs-linkedin")

class DustyElement extends HTMLElement{
	constructor( template){
		super()
		this.template= dust.loadSource( template)
		/* this.shadowRoot= */ this.attachShadow({mode: "open"})
		this.attributeChangedCallback()
	}
	attributeChangedCallback(){
		var context= this.context? Object.assign({}, this.context): {}
		for( var i= 0; i< this.attributes.length; ++i){
			var attribute= this.attributes[ i]
			context[ attribute.name]= attribute.value
		}
		dust.render( this.template, context, function( err, out){
			this.shadowRoot.innerHTML= out
		})
	}
}

module.exports= DustyElement
