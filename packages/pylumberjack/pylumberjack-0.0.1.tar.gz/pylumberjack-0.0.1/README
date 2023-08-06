# Lumberjack - Python Logging for Humans™

## What is this?

This project is about creating a custom logger with a few arguments such as logger name and file path (if FileHandler is used).

## Why was this made?

In the python projects I have worked with (work or personal projects), I have always had to create a logging instance with a FileHandler, provide a logging format, provide logging file name (and create directories if need be), which is extremely frustrating, at the least. So I decided to encapsulate the pain points regarding the aforementioned.

## How do I use this?

```
from lumberjack import Lumberjack

# outputs logs in the console.
logger = Lumberjack(name="lumberjack")

# outputs logs in the filename 'logs/lumberjack_<timestamp>.log'
logger = Lumberjack(name="lumberjack", file_name="logs/lumberjack.log")

logger.info('Live long and prosper, hoomans')

# Log output
2017-02-23 20:31:41,932 - lumberjack - INFO - Live long and prosper, hoomans!
```

## Can I contribute to this?

Sure! Create an issue in the repo if it's not already present. Then fork this repo, branch off from `master`, add a feature / push a fix and raise a pull-request. I'll merge it once I deem it useful.
