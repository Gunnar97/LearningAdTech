rsync ./index.js ./package.json root@83.229.85.102:/root/prebid_wrapper -r
ssh root@83.229.85.102 'cd /root/prebid_wrapper && npm install && pm2 restart prebid_wrapper'
