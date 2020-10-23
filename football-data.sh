#!/bin/sh
rm -rf ./matches
for SEASON in "9394" "9495" "9596" "9697" "9798" "9899" "9900" "0001" "0102" "0203" "0304" "0405" "0506" "0607" "0708" "0809" "0910" "1011" "1112" "1213" "1314" "1415" "1516" "1617" "1718" "1819" "1920" "2021"; do
    echo "<-----------------------------------------Season" $SEASON "------------------------------------------------>"
    for COUNTRY in "E0" "SP1" "D1" "I1" "F1" "N1"; do
        echo "==============>" $COUNTRY "=============>"
        curl https://football-data.co.uk/mmz4281/${SEASON}/${COUNTRY}.csv | node ./index.js ${SEASON}
    done
    PGPASSWORD=$1 psql -U footballstats -d footballstats -v season=$SEASON -f "./create_table.sql" -c "\copy public.season$SEASON (div, date, time, hometeam, awayteam, fthg, ftag, ftr, hthg, htag, htr, referee, hs, aws, hst, ast, hf, af, hc, ac, hy, ay, hr, ar) from './matches/$SEASON.csv' with (format csv, delimiter ',');"
done
