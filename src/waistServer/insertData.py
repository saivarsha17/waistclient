import pymysql
from constants import HOST,USER,PASSWORD,DB
conn = pymysql.connect(host=HOST, user=USER, password=PASSWORD, db=DB)
cursor = conn.cursor()
# Height (cm), Weight (kgs), Age, Waist (cm)

def insertData(data):
    try:
        insert_query ='''INSERT IGNORE INTO  waisttable (height,weight,age,waist) VALUES (%s, %s, %s, %s)
       ;
          '''
        check_query='''SELECT height,weight,age,waist
        FROM waisttable
        WHERE height=%s AND weight=%s AND age=%s AND waist=%s
        
        
        '''
        height=data[0]
        weight=data[1]
        age=data[2]
        waist=data[3]
       

        result=cursor.execute(check_query, (height,weight,age,waist))
        
        if(result==0):
            cursor.execute(insert_query, (height,weight,age,waist))

       
        conn.commit()
        return True
    except Exception as e:
        print("exception",e)
        return False
def rangeWaist(data):
    height=data[0]
    weight=data[1]
    age=data[2]
    
    distance_query='''CREATE FUNCTION euclidean_distance(x1 FLOAT, y1 FLOAT,z1 FLOAT, x2 FLOAT, y2 FLOAT, z2 FLOAT)
            RETURNS FLOAT
            BEGIN
              DECLARE distance FLOAT;
              SET distance = SQRT(POW((x2 - x1), 2) + POW((y2 - y1), 2)+POW((z2 - z1), 2));
              RETURN distance;
            END'''
    
   
   
    range_query='''SELECT MAX(waist) AS max,MIN(waist) AS min
            FROM waisttable
            ORDER BY  euclidean_distance(height, weight,age, %s, %s,%s)
            LIMIT 50'''
    cursor.execute('SET GLOBAL log_bin_trust_function_creators = 1')
    cursor.execute('DROP FUNCTION IF EXISTS euclidean_distance')

    cursor.execute(distance_query)
    cursor.execute(range_query, (height,weight,age))
    
    result= list(cursor.fetchone())
    
    
    max_waist = max(result)
    min_waist = min(result)
    
    conn.commit()
    return [float(min_waist),float(max_waist)]


