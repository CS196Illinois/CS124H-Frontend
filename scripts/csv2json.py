import csv, json
pathToCSV = 'csvFile.csv'
pathToJSON = 'jsonFile.json'
overall = {}
data = []
with open(pathToCSV) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for row in csvReader:
        name = row['name']
        pic = row['picture']
        row['picture'] = name.lower()
        #data[name] = row
        data.append(row)

overall['staff'] = data

with open(pathToJSON, "w") as jsonFile:
    jsonFile.write(json.dumps(overall, indent=2))
