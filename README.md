# Droid Profile Hub

A small self-hosted web panel that manages Android user profiles on a rooted phone over ADB and lets you connect a chosen [Happ](https://www.happ.su) server inside a chosen profile. It is built for a phone that lives next to a home server and runs several isolated profiles.

## Features

- List, create, delete, start, stop and switch Android profiles
- Store a list of Happ subscriptions (subscription URL or `happ://` link), with an optional server name to select
- Connect a selected server in a selected profile in one click
- Only one profile keeps a live VPN session at a time, so the provider sees a single active device
- Installs Happ into every profile automatically from an uploaded APK
- Installs any other APK (uploaded or downloaded on the server from a direct https link, for example a browser) into the owner profile and the profiles you choose
- Optional device identity sync: copies the per-app Android ID of Happ between profiles so every profile reports the same HWID
- Token-protected API and a dependency-free frontend (vanilla JS, no build step)

## Quick start

Requirements: Docker and a rooted Android phone with USB debugging enabled.

By default the panel talks to the phone over the network (ADB over Wi-Fi), so a flaky USB link cannot break it.

1. Enable ADB over the network once, with the phone attached by USB and unlocked (needs root):

   ```bash
   sudo bash scripts/setup-wifi-adb.sh <phone-ip>
   ```

   The script switches the phone to ADB over the network and tries to make the port survive reboots. The manual equivalent is `adb tcpip 5555`, then `adb connect <phone-ip>:5555`, then `adb -s <phone-ip>:5555 shell "su -c 'setprop persist.adb.tcp.port 5555'"`.

2. Configure and start the panel:

   ```bash
   cp .env.example .env
   ```

   Set `ADB_CONNECT=<phone-ip>:5555` and `ADMIN_TOKEN` in `.env`, then run:

   ```bash
   docker compose up -d
   ```

Open `http://<host>:8080`. On the first run, accept the debugging prompt on the phone and tick Always allow. The ADB key is stored in a Docker volume, so the prompt appears only once.

### USB mode

To use a USB cable instead, add `COMPOSE_FILE=docker-compose.yml:docker-compose.usb.yml` to `.env` and leave `ADB_CONNECT` empty. This mounts `/dev/bus/usb` into the container. If the host already runs its own ADB server, stop it first (`adb kill-server`), because only one ADB server can own the USB device.

## CI/CD

Every push and pull request runs type checking, tests and a Docker build (`.github/workflows/ci.yml`). A push to `main` additionally publishes the image to GitHub Container Registry and deploys it to the server over SSH (`.github/workflows/deploy.yml`):

1. `ci` runs the same checks as above
2. `publish` builds the image and pushes it to `ghcr.io/<owner>/droid-profile-hub` with the `latest` and commit SHA tags
3. `deploy` connects to the server over SSH, uploads `docker-compose.yml`, runs `scripts/deploy.sh` (pull, `docker compose up -d`, health check) and prunes old images

The deploy directory defaults to `~/droid-profile-hub` on the server and can be changed with the `DEPLOY_DIR` repository variable. The image is built for `linux/amd64`, change `platforms` in the workflow for other architectures.

Step by step setup, including the required secrets: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `8080` | HTTP port |
| `ADMIN_TOKEN` | empty | Bearer token for the API. Set it, the panel controls a rooted device |
| `ADB_SERIAL` | empty | Device serial, needed only when several devices are attached |
| `ADB_CONNECT` | empty | `host:port` of the phone for ADB over Wi-Fi, for example `192.168.0.60:5555` |
| `ROOT_MODE` | `auto` | `auto` detects root for the ADB shell, `su` forces it, `shell` runs everything as the plain shell user |
| `WATCHDOG_INTERVAL_MS` | `10000` | How often the panel checks the phone and reconnects it |
| `HAPP_PACKAGE` | `su.happ.proxyutility` | Happ package name |
| `HAPP_APK_URL` | empty | Optional direct link to the Happ APK, used when no file was uploaded in the panel |
| `HAPP_CONNECT_SELECTOR` | `id:btn_power` | UI selector of the connect button, for example `desc:Connect`, `text:Connect` or `id:connect` |
| `UI_TIMEOUT_MS` | `15000` | How long to wait for a UI element |

## How it works

- Profiles are managed through `pm` and `am` (`list users`, `create-user`, `switch-user`, `start-user`, `stop-user`) executed with `su`.
- Installing Happ pushes the APK to the owner profile with `adb install`, adds the package to the other profiles with `pm install-existing` and opens it once, so Android creates its per-app ID.
- Connecting a server switches to the target profile, force-stops Happ in all other profiles, opens `happ://add/<link>` in the target profile and then drives the Happ UI with `uiautomator dump` and `input tap`. Elements are found by text, content description or resource id.
- Identity sync reads `/data/system/users/<id>/settings_ssaid.xml`, takes the Happ entry from the source profile and installs a small Magisk module whose `post-fs-data.sh` writes that value into every profile on each boot, before Android loads its settings. Writing the files on a running system does not work, because Android flushes its in-memory settings over them on shutdown. A reboot applies the change.

## Limitations

- Root is optional. Profile management, Happ installation and UI automation work from the plain ADB shell. Only identity sync and saving the network ADB port across reboots need root.
- Happ has no public API for connecting or disconnecting on Android, so the connect step relies on UI automation. Set `HAPP_CONNECT_SELECTOR` to match your Happ version.
- Identity sync needs root and Magisk. The boot script edits the plain XML format of `settings_ssaid.xml`, ROMs that store it in the binary ABX format are skipped.
- Whether a provider treats profiles as one device depends on how its client derives the HWID. The sync is effective when Happ builds it from the per-app Android ID.

## Development

```bash
npm install
npm run dev
npm test
```

Stack: Node.js 22, TypeScript, Express, ADB.

## License

MIT
