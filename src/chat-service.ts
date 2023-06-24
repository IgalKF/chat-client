import { Buffer } from "buffer";

// For further information on the methods done in this file refer our `Algorithm Documentation.ipynb` file.
const e = BigInt(65537);
const socket = new WebSocket("ws://localhost:12345");

const powerMod = (base: bigint, exponent: bigint, modulus: bigint) => {
  const one = BigInt(1);
  if (modulus === one) return BigInt(0);
  let result =BigInt(1);
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % BigInt(2) === one)
      //odd number
      result = (result * base) % modulus;
    exponent = exponent >> one; //divide by 2
    base = (base * base) % modulus;
  }
  return result;
};

const encrypt = (m: string, e: bigint, n: bigint) => {
  let messageNum = BigInt('0x' + Buffer.from(m, 'utf-8').toString('hex'));
  let encryptedMessage = powerMod(messageNum, BigInt(e), BigInt(n));
  return encryptedMessage.toString();
}

const decrypt = (c: string, d: string, n: string) => {
  let decryptedMessage = powerMod(BigInt(c), BigInt(d), BigInt(n));
  let byteArray = [];

  while (decryptedMessage > 0) {
      byteArray.unshift(Number(decryptedMessage & BigInt(0xff)));
      decryptedMessage >>= BigInt(8);
  }
  let result = String.fromCharCode.apply(null, byteArray);
  return result;
}

socket.onopen = () => {
  socket.send(sessionStorage.getItem("user") ?? "");
};

socket.onerror = (err) => [console.log(err)];

socket.onclose = () => [alert("Connection is done!")];

const mockData = [
  { id: 1, name: "Room 1" },
  { id: 2, name: "Room 2" },
  { id: 3, name: "Room 3" },
];

const chatService = {
  getRooms: () => {
    return mockData;
  },
  getRoomById: (id: number) => {
    return mockData.find((r) => r.id === id);
  },
  createRoom: () => {
    socket.send("Room created.");
  },
  sendMessage: (message: ChatMessage) => {
    const m = message.content;
    const n = BigInt(message.publicKey);

    const encrypted_message = encrypt(m, e, n);
    console.log(encrypted_message);
    
    socket.send(
      `${sessionStorage.getItem("user")}:${(Math.random() * 10000).toFixed()}:${
        message.messageType
      }:${encrypted_message}`
    );
  },
  recieveMessage: socket,
  powerMod,
  decryptMessage: decrypt,
};

type ChatMessage = {
  publicKey: string;
  messageType: "text" | "file";
  content: string;
};

export { chatService };
