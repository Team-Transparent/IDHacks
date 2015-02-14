#!/bin/bash
for i in {7..99}
do
   curl -o $i.pdf http://www.parliament.go.tz/budget/2013/Votes/Vol2/$i.pdf

done
