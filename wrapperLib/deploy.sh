version=$(jq -r '.version' package.json)

rsync ./dist/assets/ root@194.146.25.179:/root/prebid_wrapper/dist/$version/ -r
