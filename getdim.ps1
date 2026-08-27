Add-Type -AssemblyName System.Drawing
$i = [System.Drawing.Image]::FromFile('d:\animation_try\src\assets\images\ezgif-frame-001.jpg')
Write-Host "Width=$($i.Width) Height=$($i.Height)"
$i.Dispose()
