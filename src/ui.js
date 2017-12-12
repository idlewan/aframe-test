var $active_cube_id = null
var $cubes_nb = null
var $delete_active_cube = null
var $delete_active_cube_confirmation = null
var $delete = null

export function init(addRandomCube, resetCamera, deleteActiveCube) {

    $active_cube_id = $id('active-cube-id')
    $cubes_nb = $id('cubes-nb')
    $delete = $id('delete')
    $delete_active_cube = $id('delete-active-cube')
    $delete_active_cube_confirmation = $id('delete-active-cube-confirmation')

    $id('add-cube').on('click', addRandomCube)
    $id('reset-camera').on('click', resetCamera)

    $id('scale-cube-less').on('click', function() {
        var ev = new Event('scale-cube-less')
        document.dispatchEvent(ev)
    })
    $id('scale-cube-more').on('click', function() {
        var ev = new Event('scale-cube-more')
        document.dispatchEvent(ev)
    })
   $id('scale-cube-reset').on('click', function() {
        var ev = new Event('scale-cube-reset')
        document.dispatchEvent(ev)
    })

    $id('cube-color').on('change', function(e) {
        var ev = new CustomEvent('change-selected-color', {
            detail: e.target.value
        })
        document.dispatchEvent(ev)
    })

    $delete_active_cube.on('click', function() {
        $delete_active_cube_confirmation.classList.remove('hidden')
        $delete_active_cube.classList.add('hidden')
    })
    $delete_active_cube_confirmation.$('.yes').on('click', function () {
        deleteActiveCube()
    })
    $delete_active_cube_confirmation.on('click', function () {
        $delete_active_cube_confirmation.classList.add('hidden')
        $delete_active_cube.classList.remove('hidden')
    })
}

export function setActiveCube(id) {
    if (id) {
        $active_cube_id.textContent = '#' + id
        $delete.classList.remove('hidden')
    } else {
        $active_cube_id.textContent = "None"
        $delete.classList.add('hidden')
    }
}

export function setCubesCount(nb) {
    $cubes_nb.textContent = nb
}
