AFRAME.registerComponent('camera-controls', {
    init: function () {
        this.onWheel = this.onWheel.bind(this)
        this.resetCamera = this.resetCamera.bind(this)

        var canvas = this.el.sceneEl.canvas
        canvas.addEventListener('wheel', this.onWheel)

        this.el.addEventListener('reset', this.resetCamera)
    },
    onWheel: function(e) {
        var sign = - Math.sign(e.deltaY)
        var amount = e.deltaY ? (sign > 0 ? 1.1 : 0.9) : 1
        var cameraObj = this.el.object3D.children[0]
        cameraObj.zoom *= amount
        cameraObj.updateProjectionMatrix()
    },
    resetCamera: function () {
        var cameraEl = this.el
        cameraEl.setAttribute('rotation', {x: 0, y: 0, z: 0})
        var cameraObj = this.el.object3D.children[0]
        cameraObj.zoom = 1
        cameraObj.updateProjectionMatrix()
    },
})

