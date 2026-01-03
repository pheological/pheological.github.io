import { useState, useEffect, useRef } from 'react';
import { LanyardData, LanyardMessage } from '../types';
import { DISCORD_ID } from '../constants';

const HEARTBEAT_INTERVAL = 30000;

export const useLanyard = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    isUnmountedRef.current = false;

    const connect = () => {
      if (isUnmountedRef.current) return;

      const ws = new WebSocket('wss://api.lanyard.rest/socket');
      wsRef.current = ws;

      ws.onopen = () => {
        // console.log('Lanyard Connected');
      };

      ws.onmessage = (event) => {
        const message: LanyardMessage = JSON.parse(event.data);

        switch (message.op) {
          case 1: // Hello
            const interval = message.d.heartbeat_interval || HEARTBEAT_INTERVAL;
            
            // Send Initial Subscribe
            ws.send(JSON.stringify({
              op: 2,
              d: { subscribe_to_id: DISCORD_ID }
            }));

            // Setup Heartbeat
            if (heartbeatRef.current) clearInterval(heartbeatRef.current);
            heartbeatRef.current = setInterval(() => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ op: 3 }));
              }
            }, interval);
            break;

          case 0: // Event
            if (message.t === 'INIT_STATE' || message.t === 'PRESENCE_UPDATE') {
              setData(message.d);
              setLoading(false);
            }
            break;
        }
      };

      ws.onclose = () => {
        // console.log('Lanyard Disconnected');
        if (heartbeatRef.current) clearInterval(heartbeatRef.current);

        // Only reconnect if not unmounted
        if (!isUnmountedRef.current) {
          reconnectTimeoutRef.current = setTimeout(connect, 5000);
        }
      };
    };

    connect();

    return () => {
      isUnmountedRef.current = true;
      if (wsRef.current) wsRef.current.close();
      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, []);

  return { data, loading };
};