export const environment = {
  auth: {
    login: 'http://188.166.245.130:8000/auth',
    register: 'http://188.166.245.130:8000/auth',
    logout: 'http://188.166.245.130:8000/auth',
    forgot: 'http://188.166.245.130:8000/auth',
    check: 'http://188.166.245.130:8000/auth',
  },
  user: {
    create: 'http://188.166.245.130:8000/user',
    update: 'http://188.166.245.130:8000/user',
    delete: 'http://188.166.245.130:8000/user',
    find: 'http://188.166.245.130:8000/user/find',
    read: 'http://188.166.245.130:8000/user',
  },
  device: {
    create: 'http://188.166.245.130:8000/device',
    update: 'http://188.166.245.130:8000/device',
    delete: 'http://188.166.245.130:8000/device',
    find: 'http://188.166.245.130:8000/device/find',
    read: 'http://188.166.245.130:8000/device',
  },
  deviceData: {
    read: 'http://188.166.245.130:8000/device-data',
  },
  dashboard: {
    user: 'http://188.166.245.130:8000/dashboard/user',
    device: 'http://188.166.245.130:8000/dashboard/device',
    data: 'http://188.166.245.130:8000/dashboard/data',
    countUser: 'http://188.166.245.130:8000/dashboard/count/user',
    countDevice: 'http://188.166.245.130:8000/dashboard/count/device',
    countData: 'http://188.166.245.130:8000/dashboard/count/data',
    countDataUser: 'http://188.166.245.130:8000/dashboard/count/data-user',
  }
};
