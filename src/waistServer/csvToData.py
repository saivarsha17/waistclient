import csv
from decimal import Decimal
from insertData import insertData
# Height (cm), Weight (kgs), Age, Waist (cm)
with open('./measurements.csv', 'r') as csv_file:
 
    csv_reader = csv.reader(csv_file)

   
    next(csv_reader)
    data=[]

    
    for row in csv_reader:
       
        data.append(row)
        insertData(row)
    # print(data)
       
       
