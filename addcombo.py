#!/usr/bin/env python
import os
import json

file_name = './src/combos.json'

def main():
  while True:
    with open(file_name, 'r') as combos_file:
      combo_str = combos_file.read()
      combo_json: list = json.loads(combo_str)

    combo_json.append({
      'character': input('Character: '),
      'notation': input('Notation: '),
      'startup': int(input('Startup: ')),
      'drive': float(input('Drive: ')),
      'super': int(input('Super: ')),
      'carry': int(input('Carry: ')),
      'damage': int(input('Damage: ')),
      'advantage': int(input('Advantage: ')),
      'position': input('Position: '),
      'state': input('State: '),
    })

    with open(file_name, 'w') as combos_file:
      combos_file.write(json.dumps(combo_json, indent=2))

    print('New combo added!\n')

if __name__ == "__main__":
  main()