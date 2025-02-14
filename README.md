# MPFetch

Fetch data from the customwidget API from anywhere!

## Install

```
npm install ministryplatform-fetch
```

## Usage

```javascript
import { MPFetch } from 'ministryplatform-fetch';

const data = await MPFetch.getData({
    host: 'hostname', // API hostname
    storedProc: 'api_custom_STORED_PROC', // Name of the stored procedure in MinistryPlatform
    params: '@CUSTOMPARAM=1', // Optional, Any parameters used by the stored proc
    requireUser: false, // Optional, Set to true to send user data to the stored proc
});

data.data; // The data returned from the stored procedure
data.error; // The error returned from the stored procedure
```
