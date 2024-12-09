import matplotlib.pyplot as plt

# Define the color palette
colors = {
    "Primary (Blue)": "#0066CC",
    "Primary Dark": "#003366",
    "Secondary (Soft Blue)": "#E6F0FF",
    "Text (Dark Gray)": "#333333",
    "Background (White)": "#FFFFFF",
    "Muted Gray": "#CCCCCC",
    "Success (Green)": "#28A745",
    "Warning (Amber)": "#FFC107",
    "Error (Red)": "#DC3545",
    "Dark Mode Background": "#1A1A1A",
    "Dark Mode Text": "#F5F5F5"
}

# Create a figure and axis
fig, ax = plt.subplots(figsize=(8, 6))
ax.axis('off')

# Display the color palette as rectangles with labels
for i, (name, hex_value) in enumerate(colors.items()):
    y = len(colors) - i - 1  # Reverse order for top-to-bottom display
    ax.add_patch(plt.Rectangle((0.1, y), 2, 0.8, color=hex_value))
    ax.text(2.3, y + 0.4, f"{name} ({hex_value})", va='center', fontsize=10, color="black" if hex_value != "#FFFFFF" else "gray")

# Adjust limits to fit all colors
ax.set_xlim(0, 5)
ax.set_ylim(0, len(colors))

# Show the color palette
plt.tight_layout()
plt.show()
