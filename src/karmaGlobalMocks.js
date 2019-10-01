const mock = () => {
  let storage = {};
  return {
    getItem: key => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: key => delete storage[key],
    clear: () => (storage = {}),
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});

const cordova = {
  plugins: {
    ASAM: {
      toggle: (flag, cb) => {
        cb(true);
      },
    },
    DeviceAuthentication: {
      runAuthentication: (prompt, successCB, failedCB) => {
        successCB(true);
      },
    },
    AppConfig: {
      getValue: (key) => {
        return 'AppConfigMock';
      }
    }
  },
};

Object.defineProperty(window, 'cordova', { value: cordova });
