input.onButtonPressed(Button.A, function () {
    smarthome.motorFan(AnalogPin.P11, false, 20)
    szerezzHomerseklet()
})
input.onGesture(Gesture.Shake, function () {
    razotte = razotte * -1
})
function szerezzHomerseklet () {
    homerseklet = smarthome.ReadTemperature(TMP36Type.TMP36_temperature_C, AnalogPin.P1)
    OLED.clear()
    OLED.writeStringNewLine("Nesze, ennyi " + ("" + homerseklet + " fok van."))
}
input.onButtonPressed(Button.B, function () {
    smarthome.motorFan(AnalogPin.P11, true, 20)
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # . #
        # . # # #
        # # # # #
        `)
    basic.showLeds(`
        # . . . #
        . # . # .
        . . . . .
        . # # # .
        # . . . #
        `)
    OLED.writeStringNewLine("Ne nyomj meg!")
    basic.pause(2000)
    basic.clearScreen()
})
let homerseklet = 0
let razotte = 0
razotte = 1
OLED.init(128, 64)
OLED.writeStringNewLine("Szia, Uram!")
basic.pause(2000)
szerezzHomerseklet()
basic.forever(function () {
    if (razotte == 1) {
        homerseklet = smarthome.ReadTemperature(TMP36Type.TMP36_temperature_C, AnalogPin.P1)
        if (homerseklet < 10) {
            music.ringTone(262)
        } else if (homerseklet < 20) {
            music.ringTone(294)
        } else {
            music.ringTone(330)
        }
    } else {
        music.stopAllSounds()
    }
})
