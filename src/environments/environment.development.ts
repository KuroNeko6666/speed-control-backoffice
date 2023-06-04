export const environment = {
  auth: {
    login: 'http://localhost:8000/auth',
    register: 'http://localhost:8000/auth',
    logout: 'http://localhost:8000/auth',
    forgot: 'http://localhost:8000/auth',
    check: 'http://localhost:8000/auth',
  },
  user: {
    create: 'http://localhost:8000/user',
    update: 'http://localhost:8000/user',
    delete: 'http://localhost:8000/user',
    find: 'http://localhost:8000/user/find',
    read: 'http://localhost:8000/user',
  },
  device: {
    create: 'http://localhost:8000/device',
    update: 'http://localhost:8000/device',
    delete: 'http://localhost:8000/device',
    find: 'http://localhost:8000/device/find',
    read: 'http://localhost:8000/device',
  },
  deviceData: {
    read: 'http://localhost:8000/device-data',
  },
  dashboard: {
    user: 'http://localhost:8000/dashboard/user',
    device: 'http://localhost:8000/dashboard/device',
    data: 'http://localhost:8000/dashboard/data',
    countUser: 'http://localhost:8000/dashboard/count/user',
    countDevice: 'http://localhost:8000/dashboard/count/device',
    countData: 'http://localhost:8000/dashboard/count/data',
    countDataUser: 'http://localhost:8000/dashboard/count/data-user',
  }
};
