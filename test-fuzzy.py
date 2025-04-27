import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Định nghĩa biến đầu vào
temperature = ctrl.Antecedent(np.arange(0, 41, 1), 'temperature')
humidity = ctrl.Antecedent(np.arange(0, 101, 1), 'humidity')

# Định nghĩa biến đầu ra
fan_speed = ctrl.Consequent(np.arange(0, 101, 1), 'fan_speed')

# Khai báo membership functions cho từng biến
temperature['cold'] = fuzz.trimf(temperature.universe, [0, 0, 20])
temperature['warm'] = fuzz.trimf(temperature.universe, [15, 25, 35])
temperature['hot'] = fuzz.trimf(temperature.universe, [30, 40, 40])

humidity['dry'] = fuzz.trimf(humidity.universe, [0, 0, 50])
humidity['normal'] = fuzz.trimf(humidity.universe, [30, 50, 70])
humidity['wet'] = fuzz.trimf(humidity.universe, [60, 100, 100])

fan_speed['low'] = fuzz.trimf(fan_speed.universe, [0, 0, 50])
fan_speed['medium'] = fuzz.trimf(fan_speed.universe, [25, 50, 75])
fan_speed['high'] = fuzz.trimf(fan_speed.universe, [50, 100, 100])

# Tạo các luật
rule1 = ctrl.Rule(temperature['hot'] | humidity['wet'], fan_speed['high'])
rule2 = ctrl.Rule(temperature['warm'] & humidity['normal'], fan_speed['medium'])
rule3 = ctrl.Rule(temperature['cold'] & humidity['dry'], fan_speed['low'])

print(rule1)

# Tạo hệ thống điều khiển
fan_ctrl_system = ctrl.ControlSystem([rule1, rule2, rule3])

# Tạo mô phỏng
fan_simulation = ctrl.ControlSystemSimulation(fan_ctrl_system)

# Đặt giá trị đầu vào
fan_simulation.input['temperature'] = 35
fan_simulation.input['humidity'] = 80

# Tính toán
fan_simulation.compute()

# Kết quả
print(f"Fan speed: {fan_simulation.output['fan_speed']}%")
