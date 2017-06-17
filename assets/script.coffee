document.forms.search.onsubmit = (event) ->
    event.preventDefault()
    window.location.href =
        'https://www.google.by/search?q=' + document.forms.search.search.value


apps = [{
    position: -2001
    title: 'Search'
    link: 'https://www.google.com'
},{
    position: -483
    title: 'Play'
    link: 'https://play.google.com'
},{
    position: -1035
    title: 'Mail'
    link: 'https://mail.google.com'
},{
    position: -897
    title: 'Drive'
    link: 'https://drive.google.com'
},{
    position: -1794
    title: 'Calendar'
    link: 'https://www.google.com/calendar'
},{
    position: -1242
    title: 'Account'
    link: 'https://myaccount.google.com'
},{
    position: -621
    title: 'Maps'
    link: 'https://maps.google.com'
},{
    position: -966
    title: 'YouTube'
    link: 'https://www.youtube.com'
},{
    position: -1104
    title: 'Translate'
    link: 'https://translate.google.com'
},{
    position: -69
    title: 'Photos'
    link: 'https://photos.google.com'
}]


document.addEventListener 'DOMContentLoaded', (event) ->
    document.querySelector('figure.google-logo img').src =
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2000px-Google_2015_logo.svg.png'

    placholder = document.querySelector('section.apps figure.card')
    template = document.getElementById('app-template').content

    for app in apps
        content = template.cloneNode(true)
        content.querySelector('figure')
            .style['background-position-y'] = "#{app.position}px"
        content.querySelector('.caption').innerText = app.title
        content.querySelector('a').href = app.link
        placholder.appendChild(content)


HTMLElement.prototype.querySelectorParent = (query) ->
    element = this
    while element
        if not element.matches
            return false
        if element.matches(query)
            return element
        element = element.parentNode
    return false


document.querySelector('body').addEventListener 'click', (event) ->
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
