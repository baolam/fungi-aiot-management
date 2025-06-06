import skfuzzy as fuzz
import json

from ..constant import DATA_CONVENTION_FILE
from ..variable import temperature, humidity, light, control_levels, fan_speed, brightness

with open(DATA_CONVENTION_FILE, "rb") as f:
    raw_data = json.load(f)

configs = [("temperature", temperature), ("humidity", humidity), ("light", light), ("control_levels", control_levels), ("fan_speed", fan_speed), ("brightness", brightness)]
for convention, obj in configs:
    for label, value in raw_data[convention].items():
        obj[label] = fuzz.trimf(obj.universe, value)
    

# Nhiệt độ (0 - 50°C)
# temperature["very_cold"] = fuzz.trimf(temperature.universe, [0, 0, 5])
# temperature["cold"] = fuzz.trimf(temperature.universe, [5, 6, 10])
# temperature["slightly_cold"] = fuzz.trimf(temperature.universe, [10, 11, 15])
# temperature["cool"] = fuzz.trimf(temperature.universe, [15, 16, 22])
# temperature["warm"] = fuzz.trimf(temperature.universe, [22, 23, 28])
# temperature["slightly_hot"] = fuzz.trimf(temperature.universe, [28, 29, 33])
# temperature["hot"] = fuzz.trimf(temperature.universe, [33, 34, 38])
# temperature["very_hot"] = fuzz.trimf(temperature.universe, [38, 39, 44])
# temperature["extremely_hot"] = fuzz.trimf(temperature.universe, [44, 50, 50])

# Độ ẩm (0 - 100%)
# humidity["very_dry"] = fuzz.trimf(humidity.universe, [0, 0, 20])
# humidity["dry"] = fuzz.trimf(humidity.universe, [20, 21, 35])
# humidity["slightly_dry"] = fuzz.trimf(humidity.universe, [35, 36, 45])
# humidity["moderately_humid"] = fuzz.trimf(humidity.universe, [45, 46, 60])
# humidity["humid"] = fuzz.trimf(humidity.universe, [60, 61, 75])
# humidity["wet"] = fuzz.trimf(humidity.universe, [75, 76, 90])
# humidity["very_wet"] = fuzz.trimf(humidity.universe, [90, 100, 100])

# Ánh sáng (0 - 100%)
# light["completely_dark"] = fuzz.trimf(light.universe, [0, 0, 5])
# light["very_dark"] = fuzz.trimf(light.universe, [5, 6, 15])
# light["dark"] = fuzz.trimf(light.universe, [15, 16, 30])
# light["dim"] = fuzz.trimf(light.universe, [30, 31, 45])
# light["faint"] = fuzz.trimf(light.universe, [45, 46, 55])
# light["medium"] = fuzz.trimf(light.universe, [55, 56, 70])
# light["bright"] = fuzz.trimf(light.universe, [70, 71, 85])
# light["very_bright"] = fuzz.trimf(light.universe, [85, 86, 95])
# light["blinding"] = fuzz.trimf(light.universe, [95, 100, 100])

# Tốc độ quạt (0 - 100%)
# fan_speed["very_slow"] = fuzz.trimf(fan_speed.universe, [0, 0, 5])
# fan_speed["moderately_slow"] = fuzz.trimf(fan_speed.universe, [5, 6, 15])
# fan_speed["slow"] = fuzz.trimf(fan_speed.universe, [15, 16, 25])
# fan_speed["slightly_slow"] = fuzz.trimf(fan_speed.universe, [25, 26, 35])
# fan_speed["medium"] = fuzz.trimf(fan_speed.universe, [35, 36, 50])
# fan_speed["slightly_fast"] = fuzz.trimf(fan_speed.universe, [50, 51, 65])
# fan_speed["fast"] = fuzz.trimf(fan_speed.universe, [65, 66, 75])
# fan_speed["moderately_fast"] = fuzz.trimf(fan_speed.universe, [75, 76, 85])
# fan_speed["very_fast"] = fuzz.trimf(fan_speed.universe, [85, 86, 95])
# fan_speed["extremely_fast"] = fuzz.trimf(fan_speed.universe, [95, 100, 100])

# Điều khiển động cơ phun sương, dùng tương tự mức khái niệm với fan_speed
# control_levels["very_low"] = fuzz.trimf(control_levels.universe, [0, 0, 5])
# control_levels["moderately_low"] = fuzz.trimf(control_levels.universe, [5, 6, 15])
# control_levels["low"] = fuzz.trimf(control_levels.universe, [15, 16, 25])
# control_levels["slightly_low"] = fuzz.trimf(control_levels.universe, [25, 26, 35])
# control_levels["medium"] = fuzz.trimf(control_levels.universe, [35, 36, 50])
# control_levels["slightly_high"] = fuzz.trimf(control_levels.universe, [50, 51, 65])
# control_levels["high"] = fuzz.trimf(control_levels.universe, [65, 66, 75])
# control_levels["moderately_high"] = fuzz.trimf(control_levels.universe, [75, 76, 85])
# control_levels["very_high"] = fuzz.trimf(control_levels.universe, [85, 86, 95])
# control_levels["extremely_high"] = fuzz.trimf(control_levels.universe, [95, 100, 100])

# Brightness (0 - 100%)
# brightness["completely_dark"] = fuzz.trimf(brightness.universe, [0, 0, 5])
# brightness["very_dim"] = fuzz.trimf(brightness.universe, [5, 6, 20])
# brightness["dim"] = fuzz.trimf(brightness.universe, [20, 21, 35])
# brightness["medium"] = fuzz.trimf(brightness.universe, [35, 36, 55])
# brightness["bright"] = fuzz.trimf(brightness.universe, [55, 56, 75])
# brightness["very_bright"] = fuzz.trimf(brightness.universe, [75, 76, 90])
# brightness["blinding"] = fuzz.trimf(brightness.universe, [90, 100, 100])