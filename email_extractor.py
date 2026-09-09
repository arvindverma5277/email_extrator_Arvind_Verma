import re

# Open and read the input file
with open("input.txt", "r") as file:
    content = file.read()

# Find email addresses using regex
emails = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", content)

# Save emails to a new file
with open("extracted_emails.txt", "w") as output_file:
    for email in emails:
        output_file.write(email + "\n")

print(f"{len(emails)} email(s) extracted successfully!")
print("Saved in extracted_emails.txt")