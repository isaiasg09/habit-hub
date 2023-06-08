import axios from "axios";

export const api = axios.create({
  baseURL: "https://bhnjksdfhkj.onrender.com",
  headers: {
    "Bypass-Tunnel-Reminder": "", // Serve para ignorar a página padrão do pacote localtunnel, se remover isto, a requisição não vai conseguir retornar os dados
  },
});
