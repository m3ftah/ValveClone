cordova build && adb push platforms\android\build\outputs\apk\android-debug.apk /sdcard/Valve.apk && powershell -c (New-Object Media.SoundPlayer "c:\door-close.wav").PlaySync();
pause