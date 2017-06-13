document.forms.search.onsubmit = (event) ->
    event.preventDefault()
    window.location.href = 'https://www.google.by/search?q=' + document.forms.search.search.value


document.addEventListener('DOMContentLoaded', (event) ->
    placholder = document.querySelector('section.apps figure.card')
    source = document.getElementById('apps-logos').content.querySelector('img').src

    for index in [0..30]
        div = document.createElement('div')
        div.classList.add('app')
        div.style['background-position-y'] = '' + (-2134 / 31 * index) + 'px'
        placholder.appendChild(div)

);


HTMLElement.prototype.querySelectorParent = (query) ->
    element = this
    while element
        if not element.matches
            return false
        if element.matches(query)
            return element
        element = element.parentNode
    return false


document.querySelector('body').addEventListener('click', (event) ->
    affected = event.target.querySelectorParent('.ripple')
    if affected
        rect = affected.getBoundingClientRect()
        xOfs = 0
        yOfs = 0

        if event.target isnt affected
            eventRect = event.target.getBoundingClientRect()
            xOfs = eventRect.left - rect.left
            yOfs = eventRect.top - rect.top

        length = Math.max(rect.width, rect.height) * 2

        ripple = document.createElement('div')

        ripple.classList.add('inside')
        ripple.style.height = length + 'px'
        ripple.style.width = length + 'px'
        ripple.style.zIndex = '' + (parseInt(affected.style.zIndex, 10) + 1)

        if affected.matches('.centered')
            ripple.style.left = (rect.width / 2) + 'px'
            ripple.style.top = (rect.height / 2) + 'px'
        else
            ripple.style.left = event.offsetX + (xOfs || 0) + 'px'
            ripple.style.top = event.offsetY + (yOfs || 0) + 'px'

        affected.appendChild(ripple)

        setTimeout(() ->
            affected.removeChild(ripple)
        , 3000)
);
