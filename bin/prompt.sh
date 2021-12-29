#!/bin/bash


while true; do
    read -p "How many hours are you working today?" wh
    # [[ $wh =~ ^\d(.(25|5|75))?$ ]] && break;
    [[ $wh =~ ^[1-8](.(25|5|75))?$ ]] && break;
    # just avoid closing gnome-terminal immediately
    read -p "Hours w/ 15 min. granularity only." u;
done

aws lambda invoke --function-name aws-node-scheduled-cron-project-dev-loginHandler --cli-binary-format raw-in-base64-out --payload '{ "hours": '"$wh"' }' response.json --profile warren
