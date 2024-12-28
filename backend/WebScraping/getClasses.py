from bs4 import BeautifulSoup as bs
import requests
import pandas as pd
import re

classes = {
    "Artificer": "https://dnd5e.wikidot.com/artificer",
    "Barbarian": "https://dnd5e.wikidot.com/barbarian",
    "Bard": "https://dnd5e.wikidot.com/bard",
    "Cleric": "https://dnd5e.wikidot.com/cleric",
    "Druid": "https://dnd5e.wikidot.com/druid",
    "Fighter": "https://dnd5e.wikidot.com/fighter",
    "Monk": "https://dnd5e.wikidot.com/monk",
    "Paladin": "https://dnd5e.wikidot.com/paladin",
    "Ranger": "https://dnd5e.wikidot.com/ranger",
    "Rogue": "https://dnd5e.wikidot.com/rogue",
    "Sorcerer": "https://dnd5e.wikidot.com/sorcerer",
    "Warlock": "https://dnd5e.wikidot.com/warlock",
    "Wizard": "https://dnd5e.wikidot.com/wizard"
}

def byName(name):
    url = classes[name]
    response = requests.get(url)
    soup = bs(response.content, 'html.parser')

    # table with : features, proficiency, spells known, etc per level 
    table = soup.find('table', class_= "wiki-content-table")

    # name of attribute (ex : [level, proficiency, features, infusions known, etc])
    contents = table.findAll('tr')[1].text.strip().split("\n")

    features = []
    attributes = [] 
    for row in table.findAll('tr')[2:]:
        columns = row.findAll('td')

        level = {}
        for i in range(len(columns)) :
            if contents[i] == "Features" : 
                features = columns[i].text.strip().split(",")
                level[contents[i]] = features
            else : level[contents[i]] = re.sub(r'\D', '', columns[i].text.strip()) if columns[i].text.strip() != "-" else 0
        attributes.append(level)
    
    return attributes

allClasses = {}
for name in classes :
    print(name)
    allClasses[name] = byName(name)

df = pd.DataFrame(allClasses)
df.to_csv("all_classes.csv", index = False)



