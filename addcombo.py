#!/usr/bin/env python
import os
import json

file_name = './src/combos.json'

def main():
  while True:
    with open(file_name, 'r') as combos_file:
      combo_str = combos_file.read()
      combo_json: list = json.loads(combo_str)

    new_combo = {
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
    }

    for i, combo in enumerate(combo_json):
      if (combo['character'] == new_combo['character']
          and combo['notation'] == new_combo['notation']):
        replace = ''
        while replace.lower() not in ['y', 'n']:
          replace = input(f'Replace existing {combo["character"]} combo with same notation? Y/N: ')
          if replace.lower() == 'y':
            combo_json[i] = new_combo
        break
    else:
      combo_json.append(new_combo)

    with open(file_name, 'w') as combos_file:
      combos_file.write(json.dumps(combo_json, indent=2))

    print('Finished!\n')

if __name__ == "__main__":
  main()