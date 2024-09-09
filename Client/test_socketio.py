import socketio
import asyncio

sio = socketio.AsyncClient()

async def connect():
    await sio.connect('http://localhost:3000', transports=['websocket'],headers={"auth":"1234"})

    @sio.on('message')
    async def on_message(data):
        print(f"Normal Message received: {data}")

    @sio.on('notification')
    async def on_message(data):
        print(f"Notification received: {data}")

    await sio.wait()


    

if __name__ == "__main__":
    asyncio.run(connect())