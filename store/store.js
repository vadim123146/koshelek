import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      payload: 'btcusdt',
      evdata: [],
      pos: 100,
      asks: [],
      bids: []
    };
  },
  mutations: {
    /**
     * Обновляет состояние payload.
     * @param {Object} state - Состояние store.
     * @param {string} payload - Новое значение для payload.
     */
    updatePayload(state, payload) {
      state.payload = payload;
    },

    /**
     * Обновляет количество выводимых позиций.
     * @param {Object} state - Состояние store.
     * @param {number} pos - Новое количество позиций.
     */
    changePositionLimit(state, pos) {
      state.pos = pos;
    },

    /**
     * Открывает WebSocket соединение и подписывается на обновления.
     * @param {Object} state - Состояние store.
     */
    openWebSocket(state) {
      const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${state.payload}@depth`);

      socket.onopen = () => {
        sendSubscriptionMessage(socket, state.payload);
      };

      socket.onmessage = (event) => {
        handleWebSocketMessage(event, state);
      };

      socket.onclose = (event) => {
        handleWebSocketClose(event);
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  }
});

/**
 * Отправляет сообщение подписки через WebSocket.
 * @param {WebSocket} socket - WebSocket соединение.
 * @param {string} payload - Значение payload для подписки.
 */
function sendSubscriptionMessage(socket, payload) {
  const req = JSON.stringify({
    method: "SUBSCRIBE",
    params: [
      `${payload}@aggTrade`,
      `${payload}@depth`
    ],
    id: 1
  });

  socket.send(req);
}

/**
 * Обрабатывает входящие сообщения WebSocket.
 * @param {MessageEvent} event - Событие сообщения.
 * @param {Object} state - Состояние store.
 */
function handleWebSocketMessage(event, state) {
  const data = JSON.parse(event.data);

  if (Array.isArray(data.a)) {
    state.asks = data.a.slice(0, state.pos);
  }

  if (Array.isArray(data.b)) {
    state.bids = data.b.slice(0, state.pos);
  }
}

/**
 * Обрабатывает закрытие WebSocket соединения.
 * @param {CloseEvent} event - Событие закрытия.
 */
function handleWebSocketClose(event) {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    console.log('[close] Соединение прервано');
  }
}

export default store;
