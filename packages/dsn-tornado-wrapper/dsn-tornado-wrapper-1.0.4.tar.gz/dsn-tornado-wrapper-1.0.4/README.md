# Tornado Wrapper
## Introduction
A simple and lightweight wrapper for tornado
## What's new
- SessionManager implemented by redis-py
- MongoDB client integrated with pymongo (need manual install)

## Quick deployment
### running with supervisor on linux  
**supervisord.conf**  
```ini
[program:tornado0]  
command=python helloworld.py -—address=127.0.0.1 -—port=8080 
directory=/home/tornado  
user=tornado  
autostart=true  
autorestart=true  
stderr_logfile=/home/tornado/logs/tornado0.err.log  
stdout_logfile=/home/tornado/logs/tornado0.out.log  

[program:tornado1]  
command=python helloworld.py -—address=127.0.0.1 -—port=8081  
directory=/home/tornado  
user=tornado  
autostart=true  
autorestart=true  
stderr_logfile=/home/tornado/logs/tornado1.err.log  
stdout_logfile=/home/tornado/logs/tornado1.out.log  
```

###  configuration for nginx  
**nginx.conf**  
```nginx
upstream tornado {  
	server 127.0.0.1:8080;  
	server 127.0.0.1:8081;  
}  
```
