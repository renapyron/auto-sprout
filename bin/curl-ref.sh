#!/bin/bash
​
USERNAME='JIKOB'
PASSWORD='IMONGMAMAi30i30'
TOKEN=$(curl https://xlr8clock.hrhub.ph/WebBundy | grep -oP '(?<=RequestVerificationToken" type="hidden" value=").*(?=" /></form)')
echo $TOKEN
# clockout
# PAYLOAD='typeClock=ClockOut&Username='$USERNAME'&Password='$PASSWORD'&__RequestVerificationToken='$TOKEN
# clockin 
# PAYLOAD='typeClock=ClockIn&Username='$USERNAME'&Password='$PASSWORD'&__RequestVerificationToken='$TOKEN

# echo 'sending request:'$PAYLOAD
# curl 'https://xlr8clock.hrhub.ph/WebBundy/ClockIn' \
#   -H 'Connection: keep-alive' \
#   -H 'Accept: */*' \
#   -H 'X-Requested-With: XMLHttpRequest' \
#   -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36' \
#   -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
#   -H 'Sec-GPC: 1' \
#   -H 'Origin: https://xlr8clock.hrhub.ph' \
#   -H 'Sec-Fetch-Site: same-origin' \
#   -H 'Sec-Fetch-Mode: cors' \
#   -H 'Sec-Fetch-Dest: empty' \
#   -H 'Referer: https://xlr8clock.hrhub.ph/WebBundy' \
#   -H 'Accept-Language: en-US,en;q=0.9' \
#   --data-raw $PAYLOAD \
#   --compressed
