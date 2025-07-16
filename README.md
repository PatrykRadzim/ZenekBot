> ⚠️ **Project Status**
>
> - This application is still in a development phase.
> - Not all features are implemented.
> - I recommend not to use this bot on public Discord servers yet.
> - More detailed guide will be added soon. \
>   &nbsp;

# ZenekBot

A simple Discord music bot built with [discord.js](https://github.com/discordjs/discord.js) and [discord-player](https://github.com/Androz2091/discord-player). Its main feature is to let server members upload their own music and create custom playlists.

[![](https://i.postimg.cc/3rZwXfSY/Zrzut-ekranu-z-2025-07-16-16-35-32.png)](https://postimg.cc/G9HrrKn5)

# Installation

Before installing anything, you have to create a Discord application and provide the token:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and log in with your Discord account.
2. Create a new application with a chosen name.
3. In the **Bot** section, enable both **Server Members Intent** and **Message Content Intent**.
4. Go to the **OAuth2** section -> **URL Generator**:
   - In **Scopes**, check **bot**.
   - In **Bot Permissions**, check at least: **Send Messages**, **Connect**, **Speak** and **Request to Speak**.
     > For testing new features, you can temporarily enable **Administrator** privileges, but use them with caution.
5. Copy the generated URL and use it to invite the bot to your Discord server.
6. In the **Bot** section, click **Reset Token**. Copy the new token and don't share it with anyone.
7. In the project directory, create a file named exactly `.env`.
8. Open that file and add the following line (with your actual token inside the quotes): \
   `TOKEN="Your token goes here"`.

You can simply run the bot using Node on your machine, however I recommend creating Docker container - it requires no additional software installation and ensures a consistent environment. Running the bot in a container is especially advised for deployment on a server.

## 🐳 Docker

Head to the project directory and run commands:

```bash
docker build -t zenek-bot .
docker run -it --name zenek zenek-bot
```

This builds a new Docker image named **zenek-bot** using the `Dockerfile` in the project directory. Then it creates and starts a new container from that image.

To run the application again using the same container, use:

```bash
docker start -ai zenek
```

## 🛠️ Manual Installation

Make sure you have [Node.js]() and [ffmpeg]() installed, then in the project directory run:

```bash
  npm install
  npm start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
