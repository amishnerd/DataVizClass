import os
import csv
import math

csvpath = os.path.join('Resources', 'election_data.csv')

voter = []
county = []
candidate = []
ucan = []
total = 0

with open(csvpath, newline="") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    for row in csvreader: 
       voter.append(row[0])
       county.append(row[1])
       candidate.append(row[2])

    
def unique(candidate): 
      
    # traverse for all elements 
    for x in candidate: 
        # check if exists in unique_list or not 
        if x not in ucan: 
            ucan.append(x) 

total = int(len(voter))

print("total =")
print(total)
for x in ucan: 
    print(x)






