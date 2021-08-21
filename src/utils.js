const sanitizeName = (name) => {

    // if (name.startsWith('Marvin')) {
    //     console.log(name)
    // }

    name = name.replace('Jr.','')
    name = name.replace('II','')
    name = name.replace('\'','')
    name = name.replace('’','')
    name = name.replace('Jr','')
    name = name.trim()

    // if (name.startsWith('Marvin')) {
    //     console.log(name)
    // }

    return name
}

module.exports = {
    sanitizeName
}