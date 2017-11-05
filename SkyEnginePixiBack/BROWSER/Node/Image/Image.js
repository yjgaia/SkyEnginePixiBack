OVERRIDE(SkyEngine.Image, (origin) => {
	
	SkyEngine.Image = CLASS({
		
		preset : () => {
			return origin;
		},
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.src
			
			let sprite;
			
			self.on('load', () => {
				
				if (self.checkIsRemoved() !== true) {
					
					let img = inner.getImg();
					
					sprite = new PIXI.Sprite.fromImage(img.src);
					
					sprite.x = -img.width / 2;
					sprite.y = -img.height / 2;
					
					sprite.blendMode = SkyEnginePixiBack.Util.getPixiBlendMode(self.getBlendMode());
					
					self.addToPixiContainer(sprite);
				}
			});
			
			let setBlendMode;
			OVERRIDE(self.setBlendMode, (origin) => {
				
				setBlendMode = self.setBlendMode = (blendMode) => {
					//REQUIRED: blendMode
					
					if (sprite !== undefined) {
						sprite.blendMode = SkyEnginePixiBack.Util.getPixiBlendMode(blendMode);
					}
					
					origin(blendMode);
				};
			});
			
			let removeBlendMode;
			OVERRIDE(self.removeBlendMode, (origin) => {
				
				removeBlendMode = self.removeBlendMode = () => {
					
					if (sprite !== undefined) {
						sprite.blendMode = PIXI.BLEND_MODES.NORMAL;
					}
					
					origin();
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					sprite = undefined;
					
					origin();
				};
			});
		}
	});
});