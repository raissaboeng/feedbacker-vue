import bus from '../utils/bus';

const EVENT_NAME = 'modal:toggle';

export default function useModal () {
  function open (payload = {}) {
    bus.emit(EVENT_NAME, { status: true, ...payload });
  }

  function close (payload = {}) {
    bus.emit(EVENT_NAME, { status: false, ...payload });
  }

  function listen (func) {
    bus.on(EVENT_NAME, func);
  }

  function off (func) {
    bus.off(EVENT_NAME, func);
  }

  return { open, close, listen, off };
}
