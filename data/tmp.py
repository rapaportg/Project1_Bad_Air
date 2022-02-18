import os

in_f1 = 'fips.csv'
in_f2 = 'data.csv'

#f1 = open(in_f1, 'r')
f2 = open(in_f2, 'r')


#1_lines = f1.readlines()
f2_lines = f2.readlines()



#need i = 1,2 for f1_lines
#need i = 0,1 for f2

tmp = ""
for l2 in f2_lines:
    l2 = l2.split(',')
    if (l2[2] == '1980'):
        tmp += '<button type="button" onclick="saveVisRightInputs(' + l2[0].replace('"', "'") + ', ' + l2[1].replace('"',"'") + ')" class="dropdown-item" >' + l2[1].replace('"',"") + ', ' + l2[0].replace('"',"")  + '</button>\n'
    
    
#f1_lines.close()
       
       
print(tmp) 
# f_out = 'mapData.csv'
# f = open(f_out, 'w+')
# f.writelines(tmp)
