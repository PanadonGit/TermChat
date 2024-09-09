import socketio
import asyncio

sio = socketio.AsyncClient()

async def connect():
    await sio.connect('http://localhost:3000', transports=['websocket'])

    @sio.on('message')
    async def on_message(data):
        print(f"Message received: {data}")

    await sio.wait()


    

if __name__ == "__main__":
    asyncio.run(connect())