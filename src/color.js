export function colorStr(r, g, b) {
    var r_str = r.toString(16)
    var g_str = g.toString(16)
    var b_str = b.toString(16)
    if (r_str.length == 1)  r_str = "0" + r_str
    if (g_str.length == 1)  g_str = "0" + g_str
    if (b_str.length == 1)  b_str = "0" + b_str
    return '#' + r_str + g_str + b_str
}

export function darkerStr(r, g, b) {
    var new_r = Math.max(0, r - 15)
    var new_g = Math.max(0, g - 15)
    var new_b = Math.max(0, b - 15)
    return colorStr(new_r, new_g, new_b)
}


