import { getData } from '../lib/main';

let app = document.getElementById('app');
if (app) {
    const data = await getData({
        host: 'perimeter',
        storedProc: 'api_custom_My_Giving_History_Widget_HARDCODED',
        requireUser: true,
    });

    console.log(data);
}
