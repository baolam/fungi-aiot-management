import skfuzzy as fuzz

from ..variable import temperature, humidity, light, control_levels, fan_speed, brightness

# Tiến hành định nghĩa các khái niệm
temperature["very_cold"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["cold"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["slightly_cold"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["cool"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["warm"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["slightly_hot"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["hot"] = fuzz.trimf(temperature.universe, [0, 0, 3])
temperature["very_hot"] = fuzz.trimf(temperature.universe, [0, 0, 3])

humidity["very_dry"] = fuzz.trimf(humidity.universe, [0, 0, 3])
humidity["dry"] = fuzz.trimf(humidity.universe, [0, 0, 3])
humidity["slightly_dry"] = fuzz.trimf(humidity.universe, [0, 0, 3])
humidity["moderately_dry"] = fuzz.trimf(humidity.universe, [0, 0, 3])
humidity["humid"] = fuzz.trimf(humidity.universe, [0, 0, 3])
humidity["wet"] = fuzz.trimf(humidity.universe, [0, 0, 3])
humidity["very_wet"] = fuzz.trimf(humidity.universe, [0, 0, 3])

light["completely_dark"] = fuzz.trimf(light.universe, [0, 0, 3])
light["very_dark"] = fuzz.trimf(light.universe, [0, 0, 3])
light["dark"] = fuzz.trimf(light.universe, [0, 0, 3])
light["dim"] = fuzz.trimf(light.universe, [0, 0, 3])
light["faint"] = fuzz.trimf(light.universe, [0, 0, 3])
light["medium"] = fuzz.trimf(light.universe, [0, 0, 3])
light["bright"] = fuzz.trimf(light.universe, [0, 0, 3])
light["very_bright"] = fuzz.trimf(light.universe, [0, 0, 3])

control_levels["very_slow"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["moderately_slow"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["slow"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["slightly_slow"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["medium"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["slightly_fast"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["fast"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["moderately_fast"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["very_fast"] = fuzz.trimf(control_levels.universe, [0, 0, 3])
control_levels["extermely_fast"] = fuzz.trimf(control_levels.universe, [0, 0, 3])