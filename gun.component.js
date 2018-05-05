AFRAME.registerComponent('gun', {
  schema: {
   triggerKeyCode: {default: 69} // E
  },

  init: function() {
    var that = this;
    document.body.onkeyup = function(e){
     if(e.keyCode == that.data.triggerKeyCode){
		
        that.shoot();
		
     }
    }
  },

  shoot: function() {
    this.createBullet();
  },

  createBullet: function() {
    
    var el = document.createElement('a-sphere');
			el.setAttribute('kinematic-body', 'sphereRadius: 0.2; mass: 50');
            el.setAttribute('color', '#079BE5');
            el.setAttribute('radius', '0.2');
			el.setAttribute('forward', 'speed: 3');

    var tip = document.querySelector('#user');
    el.setAttribute('position', this.getInitialBulletPosition(tip));
    el.setAttribute('rotation', this.getInitialBulletRotation(tip));

    var scene = document.querySelector('a-scene');
    scene.appendChild(el);
	setTimeout(function() {
			scene.removeChild(el);
			}, 500);
  },

  getInitialBulletPosition: function(spawnerEl) {
    var position = spawnerEl.getAttribute('position');

    var worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(spawnerEl.object3D.matrixWorld);

    return worldPos;
  },

  getInitialBulletRotation: function(spawnerEl) {
    var worldDirection = new THREE.Vector3();

    spawnerEl.object3D.getWorldDirection(worldDirection);
    worldDirection.multiplyScalar(-1);
    this.vec3RadToDeg(worldDirection);

    return worldDirection;
  },

  vec3RadToDeg: function(rad) {
    rad.set(rad.y * 90, -90 + (-THREE.Math.radToDeg(Math.atan2(rad.z, rad.x))), 0);
  }
});
