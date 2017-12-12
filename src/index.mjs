import './polyfills'
import './ground'
import './skyGradient'
import './cube'
import './camera-controls'
import * as ui from './ui'
import * as color from './color'

var sceneEl = null
var lastGeneratedId = 1
var cubeScale = 1

function addRandomCube() {
    lastGeneratedId += 1
    var cube = document.createElement('a-box')
    cube.setAttribute('mixin', 'cube')
    var x = (Math.random() - 0.5) * 6
    var y = Math.random() * 5
    var z = Math.random() * -7 - 2
    var r = Math.floor(Math.random() * 255)
    var g = Math.floor(Math.random() * 255)
    var b = Math.floor(Math.random() * 255)

    console.log("position: ", x.toFixed(4), y.toFixed(4), z.toFixed(4))

    cube.setAttribute('position', x + ' ' + y + ' ' + z)
    cube.setAttribute('color', color.colorStr(r, g, b))
    cube.setAttribute('hoverColor', color.darkerStr(r, g, b))

    cube.dataset.oid = lastGeneratedId
    cube.classList.add('cube')

    sceneEl.appendChild(cube)
    updateCubesCount()
}

function updateCubesCount() {
    ui.setCubesCount(sceneEl.querySelectorAll('.cube').length)
}

function setCubeScale(scale) {
    var cubes = sceneEl.querySelectorAll('.cube')
    for (var i = 0; i < cubes.length; i++) {
        var scalestr = cubeScale + " " + cubeScale + " " + cubeScale
        cubes[i].setAttribute('scale', scalestr)
    }
}

function resetCamera() {
    var camera = sceneEl.querySelector('a-camera')
    camera.emit('reset')
}

function deleteActiveCube() {
    var selectedCube = sceneEl.querySelector('.cube.selected')
    if (selectedCube) {
        selectedCube.parentNode.removeChild(selectedCube)
        ui.setActiveCube(null)
        updateCubesCount()
    }
}

window.init = function () {
    ui.init(addRandomCube, resetCamera, deleteActiveCube)

    sceneEl = document.querySelector('a-scene')
    sceneEl.on('active-cube-changed', function (e) {
        ui.setActiveCube(e.detail.active_cube)
    })

    document.on('scale-cube-more', function() {
        cubeScale *= 1.1
        setCubeScale(cubeScale)
    })
    document.on('scale-cube-less', function() {
        cubeScale *= 0.9
        setCubeScale(cubeScale)
    })
    document.on('scale-cube-reset', function() {
        cubeScale = 1
        setCubeScale(cubeScale)
    })

    document.on('change-selected-color', function (e) {
        console.log(e.detail)
        var system = sceneEl.systems['selectable']

        var r = parseInt('0x' + e.detail.substr(1, 2))
        var g = parseInt('0x' + e.detail.substr(3, 2))
        var b = parseInt('0x' + e.detail.substr(5, 2))
        var new_color = color.darkerStr(r, g, b)

        system.data.color = e.detail
        system.data.hoverColor = new_color

        var selectedCube = sceneEl.querySelector('.cube.selected')
        if (selectedCube) {
            selectedCube.emit('update-selected-color')
        }
    })

    for (let i = 0; i < 8; i++) {
        addRandomCube()
    }
}
