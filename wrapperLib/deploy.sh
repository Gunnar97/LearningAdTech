version=$(jq -r '.version' package.json)

rsync ./dist/assets/ root@194.146.25.179:/root/prebid_wrapper/dist/$version/ -r
rsync ./dist/assets/ root@194.146.25.179:/root/prebid_wrapper/dist/latest/ -r

curl --request POST \
  --url https://api.cloudflare.com/client/v4/zones/65982b7aab1bde317c51da6ba8d24010/purge_cache \
  --header 'X-Auth-Email: morozgennadiy@gmail.com' \
  --header 'X-Auth-Key: 82d527b5ca8ae3b552e84720126edea632523' \
  --header 'Content-Type: application/json' \
  --data '{  "files": [    "https://learntools.xyz/latest/wrapper.js"  ] }'
