AFRAME.registerComponent('change-color-on-hover', {
    schema: {
        hoverColor: {default: 'red'}
    },

    init: function () {
        var el = this.el
        el.defaultColor = el.getAttribute('material').color
        el.hoverColor = el.getAttribute('hoverColor')

        el.addEventListener('mouseenter', function () {
            el.hovered = true
            el.setAttribute('color', el.hoverColor)
        })

        el.addEventListener('mouseleave', function () {
            el.hovered = false
            el.setAttribute('color', el.defaultColor)
        })
    },
})

AFRAME.registerComponent('selectable', {
    init: function () {
        var el = this.el

        this.onClick = this.onClick.bind(this)
        el.addEventListener('click', this.onClick)

        this.setSelectedColor = this.setSelectedColor.bind(this)
        el.addEventListener('update-selected-color', this.setSelectedColor)
    },

    onClick: function () {
        if (this.el.selected) {
            this.deactivate()
        } else {
            this.activate()
        }
    },

    activate: function () {
        this.system.setSelected(this)
        this.el.emit('active-cube-changed', {active_cube: this.el.dataset.oid})
        this.el.selected = true
        this.el.classList.add('selected')

        // save cube color
        this.el.defaultColorNotSelected = this.el.defaultColor
        this.el.hoverColorNotSelected = this.el.hoverColor

        this.setSelectedColor()
    },

    setSelectedColor: function () {
        this.el.defaultColor = this.system.data.color
        this.el.hoverColor = this.system.data.hoverColor
        if (this.el.hovered) {
            this.el.setAttribute('color', this.el.hoverColor)
        } else {
            this.el.setAttribute('color', this.el.defaultColor)
        }

    },

    deactivate: function () {
        this.el.emit('active-cube-changed', {active_cube: null})
        this.el.selected = false
        this.el.classList.remove('selected')

        // restore cube color
        this.el.defaultColor = this.el.defaultColorNotSelected
        this.el.hoverColor = this.el.hoverColorNotSelected
        if (this.el.hovered) {
            this.el.setAttribute('color', this.el.hoverColor)
        } else {
            this.el.setAttribute('color', this.el.defaultColor)
        }
    },
})

AFRAME.registerSystem('selectable', {
    schema: {
        color: {default: '#0F2D5E'},
        hoverColor: {default: '#0F0D5E'},
    },

    setSelected: function (el) {
        if (this.selected) {
            this.selected.deactivate()
        }
        this.selected = el
    }
})
