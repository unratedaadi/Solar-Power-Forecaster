import json

with open(r'c:\Users\aadit\Downloads\sussss\Copy_of_Solar_Power_Forecasting.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

print(f"Total cells: {len(nb['cells'])}")
print(f"Kernel: {nb.get('metadata', {}).get('kernelspec', {}).get('display_name', 'N/A')}")
print()

for i, c in enumerate(nb['cells']):
    src = ''.join(c.get('source', []))
    first_line = src.split('\n')[0][:120] if src.strip() else '(empty)'
    cell_type = c['cell_type']
    print(f"Cell {i:3d} [{cell_type:8s}]: {first_line}")
