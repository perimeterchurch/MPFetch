import { MPFetch } from '../lib/main';

let app = document.getElementById('app');
if (app) {
    const data = await MPFetch.getData({
        host: 'perimeter',
        storedProc: 'api_custom_My_Giving_History_Widget_HARDCODED',
        requireUser: true,
        debug: true,
    });

    console.log(data);
}
