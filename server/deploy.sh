rsync ./index.js ./package.json root@194.146.25.179:/root/prebid_wrapper -r
ssh root@194.146.25.179 'cd /root/prebid_wrapper && npm install && pm2 restart prebid_wrapper'
