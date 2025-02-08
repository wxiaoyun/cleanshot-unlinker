# Cleanshot License Unlinker

A command-line tool to automatically unlink all devices from your Cleanshot X license. This is useful when you frequently switch between different machines and encounter the "License key used too many times" error.

## The Problem

Cleanshot X has a limit on how many devices can be simultaneously activated with a single license. When switching between multiple devices frequently, you may encounter the "License key used too many times" error. The traditional solution is to:

1. Go to the Cleanshot License Manager website
2. Manually find and unlink your devices
3. Retry activating Cleanshot on your current device

This tool automates this process by unlinking all devices associated with your license through the command line.

## Installation

Install globally using npm:

```
npm install -g cleanshot-unlinker
```

Or using pnpm:

```
pnpm add -g cleanshot-unlinker
```

## Usage

Obtaining license code:

1. Go to the Cleanshot License Manager website and login
2. The URL is like `https://licenses.maketheweb.io/manager?c=<license_code>`
3. Copy the license code from the url

Run the command with your license code:

```
cleanshot-unlinker --code YOUR_LICENSE_CODE
# or use the short form
cleanshot-unlinker -c YOUR_LICENSE_CODE
```

The tool will:
1. Fetch all devices currently linked to your license
2. Unlink each device one by one
3. Show the progress and result for each device

## Example Output

```
$ cleanshot-unlinker -c YOUR_LICENSE_CODE
Found 2 linked device(s)
Unlinking device: MacBook Pro (abc123)
Successfully unlinked device: MacBook Pro
Unlinking device: iMac (def456)
Successfully unlinked device: iMac
```