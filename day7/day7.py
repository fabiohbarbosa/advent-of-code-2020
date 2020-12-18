from collections import defaultdict

# parse input.
rules = []
for _, line in enumerate(open("input.txt").read().strip().split("\n")):
    outer, b = line.replace("bags", "").replace("bag", "").split("contain")
    for c in b.replace(".", "").split(","):
        c = c.strip()
        if c == "no other":
            rules.append((outer.strip(), c, 0))
        else:
            d = c.split(" ")
            rules.append((outer.strip(), " ".join(d[1:]), int(d[0])))

# part 1.
leads_to_gold = {"shiny gold"}
for outer, inner, n in rules:
    if inner in leads_to_gold:
        leads_to_gold.add(outer)

print(leads_to_gold)
